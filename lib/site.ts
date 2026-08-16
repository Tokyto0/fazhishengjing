import {
  BookOpenText,
  BriefcaseBusiness,
  MapPinned,
  Scale,
  UsersRound,
} from "lucide-react";

export const siteConfig = {
  name: "法智生境",
  fullName: "“法智生境”社会实践成果展示与知识服务平台",
  description:
    "聚焦农文旅融合、知识产权保护与人工智能赋能，记录山东、广东、湖南、宁夏、黑龙江五省区调研实践，开放共享法律知识与研究成果。",
  slogan: "以法为尺，以智赋能，让乡土创新被看见、被保护、被传承。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const navigation = [
  { href: "/research", label: "调研纪实", icon: MapPinned },
  { href: "/cases", label: "案例库", icon: BriefcaseBusiness },
  { href: "/classroom", label: "云课堂", icon: BookOpenText },
  { href: "/knowledge", label: "知识库", icon: Scale },
  { href: "/policies", label: "政策建议", icon: Scale },
  { href: "/team", label: "队员风采", icon: UsersRound },
];

export const homeStats = [
  { value: 5, suffix: "省区", label: "跨区域调研", note: "五地联动观察" },
  { value: 12, suffix: "处", label: "实践点位", note: "产业一线走访" },
  { value: 18, suffix: "个", label: "典型案例", note: "持续补充归档" },
  { value: 6, suffix: "份", label: "研究成果", note: "报告与建议" },
];
