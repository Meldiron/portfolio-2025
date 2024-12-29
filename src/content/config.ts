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
