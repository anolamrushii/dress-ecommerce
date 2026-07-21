"use client";

export default function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded border border-gold-light/60 bg-white px-4 py-3.5 text-left transition-colors hover:border-gold-light"
    >
      <span>
        <span className="block font-body text-sm text-charcoal">{label}</span>
        {description && (
          <span className="mt-0.5 block font-body text-xs text-muted-foreground">
            {description}
          </span>
        )}
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-gold" : "bg-gold-light/40"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}
