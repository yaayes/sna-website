<?php

namespace App\Services;

use OnlinePayments\Sdk\Authentication\V1HmacAuthenticator;
use OnlinePayments\Sdk\Client;
use OnlinePayments\Sdk\Communicator;
use OnlinePayments\Sdk\CommunicatorConfiguration;
use OnlinePayments\Sdk\Domain\AmountOfMoney;
use OnlinePayments\Sdk\Domain\CreateHostedCheckoutRequest;
use OnlinePayments\Sdk\Domain\Feedbacks;
use OnlinePayments\Sdk\Domain\HostedCheckoutSpecificInput;
use OnlinePayments\Sdk\Domain\Order;
use OnlinePayments\Sdk\Domain\OrderReferences;
use OnlinePayments\Sdk\Webhooks\InMemorySecretKeyStore;
use OnlinePayments\Sdk\Webhooks\WebhooksHelper;

class CawlPaymentService
{
    private Client $client;

    private string $merchantId;

    public function __construct()
    {
        $this->merchantId = config('cawl.merchant_id');
        $apiEndpoint = config('cawl.endpoints.'.config('cawl.env'));

        $config = new CommunicatorConfiguration(
            config('cawl.api_key'),
            config('cawl.api_secret'),
            $apiEndpoint,
            'SNA-Website',
        );

        $authenticator = new V1HmacAuthenticator($config);
        $communicator = new Communicator($config, $authenticator);
        $this->client = new Client($communicator);
    }

    /**
     * Create a hosted checkout session and return the redirect URL.
     */
    public function createHostedCheckout(
        int $amountCents,
        string $merchantReference,
        string $returnUrl,
        string $webhookUrl,
    ): array {
        $amountOfMoney = new AmountOfMoney;
        $amountOfMoney->setAmount($amountCents);
        $amountOfMoney->setCurrencyCode('EUR');

        $references = new OrderReferences;
        $references->setMerchantReference($merchantReference);

        $order = new Order;
        $order->setAmountOfMoney($amountOfMoney);
        $order->setReferences($references);

        $hostedInput = new HostedCheckoutSpecificInput;
        $hostedInput->setReturnUrl($returnUrl);
        $hostedInput->setLocale('fr_FR');

        $feedbacks = new Feedbacks;
        $feedbacks->setWebhooksUrls([$webhookUrl]);

        $requestBody = new CreateHostedCheckoutRequest;
        $requestBody->setOrder($order);
        $requestBody->setHostedCheckoutSpecificInput($hostedInput);
        $requestBody->setFeedbacks($feedbacks);

        $response = $this->client
            ->merchant($this->merchantId)
            ->hostedCheckout()
            ->createHostedCheckout($requestBody);

        return [
            'hosted_checkout_id' => $response->getHostedCheckoutId(),
            'redirect_url' => $response->getRedirectUrl(),
            'returnmac' => $response->getRETURNMAC(),
        ];
    }

    /**
     * Get the current status of a hosted checkout session.
     */
    public function getHostedCheckoutStatus(string $hostedCheckoutId): array
    {
        $response = $this->client
            ->merchant($this->merchantId)
            ->hostedCheckout()
            ->getHostedCheckout($hostedCheckoutId);

        $status = $response->getStatus();
        $payment = $response->getCreatedPaymentOutput()?->getPayment();

        return [
            'status' => $status,
            'status_code' => $payment?->getStatusOutput()?->getStatusCode(),
            'cawl_payment_id' => $payment?->getId(),
            'raw' => json_decode(json_encode($response), true),
        ];
    }

    /**
     * Unmarshal and validate an incoming webhook event.
     */
    public function unmarshalWebhook(string $body, array $headers): mixed
    {
        $secretKeyStore = new InMemorySecretKeyStore([
            config('cawl.webhook_key') => config('cawl.webhook_secret'),
        ]);

        $helper = new WebhooksHelper($secretKeyStore);

        return $helper->unmarshal($body, $headers);
    }
}
