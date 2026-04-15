import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const projekte = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projekte" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    year: z.string(),
    location: z.string(),
    thumbnail: z.string(),
    images: z.array(z.string()).optional(),
    lang: z.enum(["de", "en"]),
    order: z.number().optional(),
  }),
});

export const collections = { projekte };
