import type { PolicyProposal } from "@/lib/types";

export const policyProposals: PolicyProposal[] = [
  {
    slug: "rural-ip-digital-ledger",
    title: "建立县域农文旅知识产权数字台账",
    category: "数字化知识产权治理",
    level: "县域治理",
    summary: "以轻量、可持续的数据标准记录品牌、内容、授权、合同和风险线索。",
    issue: "农文旅资产分散在不同部门、经营主体与平台中，权利状态、授权期限和使用证据难以统一查询。",
    recommendations: [
      "制定最小必要字段，先覆盖权利主体、权利类型、有效期、使用场景和文件位置。",
      "建立分级访问与更新责任，避免一次建库、长期失管。",
      "与项目申报、品牌授权和风险巡检流程联动，让数据在业务中持续更新。",
    ],
    expectedImpact: ["降低权属核验成本", "提升授权管理透明度", "形成产业风险预警基础"],
    status: "已形成",
    publishedAt: "2026-08-10",
  },
  {
    slug: "ai-ip-service-station",
    title: "建设 AI 赋能的基层知识产权服务站",
    category: "AI 赋能农文旅知识产权保护",
    level: "公共服务",
    summary: "以可信知识库、标准问答和人工转介提高基层知识服务可及性。",
    issue: "经营主体问题高频、碎片且时效性强，传统集中培训难以覆盖日常经营中的即时需求。",
    recommendations: [
      "建设来源清晰、定期复核的本地知识库，并将回答限定在可引用资料范围内。",
      "对商标检索、合同审查和侵权处置等高风险问题设置人工转介。",
      "记录匿名化问题类型，反向优化课程、办事指引和公共服务供给。",
    ],
    expectedImpact: ["降低知识获取门槛", "提升普法服务响应速度", "沉淀区域共性问题画像"],
    status: "研究中",
    publishedAt: "2026-08-09",
  },
  {
    slug: "regional-brand-co-governance",
    title: "完善区域公用品牌多主体共治机制",
    category: "乡村振兴与 IP 保护",
    level: "产业治理",
    summary: "让政府、运营机构、行业组织与经营主体在授权、品控和声誉维护上职责清晰。",
    issue: "重申请、轻运营，授权规则不透明，质量事件响应与退出机制不足。",
    recommendations: [
      "公开准入条件、办理流程和品牌使用规范，保障经营主体平等参与。",
      "将抽检、投诉、舆情与整改记录纳入授权续期评价。",
      "设置争议协调与授权退出机制，并为小微主体提供整改辅导。",
    ],
    expectedImpact: ["保护区域集体声誉", "提高品牌使用规范性", "增强经营主体获得感"],
    status: "持续跟踪",
    publishedAt: "2026-08-08",
  },
];
