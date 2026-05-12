<?php

namespace App\Actions;

use App\Models\FormAccessToken;
use App\Models\FormSubmission;
use App\Models\User;
use App\Notifications\FormSubmissionAdminNotification;
use App\Notifications\FormSubmissionConfirmationNotification;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Support\Str;

class NotifyOnFormSubmissionCreated
{
    public function __invoke(FormSubmission $submission): void
    {
        $updated = FormSubmission::query()
            ->whereKey($submission->getKey())
            ->whereNull('notified_at')
            ->update(['notified_at' => now()]);

        if ($updated === 0) {
            return;
        }

        // Notify all admin users
        $admins = User::query()
            ->where('is_admin', true)
            ->get();

        foreach ($admins as $admin) {
            $admin->notify(new FormSubmissionAdminNotification($submission));
        }

        // Generate access token and send confirmation to submitter
        $accessToken = FormAccessToken::create([
            'email' => $submission->email,
            'token' => Str::random(64),
            'expires_at' => now()->addHour(),
        ]);

        (new AnonymousNotifiable)
            ->route('mail', $submission->email)
            ->notify(new FormSubmissionConfirmationNotification($submission, $accessToken->token));
    }
}
