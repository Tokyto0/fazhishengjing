import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { buildRetrievalAnswer, searchKnowledge } from "@/lib/retrieval";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const requestSchema = z.object({ question: z.string().trim().min(4, "问题过短").max(500, "问题过长") });

function isAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const configured = process.env.ALLOWED_ORIGINS?.split(",").map((item) => item.trim()).filter(Boolean) ?? [];
  const sameOrigin = new URL(request.url).origin;
  return origin === sameOrigin || configured.includes(origin);
}

function extractOutputText(data: unknown) {
  if (!data || typeof data !== "object") return "";
  const output = (data as { output?: Array<{ content?: Array<{ type?: string; text?: string }> }> }).output;
  return output?.flatMap((item) => item.content ?? []).find((item) => item.type === "output_text")?.text?.trim() ?? "";
}

async function generateGroundedAnswer(question: string, context: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      instructions: "你是法智生境知识服务助手。只能依据提供的知识库片段回答。资料不足时必须明确说不知道，并提出需要补充的事实。不要杜撰法律条文、案例、机构或结论。使用简洁中文，先给结论，再给依据和行动建议；不要伪造引用编号，因为来源卡片由系统单独展示。说明内容仅供普法参考，不替代法律意见。",
      input: `用户问题：${question}\n\n知识库片段：\n${context}`,
      max_output_tokens: 800,
      store: false,
    }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`Model API returned ${response.status}`);
  return extractOutputText(await response.json());
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) return NextResponse.json({ error: "请求来源不受信任" }, { status: 403 });
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const rate = checkRateLimit(clientIp);
  if (!rate.allowed) return NextResponse.json({ error: "提问过于频繁，请稍后再试" }, { status: 429, headers: { "Retry-After": String(Math.ceil((rate.resetAt - Date.now()) / 1000)) } });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "请求格式错误" }, { status: 400 }); }
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "问题格式错误" }, { status: 400 });
  const { question } = parsed.data;
  const sources = searchKnowledge(question, 4);
  const publicSources = sources.map(({ id, title, category, url, excerpt, score }) => ({ id, title, category, url, excerpt, score }));
  if (!sources.length) return NextResponse.json({ answer: buildRetrievalAnswer(question, []), sources: [], mode: "retrieval", notice: "资料不足，未调用模型生成扩展结论。" });
  const context = sources.map((source, index) => `[资料${index + 1}] ${source.title}\n类别：${source.category}\n内容：${source.excerpt}`).join("\n\n");
  try {
    const generated = await generateGroundedAnswer(question, context);
    return NextResponse.json({ answer: generated || buildRetrievalAnswer(question, sources), sources: publicSources, mode: generated ? "rag" : "retrieval", notice: generated ? "回答由模型基于检索资料生成。" : "未配置模型密钥，当前展示本地检索摘要。" });
  } catch (error) {
    console.error("RAG generation failed", error);
    return NextResponse.json({ answer: buildRetrievalAnswer(question, sources), sources: publicSources, mode: "retrieval", notice: "模型服务暂不可用，已切换为本地检索摘要。" });
  }
}
