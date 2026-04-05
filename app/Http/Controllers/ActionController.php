<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\ActionCategory;
use Inertia\Inertia;
use Inertia\Response;

class ActionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('actions/index', [
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

        return Inertia::render('actions/show', [
            'actionItem' => [
                'id' => $action->id,
                'title' => $action->title,
                'slug' => $action->slug,
                'category' => $action->actionCategory->name,
                'content' => $action->content,
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
