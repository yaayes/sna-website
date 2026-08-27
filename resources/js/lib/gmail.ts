export function buildGmailReplyUrl(entry: {
    email: string;
    name: string;
    subject: string;
    message: string;
    created_at: string;
}): string {
    const quoted = entry.message
        .split('\n')
        .map((line) => `> ${line}`)
        .join('\n');

    const body = `Bonjour ${entry.name},\n\n\n\n---\nMessage original du ${new Date(entry.created_at).toLocaleString('fr-FR')} :\n${quoted}`;

    const params = new URLSearchParams({
        view: 'cm',
        fs: '1',
        to: entry.email,
        su: `Re: ${entry.subject}`,
        body,
    });

    return `https://mail.google.com/mail/?${params.toString()}`;
}
