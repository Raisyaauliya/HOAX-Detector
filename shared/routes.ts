import { z } from 'zod';
import { analyses, analyzeRequestSchema, insertAnalysisSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  analysis: {
    analyze: {
      method: 'POST' as const,
      path: '/api/analyze' as const,
      input: analyzeRequestSchema,
      responses: {
        200: z.object({
          result: z.enum(["HOAKS", "VALID"]),
          confidence: z.number(),
          originalText: z.string(),
          isHoax: z.boolean(),
        }),
        400: errorSchemas.validation,
      },
    },
    history: {
      method: 'GET' as const,
      path: '/api/history' as const,
      responses: {
        200: z.array(z.custom<typeof analyses.$inferSelect>()),
      },
    },
    clear: {
      method: 'DELETE' as const,
      path: '/api/history' as const,
      responses: {
        204: z.void(),
      },
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
