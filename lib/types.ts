export type Accent = "blue" | "green" | "gold" | "violet";

export interface ResearchStop {
  id: string;
  province: string;
  city: string;
  date: string;
  title: string;
  focus: string;
  summary: string;
  activities: string[];
  outcomes: string[];
  coordinate: { x: number; y: number };
  accent: Accent;
}

export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  region: string;
  year: string;
  summary: string;
  background: string;
  legalIssue: string;
  findings: string[];
  solution: string[];
  significance: string;
  laws: string[];
  tags: string[];
  featured?: boolean;
}

export interface KnowledgeArticle {
  slug: string;
  title: string;
  category: string;
  type: "指南" | "法条" | "案例" | "流程" | "研究";
  summary: string;
  readingTime: number;
  updatedAt: string;
  tags: string[];
  body: string;
  resourceUrl?: string;
}

export interface ClassroomResource {
  slug: string;
  title: string;
  kind: "课程" | "手册" | "报告" | "政策文件";
  format: "文章" | "PDF";
  level: "入门" | "进阶" | "实务";
  summary: string;
  duration: string;
  articleSlug?: string;
  resourceUrl?: string;
}

export interface PolicyProposal {
  slug: string;
  title: string;
  category: string;
  level: string;
  summary: string;
  issue: string;
  recommendations: string[];
  expectedImpact: string[];
  status: "研究中" | "已形成" | "持续跟踪";
  publishedAt: string;
}

export interface TeamMember {
  name: string;
  major: string;
  role: string;
  responsibility: string;
  reflection: string;
}
