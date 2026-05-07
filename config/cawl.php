<?php

return [
    'api_key' => env('CAWL_API_KEY', ''),
    'api_secret' => env('CAWL_API_SECRET', ''),
    'merchant_id' => env('CAWL_MERCHANT_ID', ''),
    'env' => env('CAWL_ENV', 'test'),
    'membership_fee_cents' => (int) env('CAWL_MEMBERSHIP_FEE_CENTS', 0),
    'webhook_key' => env('CAWL_WEBHOOK_KEY', ''),
    'webhook_secret' => env('CAWL_WEBHOOK_SECRET', ''),

    'endpoints' => [
        'test' => 'https://payment.preprod.cawl-solutions.fr/',
        'production' => 'https://payment.cawl-solutions.fr/',
    ],
];
