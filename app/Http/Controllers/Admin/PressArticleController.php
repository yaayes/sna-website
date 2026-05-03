<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePressArticleRequest;
use App\Http\Requests\UpdatePressArticleRequest;
use App\Models\PressArticle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PressArticleController extends Controller
{
    public function index(Request $request): Response
    {
        $query = PressArticle::query()
            ->orderBy('sort_order')
            ->orderBy('publication_date', 'desc')
            ->orderBy('title');

        if ($search = $request->string('search')->trim()->value()) {
            $query->where(function ($builder) use ($search): void {
                $builder
                    ->where('title', 'ilike', "%{$search}%")
                    ->orWhere('excerpt', 'ilike', "%{$search}%");
            });
        }

        return Inertia::render('admin/press-articles/index', [
            'articles' => $query->get()->map(fn (PressArticle $article) => [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'excerpt' => $article->excerpt,
                'publication_date' => $article->publication_date?->format('d/m/Y H:i'),
                'sort_order' => $article->sort_order,
                'is_published' => $article->is_published,
                'updated_at' => $article->updated_at->format('d/m/Y H:i'),
            ])->values(),
            'filters' => ['search' => $request->string('search')->trim()->value()],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/press-articles/create');
    }

    public function store(StorePressArticleRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        PressArticle::create([
            'title' => $validated['title'],
            'slug' => $this->generateUniqueSlug($validated['title']),
            'excerpt' => $validated['excerpt'],
            'content' => $this->sanitizeRichText($validated['content']),
            'publication_date' => $validated['publication_date'] ?? now(),
            'sort_order' => ((int) PressArticle::max('sort_order')) + 1,
            'is_published' => (bool) ($validated['is_published'] ?? false),
        ]);

        return redirect()->route('admin.press-articles.index')->with('success', 'Article de presse créé avec succès.');
    }

    public function edit(PressArticle $pressArticle): Response
    {
        return Inertia::render('admin/press-articles/edit', [
            'article' => [
                'id' => $pressArticle->id,
                'slug' => $pressArticle->slug,
                'title' => $pressArticle->title,
                'excerpt' => $pressArticle->excerpt,
                'content' => $pressArticle->content,
                'publication_date' => $pressArticle->publication_date?->format('Y-m-d\TH:i'),
                'is_published' => $pressArticle->is_published,
            ],
        ]);
    }

    public function update(UpdatePressArticleRequest $request, PressArticle $pressArticle): RedirectResponse
    {
        $validated = $request->validated();

        $pressArticle->update([
            'title' => $validated['title'],
            'slug' => $this->generateUniqueSlug($validated['title'], $pressArticle->id),
            'excerpt' => $validated['excerpt'],
            'content' => $this->sanitizeRichText($validated['content']),
            'publication_date' => $validated['publication_date'] ?? $pressArticle->publication_date,
            'is_published' => (bool) ($validated['is_published'] ?? false),
        ]);

        return redirect()->route('admin.press-articles.index')->with('success', 'Article de presse mis à jour avec succès.');
    }

    public function destroy(PressArticle $pressArticle): RedirectResponse
    {
        $pressArticle->delete();

        return redirect()->route('admin.press-articles.index')->with('success', 'Article de presse supprimé avec succès.');
    }

    public function reorder(Request $request): RedirectResponse
    {
        $request->validate([
            'articles' => ['required', 'array'],
            'articles.*.id' => ['required', 'integer', 'exists:press_articles,id'],
            'articles.*.sort_order' => ['required', 'integer'],
        ]);

        DB::transaction(function () use ($request): void {
            foreach ($request->validated('articles') as $item) {
                PressArticle::whereKey($item['id'])->update(['sort_order' => $item['sort_order']]);
            }
        });

        return redirect()->route('admin.press-articles.index')->with('success', 'Ordre des articles mis à jour.');
    }

    private function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title);
        $slug = $base !== '' ? $base : 'article';
        $count = 1;

        while (
            PressArticle::query()
                ->when($ignoreId, fn ($query) => $query->whereKeyNot($ignoreId))
                ->where('slug', $slug)
                ->exists()
        ) {
            $count++;
            $slug = sprintf('%s-%d', $base !== '' ? $base : 'article', $count);
        }

        return $slug;
    }

    private function sanitizeRichText(string $content): string
    {
        $sanitized = strip_tags(
            $content,
            '<p><div><br><strong><b><em><i><u><s><ul><ol><li><a><h2><h3><blockquote><span><mark><img>'
        );

        $sanitized = (string) preg_replace('/\son[a-z]+\s*=\s*"[^"]*"/i', '', $sanitized);
        $sanitized = (string) preg_replace("/\son[a-z]+\s*=\s*'[^']*'/i", '', $sanitized);
        $sanitized = (string) preg_replace('/javascript:/i', '', $sanitized);

        return $sanitized;
    }
}
