import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { homePageContent, aboutPageContent, navBarLinks } from "../config.ts";

export const GET: APIRoute = async () => {
  // Get all collections
  const projects = await getCollection("projects");
  const posts = await getCollection("posts");
  const pages = await getCollection("pages");

  // Get about content
  const aboutPage = pages.find((page) => page.slug === "about");
  const aboutContent = aboutPage ? aboutPage.body : "";

  // Build the response content
  let content = "";

  // Site information from config
  content += `# Matej Bačo - Portfolio Site\n\n`;
  content += `${homePageContent.seo.description}\n\n`;
  content += `URL: https://matejba.com\n`;

  // Navigation
  content += `## Navigation\n`;
  navBarLinks.forEach((link) => {
    content += `- ${link.title}: ${link.url}\n`;
  });
  content += `\n`;

  // About section
  content += `## About\n`;
  content += `${aboutContent}\n\n`;

  // Tech Stack
  content += `## Tech Stack\n`;
  homePageContent.techstack.forEach((category) => {
    content += `### ${category.name}\n`;
    category.items.forEach((item) => {
      content += `- ${item.name}\n`;
    });
    content += `\n`;
  });

  // Work Experience
  content += `## Work Experience\n`;
  aboutPageContent.work.items.forEach((job) => {
    content += `- ${job.title} at ${job.company.name} (${job.date})\n`;
    content += `  Website: ${job.company.url}\n`;
  });
  content += `\n`;

  // Connect Links
  content += `## Connect\n`;
  aboutPageContent.connect.links.forEach((link) => {
    content += `- ${link.title}: ${link.url}\n`;
  });
  content += `\n`;

  // Projects list
  content += `## Projects (${projects.length} total)\n`;
  projects.forEach((project) => {
    content += `- ${project.data.title}\n`;
    if (project.data.description) {
      content += `  Description: ${project.data.description}\n`;
    }
    content += `  URL: /projects/${project.slug}\n`;
    if (project.data.demo) {
      content += `  Demo: ${project.data.demo}\n`;
    }
    if (project.data.github) {
      content += `  GitHub: ${project.data.github}\n`;
    }
  });
  content += `\n`;

  // Blog posts list
  content += `## Blog Posts (${posts.length} total)\n`;
  posts
    .sort(
      (a, b) =>
        new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
    )
    .forEach((post) => {
      content += `- ${post.data.title} (${post.data.pubDate.toISOString().split("T")[0]})\n`;
      if (post.data.description) {
        content += `  Description: ${post.data.description}\n`;
      }
      content += `  URL: /blog/${post.slug}\n`;
    });
  content += `\n`;

  // Pages list
  content += `## Pages (${pages.length} total)\n`;
  pages.forEach((page) => {
    content += `- /${page.slug}\n`;
  });

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
