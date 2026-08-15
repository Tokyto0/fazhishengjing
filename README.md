# 法智生境

“法智生境”社会实践成果展示与知识服务平台，是一个面向高校教师、社会实践评审人员与公众的长期数字化成果平台。项目以四省调研档案为基础，连接典型案例、普法课程、IP 保护知识、AI 问答与政策建议。

## 平台能力

- 四省调研地图、实践时间线与结构化档案。
- 地理标志、非遗、文旅 IP、商标和 AI 知识产权案例库。
- Markdown 在线阅读、PDF 资源状态与下载入口。
- 可分类检索的 IP 保护知识库。
- 采用 RAG 思路的 AI 问答：本地检索、资料约束、来源展示和无密钥降级。
- 政策建议、研究成果与多学科团队信息展示。
- SEO、响应式布局、无障碍基础、页面动效和生产安全头。

## 技术栈

Next.js 15（App Router）、React 19、TypeScript、Tailwind CSS、Framer Motion、React Markdown、Zod。服务端接口使用 Next.js Route Handlers，初期内容通过 `content/` 中的类型化静态数据维护。

## 目录结构

```text
.
├── app/                    # 页面、动态路由、SEO 与 API
├── components/             # 品牌、布局、动效及业务组件
├── content/                # 调研、案例、知识、政策等静态内容
├── deploy/                 # Nginx 生产配置
├── lib/                    # 类型、站点配置、检索与限流
├── public/                 # 图标、分享图与公开 PDF 资源
├── styles/                 # 未来独立主题与打印样式预留
├── .github/workflows/      # CI 与镜像发布
├── Dockerfile
├── docker-compose.yml
├── DEPLOYMENT.md
└── README.md
```

## 本地开发

要求 Node.js 20+，推荐 Node.js 22 LTS。

```bash
npm install
copy .env.example .env.local
npm run dev
```

访问 `http://localhost:3000`。提交代码前执行：

```bash
npm run typecheck
npm run lint
npm run build
```

## 环境变量

| 变量 | 必填 | 说明 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 生产必填 | 独立域名完整地址，用于 canonical、Open Graph、robots 和 sitemap |
| `OPENAI_API_KEY` | 否 | 配置后启用基于检索资料的大模型回答；缺失时自动返回本地检索摘要 |
| `OPENAI_MODEL` | 否 | 模型名称，默认 `gpt-4.1-mini` |
| `ALLOWED_ORIGINS` | 建议 | 允许调用问答 POST 接口的来源，多个域名用英文逗号分隔 |

不要把 `.env.local` 或 `.env.production` 提交到 Git。服务端密钥不会发送到浏览器。

## 内容维护

所有首批内容位于 `content/`，详细字段说明见 [content/README.md](./content/README.md)。当前仓库未包含团队原始资料，因此调研省份、队员姓名、数量指标和案例均作为结构化示例；上线前必须按真实、已核验资料替换。

公开 PDF 放入 `public/resources/`，再为条目配置 `resourceUrl`。只有确认授权、完成脱敏的文件才应进入公开目录。

## AI 问答架构

```text
用户问题
  ↓ 输入校验与速率限制
本地知识分块检索
  ↓ 相关性排序（最多 4 条）
带来源的上下文
  ↓ 配置密钥时调用模型；否则本地摘要
回答 + 可点击参考资料 + 风险提示
```

当前检索器为适合首期静态内容的确定性关键词检索。内容规模增长后，可以保持 `/api/ai/ask` 的响应契约不变，把 `lib/retrieval.ts` 替换为 PostgreSQL + pgvector、Elasticsearch 或独立向量服务。

## Docker

先创建生产环境文件，然后构建并启动：

```bash
copy .env.example .env.production
docker compose --env-file .env.production build
docker compose --env-file .env.production up -d
docker compose --env-file .env.production ps
```

容器以非 root 用户运行、根文件系统只读，并通过 `/api/health` 健康检查。应用只绑定服务器本机 `127.0.0.1:3000`，公网流量应由 Nginx 反向代理。

## CI/CD

- `.github/workflows/ci.yml`：在推送与 PR 时自动安装依赖、类型检查、Lint 和生产构建。
- `.github/workflows/release-image.yml`：在 `main`、版本标签或手动触发时构建多层缓存镜像并推送到 GitHub Container Registry。

阿里云服务器部署、DNS、HTTPS、回滚与运维说明见 [DEPLOYMENT.md](./DEPLOYMENT.md)。

## 上线前核验清单

- 替换所有示例省份、队员、数字和联系邮箱。
- 导入并核验案例、法条、政策与报告的来源和现行有效性。
- 对访谈、照片、PDF 完成授权与个人信息脱敏。
- 设置真实域名、站点 URL、允许来源和 AI 密钥。
- 运行类型检查、Lint、生产构建和移动端人工验收。
- 在阿里云安全组仅开放 22、80、443，并配置备份、日志轮转和 HTTPS 续期。

## 内容声明

平台内容用于公益普法、学习交流与社会实践成果展示，不构成针对具体事实的法律意见。法律法规与政策状态应以官方现行文本为准。
