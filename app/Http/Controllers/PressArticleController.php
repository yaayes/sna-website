<?php

namespace App\Http\Controllers;

use App\Models\PressArticle;
use Inertia\Inertia;
use Inertia\Response;

class PressArticleController extends Controller
{
    public function index(): Response
    {
        $articles = PressArticle::query()
            ->published()
            ->orderBy('publication_date', 'desc')
            ->orderBy('sort_order')
            ->paginate(12);

        return Inertia::render('revue-de-presse', [
            'articles' => $articles->map(fn (PressArticle $article) => [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'excerpt' => $article->excerpt,
                'publication_date' => $article->publication_date?->format('d F Y'),
                'created_at' => $article->created_at?->format('d F Y'),
            ])->values(),
            'pagination' => [
                'total' => $articles->total(),
                'per_page' => $articles->perPage(),
                'current_page' => $articles->currentPage(),
                'last_page' => $articles->lastPage(),
                'from' => $articles->firstItem(),
                'to' => $articles->lastItem(),
                'path' => $articles->path(),
                'next_page_url' => $articles->nextPageUrl(),
                'prev_page_url' => $articles->previousPageUrl(),
            ],
        ]);
    }

    public function show(PressArticle $pressArticle): Response
    {
        if (! $pressArticle->is_published) {
            abort(404);
        }

        return Inertia::render('revue-de-presse/show', [
            'article' => [
                'id' => $pressArticle->id,
                'title' => $pressArticle->title,
                'slug' => $pressArticle->slug,
                'excerpt' => $pressArticle->excerpt,
                'content' => $pressArticle->content,
                'publication_date' => $pressArticle->publication_date?->format('d F Y'),
                'created_at' => $pressArticle->created_at?->format('d F Y'),
            ],
        ]);
    }
}
