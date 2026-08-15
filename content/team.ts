import type { TeamMember } from "@/lib/types";

// 使用真实队员信息时，请直接替换姓名与履历字段。
export const teamMembers: TeamMember[] = [
  { name: "成员 A", major: "法学", role: "项目统筹", responsibility: "调研设计、进度协调与成果审核", reflection: "好的方案从理解真实处境开始，也要回到能被使用的规则中。" },
  { name: "成员 B", major: "知识产权", role: "案例研究", responsibility: "权利检索、案例结构化与法条核验", reflection: "每个看似相似的纠纷背后，都有需要被还原的事实链条。" },
  { name: "成员 C", major: "计算机科学", role: "技术研发", responsibility: "平台架构、知识检索与数据治理", reflection: "技术的价值在于让可靠知识更快到达真正需要它的人。" },
  { name: "成员 D", major: "新闻传播", role: "内容策划", responsibility: "实践记录、访谈整理与公众表达", reflection: "专业知识只有被清楚讲述，才可能进入公共生活。" },
  { name: "成员 E", major: "公共管理", role: "政策研究", responsibility: "政策梳理、治理分析与建议撰写", reflection: "政策建议既要看见制度目标，也要尊重基层执行的条件。" },
  { name: "成员 F", major: "视觉传达", role: "视觉设计", responsibility: "品牌系统、信息可视化与无障碍体验", reflection: "设计不是装饰，而是帮助人们建立理解与信任。" },
];
