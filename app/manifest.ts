import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "法智生境社会实践成果展示与知识服务平台",
    short_name: "法智生境",
    description: "聚焦农文旅融合、知识产权保护与人工智能赋能的社会实践成果平台。",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f7fb",
    theme_color: "#071426",
    lang: "zh-CN",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
