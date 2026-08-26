export type Accent = "blue" | "green" | "gold" | "violet";

export interface ResearchStop {
  id: string;
  province: string;
  mapLabel: string;
  city: string;
  date?: string;
  title: string;
  focus: string;
  summary: string;
  activities: string[];
  outcomes: string[];
  coordinate: { x: number; y: number };
  accent: Accent;
}

export type CaseContentBlock =
  | { kind: "paragraph" | "subheading"; text: string }
  | { kind: "table"; rows: string[][] };

export interface CaseSection {
  slug: string;
  title: string;
  blocks: CaseContentBlock[];
  group: number;
  order: number;
  groupHeading?: string;
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
  kind: "课程" | "手册" | "报告" | "政策文件" | "论文";
  format: "文章" | "PDF";
  level: "入门" | "进阶" | "实务" | "研究";
  summary: string;
  duration: string;
  author?: string;
  theme?: string;
  articleSlug?: string;
  resourceUrl?: string;
}

export interface PolicySection {
  slug: string;
  title: string;
  paragraphs: string[];
  group: number;
  order: number;
}

export interface TeamMember {
  name: string;
  major: string;
  role: string;
  responsibility: string;
  reflection: string;
}
