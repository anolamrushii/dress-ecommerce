"use client";

export default function FabButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-lg bg-gold px-6 py-4 font-body text-sm font-medium uppercase tracking-wider text-white shadow-lg transition-transform hover:bg-gold-dark active:scale-95"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 shrink-0"
        aria-hidden="true"
      >
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
      {label}
    </button>
  );
}
