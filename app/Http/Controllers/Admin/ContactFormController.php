<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BulkRespondContactFormRequest;
use App\Models\ContactForm;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactFormController extends Controller
{
    public function index(Request $request): Response
    {
        $query = ContactForm::query()->latest();

        if ($search = $request->string('search')->trim()->value()) {
            $query->where(function ($q) use ($search): void {
                $q->where('email', 'ilike', "%{$search}%")
                    ->orWhere('ref', 'ilike', "%{$search}%")
                    ->orWhere('name', 'ilike', "%{$search}%")
                    ->orWhere('city', 'ilike', "%{$search}%")
                    ->orWhere('subject', 'ilike', "%{$search}%")
                    ->orWhere('phone', 'ilike', "%{$search}%");
            });
        }

        return Inertia::render('admin/contact/index', [
            'entries' => $query->paginate(20)->withQueryString(),
            'filters' => ['search' => $request->string('search')->trim()->value()],
        ]);
    }

    public function show(ContactForm $contactForm): Response
    {
        return Inertia::render('admin/contact/show', [
            'entry' => $contactForm,
        ]);
    }

    public function toggleResponded(ContactForm $contactForm): RedirectResponse
    {
        $contactForm->forceFill([
            'responded_at' => $contactForm->responded_at ? null : now(),
        ])->save();

        return back();
    }

    public function bulkRespond(BulkRespondContactFormRequest $request): RedirectResponse
    {
        ContactForm::query()
            ->whereIn('id', $request->validated('ids'))
            ->whereNull('responded_at')
            ->update(['responded_at' => now()]);

        return back();
    }
}
