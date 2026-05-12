<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle soumission de formulaire SNA</title>
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
        .submission-details {
            background-color: #f9f9f9;
            border-left: 4px solid #0066cc;
            padding: 16px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .detail-row {
            display: flex;
            margin-bottom: 12px;
            align-items: flex-start;
        }
        .detail-row:last-child {
            margin-bottom: 0;
        }
        .detail-label {
            font-weight: 600;
            color: #0066cc;
            min-width: 140px;
        }
        .detail-value {
            flex: 1;
            word-break: break-all;
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
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="{{ asset('favicon-96x96.png') }}" alt="SNA Logo" class="logo">
            <h1>Nouvelle soumission de formulaire</h1>
        </div>

        <div class="content">
            <h2>Détails de la soumission</h2>
            <p>Une nouvelle soumission de formulaire a été reçue sur le site du SNA.</p>

            <div class="submission-details">
                <div class="detail-row">
                    <span class="detail-label">Type :</span>
                    <span class="detail-value">{{ $formTypeLabel }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email :</span>
                    <span class="detail-value">{{ $submitterEmail }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date :</span>
                    <span class="detail-value">{{ $submissionDate }}</span>
                </div>
                @if (! empty($paymentInfo))
                    <div class="detail-row">
                        <span class="detail-label">Paiement :</span>
                        <span class="detail-value">{{ $paymentInfo['amountEuros'] }} {{ $paymentInfo['currency'] }} ({{ $paymentInfo['statusLabel'] }})</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Référence :</span>
                        <span class="detail-value">{{ $paymentInfo['merchantReference'] }}</span>
                    </div>
                    @if (! empty($paymentInfo['transactionId']))
                        <div class="detail-row">
                            <span class="detail-label">Transaction :</span>
                            <span class="detail-value">{{ $paymentInfo['transactionId'] }}</span>
                        </div>
                    @endif
                @endif
            </div>

            <p>
                <a href="{{ $adminUrl }}" class="cta-button">Voir la soumission</a>
            </p>

            <p class="text-muted">
                Ce lien vous permet d'accéder directement à la soumission dans l'espace d'administration SNA.
            </p>
        </div>

        <div class="footer">
            <p><strong>Syndicat National des Aidants (SNA)</strong></p>
            <p>{{ config('app.url') }}</p>
        </div>
    </div>
</body>
</html>
