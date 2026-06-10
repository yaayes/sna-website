<?php

use App\Http\Controllers\ActionController;
use App\Http\Controllers\Admin\ActionCategoryController as AdminActionCategoryController;
use App\Http\Controllers\Admin\ActionController as AdminActionController;
use App\Http\Controllers\Admin\AidantAdhesionFormController as AdminAidantAdhesionFormController;
use App\Http\Controllers\Admin\ContactFormController as AdminContactFormController;
use App\Http\Controllers\Admin\CouponController as AdminCouponController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ImageUploadController as AdminImageUploadController;
use App\Http\Controllers\Admin\MoiAussiFormController as AdminMoiAussiFormController;
use App\Http\Controllers\Admin\PartenaireFormController as AdminPartenaireFormController;
use App\Http\Controllers\Admin\PressArticleController as AdminPressArticleController;
use App\Http\Controllers\Admin\RepresentantController as AdminRepresentantController;
use App\Http\Controllers\Admin\SoutienFormController as AdminSoutienFormController;
use App\Http\Controllers\Forms\AidantAdhesionFormController;
use App\Http\Controllers\Forms\ContactFormController;
use App\Http\Controllers\Forms\FormAccessController;
use App\Http\Controllers\Forms\MoiAussiFormController;
use App\Http\Controllers\Forms\PartenaireFormController;
use App\Http\Controllers\Forms\RejoindreSnaFormController;
use App\Http\Controllers\Forms\SoutienFormController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PressArticleController;
use App\Http\Controllers\RepresentantController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => inertia('welcome', [
    'seo' => [
        'title' => 'Syndicat National des Aidants — Défendre les droits des aidants familiaux',
        'description' => 'Le Syndicat National des Aidants (SNA) est la première organisation syndicale 100 % dédiée aux aidants familiaux en France. Défense des droits, représentation collective, actions concrètes.',
        'canonical' => route('home'),
        'jsonld' => [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => 'Syndicat National des Aidants',
            'url' => config('app.url'),
            'logo' => asset('images/logo.png'),
            'description' => 'Le SNA défend les intérêts des aidants familiaux qui accompagnent un proche touché par la maladie, le handicap ou la perte d\'autonomie.',
            'contactPoint' => [
                '@type' => 'ContactPoint',
                'contactType' => 'customer service',
                'email' => 'contact@syndicat-national-aidants.fr',
            ],
        ],
    ],
]))->name('home');

Route::get('/comprendre-laidance', fn () => inertia('comprendre-aidance', [
    'seo' => [
        'title' => 'Comprendre l\'aidance — Syndicat National des Aidants',
        'description' => 'Qu\'est-ce qu\'un aidant ? Découvrez les différentes formes d\'aidance, leur impact sur la vie quotidienne et les ressources pour vous accompagner.',
        'canonical' => route('comprendre-aidance'),
    ],
]))->name('comprendre-aidance');

Route::get('/a-propos-nous', fn () => inertia('a-propos-nous', [
    'seo' => [
        'title' => 'À propos du SNA — Notre histoire, nos valeurs, notre gouvernance',
        'description' => 'Découvrez l\'histoire, les valeurs et la gouvernance du Syndicat National des Aidants, première organisation syndicale entièrement dédiée aux aidants familiaux.',
        'canonical' => route('a-propos-nous'),
    ],
]))->name('a-propos-nous');

Route::get('/rejoindre-le-sna', fn () => inertia('rejoindre-le-sna', [
    'seo' => [
        'title' => 'Rejoindre le SNA — Bénévoles et militants aidants',
        'description' => 'Rejoignez le mouvement du Syndicat National des Aidants en tant que bénévole ou militant. Ensemble, faisons évoluer les droits des aidants en France.',
        'canonical' => route('rejoindre-sna.page'),
    ],
]))->name('rejoindre-sna.page');

Route::get('/rejoindre', fn () => inertia('rejoindre', [
    'seo' => [
        'title' => 'Adhérer au SNA — Syndicat National des Aidants',
        'description' => 'Adhérez au Syndicat National des Aidants et rejoignez des milliers d\'aidants familiaux qui agissent ensemble pour faire reconnaître leurs droits.',
        'canonical' => route('rejoindre'),
    ],
]))->name('rejoindre');
Route::get('/nos-actions', [ActionController::class, 'index'])->name('actions.index');
Route::get('/nos-actions/{action:slug}', [ActionController::class, 'show'])->name('actions.show');
Route::get('/representants', [RepresentantController::class, 'index'])->name('representants.index');
Route::get('/revue-de-presse', [PressArticleController::class, 'index'])->name('press-articles.index');
Route::get('/revue-de-presse/{pressArticle:slug}', [PressArticleController::class, 'show'])->name('press-articles.show');

// Dedicated form pages
Route::get('/formulaire/adhesion', [AidantAdhesionFormController::class, 'show'])->name('forms.adhesion.page');
Route::get('/formulaire/adhesion/validate-coupon', [AidantAdhesionFormController::class, 'validateCoupon'])->name('forms.adhesion.validate-coupon');
Route::post('/formulaire/adhesion/draft', [AidantAdhesionFormController::class, 'saveDraft'])->name('forms.adhesion.draft.save');
Route::get('/formulaire/adhesion/draft', [AidantAdhesionFormController::class, 'fetchDraft'])->name('forms.adhesion.draft.fetch');
Route::get('/formulaire/soutien', [SoutienFormController::class, 'show'])->name('forms.soutien.page');
Route::get('/formulaire/partenaire', [PartenaireFormController::class, 'show'])->name('forms.partenaire.page');
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

// Payment
Route::get('/payment/return', [PaymentController::class, 'return'])->name('payment.return');
Route::post('/payment/webhook', [PaymentController::class, 'webhook'])->name('payment.webhook');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        if (auth()->user()->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }

        return inertia('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('@')->name('admin.')->group(function () {
    Route::resource('/representants', AdminRepresentantController::class)->except('show');
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::patch('/action-categories/reorder', [AdminActionCategoryController::class, 'reorder'])->name('action-categories.reorder');
    Route::resource('/action-categories', AdminActionCategoryController::class)->except('show');
    Route::patch('/actions/reorder', [AdminActionController::class, 'reorder'])->name('actions.reorder');
    Route::resource('/actions', AdminActionController::class)->except('show');
    Route::patch('/press-articles/reorder', [AdminPressArticleController::class, 'reorder'])->name('press-articles.reorder');
    Route::resource('/press-articles', AdminPressArticleController::class)->except('show');
    Route::get('/moi-aussi', [AdminMoiAussiFormController::class, 'index'])->name('moi-aussi.index');
    Route::get('/moi-aussi/{moiAussiForm}', [AdminMoiAussiFormController::class, 'show'])->name('moi-aussi.show');
    Route::get('/adhesion', [AdminAidantAdhesionFormController::class, 'index'])->name('adhesion.index');
    Route::get('/adhesion/{aidantAdhesionForm}', [AdminAidantAdhesionFormController::class, 'show'])->name('adhesion.show');
    Route::resource('/coupons', AdminCouponController::class)->except('show');
    Route::get('/soutien', [AdminSoutienFormController::class, 'index'])->name('soutien.index');
    Route::get('/soutien/{soutienForm}', [AdminSoutienFormController::class, 'show'])->name('soutien.show');
    Route::get('/partenaire', [AdminPartenaireFormController::class, 'index'])->name('partenaire.index');
    Route::get('/partenaire/{partenaireForm}', [AdminPartenaireFormController::class, 'show'])->name('partenaire.show');
    Route::get('/contact', [AdminContactFormController::class, 'index'])->name('contact.index');
    Route::get('/contact/{contactForm}', [AdminContactFormController::class, 'show'])->name('contact.show');
    Route::post('/wysiwyg/images', [AdminImageUploadController::class, 'store'])
        ->name('wysiwyg.images.store')
        ->withoutMiddleware(VerifyCsrfToken::class);
});

require __DIR__.'/settings.php';
