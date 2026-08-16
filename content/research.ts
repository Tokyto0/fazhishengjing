import type { ResearchStop } from "@/lib/types";

// 省级范围已经按实际调研地区更新。城市、时间与具体活动请在整理
// 原始日志后补充；未确认前不在公开页面中虚构具体事实。
export const researchStops: ResearchStop[] = [
  {
    id: "shandong",
    province: "山东省",
    mapLabel: "山东",
    city: "省内调研点位待补充",
    title: "区域品牌与乡村产业的协同保护",
    focus: "地理标志、区域公用品牌与农文旅融合",
    summary:
      "围绕特色农产品品牌建设与农文旅场景延伸，梳理公共品牌、经营主体和传播平台之间的权利边界与协作机制。",
    activities: ["调研点位与访谈记录待整理", "品牌使用材料待归档", "典型问题待核验"],
    outcomes: ["区域品牌风险清单", "规范使用指引框架"],
    coordinate: { x: 84, y: 42 },
    accent: "blue",
  },
  {
    id: "guangdong",
    province: "广东省",
    mapLabel: "广东",
    city: "省内调研点位待补充",
    title: "数字文旅场景中的 IP 运营",
    focus: "文旅品牌、数字内容与平台传播",
    summary:
      "关注文旅品牌从视觉设计、数字内容生产到线上传播的完整链路，分析授权范围、素材来源与多平台运营风险。",
    activities: ["调研点位与访谈记录待整理", "数字内容链路待梳理", "授权场景待复核"],
    outcomes: ["文旅 IP 资产台账框架", "数字传播审查清单"],
    coordinate: { x: 70, y: 76 },
    accent: "green",
  },
  {
    id: "hunan",
    province: "湖南省",
    mapLabel: "湖南",
    city: "省内调研点位待补充",
    title: "非遗活化中的创作与授权",
    focus: "非遗版权、文创开发与证据留存",
    summary:
      "围绕传统文化资源的当代表达、短视频传播与文创转化，记录创作贡献、权利配置和文化共同体利益保护问题。",
    activities: ["调研点位与访谈记录待整理", "文创合作材料待归档", "创作过程待核验"],
    outcomes: ["非遗权利保护矩阵", "合作授权要点框架"],
    coordinate: { x: 68, y: 62 },
    accent: "gold",
  },
  {
    id: "ningxia",
    province: "宁夏回族自治区",
    mapLabel: "宁夏",
    city: "自治区内调研点位待补充",
    title: "特色农业品牌的价值守护",
    focus: "特色农产品、地理标志与质量治理",
    summary:
      "聚焦特色农业资源的品牌化发展，观察产地声誉、质量标准、规范用标和市场传播如何形成可持续的保护闭环。",
    activities: ["调研点位与访谈记录待整理", "地理标志材料待核验", "品牌治理问题待归档"],
    outcomes: ["规范用标流程框架", "品牌治理建议提纲"],
    coordinate: { x: 55, y: 43 },
    accent: "violet",
  },
  {
    id: "heilongjiang",
    province: "黑龙江省",
    mapLabel: "黑龙江",
    city: "省内调研点位待补充",
    title: "现代农业的品牌与数字治理",
    focus: "农产品品牌、数字溯源与 AI 风险治理",
    summary:
      "围绕现代农业生产与品牌传播，探索数字溯源、内容确权和 AI 辅助风险识别在知识产权治理中的应用边界。",
    activities: ["调研点位与访谈记录待整理", "数字治理流程待梳理", "AI 应用场景待核验"],
    outcomes: ["数字治理问题清单", "AI 应用合规框架"],
    coordinate: { x: 91, y: 17 },
    accent: "blue",
  },
];

export const researchPrinciples = [
  { number: "01", title: "在场", description: "进入真实生产与传播场景，不以二手材料代替一线观察。" },
  { number: "02", title: "共创", description: "让经营主体、传承人与研究者共同定义问题和可用方案。" },
  { number: "03", title: "转化", description: "把调研发现沉淀为清单、模板、课程和政策建议。" },
  { number: "04", title: "回访", description: "持续记录方案落地情况，让实践档案具备长期可追溯性。" },
];
