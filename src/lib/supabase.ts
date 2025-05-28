// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client public (côté client)
export const supabase = createClient(supabaseUrl, supabaseKey);

// Client admin (côté serveur uniquement)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Types pour les taux de change
export interface ExchangeRateRecord {
  id?: string;
  service_id: string;
  corridor_id: string;
  amount_sent: number;
  amount_received: number;
  exchange_rate: number;
  fees_total: number;
  fees_breakdown?: any;
  transfer_time_min?: number;
  transfer_time_max?: number;
  scraped_at: string;
  is_valid: boolean;
}

// Types pour les services
export interface TransferService {
  id: string;
  name: string;
  slug: string;
  website_url: string;
  affiliate_url?: string;
  logo_url?: string;
  is_active: boolean;
}

// Types pour les corridors
export interface TransferCorridor {
  id: string;
  from_currency: string;
  to_currency: string;
  from_country?: string;
  to_country?: string;
  is_popular: boolean;
  is_active: boolean;
}

// Fonctions utilitaires pour la base de données
export class DatabaseService {
  
  // Récupérer les derniers taux pour un corridor
  static async getLatestRates(fromCurrency: string, toCurrency: string, amount: number = 1000) {
    try {
      const { data: corridor } = await supabase
        .from('transfer_corridors')
        .select('id')
        .eq('from_currency', fromCurrency)
        .eq('to_currency', toCurrency)
        .eq('is_active', true)
        .single();

      if (!corridor) {
        throw new Error(`Corridor ${fromCurrency}-${toCurrency} not found`);
      }

      const { data: rates, error } = await supabase
        .from('best_rates_view')
        .select('*')
        .eq('from_currency', fromCurrency)
        .eq('to_currency', toCurrency)
        .eq('amount_sent', amount)
        .eq('rate_rank', 1)
        .order('amount_received', { ascending: false })
        .limit(10);

      if (error) throw error;
      return rates || [];
    } catch (error) {
      console.error('Error fetching rates:', error);
      return [];
    }
  }

  // Sauvegarder de nouveaux taux
  static async saveRates(rates: ExchangeRateRecord[]) {
    try {
      const { data, error } = await supabaseAdmin
        .from('exchange_rates')
        .insert(rates)
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving rates:', error);
      throw error;
    }
  }

  // Récupérer les services actifs
  static async getActiveServices() {
    try {
      const { data, error } = await supabase
        .from('transfer_services')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  }

  // Récupérer les corridors populaires
  static async getPopularCorridors() {
    try {
      const { data, error } = await supabase
        .from('transfer_corridors')
        .select(`
          *,
          from_currency_info:currencies!transfer_corridors_from_currency_fkey(code, name, symbol),
          to_currency_info:currencies!transfer_corridors_to_currency_fkey(code, name, symbol)
        `)
        .eq('is_popular', true)
        .eq('is_active', true)
        .order('from_currency');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching corridors:', error);
      return [];
    }
  }

  // Créer une alerte utilisateur
  static async createAlert(email: string, corridorId: string, targetRate: number, amountToSend: number) {
    try {
      // Hash de l'email pour GDPR
      const emailHash = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(email)
      );
      const hashedEmail = Array.from(new Uint8Array(emailHash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      const { data, error } = await supabaseAdmin
        .from('rate_alerts')
        .insert({
          email,
          email_hash: hashedEmail,
          corridor_id: corridorId,
          target_rate: targetRate,
          amount_to_send: amountToSend,
          condition: 'above',
          is_active: true,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 jours
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating alert:', error);
      throw error;
    }
  }
}

export default supabase;