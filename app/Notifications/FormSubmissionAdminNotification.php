<?php

namespace App\Notifications;

use App\Models\FormSubmission;
use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FormSubmissionAdminNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public FormSubmission $submission) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $url = url('/').'/@/'.$this->getAdminPath();

        return (new MailMessage)
            ->subject('Nouvelle soumission de formulaire SNA')
            ->view('emails.form-submission-admin', [
                'formTypeLabel' => $this->getFormTypeLabel($this->submission->type),
                'submitterEmail' => $this->submission->email,
                'submissionDate' => $this->submission->created_at->format('d/m/Y à H:i'),
                'paymentInfo' => $this->getPaymentInfo(),
                'adminUrl' => $url,
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
            'statusLabel' => $this->getPaymentStatusLabel($payment->status),
            'transactionId' => $payment->cawl_payment_id,
        ];
    }

    private function getPaymentStatusLabel(string $status): string
    {
        return match ($status) {
            'captured' => 'Payé',
            'authorized' => 'Autorisé',
            'pending' => 'En attente',
            'rejected' => 'Refusé',
            'cancelled' => 'Annulé',
            default => ucfirst($status),
        };
    }

    private function getAdminPath(): string
    {
        $type = $this->submission->type;
        $id = $this->submission->formable_id;

        return match ($type) {
            'contact' => 'contact/'.$id,
            'adhesion' => 'adhesion/'.$id,
            'soutien' => 'soutien/'.$id,
            'partenaire' => 'partenaire/'.$id,
            'moi_aussi' => 'moi-aussi/'.$id,
            'rejoindre_sna' => 'rejoindre-sna/'.$id,
            default => 'dashboard',
        };
    }

    private function getFormTypeLabel(string $type): string
    {
        return match ($type) {
            'contact' => 'Contact',
            'adhesion' => 'Adhésion',
            'soutien' => 'Soutien',
            'partenaire' => 'Partenaire',
            'moi_aussi' => 'Moi aussi',
            'rejoindre_sna' => 'Rejoindre le SNA',
            default => $type,
        };
    }

    public function toArray(object $notifiable): array
    {
        return [];
    }
}
