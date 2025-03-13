import { SitemapStream, streamToPromise } from "sitemap";
import fs from "fs-extra";

const BASE_URL = "https://iitians4u.in"; // Change this to your actual website URL

async function generateSitemap() {
  const links = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/aspirant", changefreq: "weekly", priority: 0.8 },
    { url: "/college", changefreq: "weekly", priority: 0.8 },
    { url: "/career", changefreq: "weekly", priority: 0.9 },
    { url: "/login", changefreq: "weekly", priority: 0.9 },
    // Add more URLs dynamically if needed
  ];

  const sitemapStream = new SitemapStream({ hostname: BASE_URL });

  links.forEach((link) => sitemapStream.write(link));
  sitemapStream.end();

  const sitemap = await streamToPromise(sitemapStream).then((sm) => sm.toString());

  // Ensure the 'public' directory exists and write the file inside it
  fs.ensureDirSync("public");
  fs.writeFileSync("public/sitemap.xml", sitemap);

  console.log("✅ Sitemap generated successfully!");
}

generateSitemap();
