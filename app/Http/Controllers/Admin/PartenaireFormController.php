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
        $query = PartenaireForm::query()->latest();

        if ($search = $request->string('search')->trim()->value()) {
            $query->where(function ($q) use ($search): void {
                $q->where('email', 'ilike', "%{$search}%")
                    ->orWhere('ref', 'ilike', "%{$search}%")
                    ->orWhere('organisation_name', 'ilike', "%{$search}%")
                    ->orWhere('contact_name', 'ilike', "%{$search}%");
            });
        }

        return Inertia::render('admin/partenaire/index', [
            'entries' => $query->paginate(20)->withQueryString(),
            'filters' => ['search' => $request->string('search')->trim()->value()],
        ]);
    }

    public function show(PartenaireForm $partenaireForm): Response
    {
        return Inertia::render('admin/partenaire/show', [
            'entry' => $partenaireForm,
        ]);
    }
}
