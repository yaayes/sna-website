<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MoiAussiForm;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MoiAussiFormController extends Controller
{
    public function index(Request $request): Response
    {
        $query = MoiAussiForm::query()->latest();

        if ($search = $request->string('search')->trim()->value()) {
            $query->where(function ($q) use ($search): void {
                $q->where('email', 'ilike', "%{$search}%")
                    ->orWhere('ref', 'ilike', "%{$search}%")
                    ->orWhere('name', 'ilike', "%{$search}%");
            });
        }

        return Inertia::render('admin/moi-aussi/index', [
            'entries' => $query->paginate(20)->withQueryString(),
            'filters' => ['search' => $request->string('search')->trim()->value()],
        ]);
    }

    public function show(MoiAussiForm $moiAussiForm): Response
    {
        return Inertia::render('admin/moi-aussi/show', [
            'entry' => $moiAussiForm,
        ]);
    }
}
