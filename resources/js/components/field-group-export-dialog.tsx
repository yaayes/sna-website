import { Download } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type FieldGroup = { key: string; label: string };

type ExportFormat = 'xlsx' | 'csv';

type ExportQuery = Record<string, string | string[]>;

const paymentStatusOptions: { value: string; label: string }[] = [
    { value: 'all', label: 'Tous les paiements' },
    { value: 'captured', label: 'Payé' },
    { value: 'authorized', label: 'Autorisé' },
    { value: 'pending', label: 'En attente' },
    { value: 'rejected', label: 'Refusé' },
    { value: 'cancelled', label: 'Annulé' },
    { value: 'none', label: 'Sans paiement abouti' },
];

/**
 * Generic export dialog for any endpoint backed by an `ExportFieldGroups`
 * registry. Submits a plain browser GET to `exportUrl` so the file downloads.
 */
export default function FieldGroupExportDialog({
    fieldGroups,
    exportUrl,
    search,
    title = 'Exporter les données',
    description = 'Choisissez le format et les groupes de champs à inclure dans l’export.',
    paymentStatusFilter = false,
}: {
    fieldGroups: FieldGroup[];
    exportUrl: (options: { query: ExportQuery }) => string;
    search: string;
    title?: string;
    description?: string;
    paymentStatusFilter?: boolean;
}) {
    const allKeys = useMemo(
        () => fieldGroups.map((group) => group.key),
        [fieldGroups],
    );

    const [open, setOpen] = useState(false);
    const [format, setFormat] = useState<ExportFormat>('xlsx');
    const [selected, setSelected] = useState<string[]>(allKeys);
    const [includeSearch, setIncludeSearch] = useState(true);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('all');

    const allChecked = selected.length === allKeys.length;
    const canSubmit = selected.length > 0;

    const toggleGroup = (key: string, checked: boolean) => {
        setSelected((current) =>
            checked
                ? [...current, key]
                : current.filter((item) => item !== key),
        );
    };

    const toggleAll = (checked: boolean) => {
        setSelected(checked ? allKeys : []);
    };

    const handleExport = () => {
        if (!canSubmit) {
            return;
        }

        const query: ExportQuery = {
            format,
            groups: selected,
        };

        if (includeSearch && search) {
            query.search = search;
        }

        if (dateFrom) {
            query.date_from = dateFrom;
        }

        if (dateTo) {
            query.date_to = dateTo;
        }

        if (paymentStatusFilter && paymentStatus !== 'all') {
            query.payment_status = paymentStatus;
        }

        window.location.href = exportUrl({ query });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                    Exporter
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-2">
                    <div className="grid gap-2">
                        <Label htmlFor="export-format">Format</Label>
                        <Select
                            value={format}
                            onValueChange={(value) =>
                                setFormat(value as ExportFormat)
                            }
                        >
                            <SelectTrigger id="export-format">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="xlsx">
                                    Excel (.xlsx)
                                </SelectItem>
                                <SelectItem value="csv">CSV (.csv)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <Label>Groupes de champs</Label>
                            <button
                                type="button"
                                className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                                onClick={() => toggleAll(!allChecked)}
                            >
                                {allChecked
                                    ? 'Tout décocher'
                                    : 'Tout sélectionner'}
                            </button>
                        </div>
                        <div className="grid gap-2 rounded-lg border p-3 sm:grid-cols-2">
                            {fieldGroups.map((group) => (
                                <label
                                    key={group.key}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <Checkbox
                                        checked={selected.includes(group.key)}
                                        onCheckedChange={(checked) =>
                                            toggleGroup(
                                                group.key,
                                                checked === true,
                                            )
                                        }
                                    />
                                    {group.label}
                                </label>
                            ))}
                        </div>
                        {!canSubmit && (
                            <p className="text-xs text-destructive">
                                Sélectionnez au moins un groupe de champs.
                            </p>
                        )}
                    </div>

                    <div className="grid gap-3">
                        <Label>Filtres</Label>
                        {search && (
                            <label className="flex items-center gap-2 text-sm">
                                <Checkbox
                                    checked={includeSearch}
                                    onCheckedChange={(checked) =>
                                        setIncludeSearch(checked === true)
                                    }
                                />
                                Limiter à la recherche courante «&nbsp;{search}
                                &nbsp;»
                            </label>
                        )}
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="grid gap-1.5">
                                <Label
                                    htmlFor="export-date-from"
                                    className="text-xs text-muted-foreground"
                                >
                                    Du
                                </Label>
                                <Input
                                    id="export-date-from"
                                    type="date"
                                    value={dateFrom}
                                    max={dateTo || undefined}
                                    onChange={(event) =>
                                        setDateFrom(event.target.value)
                                    }
                                />
                            </div>
                            <div className="grid gap-1.5">
                                <Label
                                    htmlFor="export-date-to"
                                    className="text-xs text-muted-foreground"
                                >
                                    Au
                                </Label>
                                <Input
                                    id="export-date-to"
                                    type="date"
                                    value={dateTo}
                                    min={dateFrom || undefined}
                                    onChange={(event) =>
                                        setDateTo(event.target.value)
                                    }
                                />
                            </div>
                        </div>
                        {paymentStatusFilter && (
                            <div className="grid gap-1.5">
                                <Label
                                    htmlFor="export-payment-status"
                                    className="text-xs text-muted-foreground"
                                >
                                    Statut de paiement
                                </Label>
                                <Select
                                    value={paymentStatus}
                                    onValueChange={setPaymentStatus}
                                >
                                    <SelectTrigger id="export-payment-status">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {paymentStatusOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Annuler</Button>
                    </DialogClose>
                    <Button onClick={handleExport} disabled={!canSubmit}>
                        <Download className="h-4 w-4" />
                        Exporter
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
