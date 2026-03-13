<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\MoiAussiFormController as AdminMoiAussiFormController;
use App\Http\Controllers\Admin\PartenaireFormController as AdminPartenaireFormController;
use App\Http\Controllers\Admin\SoutienFormController as AdminSoutienFormController;
use App\Http\Controllers\Forms\FormAccessController;
use App\Http\Controllers\Forms\MoiAussiFormController;
use App\Http\Controllers\Forms\PartenaireFormController;
use App\Http\Controllers\Forms\SoutienFormController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

// Form submissions (no auth required)
Route::post('/formulaire/soutien', [SoutienFormController::class, 'store'])->name('forms.soutien.store');
Route::post('/formulaire/partenaire', [PartenaireFormController::class, 'store'])->name('forms.partenaire.store');
Route::post('/formulaire/moi-aussi', [MoiAussiFormController::class, 'store'])->name('forms.moi-aussi.store');

// Magic link access
Route::get('/mes-formulaires', [FormAccessController::class, 'showRequestForm'])->name('forms.access.request');
Route::post('/mes-formulaires', [FormAccessController::class, 'sendAccessLink'])->name('forms.access.send');
Route::get('/mes-formulaires/{token}', [FormAccessController::class, 'show'])->name('forms.access.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('@')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/moi-aussi', [AdminMoiAussiFormController::class, 'index'])->name('moi-aussi.index');
    Route::get('/moi-aussi/{moiAussiForm}', [AdminMoiAussiFormController::class, 'show'])->name('moi-aussi.show');
    Route::get('/soutien', [AdminSoutienFormController::class, 'index'])->name('soutien.index');
    Route::get('/soutien/{soutienForm}', [AdminSoutienFormController::class, 'show'])->name('soutien.show');
    Route::get('/partenaire', [AdminPartenaireFormController::class, 'index'])->name('partenaire.index');
    Route::get('/partenaire/{partenaireForm}', [AdminPartenaireFormController::class, 'show'])->name('partenaire.show');
});

require __DIR__.'/settings.php';
