<?php

namespace App\Http\Controllers;

use App\Models\Representant;
use Inertia\Inertia;
use Inertia\Response;

class RepresentantController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('representants', [
            'representants' => Representant::query()
                ->active()
                ->orderBy('sort_order')
                ->orderBy('last_name')
                ->get(['id', 'department_code', 'department_name', 'first_name', 'last_name', 'role', 'short_bio', 'photo_path']),
        ]);
    }
}
