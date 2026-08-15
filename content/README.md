# 内容维护说明

网站内容集中存放在本目录的 TypeScript 文件中，页面组件不应包含具体调研事实。

- `research.ts`：省份、点位、时间、活动与阶段成果。
- `cases.ts`：结构化案例与法律依据。
- `knowledge.ts`：可在线阅读的 Markdown 正文。
- `classroom.ts`：课程与 PDF 资源入口。
- `policies.ts`：政策建议与研究成果。
- `team.ts`：队员信息和实践感悟。

新增条目时请保持 `slug` 唯一，只使用小写英文字母、数字和连字符。提交前执行 `npm run typecheck && npm run build`。

## PDF 资源

把经过授权公开的 PDF 放入 `public/resources/`，然后在对应条目中添加：

```ts
resourceUrl: "/resources/example.pdf"
```

页面会自动开放下载入口。若需在线预览，可直接链接到浏览器原生 PDF 查看页，或后续接入 PDF.js 阅读器。
