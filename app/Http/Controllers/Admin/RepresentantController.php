<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRepresentantRequest;
use App\Http\Requests\UpdateRepresentantRequest;
use App\Models\Representant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class RepresentantController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/representants/index', [
            'representants' => Representant::query()
                ->orderBy('sort_order')
                ->orderBy('last_name')
                ->get(['id', 'department_code', 'department_name', 'first_name', 'last_name', 'role', 'photo_path', 'sort_order', 'is_active', 'updated_at']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/representants/create');
    }

    public function store(StoreRepresentantRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('representants', 'public');
            $photoPath = Storage::url($path);
        }

        Representant::create([
            'department_code' => $validated['department_code'],
            'department_name' => $validated['department_name'],
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'role' => $validated['role'],
            'short_bio' => $validated['short_bio'],
            'photo_path' => $photoPath,
            'sort_order' => $validated['sort_order'] ?? (((int) Representant::max('sort_order')) + 1),
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return redirect()->route('admin.representants.index')->with('success', 'Representant cree avec succes.');
    }

    public function edit(Representant $representant): Response
    {
        return Inertia::render('admin/representants/edit', [
            'representant' => $representant->only([
                'id', 'department_code', 'department_name', 'first_name', 'last_name',
                'role', 'short_bio', 'photo_path', 'sort_order', 'is_active',
            ]),
        ]);
    }

    public function update(UpdateRepresentantRequest $request, Representant $representant): RedirectResponse
    {
        $validated = $request->validated();

        $photoPath = $representant->photo_path;
        if ($request->hasFile('photo')) {
            if ($photoPath && str_starts_with($photoPath, '/storage/')) {
                Storage::disk('public')->delete(Str::after($photoPath, '/storage/'));
            }
            $path = $request->file('photo')->store('representants', 'public');
            $photoPath = Storage::url($path);
        }

        $representant->update([
            'department_code' => $validated['department_code'],
            'department_name' => $validated['department_name'],
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'role' => $validated['role'],
            'short_bio' => $validated['short_bio'],
            'photo_path' => $photoPath,
            'sort_order' => $validated['sort_order'] ?? $representant->sort_order,
            'is_active' => $validated['is_active'] ?? $representant->is_active,
        ]);

        return redirect()->route('admin.representants.index')->with('success', 'Representant mis a jour avec succes.');
    }

    public function destroy(Representant $representant): RedirectResponse
    {
        if ($representant->photo_path && str_starts_with($representant->photo_path, '/storage/')) {
            Storage::disk('public')->delete(Str::after($representant->photo_path, '/storage/'));
        }

        $representant->delete();

        return redirect()->route('admin.representants.index')->with('success', 'Representant supprime avec succes.');
    }
}
