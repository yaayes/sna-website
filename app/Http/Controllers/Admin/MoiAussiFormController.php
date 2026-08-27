<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\ExportsFieldGroups;
use App\Exports\MoiAussiExportGroups;
use App\Exports\MoiAussiFormsExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ExportMoiAussiRequest;
use App\Models\MoiAussiForm;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MoiAussiFormController extends Controller
{
    use ExportsFieldGroups;

    public function index(Request $request): Response
    {
        $query = MoiAussiForm::query()->with('action:id,title,slug')->latest();

        if ($search = $request->string('search')->trim()->value()) {
            $query->where(function ($q) use ($search): void {
                $q->where('email', 'ilike', "%{$search}%")
                    ->orWhere('ref', 'ilike', "%{$search}%")
                    ->orWhere('name', 'ilike', "%{$search}%");
            });
        }

        return Inertia::render('admin/moi-aussi/index', [
            'entries' => $query->paginate(20)->withQueryString(),
            'filters' => ['search' => $request->string('search')->trim()->value()],
            'fieldGroups' => MoiAussiExportGroups::metadata(),
        ]);
    }

    public function export(ExportMoiAussiRequest $request): BinaryFileResponse
    {
        return $this->downloadFieldGroupExport(
            MoiAussiFormsExport::class,
            $request->validated(),
            'moi-aussi',
        );
    }

    public function show(MoiAussiForm $moiAussiForm): Response
    {
        $moiAussiForm->load('action:id,title,slug');

        return Inertia::render('admin/moi-aussi/show', [
            'entry' => $moiAussiForm,
        ]);
    }
}
