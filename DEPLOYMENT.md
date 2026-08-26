# GitHub Pages 部署指南

本项目已调整为 Next.js 静态导出，不需要 Node 服务、Docker、Nginx 或后端健康检查接口。GitHub Actions 会构建 `out/` 目录，并将其发布到 GitHub Pages。

## 1. 仓库设置

在 GitHub 仓库中打开 Settings → Pages：

- Source 选择 `GitHub Actions`。
- 如使用自定义域名，填写 `www.fazhishengjing.cn`。
- 开启 `Enforce HTTPS`。

仓库变量建议配置：

| 类型 | 名称 | 用途 |
| --- | --- | --- |
| Repository variable | `PRODUCTION_SITE_URL` | 生产站点地址，用于 metadata、sitemap、robots 和 JSON-LD |

如果不配置 `PRODUCTION_SITE_URL`，生产 workflow 会默认使用 `https://www.fazhishengjing.cn`。

## 2. 自定义域名

当前自定义域名文件位于 `public/CNAME`，构建后会进入 `out/CNAME`，用于 GitHub Pages 识别域名。

DNS 建议按 GitHub Pages 官方说明配置：

| 记录类型 | 主机记录 | 记录值 |
| --- | --- | --- |
| CNAME | `www` | `<github-user>.github.io` |

如需根域名跳转到 `www`，应在 DNS 服务商或域名服务中额外配置。

## 3. 自动部署

`.github/workflows/production.yml` 会在推送到 `main` 或手动触发时执行：

```text
checkout -> setup-node -> configure-pages -> npm ci -> typecheck -> lint -> next build -> upload out -> deploy-pages
```

构建输出目录是 `out/`。由于项目使用 `output: "export"`，不会启动服务器，也不会发布容器镜像。

## 4. 本地验证

提交前建议执行：

```bash
npm run typecheck
npm run lint
npm run build
```

构建成功后检查 `out/` 是否包含 `index.html`、`sitemap.xml`、`robots.txt`、`CNAME` 和 `_next/` 静态资源目录。

## 5. 注意事项

- GitHub Pages 只能托管静态文件，不能运行 `/api/*`、数据库、定时任务或服务端中间件。
- 新增动态详情页时，需要继续提供 `generateStaticParams()`，确保构建期能生成对应 HTML。
- 如后续使用 `next/image`，需保持 `images.unoptimized: true`，或改用普通静态图片。
- 新增公开 PDF、图片或下载文件时，放入 `public/` 目录并确认授权与脱敏。
