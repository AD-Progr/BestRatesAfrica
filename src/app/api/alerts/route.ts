import { NextRequest, NextResponse } from 'next/server';

// Types pour les alertes
interface AlertRequest {
  email: string;
  targetRate: number;
  service?: string;
  from: string;
  to: string;
  amount: number;
}

// Base de données simulée en mémoire (en prod: Supabase)
let alertsDatabase: Array<{
  id: string;
  email: string;
  targetRate: number;
  service?: string;
  from: string;
  to: string;
  amount: number;
  createdAt: string;
  active: boolean;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body: AlertRequest = await request.json();
    const { email, targetRate, service, from, to, amount } = body;

    console.log(`📧 Nouvelle alerte: ${email} pour ${targetRate} ${to}`);

    // Validation des données
    if (!email || !targetRate || !from || !to || !amount) {
      return NextResponse.json({
        success: false,
        message: "Données manquantes pour créer l'alerte"
      }, { status: 400 });
    }

    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: "Format d'email invalide"
      }, { status: 400 });
    }

    // Création de l'alerte
    const alertId = `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newAlert = {
      id: alertId,
      email,
      targetRate,
      service,
      from,
      to, 
      amount,
      createdAt: new Date().toISOString(),
      active: true
    };

    // Ajout à la base de données
    alertsDatabase.push(newAlert);

    // Simulation d'envoi d'email (logs pour le développement)
    console.log('📧 SIMULATION EMAIL DE CONFIRMATION:');
    console.log('   Destinataire:', email);
    console.log('   Sujet: 🔔 Alerte BestRates Africa créée avec succès');
    console.log('   Contenu: Alerte pour', amount, from, '→', to, 'à', targetRate, to);
    console.log('   ID Alerte:', alertId);
    console.log('   Statut: Email simulé envoyé avec succès');

    // Simulation d'un petit délai pour l'envoi d'email
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log(`✅ Alerte créée et email simulé envoyé: ID ${alertId}`);

    return NextResponse.json({
      success: true,
      message: "Alerte créée avec succès ! Email de confirmation envoyé.",
      data: {
        alertId,
        email,
        targetRate,
        service,
        from,
        to,
        amount,
        status: "active",
        confirmationSent: true,
        note: "Email de confirmation simulé (dev mode)"
      }
    });

  } catch (error: any) {
    console.error('❌ Erreur création alerte:', error.message);
    
    return NextResponse.json({
      success: false,
      message: "Erreur lors de la création de l'alerte",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne'
    }, { status: 500 });
  }
}

// API pour récupérer les alertes actives
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (email) {
      // Alertes pour un email spécifique
      const userAlerts = alertsDatabase.filter(alert => 
        alert.email === email && alert.active
      );
      
      return NextResponse.json({
        success: true,
        data: {
          alerts: userAlerts,
          count: userAlerts.length
        }
      });
    }

    // Toutes les alertes actives (admin)
    const activeAlerts = alertsDatabase.filter(alert => alert.active);
    
    return NextResponse.json({
      success: true,
      data: {
        alerts: activeAlerts,
        count: activeAlerts.length,
        totalAlerts: alertsDatabase.length
      }
    });

  } catch (error: any) {
    console.error('❌ Erreur récupération alertes:', error.message);
    
    return NextResponse.json({
      success: false,
      message: "Erreur lors de la récupération des alertes"
    }, { status: 500 });
  }
}