export function Header() {
  return (
    <header className="relative z-10 border-b border-prompty-border/80 bg-prompty-bg/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-prompty-accent to-prompty-accent2 shadow-glow-sm">
            <span className="text-lg font-black text-white">P</span>
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
              Prompty
            </h1>
            <p className="text-xs text-prompty-muted">Prompt lab for image &amp; video AI</p>
          </div>
        </div>
        <p className="hidden text-right text-xs text-prompty-muted sm:block">
          Client-side assembly · No generation APIs · One-click copy
        </p>
      </div>
    </header>
  );
}
