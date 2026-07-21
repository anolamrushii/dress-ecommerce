export default function LoadingSpinner({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-2.5" role="status" aria-label={label}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-gold [animation:dot-pulse_1.2s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
      </div>
      <p className="font-body text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
