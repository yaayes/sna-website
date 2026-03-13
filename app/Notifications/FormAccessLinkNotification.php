<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FormAccessLinkNotification extends Notification
{
    use Queueable;

    public function __construct(public string $token) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $url = route('forms.access.show', ['token' => $this->token]);

        return (new MailMessage)
            ->subject('Accédez à vos formulaires SNA')
            ->greeting('Bonjour,')
            ->line('Vous avez demandé un lien pour accéder à vos formulaires soumis sur le site du SNA.')
            ->line('Ce lien est valable **1 heure** et ne peut être utilisé qu\'une seule fois.')
            ->action('Accéder à mes formulaires', $url)
            ->line('Si vous n\'avez pas fait cette demande, ignorez simplement cet email.')
            ->salutation('Cordialement, l\'équipe SNA');
    }

    public function toArray(object $notifiable): array
    {
        return [];
    }
}
