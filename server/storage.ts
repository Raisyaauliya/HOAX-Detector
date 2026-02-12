import { db } from "./db";
import { analyses, type InsertAnalysis, type Analysis } from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
  getAnalyses(): Promise<Analysis[]>;
  clearHistory(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createAnalysis(analysis: InsertAnalysis): Promise<Analysis> {
    const [newItem] = await db
      .insert(analyses)
      .values(analysis)
      .returning();
    return newItem;
  }

  async getAnalyses(): Promise<Analysis[]> {
    return await db
      .select()
      .from(analyses)
      .orderBy(desc(analyses.createdAt))
      .limit(50);
  }

  async clearHistory(): Promise<void> {
    await db.delete(analyses);
  }
}

export const storage = new DatabaseStorage();
