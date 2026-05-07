<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AidantAdhesionForm;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AidantAdhesionFormController extends Controller
{
    public function index(Request $request): Response
    {
        $query = AidantAdhesionForm::query()
            ->where('status', AidantAdhesionForm::STATUS_COMPLETED)
            ->with(['submission.payments' => function ($q) {
                $q->latest();
            }])
            ->latest();

        if ($search = $request->string('search')->trim()->value()) {
            $query->where(function ($q) use ($search): void {
                $q->where('email', 'ilike', "%{$search}%")
                    ->orWhere('ref', 'ilike', "%{$search}%")
                    ->orWhere('nom', 'ilike', "%{$search}%")
                    ->orWhere('prenom', 'ilike', "%{$search}%")
                    ->orWhere('phone', 'ilike', "%{$search}%");
            });
        }

        return Inertia::render('admin/adhesion/index', [
            'entries' => $query->paginate(20)->withQueryString()->through(fn (AidantAdhesionForm $form) => [
                'id' => $form->id,
                'ref' => $form->ref,
                'nom' => $form->nom,
                'prenom' => $form->prenom,
                'email' => $form->email,
                'phone' => $form->phone,
                'departement' => $form->departement,
                'commune' => $form->commune,
                'aidant_type' => $form->aidant_type,
                'created_at' => $form->created_at,
                'payment_status' => $form->submission?->payments->firstWhere('status', 'captured')?->status,
                'payment_amount_cents' => $form->submission?->payments->firstWhere('status', 'captured')?->amount_cents,
            ]),
            'filters' => ['search' => $request->string('search')->trim()->value()],
        ]);
    }

    public function show(AidantAdhesionForm $aidantAdhesionForm): Response
    {
        $aidantAdhesionForm->load(['submission.payments' => function ($q) {
            $q->latest();
        }]);

        $capturedPayment = $aidantAdhesionForm->submission?->payments->firstWhere('status', 'captured');

        return Inertia::render('admin/adhesion/show', [
            'entry' => $aidantAdhesionForm,
            'payment' => $capturedPayment ? [
                'status' => $capturedPayment->status,
                'amount_cents' => $capturedPayment->amount_cents,
                'merchant_reference' => $capturedPayment->merchant_reference,
                'created_at' => $capturedPayment->created_at->toISOString(),
            ] : null,
        ]);
    }
}
