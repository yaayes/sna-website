<?php

namespace App\Notifications;

use App\Models\FormSubmission;
use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FormSubmissionConfirmationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public FormSubmission $submission,
        public string $accessToken,
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $url = route('forms.access.show', ['token' => $this->accessToken]);

        $name = $this->submission->getSubmitterName();
        $isAdhesion = $this->submission->isAdhesion();
        $subject = $name
            ? 'Merci '.$name.' - Accusé de réception SNA'
            : 'Accusé de réception - Votre '.($isAdhesion ? 'adhésion' : 'soumission').' SNA';

        return (new MailMessage)
            ->subject($subject)
            ->view('emails.form-submission-confirmation', [
                'accessUrl' => $url,
                'submitterName' => $name,
                'paymentInfo' => $this->getPaymentInfo(),
                'submissionNoun' => $isAdhesion ? 'adhésion' : 'soumission',
                'submissionNounPlural' => $isAdhesion ? 'adhésions' : 'soumissions',
            ]);
    }

    /**
     * @return array<string, mixed>|null
     */
    private function getPaymentInfo(): ?array
    {
        $payment = $this->submission->payments()->latest('id')->first();

        if (! $payment instanceof Payment) {
            return null;
        }

        return [
            'amountEuros' => $payment->amountEuros(),
            'currency' => $payment->currency,
            'merchantReference' => $payment->merchant_reference,
        ];
    }

    public function toArray(object $notifiable): array
    {
        return [];
    }
}
