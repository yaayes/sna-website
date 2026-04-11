<?php

use App\Http\Controllers\ActionController;
use App\Http\Controllers\Admin\ActionCategoryController as AdminActionCategoryController;
use App\Http\Controllers\Admin\ActionController as AdminActionController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ImageUploadController as AdminImageUploadController;
use App\Http\Controllers\Admin\MoiAussiFormController as AdminMoiAussiFormController;
use App\Http\Controllers\Admin\PartenaireFormController as AdminPartenaireFormController;
use App\Http\Controllers\Admin\SoutienFormController as AdminSoutienFormController;
use App\Http\Controllers\Forms\AidantAdhesionFormController;
use App\Http\Controllers\Forms\ContactFormController;
use App\Http\Controllers\Forms\FormAccessController;
use App\Http\Controllers\Forms\MoiAussiFormController;
use App\Http\Controllers\Forms\PartenaireFormController;
use App\Http\Controllers\Forms\RejoindreSnaFormController;
use App\Http\Controllers\Forms\SoutienFormController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/comprendre-laidance', 'comprendre-aidance')->name('comprendre-aidance');
Route::inertia('/a-propos-nous', 'a-propos-nous')->name('a-propos-nous');
Route::inertia('/rejoindre-le-sna', 'rejoindre-le-sna')->name('rejoindre-sna.page');
Route::get('/nos-actions', [ActionController::class, 'index'])->name('actions.index');
Route::get('/nos-actions/{action:slug}', [ActionController::class, 'show'])->name('actions.show');

// Dedicated form pages
Route::inertia('/formulaire/adhesion', 'forms/adhesion')->name('forms.adhesion.page');
Route::inertia('/formulaire/soutien', 'forms/soutien')->name('forms.soutien.page');
Route::inertia('/formulaire/partenaire', 'forms/partenaire')->name('forms.partenaire.page');
Route::inertia('/formulaire/moi-aussi', 'forms/moi-aussi')->name('forms.moi-aussi.page');
Route::inertia('/formulaire/contact', 'forms/contact')->name('forms.contact.page');

// Form submissions (no auth required)
Route::post('/formulaire/adhesion', [AidantAdhesionFormController::class, 'store'])->name('forms.adhesion.store');
Route::post('/formulaire/soutien', [SoutienFormController::class, 'store'])->name('forms.soutien.store');
Route::post('/formulaire/partenaire', [PartenaireFormController::class, 'store'])->name('forms.partenaire.store');
Route::post('/formulaire/moi-aussi', [MoiAussiFormController::class, 'store'])->name('forms.moi-aussi.store');
Route::post('/formulaire/contact', [ContactFormController::class, 'store'])->name('forms.contact.store');
Route::post('/rejoindre-le-sna', [RejoindreSnaFormController::class, 'store'])->name('forms.rejoindre-sna.store');

// Magic link access
Route::get('/mes-formulaires', [FormAccessController::class, 'showRequestForm'])->name('forms.access.request');
Route::post('/mes-formulaires', [FormAccessController::class, 'sendAccessLink'])->name('forms.access.send');
Route::get('/mes-formulaires/{token}', [FormAccessController::class, 'show'])->name('forms.access.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        if (auth()->user()->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }

        return inertia('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('@')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::patch('/action-categories/reorder', [AdminActionCategoryController::class, 'reorder'])->name('action-categories.reorder');
    Route::resource('/action-categories', AdminActionCategoryController::class)->except('show');
    Route::patch('/actions/reorder', [AdminActionController::class, 'reorder'])->name('actions.reorder');
    Route::resource('/actions', AdminActionController::class)->except('show');
    Route::get('/moi-aussi', [AdminMoiAussiFormController::class, 'index'])->name('moi-aussi.index');
    Route::get('/moi-aussi/{moiAussiForm}', [AdminMoiAussiFormController::class, 'show'])->name('moi-aussi.show');
    Route::get('/soutien', [AdminSoutienFormController::class, 'index'])->name('soutien.index');
    Route::get('/soutien/{soutienForm}', [AdminSoutienFormController::class, 'show'])->name('soutien.show');
    Route::get('/partenaire', [AdminPartenaireFormController::class, 'index'])->name('partenaire.index');
    Route::get('/partenaire/{partenaireForm}', [AdminPartenaireFormController::class, 'show'])->name('partenaire.show');
    Route::post('/wysiwyg/images', [AdminImageUploadController::class, 'store'])
        ->name('wysiwyg.images.store')
        ->withoutMiddleware(VerifyCsrfToken::class);
});

require __DIR__.'/settings.php';
