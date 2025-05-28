// lib/utils.ts
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Types pour les scrapers
export interface ScrapingResult {
  service: string;
  exchangeRate: number;
  amountReceived: number;
  fees: number;
  transferTime: string;
  success: boolean;
  error?: string;
  timestamp: string;
}

// Configuration anti-détection
export const SCRAPING_CONFIG = {
  // User agents rotatifs
  userAgents: [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15'
  ],

  // Headers communs
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Cache-Control': 'max-age=0'
  },

  // Délais entre requêtes (ms)
  delays: {
    min: 2000,
    max: 5000
  },

  // Timeout pour les requêtes
  timeout: 15000
};

// Classe utilitaire pour le scraping
export class ScrapingUtils {
  
  // Générer un User-Agent aléatoire
  static getRandomUserAgent(): string {
    const agents = SCRAPING_CONFIG.userAgents;
    return agents[Math.floor(Math.random() * agents.length)];
  }

  // Attendre un délai aléatoire
  static async randomDelay(): Promise<void> {
    const delay = Math.random() * 
      (SCRAPING_CONFIG.delays.max - SCRAPING_CONFIG.delays.min) + 
      SCRAPING_CONFIG.delays.min;
    
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  // Générer des headers avec User-Agent aléatoire
  static getRandomHeaders(): Record<string, string> {
    return {
      ...SCRAPING_CONFIG.headers,
      'User-Agent': this.getRandomUserAgent()
    };
  }

  // Faire une requête HTTP sécurisée
  static async safeFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SCRAPING_CONFIG.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getRandomHeaders(),
          ...options.headers
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Parser un montant depuis du texte
  static parseAmount(text: string): number {
    // Enlever tous les caractères non-numériques sauf points et virgules
    const cleaned = text.replace(/[^\d.,]/g, '');
    
    // Gérer les formats européens (virgule = décimale)
    if (cleaned.includes(',') && !cleaned.includes('.')) {
      return parseFloat(cleaned.replace(',', '.'));
    }
    
    // Gérer les formats avec virgules comme séparateurs de milliers
    if (cleaned.includes(',') && cleaned.includes('.')) {
      return parseFloat(cleaned.replace(/,/g, ''));
    }
    
    return parseFloat(cleaned) || 0;
  }

  // Nettoyer une chaîne de caractères
  static cleanText(text: string): string {
    return text
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ');
  }

  // Valider un taux de change
  static isValidRate(rate: number, currency: string): boolean {
    const ranges: Record<string, { min: number; max: number }> = {
      'XOF': { min: 500, max: 700 },  // CFA Franc
      'NGN': { min: 700, max: 1200 }, // Nigerian Naira
      'GHS': { min: 8, max: 15 },     // Ghanaian Cedi
      'KES': { min: 140, max: 180 },  // Kenyan Shilling
      'GMD': { min: 60, max: 80 },    // Gambian Dalasi
      'SLL': { min: 15000, max: 25000 }, // Sierra Leonean Leone
      'LRD': { min: 150, max: 200 },  // Liberian Dollar
      'CVE': { min: 95, max: 115 },   // Cape Verdean Escudo
      'GNF': { min: 8000, max: 12000 }, // Guinean Franc
      'MRU': { min: 35, max: 45 }     // Mauritanian Ouguiya
    };

    const range = ranges[currency];
    if (!range) return rate > 0; // Si pas de range défini, juste vérifier que c'est positif
    
    return rate >= range.min && rate <= range.max;
  }

  // Logger les erreurs de scraping
  static logScrapingError(service: string, error: any, context?: any): void {
    console.error(`[${service} Scraper] Error:`, {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    });
  }

  // Créer un résultat d'erreur standardisé
  static createErrorResult(service: string, error: string): ScrapingResult {
    return {
      service,
      exchangeRate: 0,
      amountReceived: 0,
      fees: 0,
      transferTime: 'N/A',
      success: false,
      error,
      timestamp: new Date().toISOString()
    };
  }

  // Créer un résultat de succès standardisé
  static createSuccessResult(
    service: string,
    exchangeRate: number,
    amountReceived: number,
    fees: number,
    transferTime: string
  ): ScrapingResult {
    return {
      service,
      exchangeRate,
      amountReceived,
      fees,
      transferTime,
      success: true,
      timestamp: new Date().toISOString()
    };
  }
}

// Cache simple en mémoire pour éviter les requêtes répétées
class SimpleCache {
  private cache = new Map<string, { data: any; expires: number }>();

  set(key: string, data: any, ttlMs: number = 300000): void { // 5 minutes par défaut
    this.cache.set(key, {
      data,
      expires: Date.now() + ttlMs
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const scraperCache = new SimpleCache();