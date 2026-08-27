# Field-group exports (back-office)

Lets a webmaster download form submissions as **Excel (.xlsx)** or **CSV**,
choosing which data to include by **field group** (a group maps to one or more
spreadsheet columns) rather than column-by-column.

Live on:

| Form | Route name | Files |
| --- | --- | --- |
| Formulaires Adhésion Aidant | `admin.adhesion.export` | `App\Exports\AidantAdhesion*` |
| Formulaires Moi Aussi | `admin.moi-aussi.export` | `App\Exports\MoiAussi*` |

---

## Decisions

| # | Decision | Rationale |
| --- | --- | --- |
| 1 | **Package: `maatwebsite/excel`** (Laravel Excel, resolved v4). | De-facto standard; one class emits both XLSX and CSV; `FromQuery` chunks the query; `WithHeadings`/`WithMapping` fit dynamic column sets; clean upgrade path to queued exports. Alternative considered: `spatie/simple-excel` (lighter, but no queued-export helpers / mapping interfaces). |
| 2 | **Selection granularity = field *group*, not field.** A group yields 1+ columns. | Requested. Keeps the UI short and the mental model simple ("Identité", "Paiement", …). Single-value groups (`ref`, `email`, `phone`) are just groups with one column. |
| 3 | **Repeating / nested JSON data (e.g. `aidants`, `aides`) → one readable cell.** | Requested. One checkbox emits the whole collection as `Aidant 1 — Jean Martin \| jean@… \| Type : Conjoint(e)` lines separated by `\n` inside a single cell. Not expanded columns, not JSON, not a second sheet. |
| 4 | **Values are human-readable.** Slugs → labels, cents → `40,00 €`, bools → `Oui`/`Non`, nullable bools → `Oui`/`Non`/empty, dates → `d/m/Y H:i`. | Requested. Label maps are ported into the PHP registry from the admin `show.tsx` pages so the export matches what admins see in the UI. |
| 5 | **Both XLSX and CSV**, chosen in the dialog. | Requested. Covers Excel users and data pipelines. |
| 6 | **Scope + filters:** each export defines its own base query. Adhesion is restricted to `status = completed` and adds a **payment-status** filter; both forms support **free-text search** (reusing the list screen's search) and a **date range**. | Matches each list screen. Moi Aussi has no status column and no payments, so it has neither of those. |
| 7 | **Synchronous download** (`->download()`), not queued. | Form-submission volumes are low (hundreds–low thousands). If a form ever reaches tens of thousands of rows, switch that export to `->queue()` + notification — no registry changes needed. |
| 8 | **Access:** any `is_admin` user. | Endpoints live in the existing `admin` middleware group; no finer role exists. |
| 9 | **Download trigger:** the dialog sets `window.location.href` to the Wayfinder `…export.url({ query })`. | A plain browser GET streams the file. An Inertia visit cannot receive a binary body. |
| 10 | **Registry is the single source of truth.** Group keys/labels feed the UI, request validation, headings and row mapping from one `definition()`. | Backend and UI can't drift; adding a column is a one-line change in one file. |
| 11 | **Array query params** serialize as `groups[]=ref&groups[]=email` (Wayfinder default) and validate as `groups.*`. | — |

---

## Architecture

Reusable pieces (form-agnostic):

| File | Role |
| --- | --- |
| `app/Exports/ExportFieldGroups.php` | Abstract registry base. Subclass implements `definition()`; base provides `metadata()`, `keys()`, `headings()`, `row()`, `selected()` and formatting helpers (`label`, `withPrecisions`, `joinList`, `euros`, `bool`, `nullableBool`, `labelledPart`). |
| `app/Exports/FieldGroupExport.php` | Abstract Laravel Excel export. `implements FromQuery, ShouldAutoSize, WithHeadings, WithMapping` + `use Exportable`. Constructor `(array $groups, array $filters)`. Subclass implements `query()` and `groupRegistry()`. |
| `app/Http/Requests/Admin/ExportFieldGroupsRequest.php` | Abstract form request. Validates `format` (`xlsx`/`csv`), `groups` (≥1, each in `allowedGroups()`), `search`, `date_from`, `date_to`. Subclass implements `allowedGroups()`; may add rules via `extraRules()`. |
| `app/Concerns/ExportsFieldGroups.php` | Controller trait. `downloadFieldGroupExport($exportClass, $validated, $filenamePrefix)` → resolves writer type, builds the `$filters` array, returns `BinaryFileResponse` named `prefix-YYYY-MM-DD.ext`. |
| `resources/js/components/field-group-export-dialog.tsx` | Generic dialog: format select, per-group checkboxes (+ select/deselect-all, all-checked by default), "limit to current search" toggle, date range, optional payment-status select (`paymentStatusFilter` prop). Props: `fieldGroups`, `exportUrl` (a Wayfinder `…url` fn), `search`, `title?`, `description?`, `paymentStatusFilter?`. |
| `resources/js/components/admin-table-wrapper.tsx` | Has an optional `actions` slot (next to the title) where the dialog is mounted. |

Per-form pieces (small):

```
app/Exports/<Form>ExportGroups.php     extends ExportFieldGroups   — the column map + label consts
app/Exports/<Form>FormsExport.php      extends FieldGroupExport     — query() + groupRegistry()
app/Http/Requests/Admin/Export<Form>Request.php  extends ExportFieldGroupsRequest — allowedGroups() [+ extraRules()]
```

Request flow:

```
GET /@/<form>/export?format=csv&groups[]=ref&groups[]=email&search=…&date_from=…
  → admin middleware
  → Export<Form>Request  (validates format/groups/filters)
  → <Form>Controller::export()  → $this->downloadFieldGroupExport(<Form>FormsExport::class, $request->validated(), '<prefix>')
  → new <Form>FormsExport($groups, $filters)
      ->query()      base query + when() filters, stable orderByDesc(created_at)->orderBy(id)
      ->headings()   <Form>ExportGroups::headings($groups)
      ->map($row)    <Form>ExportGroups::row($row, $groups)
  → BinaryFileResponse (attachment; <prefix>-YYYY-MM-DD.csv)
```

---

## Recipe: add exports to another form

Assume a `WidgetForm` model with an admin list at `admin.widgets.index`
(`WidgetController::index` rendering `admin/widgets/index`).

### 1. Registry — `app/Exports/WidgetExportGroups.php`

```php
<?php

namespace App\Exports;

use App\Models\WidgetForm;

class WidgetExportGroups extends ExportFieldGroups
{
    private const KINDS = ['a' => 'Type A', 'b' => 'Type B']; // port label maps from show.tsx

    /**
     * @return array<string, array{label: string, columns: array<string, callable(WidgetForm): (string|null)>}>
     */
    protected static function definition(): array
    {
        return [
            'ref'   => ['label' => 'Référence', 'columns' => [
                'Référence' => fn (WidgetForm $w): ?string => $w->ref,
            ]],
            'email' => ['label' => 'Email', 'columns' => [
                'Email' => fn (WidgetForm $w): ?string => $w->email,
            ]],
            'details' => ['label' => 'Détails', 'columns' => [
                'Type'   => fn (WidgetForm $w): ?string => self::label(self::KINDS, $w->kind),
                'Notes'  => fn (WidgetForm $w): ?string => $w->notes,
                'Tags'   => fn (WidgetForm $w): ?string => self::joinList($w->tags), // json array
                'Actif'  => fn (WidgetForm $w): string  => self::bool($w->is_active),
            ]],
            'meta' => ['label' => 'Métadonnées', 'columns' => [
                'Date de soumission' => fn (WidgetForm $w): ?string => $w->created_at?->format('d/m/Y H:i'),
            ]],
        ];
    }
}
```

Group-order in `definition()` = column order in the file (independent of the
order the user ticks boxes). For a repeating relation/JSON collection, add a
one-column group whose resolver returns a `\n`-joined readable string (see
`AidantAdhesionExportGroups::formatAidants()`).

### 2. Export — `app/Exports/WidgetFormsExport.php`

```php
<?php

namespace App\Exports;

use App\Models\WidgetForm;
use Illuminate\Database\Eloquent\Builder;

class WidgetFormsExport extends FieldGroupExport
{
    /** @return Builder<WidgetForm> */
    public function query(): Builder
    {
        return WidgetForm::query()
            ->when($this->filters['search'] ?? null, function (Builder $q, string $s): void {
                $q->where(fn (Builder $i) => $i
                    ->where('email', 'ilike', "%{$s}%")
                    ->orWhere('ref', 'ilike', "%{$s}%"));
            })
            ->when($this->filters['date_from'] ?? null, fn (Builder $q, string $d) => $q->whereDate('created_at', '>=', $d))
            ->when($this->filters['date_to'] ?? null, fn (Builder $q, string $d) => $q->whereDate('created_at', '<=', $d))
            ->orderByDesc('created_at')
            ->orderBy('id'); // stable tie-breaker — required for chunked FromQuery
    }

    /** @return class-string<WidgetExportGroups> */
    protected function groupRegistry(): string
    {
        return WidgetExportGroups::class;
    }
}
```

Eager-load anything the resolvers touch (`->with(...)`). Only read
`$this->filters[...]` keys you actually support.

### 3. Request — `app/Http/Requests/Admin/ExportWidgetRequest.php`

```php
<?php

namespace App\Http\Requests\Admin;

use App\Exports\WidgetExportGroups;

class ExportWidgetRequest extends ExportFieldGroupsRequest
{
    /** @return array<int, string> */
    protected function allowedGroups(): array
    {
        return WidgetExportGroups::keys();
    }

    // Optional: extra filter rules
    // protected function extraRules(): array
    // {
    //     return ['status' => ['nullable', \Illuminate\Validation\Rule::in(['open', 'closed'])]];
    // }
}
```

### 4. Controller

```php
use App\Concerns\ExportsFieldGroups;
use App\Exports\WidgetExportGroups;
use App\Exports\WidgetFormsExport;
use App\Http\Requests\Admin\ExportWidgetRequest;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class WidgetController extends Controller
{
    use ExportsFieldGroups;

    public function index(Request $request): Response
    {
        // …
        return Inertia::render('admin/widgets/index', [
            'entries' => /* … */,
            'filters' => ['search' => /* … */],
            'fieldGroups' => WidgetExportGroups::metadata(), // <-- add
        ]);
    }

    public function export(ExportWidgetRequest $request): BinaryFileResponse
    {
        return $this->downloadFieldGroupExport(
            WidgetFormsExport::class,
            $request->validated(),
            'widgets',
        );
    }
}
```

### 5. Route (`routes/web.php`, inside the `admin` group)

```php
Route::get('/widgets', [WidgetController::class, 'index'])->name('widgets.index');
Route::get('/widgets/export', [WidgetController::class, 'export'])->name('widgets.export'); // BEFORE the {widget} route
Route::get('/widgets/{widget}', [WidgetController::class, 'show'])->name('widgets.show');
```

`/export` **must** be declared before any `/{widget}` wildcard, or model
binding swallows it.

### 6. Regenerate Wayfinder

```bash
php artisan wayfinder:generate --with-form --no-interaction
```

Always pass `--with-form` — that's what the Vite plugin (`formVariants: true`)
produces; a bare run strips form variants other pages rely on. Note
`resources/js/routes` and `resources/js/actions` are git-ignored and rebuilt by
`npm run dev` / `npm run build`.

### 7. Front-end (`resources/js/pages/admin/widgets/index.tsx`)

```tsx
import FieldGroupExportDialog from '@/components/field-group-export-dialog';
import admin from '@/routes/admin';

export default function WidgetsIndex({ entries, filters, fieldGroups }: {
    entries: Paginated<WidgetEntry>;
    filters: { search: string };
    fieldGroups: { key: string; label: string }[];
}) {
    return (
        <AppLayout /* … */>
            <AdminTableWrapper
                /* …existing props… */
                actions={
                    <FieldGroupExportDialog
                        fieldGroups={fieldGroups}
                        exportUrl={admin.widgets.export.url}
                        search={filters.search ?? ''}
                        title="Exporter les widgets"
                        // paymentStatusFilter   // only if the request/query supports payment_status
                    />
                }
            >
                {/* table */}
            </AdminTableWrapper>
        </AppLayout>
    );
}
```

### 8. Tests — `tests/Feature/Admin/WidgetExportTest.php`

Copy `MoiAussiExportTest` and adjust. Cover: 403 for non-admin, redirect for
guests, XLSX download headers, CSV contains **only** the selected group
headings + expected human-readable values, each filter narrows the result,
`422` for unknown group / no group / bad format, and the `fieldGroups` prop on
the index. Read the streamed file in tests with:

```php
$content = $response->baseResponse->getFile()->getContent();
```

### 9. Finalise

```bash
vendor/bin/pint --dirty --format agent
php artisan test --compact --filter=WidgetExport
```

---

## Conventions / gotchas

- **Stable ordering.** `FromQuery` chunks with LIMIT/OFFSET; always end `query()`
  with `->orderBy('id')` (or another unique key) after the primary sort.
- **Canonical column order** comes from `definition()` order, via
  `ExportFieldGroups::selected()` — not from the user's tick order.
- **`null` vs `""`.** Resolvers return `?string`; `null`/empty become blank
  cells. Use `bool()` for non-null booleans, `nullableBool()` for tri-state.
- **Nested cells with newlines** are quoted correctly by the CSV writer.
- **Label maps** currently live in both the PHP registry and the React
  `show.tsx`. Keep them in sync; consolidating into shared PHP enums is a
  possible follow-up.
- **New dependency.** `maatwebsite/excel` was added to `composer.json`
  (auto-discovered; no manual provider/config publish needed).

## If volume grows (queued export)

`FieldGroupExport` already uses the `Exportable` trait, so per form:

1. Controller: `->store("exports/widgets-{$uuid}.xlsx", 'local')` via `->queue(...)`,
   or dispatch a job that calls it.
2. Notify the user (mail/DB notification) with a signed, expiring download link
   when the file is ready; prune old files on a schedule.
3. No changes to the registry, request, or dialog.
