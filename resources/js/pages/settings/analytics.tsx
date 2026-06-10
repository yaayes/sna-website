import { Transition } from '@headlessui/react';
import { Form, Head, usePage } from '@inertiajs/react';
import AnalyticsController from '@/actions/App/Http/Controllers/Settings/AnalyticsController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/analytics';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Analytics settings',
        href: edit(),
    },
];

export default function Analytics({
    gtm_container_id,
}: {
    gtm_container_id: string | null;
}) {
    const { auth } = usePage().props;
    const isAdmin = auth.user.is_admin;
    const isActive = !!gtm_container_id;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics settings" />

            <h1 className="sr-only">Analytics settings</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    <Heading
                        variant="small"
                        title="Google Tag Manager"
                        description="Connect Google Tag Manager to track visits and user behaviour on the site"
                    />

                    <div className="flex items-center gap-2 text-sm">
                        <span
                            className={`inline-block h-2 w-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-neutral-300'}`}
                        />
                        <span className="text-muted-foreground">
                            {isActive
                                ? `Tracking active — ${gtm_container_id}`
                                : 'Tracking inactive — no GTM container configured'}
                        </span>
                    </div>

                    {isAdmin ? (
                        <Form
                            {...AnalyticsController.update.form()}
                            options={{ preserveScroll: true }}
                            className="space-y-6"
                        >
                            {({ processing, recentlySuccessful, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="gtm_container_id">
                                            GTM Container ID
                                        </Label>

                                        <Input
                                            id="gtm_container_id"
                                            name="gtm_container_id"
                                            className="mt-1 block w-full max-w-sm font-mono"
                                            defaultValue={
                                                gtm_container_id ?? ''
                                            }
                                            placeholder="GTM-XXXXXXX"
                                            autoComplete="off"
                                        />

                                        <p className="text-sm text-muted-foreground">
                                            Find your Container ID in{' '}
                                            <span className="font-medium">
                                                Google Tag Manager → Admin →
                                                Container Settings
                                            </span>
                                            . Leave blank to disable tracking.
                                        </p>

                                        <InputError
                                            className="mt-2"
                                            message={errors.gtm_container_id}
                                        />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button disabled={processing}>
                                            Save
                                        </Button>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-neutral-600">
                                                Saved
                                            </p>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Form>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Only administrators can update analytics settings.
                        </p>
                    )}
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
