<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SoutienForm;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SoutienFormController extends Controller
{
    public function index(Request $request): Response
    {
        $query = SoutienForm::query()
            ->with(['submission.payments' => function ($q) {
                $q->latest();
            }])
            ->latest();

        if ($search = $request->string('search')->trim()->value()) {
            $query->where(function ($q) use ($search): void {
                $q->where('email', 'ilike', "%{$search}%")
                    ->orWhere('ref', 'ilike', "%{$search}%")
                    ->orWhere('name', 'ilike', "%{$search}%")
                    ->orWhere('address', 'ilike', "%{$search}%")
                    ->orWhere('phone', 'ilike', "%{$search}%");
            });
        }

        return Inertia::render('admin/soutien/index', [
            'entries' => $query->paginate(20)->withQueryString()->through(fn (SoutienForm $form) => [
                'id' => $form->id,
                'ref' => $form->ref,
                'name' => $form->name,
                'address' => $form->address,
                'email' => $form->email,
                'phone' => $form->phone,
                'created_at' => $form->created_at,
                'payment_status' => $form->submission?->payments->first(fn ($p) => $p->isSuccessful())?->status,
                'payment_amount_cents' => $form->submission?->payments->first(fn ($p) => $p->isSuccessful())?->amount_cents,
            ]),
            'filters' => ['search' => $request->string('search')->trim()->value()],
        ]);
    }

    public function show(SoutienForm $soutienForm): Response
    {
        $soutienForm->load(['submission.payments' => function ($q) {
            $q->latest();
        }]);

        $capturedPayment = $soutienForm->submission?->payments->first(fn ($p) => $p->isSuccessful());

        return Inertia::render('admin/soutien/show', [
            'entry' => $soutienForm,
            'payment' => $capturedPayment ? [
                'status' => $capturedPayment->status,
                'amount_cents' => $capturedPayment->amount_cents,
                'merchant_reference' => $capturedPayment->merchant_reference,
                'created_at' => $capturedPayment->created_at->toISOString(),
            ] : null,
        ]);
    }
}
