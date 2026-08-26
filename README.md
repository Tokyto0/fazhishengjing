# 法智生境

“法智生境”社会实践成果展示与知识服务平台，是一个面向高校教师、社会实践评审人员与公众的长期数字化成果平台。项目以山东、广东、湖南、宁夏与黑龙江五省区调研档案为基础，连接典型案例、普法课程、IP 保护知识与政策建议。

## 平台能力

- 五省区调研地图、实践时间线与结构化档案。
- 地理标志、非遗、文旅 IP、商标和 AI 知识产权案例库。
- Markdown 在线阅读、PDF 资源状态与下载入口。
- 可分类检索的 IP 保护知识库。
- 政策建议、研究成果与多学科团队信息展示。
- SEO、响应式布局、无障碍基础和页面动效。

## 技术栈

当前锁文件实际版本为 Next.js 15.5.23（App Router）、React 19.2.8、TypeScript 5.9.3、Tailwind CSS 3.4.19、Framer Motion 12.43.0。项目使用 Next.js 静态导出，初期内容通过 `content/` 中的类型化静态数据维护，适合部署到 GitHub Pages。

## 目录结构

```text
.
├── app/                    # 页面、动态路由与 SEO
├── components/             # 品牌、布局、动效及业务组件
├── content/                # 调研、案例、知识、政策等静态内容
├── lib/                    # 类型、站点配置与工具函数
├── public/                 # 图标、分享图、CNAME 与公开 PDF 资源
├── styles/                 # 未来独立主题与打印样式预留
├── .github/workflows/      # CI 与 GitHub Pages 部署
├── DEPLOYMENT.md           # GitHub Pages 部署说明
├── PRODUCTION_READINESS.md # 静态站点上线准备审计结果
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
| `NEXT_PUBLIC_SITE_URL` | 生产必填 | 对外访问地址，用于 Open Graph、robots、JSON-LD 和 sitemap |

不要把 `.env.local` 提交到 Git。

## 内容维护

所有首批内容位于 `content/`，详细字段说明见 [content/README.md](./content/README.md)。当前仓库未包含团队原始资料，因此调研省份、队员姓名、数量指标和案例均作为结构化示例；上线前必须按真实、已核验资料替换。

公开 PDF 放入 `public/resources/`，再为条目配置 `resourceUrl`。只有确认授权、完成脱敏的文件才应进入公开目录。

## CI/CD

- `.github/workflows/ci.yml`：在功能分支推送与 PR 时自动安装依赖、类型检查、Lint 和生产构建。
- `.github/workflows/production.yml`：`main` 分支执行安装、检查、静态构建，并把 `out/` 发布到 GitHub Pages。

准备正式部署时，建议在仓库变量中配置 `PRODUCTION_SITE_URL`，并在仓库 Pages 设置里选择 GitHub Actions 作为发布源。完整步骤见 [DEPLOYMENT.md](./DEPLOYMENT.md)。

## 上线前核验清单

- 替换所有示例省份、队员、数字和联系邮箱。
- 导入并核验案例、法条、政策与报告的来源和现行有效性。
- 对访谈、照片、PDF 完成授权与个人信息脱敏。
- 设置真实域名与站点 URL。
- 运行类型检查、Lint、生产构建和移动端人工验收。
- 在 GitHub Pages 设置中确认自定义域名、HTTPS 和发布源。

## 内容声明

平台内容用于公益普法、学习交流与社会实践成果展示，不构成针对具体事实的法律意见。法律法规与政策状态应以官方现行文本为准。
