import type { ResearchStop } from "@/lib/types";

// 首批为结构示例。接入真实调研资料时，只需替换本文件中的字段与图片路径。
export const researchStops: ResearchStop[] = [
  {
    id: "zhejiang-hangzhou",
    province: "浙江",
    city: "杭州 · 临安",
    date: "2026-07-08",
    title: "数字乡村中的品牌共建",
    focus: "农产品区域公用品牌与商标治理",
    summary:
      "走访农创客基地与合作社，观察区域公用品牌、企业品牌和农户自有标识之间的授权边界与协作机制。",
    activities: ["合作社深度访谈", "品牌授权材料梳理", "直播电商场景观察"],
    outcomes: ["品牌授权风险清单", "区域公用品牌使用指引提纲"],
    coordinate: { x: 78, y: 58 },
    accent: "blue",
  },
  {
    id: "fujian-quanzhou",
    province: "福建",
    city: "泉州 · 德化",
    date: "2026-07-12",
    title: "非遗技艺的数字化表达",
    focus: "非遗版权、外观设计与文创授权",
    summary:
      "围绕传统技艺的短视频传播、文创衍生品开发和跨主体合作，记录创作证据留存及权利配置难题。",
    activities: ["非遗工坊座谈", "文创产品链路分析", "版权存证流程演示"],
    outcomes: ["非遗数字存证流程图", "文创合作合同要点"],
    coordinate: { x: 74, y: 71 },
    accent: "green",
  },
  {
    id: "sichuan-chengdu",
    province: "四川",
    city: "成都 · 郫都",
    date: "2026-07-18",
    title: "乡村文旅 IP 的场景再造",
    focus: "文旅形象、内容版权与商业化边界",
    summary:
      "调研乡村文旅项目从文化素材提取、视觉设计到多渠道运营的全过程，分析 IP 资产清单与授权管理。",
    activities: ["文旅园区观察", "运营团队访谈", "IP 资产盘点工作坊"],
    outcomes: ["文旅 IP 资产台账模板", "授权场景分级建议"],
    coordinate: { x: 42, y: 58 },
    accent: "gold",
  },
  {
    id: "shaanxi-xian",
    province: "陕西",
    city: "西安 · 鄠邑",
    date: "2026-07-23",
    title: "AI 赋能下的内容生产治理",
    focus: "生成式 AI、证据留存与侵权检测",
    summary:
      "以农产品包装、短视频脚本和虚拟形象为场景，验证 AI 辅助创作流程中的来源记录、人工贡献说明与风险审查。",
    activities: ["AI 创作流程共创", "权利风险情景推演", "电子证据规范访谈"],
    outcomes: ["AI 创作过程记录卡", "发布前权利审查清单"],
    coordinate: { x: 53, y: 43 },
    accent: "violet",
  },
];

export const researchPrinciples = [
  { number: "01", title: "在场", description: "进入真实生产与传播场景，不以二手材料代替一线观察。" },
  { number: "02", title: "共创", description: "让经营主体、传承人与研究者共同定义问题和可用方案。" },
  { number: "03", title: "转化", description: "把调研发现沉淀为清单、模板、课程和政策建议。" },
  { number: "04", title: "回访", description: "持续记录方案落地情况，让实践档案具备长期可追溯性。" },
];
