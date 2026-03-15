import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <AuthLayout
            title="Connexion à votre espace"
            description="Saisissez votre adresse e-mail et votre mot de passe pour accéder à votre espace"
        >
            <Head title="Connexion" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Adresse e-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="votre@email.fr"
                                    className="rounded-xl focus:border-sna-teal focus:ring-sna-teal/40"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        Mot de passe
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm text-sna-teal hover:text-sna-teal-dark"
                                            tabIndex={5}
                                        >
                                            Mot de passe oublié ?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Mot de passe"
                                    className="rounded-xl focus:border-sna-teal focus:ring-sna-teal/40"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">
                                    Se souvenir de moi
                                </Label>
                            </div>

                            <button
                                type="submit"
                                className="mt-2 w-full rounded-full bg-sna-teal py-3 text-sm font-bold text-white shadow-lg shadow-sna-teal/20 transition-all hover:-translate-y-0.5 hover:bg-sna-teal-dark disabled:opacity-60"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Spinner />
                                        Connexion…
                                    </span>
                                ) : (
                                    'Se connecter'
                                )}
                            </button>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-sna-teal">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
