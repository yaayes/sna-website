<?php

namespace App\Http\Controllers;

use App\Models\PressArticle;
use Illuminate\Support\Str;
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
            'seo' => [
                'title' => 'Revue de presse — Syndicat National des Aidants',
                'description' => 'Retrouvez toute l\'actualité et les articles de presse sur les aidants familiaux et les actions du Syndicat National des Aidants.',
                'canonical' => route('press-articles.index'),
            ],
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

        $description = $pressArticle->excerpt ?: Str::limit(strip_tags($pressArticle->content), 155);
        $publishedIso = $pressArticle->publication_date?->toIso8601String();

        return Inertia::render('revue-de-presse/show', [
            'seo' => [
                'title' => $pressArticle->title.' — Revue de presse SNA',
                'description' => $description,
                'canonical' => route('press-articles.show', $pressArticle),
                'type' => 'article',
                'published_time' => $publishedIso,
                'jsonld' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'NewsArticle',
                    'headline' => $pressArticle->title,
                    'description' => $description,
                    'datePublished' => $publishedIso,
                    'publisher' => [
                        '@type' => 'Organization',
                        'name' => 'Syndicat National des Aidants',
                        'url' => config('app.url'),
                    ],
                ],
            ],
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
