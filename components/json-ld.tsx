import { siteConfig } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "zh-CN",
    publisher: {
      "@type": "Organization",
      name: "法智生境社会实践团队",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
