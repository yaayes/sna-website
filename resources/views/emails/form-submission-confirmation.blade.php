<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accusé de réception - Soumission SNA</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);
            color: #ffffff;
            padding: 24px;
            text-align: center;
        }
        .logo {
            max-height: 60px;
            margin-bottom: 16px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 32px;
        }
        .content h2 {
            color: #0066cc;
            font-size: 18px;
            margin-top: 0;
            margin-bottom: 16px;
        }
        .success-box {
            background-color: #e8f5e9;
            border-left: 4px solid #4caf50;
            padding: 16px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .success-box strong {
            color: #2e7d32;
        }
        .info-section {
            background-color: #f9f9f9;
            padding: 16px;
            margin: 20px 0;
            border-radius: 4px;
            border-left: 4px solid #0066cc;
        }
        .cta-button {
            display: inline-block;
            background-color: #0066cc;
            color: #ffffff;
            padding: 12px 32px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 600;
            margin: 24px 0;
            transition: background-color 0.2s;
        }
        .cta-button:hover {
            background-color: #0052a3;
        }
        .footer {
            background-color: #f5f5f5;
            padding: 24px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #e0e0e0;
        }
        .footer p {
            margin: 0 0 8px 0;
        }
        .footer p:last-child {
            margin-bottom: 0;
        }
        .text-muted {
            color: #666;
            font-size: 14px;
        }
        .highlight {
            background-color: #fff3cd;
            padding: 2px 4px;
            border-radius: 2px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="{{ asset('favicon-96x96.png') }}" alt="SNA Logo" class="logo">
            <h1>Accusé de réception</h1>
        </div>

        <div class="content">
            <h2>{{ isset($submitterName) && $submitterName ? 'Merci '.$submitterName.' !' : 'Votre soumission a bien été enregistrée' }}</h2>

            <div class="success-box">
                <strong>✓ {{ isset($submitterName) && $submitterName ? 'Merci '.$submitterName.' pour votre soumission !' : 'Merci pour votre soumission !' }}</strong>
                <p style="margin: 8px 0 0 0; font-size: 14px;">
                    Votre formulaire a bien été reçu et enregistré sur le site du SNA.
                </p>
            </div>

            <p>
                Nous avons sauvegardé votre soumission et vous pouvez y accéder à tout moment en utilisant le lien ci-dessous.
            </p>

            <div class="info-section">
                <p style="margin-top: 0;">
                    <strong>👉 Accédez à votre soumission :</strong>
                </p>
                <p>
                    <a href="{{ $accessUrl }}" class="cta-button">Voir mes formulaires</a>
                </p>
                <p class="text-muted">
                    Ce lien expire dans <span class="highlight">1 heure</span>.
                    <br>
                    Si vous avez plusieurs soumissions, vous les retrouverez toutes une fois connecté.
                </p>
            </div>

            @if (! empty($paymentInfo))
                <div class="info-section">
                    <p style="margin-top: 0;">
                        <strong>💳 Informations de paiement :</strong>
                    </p>
                    <p style="margin: 0;">
                        Montant : <strong>{{ $paymentInfo['amountEuros'] }} {{ $paymentInfo['currency'] }}</strong>
                        <br>
                        Référence : <strong>{{ $paymentInfo['merchantReference'] }}</strong>
                    </p>
                </div>
            @endif

            <p>
                <strong>Questions ou problème ?</strong>
                <br>
                Si vous avez besoin d'aide ou si vous n'avez pas effectué cette soumission, vous pouvez
                <a href="{{ route('forms.access.request') }}" style="color: #0066cc; text-decoration: none;">demander un nouveau lien d'accès</a>
                ou nous contacter via le formulaire de contact du site.
            </p>
        </div>

        <div class="footer">
            <p><strong>Syndicat National des Aidants (SNA)</strong></p>
            <p>{{ config('app.url') }}</p>
            <p style="margin-top: 16px; color: #999; font-size: 11px;">
                Si vous avez reçu cet email par erreur, vous pouvez l'ignorer en toute sécurité.
            </p>
        </div>
    </div>
</body>
</html>
