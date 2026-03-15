export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary">
                <img
                    src="/favicon-96x96.png"
                    alt="SNA"
                    className="size-6 object-contain"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Administration
                </span>
            </div>
        </>
    );
}
