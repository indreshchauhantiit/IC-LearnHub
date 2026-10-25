import { writeFile } from "node:fs/promises";
import { javaQuestions } from "../src/data/javaQuestions.js";

const siteUrl = (process.env.SITE_URL || "https://your-domain.com").replace(/\/+$/, "");
const staticPaths = ["/", "/courses", "/java-questions", "/mcq"];
const urls = [
  ...staticPaths.map((path) => ({ path, priority: path === "/" ? "1.0" : "0.8" })),
  ...javaQuestions.map((question) => ({
    path: `/java-questions/${question.id}`,
    priority: "0.7",
  })),
];

const xmlEscape = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(({ path, priority }) => `  <url>\n    <loc>${xmlEscape(siteUrl + path)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join("\n") +
  `\n</urlset>\n`;

await writeFile(new URL("../public/sitemap.xml", import.meta.url), xml, "utf8");
console.log(`Generated sitemap.xml with ${urls.length} URLs for ${siteUrl}`);
