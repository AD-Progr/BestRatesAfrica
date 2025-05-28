import { createClient } from '@supabase/supabase-js'

// Types pour la base de données
export interface Database {
  public: {
    Tables: {
      exchange_rates: {
        Row: {
          id: string;
          service: string;
          from_currency: string;
          to_currency: string;
          exchange_rate: number;
          fees: number;
          amount_received: number;
          duration: string;
          trust_level: string;
          timestamp: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          service: string;
          from_currency: string;
          to_currency: string;
          exchange_rate: number;
          fees: number;
          amount_received: number;
          duration: string;
          trust_level: string;
          timestamp?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          service?: string;
          from_currency?: string;
          to_currency?: string;
          exchange_rate?: number;
          fees?: number;
          amount_received?: number;
          duration?: string;
          trust_level?: string;
          timestamp?: string;
          created_at?: string;
        };
      };
      user_alerts: {
        Row: {
          id: string;
          email: string;
          target_rate: number;
          service: string | null;
          from_currency: string;
          to_currency: string;
          amount: number;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          target_rate: number;
          service?: string | null;
          from_currency: string;
          to_currency: string;
          amount: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          target_rate?: number;
          service?: string | null;
          from_currency?: string;
          to_currency?: string;
          amount?: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// URL et clé Supabase (à définir dans .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

// Client Supabase typé
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// Fonctions helper pour les opérations courantes
export async function saveExchangeRate(rateData: Database['public']['Tables']['exchange_rates']['Insert']) {
  try {
    const { data, error } = await supabase
      .from('exchange_rates')
      .insert([rateData])
      .select()

    if (error) {
      console.error('Erreur sauvegarde taux:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return { success: false, error }
  }
}

export async function saveUserAlert(alertData: Database['public']['Tables']['user_alerts']['Insert']) {
  try {
    const { data, error } = await supabase
      .from('user_alerts')
      .insert([alertData])
      .select()

    if (error) {
      console.error('Erreur sauvegarde alerte:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return { success: false, error }
  }
}

export async function getRecentRates(fromCurrency: string, toCurrency: string, limit: number = 10) {
  try {
    const { data, error } = await supabase
      .from('exchange_rates')
      .select('*')
      .eq('from_currency', fromCurrency)
      .eq('to_currency', toCurrency)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Erreur récupération taux:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return { success: false, error }
  }
}

export async function getUserAlerts(email: string) {
  try {
    const { data, error } = await supabase
      .from('user_alerts')
      .select('*')
      .eq('email', email)
      .eq('active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur récupération alertes:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return { success: false, error }
  }
}