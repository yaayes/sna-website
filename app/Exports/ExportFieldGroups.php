<?php

namespace App\Exports;

use Illuminate\Database\Eloquent\Model;

/**
 * Base class for a form's export field-group registry.
 *
 * A subclass declares an ordered map of groups in {@see static::definition()}.
 * Each group has a label (shown in the export UI) and one or more columns; a
 * column is a heading plus a resolver closure that receives the Eloquent model
 * and returns a scalar cell value.
 *
 * The registry is the single source of truth shared by the export UI
 * (via {@see metadata()}), request validation (via {@see keys()}) and the
 * export itself (via {@see headings()} / {@see row()}).
 */
abstract class ExportFieldGroups
{
    /**
     * Ordered field groups, keyed by their stable group key.
     *
     * @return array<string, array{label: string, columns: array<string, callable(covariant Model): (string|null)>}>
     */
    abstract protected static function definition(): array;

    /**
     * Group keys and labels for the export UI.
     *
     * @return array<int, array{key: string, label: string}>
     */
    public static function metadata(): array
    {
        $groups = [];

        foreach (static::definition() as $key => $group) {
            $groups[] = ['key' => $key, 'label' => $group['label']];
        }

        return $groups;
    }

    /**
     * @return array<int, string>
     */
    public static function keys(): array
    {
        return array_keys(static::definition());
    }

    /**
     * Heading row for the selected groups, in canonical definition order.
     *
     * @param  array<int, string>  $groups
     * @return array<int, string>
     */
    public static function headings(array $groups): array
    {
        $headings = [];

        foreach (static::selected($groups) as $group) {
            foreach (array_keys($group['columns']) as $heading) {
                $headings[] = $heading;
            }
        }

        return $headings;
    }

    /**
     * Data row for one model, matching {@see headings()} column-for-column.
     *
     * @param  array<int, string>  $groups
     * @return array<int, string|null>
     */
    public static function row(Model $model, array $groups): array
    {
        $row = [];

        foreach (static::selected($groups) as $group) {
            foreach ($group['columns'] as $resolver) {
                $row[] = $resolver($model);
            }
        }

        return $row;
    }

    /**
     * Selected groups in their canonical definition order, regardless of the
     * order the user checked them in the UI.
     *
     * @param  array<int, string>  $groups
     * @return array<string, array{label: string, columns: array<string, callable(covariant Model): (string|null)>}>
     */
    protected static function selected(array $groups): array
    {
        return array_filter(
            static::definition(),
            fn (string $key): bool => in_array($key, $groups, true),
            ARRAY_FILTER_USE_KEY,
        );
    }

    /**
     * @param  array<string, string>  $map
     */
    protected static function label(array $map, ?string $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        return $map[$value] ?? $value;
    }

    protected static function withPrecisions(?string $value, ?string $precisions): ?string
    {
        $hasPrecisions = $precisions !== null && $precisions !== '';

        if ($value === null || $value === '') {
            return $hasPrecisions ? "({$precisions})" : null;
        }

        return $hasPrecisions ? "{$value} ({$precisions})" : $value;
    }

    /**
     * @param  array<int, string>|null  $list
     */
    protected static function joinList(?array $list): ?string
    {
        return empty($list) ? null : implode(', ', $list);
    }

    protected static function euros(?int $cents): ?string
    {
        return $cents === null ? null : number_format($cents / 100, 2, ',', ' ').' €';
    }

    protected static function bool(?bool $value): string
    {
        return $value ? 'Oui' : 'Non';
    }

    protected static function nullableBool(?bool $value): ?string
    {
        return $value === null ? null : ($value ? 'Oui' : 'Non');
    }

    protected static function labelledPart(string $label, ?string $value): ?string
    {
        return $value === null || $value === '' ? null : "{$label} : {$value}";
    }
}
