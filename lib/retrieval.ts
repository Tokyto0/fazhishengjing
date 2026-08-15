import { cases, knowledgeArticles, policyProposals } from "@/content";

export interface KnowledgeChunk {
  id: string;
  title: string;
  category: string;
  url: string;
  text: string;
}

export interface SearchResult extends KnowledgeChunk {
  score: number;
  excerpt: string;
}

function stripMarkdown(value: string) {
  return value
    .replace(/[#*_`>|\[\]()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const knowledgeChunks: KnowledgeChunk[] = [
  ...knowledgeArticles.map((article) => ({
    id: `knowledge:${article.slug}`,
    title: article.title,
    category: article.category,
    url: `/knowledge/${article.slug}`,
    text: stripMarkdown(`${article.summary} ${article.body} ${article.tags.join(" ")}`),
  })),
  ...cases.map((item) => ({
    id: `case:${item.slug}`,
    title: item.title,
    category: item.category,
    url: `/cases/${item.slug}`,
    text: `${item.summary} ${item.background} ${item.legalIssue} ${item.findings.join(" ")} ${item.solution.join(" ")} ${item.significance} ${item.laws.join(" ")} ${item.tags.join(" ")}`,
  })),
  ...policyProposals.map((proposal) => ({
    id: `policy:${proposal.slug}`,
    title: proposal.title,
    category: proposal.category,
    url: `/policies/${proposal.slug}`,
    text: `${proposal.summary} ${proposal.issue} ${proposal.recommendations.join(" ")} ${proposal.expectedImpact.join(" ")}`,
  })),
];

function tokenize(input: string) {
  const normalized = input.toLowerCase().replace(/[^\u3400-\u9fffa-z0-9]+/g, " ");
  const tokens = new Set<string>();
  // Separate ASCII and CJK runs so mixed terms such as "AI创作" become
  // "ai" and "创作" instead of an unmatched single token.
  const parts = normalized.match(/[a-z0-9]+|[\u3400-\u9fff]+/g) ?? [];
  for (const part of parts) {
    if (/^[\u3400-\u9fff]+$/.test(part)) {
      if (part.length <= 4) tokens.add(part);
      for (let index = 0; index < part.length - 1; index += 1) tokens.add(part.slice(index, index + 2));
      for (let index = 0; index < part.length - 2; index += 1) tokens.add(part.slice(index, index + 3));
    } else {
      tokens.add(part);
    }
  }
  return [...tokens].filter((token) => token.length > 1);
}

function excerptAround(text: string, tokens: string[], length = 170) {
  const lower = text.toLowerCase();
  const hits = tokens.map((token) => lower.indexOf(token)).filter((index) => index >= 0);
  const hit = hits.length ? Math.min(...hits) : 0;
  const start = Math.max(0, hit - 40);
  const excerpt = text.slice(start, start + length).trim();
  return `${start > 0 ? "…" : ""}${excerpt}${start + length < text.length ? "…" : ""}`;
}

export function searchKnowledge(query: string, limit = 5): SearchResult[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];
  return knowledgeChunks
    .map((chunk) => {
      const title = chunk.title.toLowerCase();
      const category = chunk.category.toLowerCase();
      const text = chunk.text.toLowerCase();
      let score = 0;
      for (const token of tokens) {
        if (title.includes(token)) score += 8;
        if (category.includes(token)) score += 5;
        const matches = text.split(token).length - 1;
        score += Math.min(matches, 5);
      }
      return { ...chunk, score, excerpt: excerptAround(chunk.text, tokens) };
    })
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(1, Math.min(limit, 8)));
}

export function buildRetrievalAnswer(query: string, sources: SearchResult[]) {
  if (!sources.length) {
    return "当前知识库中还没有检索到足够相关的资料。建议换一种更具体的问法，或补充对象、使用场景和争议焦点。";
  }
  const points = sources.slice(0, 3).map((source, index) => `${index + 1}. ${source.excerpt}`).join("\n\n");
  return `围绕“${query}”，知识库检索到以下相关要点：\n\n${points}\n\n以上是基于现有资料的检索摘要。若涉及具体权利归属、合同或侵权处置，还需结合创作过程、授权文件、使用方式等事实进行专业判断。`;
}
