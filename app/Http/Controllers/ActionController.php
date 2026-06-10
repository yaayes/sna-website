<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\ActionCategory;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ActionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('actions/index', [
            'seo' => [
                'title' => 'Nos Actions — Syndicat National des Aidants',
                'description' => 'Découvrez toutes les actions du Syndicat National des Aidants pour défendre les droits des aidants familiaux en France et faire évoluer les politiques publiques.',
                'canonical' => route('actions.index'),
            ],
            'categories' => ActionCategory::query()
                ->with(['actions' => fn ($query) => $query
                    ->published()
                    ->orderBy('sort_order')
                    ->orderBy('title')])
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get()
                ->filter(fn (ActionCategory $category) => $category->actions->isNotEmpty())
                ->mapWithKeys(fn (ActionCategory $category) => [
                    $category->name => $category->actions->map(fn (Action $action) => [
                        'id' => $action->id,
                        'title' => $action->title,
                        'slug' => $action->slug,
                        'category' => $category->name,
                        'content' => $action->content,
                        'sort_order' => $action->sort_order,
                    ])->values()->all(),
                ])
                ->all(),
        ]);
    }

    public function show(Action $action): Response
    {
        abort_unless($action->is_published, 404);

        $description = Str::limit(strip_tags($action->content), 155);

        return Inertia::render('actions/show', [
            'seo' => [
                'title' => $action->title.' — Nos Actions SNA',
                'description' => $description,
                'canonical' => route('actions.show', $action),
                'type' => 'article',
                'jsonld' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'Article',
                    'headline' => $action->title,
                    'description' => $description,
                    'publisher' => [
                        '@type' => 'Organization',
                        'name' => 'Syndicat National des Aidants',
                        'url' => config('app.url'),
                    ],
                ],
            ],
            'actionItem' => [
                'id' => $action->id,
                'title' => $action->title,
                'slug' => $action->slug,
                'category' => $action->actionCategory->name,
                'content' => $action->content,
                'moi_aussi_count' => $action->moiAussiForms()->count(),
            ],
            'relatedActions' => Action::query()
                ->published()
                ->where('action_category_id', $action->action_category_id)
                ->whereKeyNot($action->id)
                ->orderBy('sort_order')
                ->orderBy('title')
                ->limit(3)
                ->get(['id', 'title', 'slug']),
        ]);
    }
}
