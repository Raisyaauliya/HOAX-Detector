import { pgTable, text, serial, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  result: text("result").notNull(), // "HOAKS" or "VALID"
  confidence: real("confidence").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAnalysisSchema = createInsertSchema(analyses).omit({ 
  id: true, 
  createdAt: true 
});

export type Analysis = typeof analyses.$inferSelect;
export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;

// Request type for the analysis endpoint
export const analyzeRequestSchema = z.object({
  text: z.string().min(1, "Text is required"),
});

export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>;

export interface AnalyzeResponse {
  result: "HOAKS" | "VALID";
  confidence: number;
  originalText: string;
  isHoax: boolean;
}
