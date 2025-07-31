
import { z } from 'zod';

export const socialSchema = z.object({
  name: z.string(),
  url: z.string(),
  icon: z.string(),
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  emoji: z.string(),
});

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  rating: z.number().min(0).max(5),
  image: z.string(),
  categoryId: z.string(),
  stallNumber: z.number(),
  'data-ai-hint': z.string().optional(),
});

export const stallSchema = z.object({
  stallNumber: z.number(),
  name: z.string(),
  description: z.string(),
  owner: z.string(),
});

export const melaDataSchema = z.object({
  logoUrl: z.string().optional(),
  eventName: z.string(),
  tagline: z.string(),
  eventDate: z.string(), // ISO string
  about: z.object({
      title: z.string(),
      content: z.string(),
  }),
  contact: z.object({
      email: z.string(),
      phone: z.string(),
      socials: z.array(socialSchema),
  }),
  categories: z.array(categorySchema),
  products: z.array(productSchema),
  stalls: z.array(stallSchema),
  footer: z.object({
    line1: z.string(),
    line2Prefix: z.string(),
    line2LinkText: z.string(),
  }),
});
