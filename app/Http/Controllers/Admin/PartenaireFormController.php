<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PartenaireForm;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PartenaireFormController extends Controller
{
    public function index(Request $request): Response
    {
        $query = PartenaireForm::query()
            ->with(['submission.payments' => function ($q) {
                $q->latest();
            }])
            ->latest();

        if ($search = $request->string('search')->trim()->value()) {
            $query->where(function ($q) use ($search): void {
                $q->where('email', 'ilike', "%{$search}%")
                    ->orWhere('ref', 'ilike', "%{$search}%")
                    ->orWhere('organisation_name', 'ilike', "%{$search}%")
                    ->orWhere('contact_name', 'ilike', "%{$search}%");
            });
        }

        return Inertia::render('admin/partenaire/index', [
            'entries' => $query->paginate(20)->withQueryString()->through(fn (PartenaireForm $form) => [
                'id' => $form->id,
                'ref' => $form->ref,
                'organisation_name' => $form->organisation_name,
                'legal_status' => $form->legal_status,
                'email' => $form->email,
                'contact_name' => $form->contact_name,
                'partnership_moral' => $form->partnership_moral,
                'partnership_technical' => $form->partnership_technical,
                'partnership_financial' => $form->partnership_financial,
                'created_at' => $form->created_at,
                'payment_status' => $form->submission?->payments->first(fn ($p) => $p->isSuccessful())?->status,
                'payment_amount_cents' => $form->submission?->payments->first(fn ($p) => $p->isSuccessful())?->amount_cents,
            ]),
            'filters' => ['search' => $request->string('search')->trim()->value()],
        ]);
    }

    public function show(PartenaireForm $partenaireForm): Response
    {
        $partenaireForm->load([
            'attachments',
            'submission.payments' => function ($q) {
                $q->latest();
            },
        ]);

        $capturedPayment = $partenaireForm->submission?->payments->first(fn ($p) => $p->isSuccessful());

        return Inertia::render('admin/partenaire/show', [
            'entry' => $partenaireForm,
            'payment' => $capturedPayment ? [
                'status' => $capturedPayment->status,
                'amount_cents' => $capturedPayment->amount_cents,
                'merchant_reference' => $capturedPayment->merchant_reference,
                'created_at' => $capturedPayment->created_at->toISOString(),
            ] : null,
        ]);
    }
}
