# 生产环境准备审计

审计日期：2026-08-15。当前状态：**工程已改为 GitHub Pages 静态部署路径，上线前仍需核验正式内容与域名设置。**

## 1. 架构确认

| 项目 | 实际状态 | 结论 |
| --- | --- | --- |
| Next.js | 15.5.23，App Router，静态导出 | 适合 GitHub Pages 部署 |
| React | 19.2.8，React DOM 19.2.8 | 与当前 Next.js 锁定版本一致 |
| TypeScript | 5.9.3，`strict`、`noEmit`、Bundler resolution、ES2022 | 配置严格、适合 CI |
| Tailwind CSS | 3.4.19，显式扫描 app/components/content，启用 Typography | 未发现动态类名导致的生产裁剪风险 |
| 动效 | Framer Motion 12.43.0 | 已遵循系统 reduced-motion 偏好 |
| 内容 | 类型化静态数据 | 首期维护简单，适合静态发布 |
| API | 无服务端 API | GitHub Pages 不需要后端运行时 |

## 2. 页面与响应式检查

- 页面统一使用 `max-w-7xl` 容器和 5/8 级响应式边距。
- 导航在 `xl` 以下切换为移动菜单；500px 无头浏览器实测菜单和首页 Hero 完整。
- 首页、调研、案例、知识、课程、政策和团队布局均在 Tailwind 断点切换为单列或双列。
- 宽表格由知识文章排版容器管理；分类标签和导航使用可横向滚动或自动换行。
- 修复了整页透明初始态，避免脚本延迟时出现白屏。

## 3. SEO

- 根布局提供标题模板、描述、关键词、作者、Open Graph、Twitter Card 和图标。
- 所有页面均有静态 metadata 或动态 `generateMetadata`。
- 已提供 `robots.txt`、`sitemap.xml`、Web App Manifest 和 WebSite JSON-LD。
- 动态案例、知识文章和政策页面通过 `generateStaticParams` 生成可抓取 HTML。
- `NEXT_PUBLIC_SITE_URL` 在构建期注入；生产环境默认使用 `https://www.fazhishengjing.cn`。

## 4. 图片与性能

- 当前页面没有原生 `<img>`，不会发生未声明尺寸造成的布局偏移。
- 品牌图与地图为轻量 SVG；静态导出下已关闭 Next 图片优化服务。
- 首页首屏视觉在移动端不渲染，减少小屏视觉负担。
- Lucide 图标按名称导入并由构建器 tree-shaking。
- 页面以静态预渲染和 SSG 为主。

后续导入调研照片时，可以使用 `next/image`，但需保持静态导出兼容；填写真实宽高和有意义的 `alt`，首屏主图才设置 `priority`，其余保持懒加载。

## 5. 代码与运行安全

- TypeScript strict、ESLint Next core-web-vitals 和生产构建均纳入 CI。
- 未发现 TODO、FIXME、mock、fixture、`any`、`@ts-ignore` 或测试占位代码。
- 浏览器端未发现 `console` 调用。
- 当前无后端 API，不处理访客提交内容。
- GitHub Pages 只托管静态文件，不运行服务器进程。

## 6. CI/CD 状态

- PR/功能分支：安装锁定依赖 → 类型检查 → Lint → 生产构建。
- main：执行完整质量门禁，构建 `out/` 并部署到 GitHub Pages。
- 不再发布 GHCR 镜像，也不再通过 SSH 部署 ECS。

## 7. 当前禁止事项

- 不把示例调研事实、成员占位信息和未授权 PDF 当作正式内容发布。
- 不提交 `.env.local`、API 密钥或 SSH 私钥。
- 不新增依赖服务器运行时的 `/api/*`、数据库或中间件功能。
