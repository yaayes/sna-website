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
        $query = SoutienForm::query()->latest();

        if ($search = $request->string('search')->trim()->value()) {
            $query->where(function ($q) use ($search): void {
                $q->where('email', 'ilike', "%{$search}%")
                    ->orWhere('ref', 'ilike', "%{$search}%")
                    ->orWhere('name', 'ilike', "%{$search}%")
                    ->orWhere('organisation', 'ilike', "%{$search}%");
            });
        }

        return Inertia::render('admin/soutien/index', [
            'entries' => $query->paginate(20)->withQueryString(),
            'filters' => ['search' => $request->string('search')->trim()->value()],
        ]);
    }

    public function show(SoutienForm $soutienForm): Response
    {
        return Inertia::render('admin/soutien/show', [
            'entry' => $soutienForm,
        ]);
    }
}
