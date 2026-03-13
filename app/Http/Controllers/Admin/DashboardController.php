<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MoiAussiForm;
use App\Models\PartenaireForm;
use App\Models\SoutienForm;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'moi_aussi' => MoiAussiForm::count(),
                'soutien' => SoutienForm::count(),
                'partenaire' => PartenaireForm::count(),
            ],
        ]);
    }
}
