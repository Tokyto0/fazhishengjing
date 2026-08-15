# 阿里云生产部署指南

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
cp .env.example .env.production
```

编辑 `.env.production`：

```dotenv
NEXT_PUBLIC_SITE_URL=https://fazhi.example.edu.cn
OPENAI_API_KEY=your-server-side-secret
OPENAI_MODEL=gpt-4.1-mini
ALLOWED_ORIGINS=https://fazhi.example.edu.cn
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

CI 会把生产镜像推送到 `ghcr.io/<owner>/<repo>`。服务器登录镜像仓库后，可以将 Compose 的 `image` 改为发布地址并移除 `build`：

```bash
echo "$GHCR_TOKEN" | docker login ghcr.io -u <github-user> --password-stdin
docker compose --env-file .env.production pull
docker compose --env-file .env.production up -d
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
- AI 密钥仅保存在服务器环境变量或密钥管理服务中。
- Nginx 对 AI 接口做边缘限流；应用还包含进程内基础限流。多实例部署时应改用 Redis 等共享限流。
- 定期核验法条、政策、授权文件和公开资料状态。
- 监控 `/api/health`、5xx 比例、延迟、磁盘、内存和证书有效期。
- 对访问日志做最小化和保留期限管理，不记录问答正文中的潜在敏感信息。

## 10. 上线验收

从桌面、平板与手机检查首页、导航、动态详情页、搜索筛选、PDF 链接、问答降级、404、sitemap 和分享卡片。使用无痕窗口确认不存在依赖本地缓存或登录状态的功能。
