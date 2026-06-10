<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UpdateAnalyticsRequest;
use App\Models\AppSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('settings/analytics', [
            'ga_measurement_id' => AppSetting::get('ga_measurement_id'),
        ]);
    }

    public function update(UpdateAnalyticsRequest $request): RedirectResponse
    {
        AppSetting::set('ga_measurement_id', $request->input('ga_measurement_id') ?? '');

        return to_route('analytics.edit');
    }
}
