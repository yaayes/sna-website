<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReorderActionCategoryRequest;
use App\Http\Requests\StoreActionCategoryRequest;
use App\Http\Requests\UpdateActionCategoryRequest;
use App\Models\ActionCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ActionCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/action-categories/index', [
            'categories' => ActionCategory::query()
                ->withCount('actions')
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(['id', 'name', 'slug', 'sort_order', 'updated_at']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/action-categories/create');
    }

    public function store(StoreActionCategoryRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        ActionCategory::create([
            'name' => $validated['name'],
            'slug' => $this->generateUniqueSlug($validated['name']),
            'sort_order' => ((int) ActionCategory::max('sort_order')) + 1,
        ]);

        return redirect()->route('admin.action-categories.index')->with('success', 'Categorie creee avec succes.');
    }

    public function edit(ActionCategory $actionCategory): Response
    {
        return Inertia::render('admin/action-categories/edit', [
            'category' => $actionCategory->only(['id', 'name', 'slug']),
        ]);
    }

    public function update(UpdateActionCategoryRequest $request, ActionCategory $actionCategory): RedirectResponse
    {
        $validated = $request->validated();

        $actionCategory->update([
            'name' => $validated['name'],
            'slug' => $this->generateUniqueSlug($validated['name'], $actionCategory->id),
        ]);

        return redirect()->route('admin.action-categories.index')->with('success', 'Categorie mise a jour avec succes.');
    }

    public function destroy(ActionCategory $actionCategory): RedirectResponse
    {
        if ($actionCategory->actions()->exists()) {
            return redirect()
                ->route('admin.action-categories.index')
                ->with('error', 'Impossible de supprimer une categorie associee a des actions.');
        }

        $actionCategory->delete();

        return redirect()->route('admin.action-categories.index')->with('success', 'Categorie supprimee avec succes.');
    }

    public function reorder(ReorderActionCategoryRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request): void {
            foreach ($request->validated('categories') as $item) {
                ActionCategory::whereKey($item['id'])->update(['sort_order' => $item['sort_order']]);
            }
        });

        return redirect()->route('admin.action-categories.index')->with('success', 'Ordre des categories mis a jour.');
    }

    private function generateUniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base !== '' ? $base : 'categorie';
        $count = 1;

        while (
            ActionCategory::query()
                ->when($ignoreId, fn ($query) => $query->whereKeyNot($ignoreId))
                ->where('slug', $slug)
                ->exists()
        ) {
            $count++;
            $slug = sprintf('%s-%d', $base !== '' ? $base : 'categorie', $count);
        }

        return $slug;
    }
}
