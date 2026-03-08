// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    external: z.string().optional(),
    highlight: z.boolean().optional(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    readingTime: z.number().optional(),
  }),
});

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    github: z.string(),
    demo: z.string().optional(),
    pubDate: z.date(),
    description: z.string(),
    cover: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    pageLayout: z.enum(["article", "showcase"]).default("article"),
    labels: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().optional(),
        })
      )
      .optional(),
    screenshots: z
      .array(
        z.object({
          url: z.string(),
          caption: z.string().optional(),
        })
      )
      .optional(),
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
  pages: defineCollection({
    type: "content",
    schema: z.object({}),
  }),
};
