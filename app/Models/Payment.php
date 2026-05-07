<?php

namespace App\Models;

use Database\Factories\PaymentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    /** @use HasFactory<PaymentFactory> */
    use HasFactory;

    protected $fillable = [
        'form_submission_id',
        'merchant_reference',
        'hosted_checkout_id',
        'amount_cents',
        'currency',
        'status',
        'cawl_payment_id',
        'status_code',
        'raw_response',
    ];

    protected function casts(): array
    {
        return [
            'amount_cents' => 'integer',
            'status_code' => 'integer',
            'raw_response' => 'array',
        ];
    }

    public function formSubmission(): BelongsTo
    {
        return $this->belongsTo(FormSubmission::class);
    }

    public function isCaptured(): bool
    {
        return $this->status === 'captured';
    }

    public function isFailed(): bool
    {
        return in_array($this->status, ['rejected', 'cancelled', 'failed']);
    }

    /**
     * Amount in euros (for display).
     */
    public function amountEuros(): string
    {
        return number_format($this->amount_cents / 100, 2, ',', ' ');
    }
}
