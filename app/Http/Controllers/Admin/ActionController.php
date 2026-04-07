<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReorderActionRequest;
use App\Http\Requests\StoreActionRequest;
use App\Http\Requests\UpdateActionRequest;
use App\Models\Action;
use App\Models\ActionCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ActionController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Action::query()
            ->with('actionCategory:id,name,sort_order')
            ->select('actions.*')
            ->join('action_categories', 'action_categories.id', '=', 'actions.action_category_id')
            ->orderBy('action_categories.sort_order')
            ->orderBy('actions.sort_order')
            ->orderBy('actions.title');

        if ($search = $request->string('search')->trim()->value()) {
            $query->where(function ($builder) use ($search): void {
                $builder
                    ->where('actions.title', 'ilike', "%{$search}%")
                    ->orWhereHas('actionCategory', function ($categoryQuery) use ($search): void {
                        $categoryQuery->where('name', 'ilike', "%{$search}%");
                    });
            });
        }

        return Inertia::render('admin/actions/index', [
            'actions' => $query->get()->map(fn (Action $action) => [
                'id' => $action->id,
                'title' => $action->title,
                'slug' => $action->slug,
                'category' => $action->actionCategory->name,
                'sort_order' => $action->sort_order,
                'is_published' => $action->is_published,
                'updated_at' => $action->updated_at,
            ])->values(),
            'filters' => ['search' => $request->string('search')->trim()->value()],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/actions/create', [
            'categories' => ActionCategory::query()
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function store(StoreActionRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Action::create([
            'title' => $validated['title'],
            'slug' => $this->generateUniqueSlug($validated['title']),
            'action_category_id' => $validated['action_category_id'],
            'content' => $this->sanitizeRichText($validated['content']),
            'sort_order' => ((int) Action::max('sort_order')) + 1,
            'is_published' => (bool) ($validated['is_published'] ?? false),
        ]);

        return redirect()->route('admin.actions.index')->with('success', 'Action creee avec succes.');
    }

    public function edit(Action $action): Response
    {
        return Inertia::render('admin/actions/edit', [
            'actionItem' => [
                'id' => $action->id,
                'slug' => $action->slug,
                'title' => $action->title,
                'action_category_id' => $action->action_category_id,
                'category_name' => $action->actionCategory->name,
                'content' => $action->content,
                'is_published' => $action->is_published,
            ],
            'categories' => ActionCategory::query()
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function update(UpdateActionRequest $request, Action $action): RedirectResponse
    {
        $validated = $request->validated();

        $action->update([
            'title' => $validated['title'],
            'slug' => $this->generateUniqueSlug($validated['title'], $action->id),
            'action_category_id' => $validated['action_category_id'],
            'content' => $this->sanitizeRichText($validated['content']),
            'is_published' => (bool) ($validated['is_published'] ?? false),
        ]);

        return redirect()->route('admin.actions.index')->with('success', 'Action mise a jour avec succes.');
    }

    public function destroy(Action $action): RedirectResponse
    {
        $action->delete();

        return redirect()->route('admin.actions.index')->with('success', 'Action supprimee avec succes.');
    }

    public function reorder(ReorderActionRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request): void {
            foreach ($request->validated('actions') as $item) {
                Action::whereKey($item['id'])->update(['sort_order' => $item['sort_order']]);
            }
        });

        return redirect()->route('admin.actions.index')->with('success', 'Ordre des actions mis a jour.');
    }

    private function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title);
        $slug = $base !== '' ? $base : 'action';
        $count = 1;

        while (
            Action::query()
                ->when($ignoreId, fn ($query) => $query->whereKeyNot($ignoreId))
                ->where('slug', $slug)
                ->exists()
        ) {
            $count++;
            $slug = sprintf('%s-%d', $base !== '' ? $base : 'action', $count);
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

        $sanitized = (string) preg_replace_callback(
            '/style="([^"]*)"/i',
            function (array $matches): string {
                $declarations = array_filter(array_map('trim', explode(';', $matches[1])));
                $allowedProperties = [
                    'color',
                    'background-color',
                    'font-size',
                    'font-family',
                    'line-height',
                    'font-weight',
                    'font-style',
                    'text-decoration',
                    'text-align',
                ];

                $cleanStyles = [];

                foreach ($declarations as $declaration) {
                    if (! str_contains($declaration, ':')) {
                        continue;
                    }

                    [$rawProperty, $rawValue] = array_map('trim', explode(':', $declaration, 2));
                    $property = strtolower($rawProperty);
                    $value = trim($rawValue);

                    if ($property === '' || $value === '' || ! in_array($property, $allowedProperties, true)) {
                        continue;
                    }

                    if (preg_match('/expression|url\(|javascript:|@import/i', $value)) {
                        continue;
                    }

                    $isValid = match ($property) {
                        'color' => (bool) preg_match('/^(#[0-9a-f]{3,8}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)|[a-z\-]+)$/i', $value) && $this->isSafeTextColor($value),
                        'font-size' => (bool) preg_match('/^\d+(\.\d+)?(px|em|rem|%|pt)$/i', $value),
                        'line-height' => (bool) preg_match('/^(normal|\d+(\.\d+)?(px|em|rem|%)?)$/i', $value),
                        'font-family' => (bool) preg_match('/^[a-z0-9\s,\'"\-]+$/i', $value),
                        'font-weight' => (bool) preg_match('/^(normal|bold|bolder|lighter|[1-9]00)$/i', $value),
                        'font-style' => (bool) preg_match('/^(normal|italic|oblique)$/i', $value),
                        'text-decoration' => (bool) preg_match('/^[a-z\s\-]+$/i', $value),
                        'text-align' => (bool) preg_match('/^(left|center|right|justify)$/i', $value),
                        'background-color' => (bool) preg_match('/^(#[0-9a-f]{3,8}|rgb\([^)]+\)|rgba\([^)]+\)|transparent|[a-z\-]+)$/i', $value),
                        default => false,
                    };

                    if ($isValid) {
                        $cleanStyles[] = sprintf('%s: %s', $property, $value);
                    }
                }

                if (! empty($cleanStyles)) {
                    return 'style="'.implode('; ', $cleanStyles).'"';
                }

                return '';
            },
            $sanitized
        );

        return trim($sanitized);
    }

    private function isSafeTextColor(string $value): bool
    {
        $normalized = strtolower(trim($value));

        if (in_array($normalized, ['white', 'transparent', 'inherit', 'initial', 'unset', 'currentcolor'], true)) {
            return false;
        }

        if (preg_match('/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i', $normalized, $hexMatch) === 1) {
            $hex = $hexMatch[1];

            if (strlen($hex) === 3) {
                $r = hexdec(str_repeat($hex[0], 2));
                $g = hexdec(str_repeat($hex[1], 2));
                $b = hexdec(str_repeat($hex[2], 2));
                $a = 1.0;
            } elseif (strlen($hex) === 6) {
                $r = hexdec(substr($hex, 0, 2));
                $g = hexdec(substr($hex, 2, 2));
                $b = hexdec(substr($hex, 4, 2));
                $a = 1.0;
            } else {
                $r = hexdec(substr($hex, 0, 2));
                $g = hexdec(substr($hex, 2, 2));
                $b = hexdec(substr($hex, 4, 2));
                $a = hexdec(substr($hex, 6, 2)) / 255;
            }

            if ($a <= 0.15) {
                return false;
            }

            $luminance = (0.2126 * $r + 0.7152 * $g + 0.0722 * $b) / 255;

            return $luminance < 0.94;
        }

        if (preg_match('/^rgba?\(([^)]+)\)$/i', $normalized, $rgbMatch) === 1) {
            $parts = array_map('trim', explode(',', $rgbMatch[1]));

            if (count($parts) < 3) {
                return false;
            }

            $r = (float) $parts[0];
            $g = (float) $parts[1];
            $b = (float) $parts[2];
            $a = isset($parts[3]) ? (float) $parts[3] : 1.0;

            if ($r < 0 || $r > 255 || $g < 0 || $g > 255 || $b < 0 || $b > 255 || $a < 0 || $a > 1) {
                return false;
            }

            if ($a <= 0.15) {
                return false;
            }

            $luminance = (0.2126 * $r + 0.7152 * $g + 0.0722 * $b) / 255;

            return $luminance < 0.94;
        }

        return true;
    }
}
