import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

// Hoax detection logic ported from Python
function detectHoax(text: string): { label: "HOAKS" | "VALID"; confidence: number; isHoax: boolean } {
  const hoaxKeywords = [
    'kanker sembuh', 'bawang', 'jahe obati', 'mandul permanen', 
    'obat ajaib', 'tsunami jakarta', 'gempa jakarta', 'lockdown besok',
    'hapus subsidi', 'tidak berlaku', 'visa umroh tidak', 
    'turun salju', 'lantik presiden', 'thr cair', 'gaji naik 10x'
  ];
  
  const validKeywords = ['bmkg', 'kemenkes', 'kominfo', 'turnbackhoax', 'resmi'];
  
  const textLower = text.toLowerCase();
  
  // Count matches
  let hoaxScore = 0;
  for (const keyword of hoaxKeywords) {
    if (textLower.includes(keyword)) {
      hoaxScore++;
    }
  }
  
  let validScore = 0;
  for (const keyword of validKeywords) {
    // Basic counting similar to count() in Python
    const matches = textLower.split(keyword).length - 1;
    if (matches > 0) {
      validScore++;
    }
  }
  
  // Formula: prob_hoax = (skor_hoax * 0.4) + 0.2 - (skor_valid * 0.15)
  let probHoax = (hoaxScore * 0.4) + 0.2 - (validScore * 0.15);
  
  // Clamp between 0.05 and 0.98
  probHoax = Math.min(0.98, Math.max(0.05, probHoax));
  
  // Threshold 0.42
  const isHoax = probHoax > 0.42;
  const label = isHoax ? "HOAKS" : "VALID";
  const confidence = Number((probHoax * 100).toFixed(1));
  
  return { label, confidence, isHoax };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.analysis.analyze.path, async (req, res) => {
    try {
      const input = api.analysis.analyze.input.parse(req.body);
      
      const { label, confidence, isHoax } = detectHoax(input.text);
      
      // Store result
      await storage.createAnalysis({
        text: input.text,
        result: label,
        confidence: confidence
      });
      
      res.json({
        result: label,
        confidence,
        originalText: input.text,
        isHoax
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.analysis.history.path, async (req, res) => {
    const history = await storage.getAnalyses();
    res.json(history);
  });

  app.delete(api.analysis.clear.path, async (req, res) => {
    await storage.clearHistory();
    res.status(204).send();
  });

  // Seed some initial data if empty
  const existing = await storage.getAnalyses();
  if (existing.length === 0) {
    await storage.createAnalysis({
      text: "visa umroh sudah tidak berlaku",
      result: "HOAKS",
      confidence: 72.5
    });
    await storage.createAnalysis({
      text: "bmkg cuaca cerah jakarta besok",
      result: "VALID",
      confidence: 88.2
    });
  }

  return httpServer;
}
