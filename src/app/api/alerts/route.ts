import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Configuration SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

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

    // Envoi de l'email de confirmation avec SendGrid
    console.log('📧 Envoi email de confirmation SendGrid...');
    
    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Alerte créée - BestRatesAfrica</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f8f9fa; 
          }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
          }
          .header h1 { margin: 0; font-size: 28px; }
          .header p { margin: 10px 0 0; opacity: 0.9; }
          .content { padding: 30px; }
          .alert-box { 
            background: #d4edda; 
            border: 1px solid #c3e6cb; 
            border-left: 4px solid #28a745; 
            padding: 20px; 
            margin: 20px 0; 
            border-radius: 8px; 
          }
          .alert-box h2 { color: #155724; margin-top: 0; }
          .details { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
          }
          .details h3 { color: #495057; margin-top: 0; }
          .details ul { padding-left: 20px; }
          .details li { margin: 8px 0; }
          .button { 
            display: inline-block; 
            background: #007bff; 
            color: white; 
            padding: 15px 25px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 10px 5px;
            font-weight: bold;
          }
          .button:hover { background: #0056b3; }
          .footer { 
            text-align: center; 
            padding: 30px; 
            background: #f8f9fa; 
            color: #6c757d; 
            font-size: 14px; 
          }
          .footer a { color: #007bff; text-decoration: none; }
          .info-box {
            background: #e3f2fd;
            border: 1px solid #bbdefb;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .info-box h4 { color: #1976d2; margin-top: 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Alerte créée avec succès !</h1>
            <p>BestRatesAfrica - Votre comparateur de taux</p>
          </div>
          
          <div class="content">
            <div class="alert-box">
              <h2>✅ Votre alerte est maintenant active</h2>
              <p>Nous surveillons les taux en continu et vous préviendrons dès qu'une opportunité correspondant à vos critères sera disponible.</p>
            </div>
            
            <div class="details">
              <h3>📋 Détails de votre alerte :</h3>
              <ul>
                <li><strong>Corridor :</strong> ${from} → ${to}</li>
                <li><strong>Montant :</strong> ${amount} ${from}</li>
                <li><strong>Taux cible :</strong> ${targetRate} ${to} ou mieux</li>
                <li><strong>Service préféré :</strong> ${service || 'Tous les services'}</li>
                <li><strong>Email :</strong> ${email}</li>
                <li><strong>ID Alerte :</strong> ${alertId}</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://bestratesafrica.com/home" class="button">
                🏠 Retourner au site
              </a>
            </div>
            
            <div class="info-box">
              <h4>💡 Comment ça marche ?</h4>
              <ol>
                <li>Nous surveillons les taux de change en continu sur tous les services</li>
                <li>Dès qu'un taux atteint ou dépasse votre objectif, nous vous envoyons un email immédiatement</li>
                <li>Vous avez alors quelques heures pour profiter du taux avantageux</li>
                <li>L'alerte reste active jusqu'à ce que vous la désactiviez</li>
              </ol>
            </div>
            
            <div class="info-box">
              <h4>🎯 Prochaines étapes :</h4>
              <p>Gardez un œil sur votre boîte email ! Nous vous enverrons une notification dès qu'un taux exceptionnel sera disponible pour votre corridor <strong>${from} → ${to}</strong>.</p>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>BestRatesAfrica</strong> - Votre comparateur de taux de référence</p>
            <p>Cet email a été envoyé à <strong>${email}</strong></p>
            <p>
              <a href="mailto:support@bestratesafrica.com">Nous contacter</a> | 
              <a href="https://bestratesafrica.com">Visiter le site</a>
            </p>
            <p style="font-size: 12px; margin-top: 20px;">
              Pour vous désabonner de cette alerte, 
              <a href="mailto:support@bestratesafrica.com?subject=Désabonnement%20alerte%20${alertId}">cliquez ici</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Configuration de l'email
    const msg = {
      to: email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'noreply@bestratesafrica.com',
        name: 'BestRatesAfrica'
      },
      subject: `🔔 Alerte créée : ${from}→${to} à ${targetRate} ${to}`,
      html: confirmationEmailHtml,
    };

    try {
      // Envoi de l'email via SendGrid
      await sgMail.send(msg);
      console.log(`✅ Email SendGrid envoyé avec succès à ${email}`);
      
      // Email de notification interne (optionnel)
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        const adminMsg = {
          to: adminEmail,
          from: {
            email: process.env.SENDGRID_FROM_EMAIL || 'noreply@bestratesafrica.com',
            name: 'BestRatesAfrica Alerts'
          },
          subject: `📊 Nouvelle alerte créée : ${from}→${to}`,
          html: `
            <h2>Nouvelle alerte créée sur BestRatesAfrica</h2>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Corridor :</strong> ${from} → ${to}</p>
            <p><strong>Montant :</strong> ${amount} ${from}</p>
            <p><strong>Taux cible :</strong> ${targetRate} ${to}</p>
            <p><strong>Service préféré :</strong> ${service || 'Tous'}</p>
            <p><strong>ID Alerte :</strong> ${alertId}</p>
            <p><strong>Créée le :</strong> ${new Date().toLocaleString('fr-FR')}</p>
          `,
        };
        
        try {
          await sgMail.send(adminMsg);
          console.log('📧 Notification admin envoyée');
        } catch (adminError) {
          console.warn('⚠️ Erreur envoi notification admin:', adminError);
        }
      }

    } catch (emailError: any) {
      console.error('❌ Erreur SendGrid:', emailError);
      
      // Si l'email échoue, on retourne quand même un succès pour l'alerte
      // mais on informe de l'erreur email
      return NextResponse.json({
        success: true,
        message: "Alerte créée avec succès, mais erreur d'envoi d'email",
        data: {
          alertId,
          email,
          targetRate,
          service,
          from,
          to,
          amount,
          status: "active",
          confirmationSent: false,
          emailError: process.env.NODE_ENV === 'development' ? emailError.message : 'Erreur email'
        }
      });
    }

    console.log(`✅ Alerte créée et email SendGrid envoyé: ID ${alertId}`);

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
        provider: "SendGrid"
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