<?php

namespace App\Http\Requests\Admin;

use App\Exports\MoiAussiExportGroups;

class ExportMoiAussiRequest extends ExportFieldGroupsRequest
{
    /**
     * @return array<int, string>
     */
    protected function allowedGroups(): array
    {
        return MoiAussiExportGroups::keys();
    }
}
