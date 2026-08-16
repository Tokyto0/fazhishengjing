# 生产环境准备审计

审计日期：2026-08-15。当前状态：**工程已具备生产部署条件，但部署开关关闭，不应上线公网。**

## 1. 架构确认

| 项目 | 实际状态 | 结论 |
| --- | --- | --- |
| Next.js | 15.5.23，App Router，standalone 输出 | 适合容器化生产部署 |
| React | 19.2.8，React DOM 19.2.8 | 与当前 Next.js 锁定版本一致 |
| TypeScript | 5.9.3，`strict`、`noEmit`、Bundler resolution、ES2022 | 配置严格、适合 CI |
| Tailwind CSS | 3.4.19，显式扫描 app/components/content，启用 Typography | 未发现动态类名导致的生产裁剪风险 |
| 动效 | Framer Motion 12.43.0 | 已遵循系统 reduced-motion 偏好 |
| 内容 | 类型化静态数据 | 首期维护简单，未来可替换数据库 |
| API | Next.js Route Handlers | 保留容器健康检查接口 |

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
- `NEXT_PUBLIC_SITE_URL` 在构建期注入；未批准域名前保持 `http://127.0.0.1:3000`。

## 4. 图片与性能

- 当前页面没有原生 `<img>`，不会发生未声明尺寸造成的布局偏移。
- 品牌图与地图为轻量 SVG；Next Image 已预设 AVIF、WebP 和 24 小时缓存，方便后续接入照片。
- 首页首屏视觉在移动端不渲染，减少小屏视觉负担。
- Next.js 启用压缩、关闭 `X-Powered-By`；Lucide 图标按名称导入并由构建器 tree-shaking。
- 页面以静态预渲染和 SSG 为主，仅 API 按需动态执行。

后续导入调研照片时，必须使用 `next/image`，填写真实宽高和有意义的 `alt`，首屏主图才设置 `priority`，其余保持懒加载。

## 5. 代码与运行安全

- TypeScript strict、ESLint Next core-web-vitals 和生产构建均纳入 CI。
- 未发现 TODO、FIXME、mock、fixture、`any`、`@ts-ignore` 或测试占位代码。
- 浏览器端未发现 `console` 调用。
- API 仅提供容器健康检查，不处理访客内容。
- Docker 容器使用非 root 用户、只读根文件系统、tmpfs 缓存、进程/内存/CPU 限制和日志轮转。

## 6. CI/CD 状态

- PR/功能分支：安装锁定依赖 → 类型检查 → Lint → 生产构建。
- main：同样执行完整质量门禁。
- `DEPLOY_ENABLED` 未设置为 `true` 时，镜像发布和 ECS 部署都被跳过。
- 正式启用后：构建 commit SHA 镜像 → 推送 GHCR → SSH 到 ECS → Compose 拉取并替换 → 本机健康检查。

## 7. 当前禁止事项

- 不设置正式域名、DNS、证书或备案信息。
- 不开放 ECS 的 3000 端口，不执行远程 Compose 命令。
- 不启用 `DEPLOY_ENABLED`。
- 不提交 `.env.local`、`.env.production`、API 密钥或 SSH 私钥。
- 不把示例调研事实、成员占位信息和未授权 PDF 当作正式内容发布。
