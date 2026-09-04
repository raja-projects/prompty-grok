"use client";

export function ChipGroup({
  label,
  options,
  value,
  onChange,
  allowCustom,
  customValue,
  onCustomChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  allowCustom?: boolean;
  customValue?: string;
  onCustomChange?: (v: string) => void;
}) {
  const opts = allowCustom ? [...options, "Custom"] : [...options];
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-prompty-muted">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {opts.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                active
                  ? "border-prompty-accent bg-prompty-accent/25 text-white"
                  : "border-prompty-border bg-prompty-elevated text-prompty-muted hover:border-prompty-glow hover:text-white"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {allowCustom && value === "Custom" && (
        <input
          type="text"
          value={customValue ?? ""}
          onChange={(e) => onCustomChange?.(e.target.value)}
          placeholder="Describe your custom style…"
          className="mt-1 w-full rounded-xl border border-prompty-border bg-prompty-bg px-3 py-2 text-sm text-white outline-none ring-prompty-accent placeholder:text-prompty-muted/60 focus:ring-2"
        />
      )}
    </div>
  );
}

export function MultiChipGroup({
  label,
  options,
  values,
  onChange,
}: {
  label: string;
  options: readonly string[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  function toggle(opt: string) {
    if (values.includes(opt)) onChange(values.filter((v) => v !== opt));
    else onChange([...values, opt]);
  }
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-prompty-muted">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = values.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                active
                  ? "border-prompty-accent2 bg-prompty-accent2/20 text-white"
                  : "border-prompty-border bg-prompty-elevated text-prompty-muted hover:border-prompty-accent2 hover:text-white"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
