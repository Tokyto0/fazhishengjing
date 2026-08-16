# 阿里云生产部署指南

> 当前阶段仅完成配置准备。不要设置 `DEPLOY_ENABLED=true`，不要开放 ECS 公网端口，也不要绑定正式域名。

## 1. 建议架构

```text
独立域名
   ↓ DNS A / AAAA
阿里云 ECS（安全组 80 / 443）
   ↓ Nginx：TLS、限流、静态缓存
Docker 容器：Next.js standalone（127.0.0.1:3000）
```

推荐 Ubuntu 24.04 LTS、2 核 4 GB 起步、40 GB ESSD。生产环境应启用阿里云快照或等价备份，并把系统与应用日志纳入轮转。

## 2. 域名建议

优先使用高校已有域名的子域名，便于建立项目可信度：

- `fazhi.example.edu.cn`：短、清晰，首选。
- `lawip.example.edu.cn`：突出法律与知识产权。
- `practice.example.edu.cn`：适合校级实践成果聚合场景。

如注册独立域名，可考虑 `fazhishengjing.cn` 或 `fazhi-ip.cn`。中国大陆服务器对外提供网站服务通常需要完成域名实名认证与 ICP 备案；具体要求和流程以届时主管部门与云服务商规则为准。

## 3. DNS

在阿里云 DNS 中添加：

| 记录类型 | 主机记录 | 记录值 | TTL |
| --- | --- | --- | --- |
| A | `fazhi` | ECS 公网 IPv4 | 600 |
| AAAA | `fazhi` | ECS 公网 IPv6（如启用） | 600 |

迁移前可把 TTL 暂时降至 600 秒。验证解析后再申请证书。

## 4. 服务器准备

安装 Docker Engine、Docker Compose plugin、Nginx 和 Certbot。创建独立部署目录及仅供部署使用的系统账号，不要用 root 长期运行日常操作。

```bash
sudo mkdir -p /opt/fazhi-shengjing
sudo chown -R deploy:deploy /opt/fazhi-shengjing
cd /opt/fazhi-shengjing
git clone <repository-url> .
cp .env.production.example .env.production
```

编辑 `.env.production`：

```dotenv
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000
APP_IMAGE=fazhi-shengjing:latest
```

注意：`NEXT_PUBLIC_SITE_URL` 会在构建时进入页面元数据。若使用预构建镜像，需要在 CI 构建阶段提供正确值，或确保构建默认值已经改成正式域名。

## 5. 启动应用

```bash
docker compose --env-file .env.production build --pull
docker compose --env-file .env.production up -d
docker compose --env-file .env.production ps
curl --fail http://127.0.0.1:3000/api/health
```

查看日志使用 `docker compose logs --tail=100 web`。不要把环境变量或完整请求正文输出到日志。

## 6. Nginx 与 HTTPS

把 `deploy/nginx.conf` 中的示例域名替换为正式域名。首次申请证书时，可先只启用 80 端口站点，再执行：

```bash
sudo certbot --nginx -d fazhi.example.edu.cn
sudo nginx -t
sudo systemctl reload nginx
sudo certbot renew --dry-run
```

证书签发成功后启用仓库中的完整 HTTPS 配置。HTTPS 由 Certbot 自动续期；建议通过 systemd timer 或监控平台检查续期失败。

若使用阿里云 CDN 或 WAF，应把源站访问限制、真实客户端 IP 透传和缓存规则一并配置；`/api/` 不应被 CDN 长时间缓存。

## 7. 从 GHCR 部署

开启部署开关后，CI 会把不可变生产镜像推送到 `ghcr.io/<owner>/<repo>:<commit-sha>`。Compose 已通过 `APP_IMAGE` 支持切换镜像：

```bash
echo "$GHCR_TOKEN" | docker login ghcr.io -u <github-user> --password-stdin
APP_IMAGE=ghcr.io/<owner>/<repo>:<commit-sha> docker compose --env-file .env.production pull web
APP_IMAGE=ghcr.io/<owner>/<repo>:<commit-sha> docker compose --env-file .env.production up -d --no-build web
```

私有仓库令牌只需 `read:packages` 权限，使用专用部署凭证并定期轮换。

## 8. 更新与回滚

发布前为镜像打不可变版本标签。更新步骤：拉取新镜像、启动、健康检查、访问关键页面。若失败，将 Compose 中的镜像标签改回上一稳定版本并重新启动。

```bash
docker compose --env-file .env.production pull
docker compose --env-file .env.production up -d
curl --fail https://fazhi.example.edu.cn/api/health
```

不要只依赖 `latest` 做回滚。建议保留最近 3 个已验证版本，并记录内容数据与代码版本的对应关系。

## 9. 生产安全与运维

- ECS 安全组仅开放 SSH（限制来源）、HTTP、HTTPS；3000 端口不得公网开放。
- SSH 使用密钥认证，关闭密码和 root 远程登录。
- 定期核验法条、政策、授权文件和公开资料状态。
- 监控 `/api/health`、5xx 比例、延迟、磁盘、内存和证书有效期。
- 对访问日志做最小化和保留期限管理，不记录不必要的访客信息。

## 10. 上线验收

从桌面、平板与手机检查首页、导航、动态详情页、搜索筛选、PDF 链接、404、sitemap 和分享卡片。使用无痕窗口确认不存在依赖本地缓存或登录状态的功能。

## 11. GitHub Actions 自动部署开关

`.github/workflows/production.yml` 在每次推送 `main` 后始终执行依赖安装、类型检查、Lint 和生产构建。镜像发布与 ECS 部署默认跳过。

正式批准上线后再配置：

| 类型 | 名称 | 用途 |
| --- | --- | --- |
| Repository variable | `DEPLOY_ENABLED` | 只有精确值为 `true` 才允许发布和部署 |
| Repository variable | `PRODUCTION_SITE_URL` | 构建期正式站点地址 |
| Repository variable | `ECS_APP_DIR` | 服务器 Compose 目录，默认 `/opt/fazhi-shengjing` |
| Repository secret | `ECS_HOST` | ECS 地址 |
| Repository secret | `ECS_USER` | 非 root 部署账号 |
| Repository secret | `ECS_SSH_PORT` | SSH 端口，可留空使用 22 |
| Repository secret | `ECS_SSH_PRIVATE_KEY` | 专用部署私钥 |

服务器需提前安装 Docker Compose、放置 `docker-compose.yml` 和 `.env.production`，并使用只读 package token 登录 GHCR。确认人工回滚方案后，最后才把 `DEPLOY_ENABLED` 改为 `true`。

## 12. 部署方案比较

| 方案 | 优点 | 主要成本与风险 | 适用性 |
| --- | --- | --- | --- |
| A：阿里云 ECS + Docker | 环境一致、standalone 镜像小、回滚清晰、便于限制资源和迁移 | 需要维护 Docker、系统补丁、日志和镜像仓库 | **最适合当前项目** |
| B：阿里云服务器 + Nginx + PM2 | 上手直接、排查 Node 进程方便 | 更依赖服务器本地 Node/npm 状态，部署漂移和回滚成本更高 | 可用，但不作为首选 |
| C：GitHub + 云平台自动部署 | 运维少、预览环境与自动扩缩容方便 | 国内访问、备案、平台网络和费用受服务商约束，内容数据边界需额外评估 | 适合海外或快速预览，不适合作为当前主方案 |

推荐方案 A：阿里云 ECS + Docker + Nginx。当前项目已经使用 Next.js standalone、多阶段 Docker 构建、健康检查、只读容器和本机端口绑定，技术路径最自然；GitHub Actions 只负责验证、构建不可变镜像和在明确开启后更新 ECS。
