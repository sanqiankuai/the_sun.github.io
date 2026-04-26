import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			cardImage: z.string().optional(),
			heroImage: z.optional(image()),
		}),
});

const moments = defineCollection({
	loader: glob({ base: './src/content/moments', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string().optional(),
		date: z.coerce.date(),
		tags: z.array(z.string()).optional(),
		image: z.string().optional(),
	}),
});

export const collections = { blog, moments };
