import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  homePageContent,
  aboutPageContent,
  projectsPageContent,
  blogPageContent,
  navBarLinks,
} from "../config.ts";

export const GET: APIRoute = async () => {
  // Get all collections
  const projects = await getCollection("projects");
  const posts = await getCollection("posts");
  const pages = await getCollection("pages");

  // Build the response content
  let content = "";

  // Site information from config
  content += `# Matej Bačo - Portfolio Site (Full Content)\n\n`;
  content += `${homePageContent.seo.description}\n\n`;
  content += `URL: https://matejba.com\n`;

  // Navigation
  content += `## Navigation\n`;
  navBarLinks.forEach((link) => {
    content += `- ${link.title}: ${link.url}\n`;
  });
  content += `\n`;

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

  // All Pages with full content
  content += `## Pages\n\n`;
  for (const page of pages) {
    content += `### Page: ${page.slug}\n`;
    content += `${page.body}\n\n`;
    content += `---\n\n`;
  }

  // All Projects with full content
  content += `## Projects\n\n`;
  for (const project of projects) {
    content += `### Project: ${project.data.title}\n`;
    if (project.data.description) {
      content += `Description: ${project.data.description}\n`;
    }
    if (project.data.demo) {
      content += `Demo: ${project.data.demo}\n`;
    }
    if (project.data.github) {
      content += `GitHub: ${project.data.github}\n`;
    }
    if (project.data.pubDate) {
      content += `Published: ${project.data.pubDate.toISOString().split("T")[0]}\n`;
    }

    content += `\n${project.body}\n\n`;
    content += `---\n\n`;
  }

  // All Blog Posts with full content
  content += `## Blog Posts\n\n`;
  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );

  for (const post of sortedPosts) {
    content += `### Blog Post: ${post.data.title}\n`;
    content += `Published: ${post.data.pubDate.toISOString().split("T")[0]}\n`;
    if (post.data.description) {
      content += `Description: ${post.data.description}\n`;
    }

    if (post.data.readingTime) {
      content += `Reading Time: ${post.data.readingTime} minutes\n`;
    }
    content += `\n${post.body}\n\n`;
    content += `---\n\n`;
  }

  // SEO information
  content += `## SEO Information\n`;
  content += `### Home Page\n`;
  content += `Title: ${homePageContent.seo.title}\n`;
  content += `Description: ${homePageContent.seo.description}\n`;
  content += `Image: ${homePageContent.seo.image}\n\n`;

  content += `### About Page\n`;
  content += `Title: ${aboutPageContent.seo.title}\n`;
  content += `Description: ${aboutPageContent.seo.description}\n`;
  content += `Image: ${aboutPageContent.seo.image}\n\n`;

  content += `### Projects Page\n`;
  content += `Title: ${projectsPageContent.seo.title}\n`;
  content += `Description: ${projectsPageContent.seo.description}\n`;
  content += `Image: ${projectsPageContent.seo.image}\n\n`;

  content += `### Blog Page\n`;
  content += `Title: ${blogPageContent.seo.title}\n`;
  content += `Description: ${blogPageContent.seo.description}\n`;
  content += `Image: ${blogPageContent.seo.image}\n\n`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
