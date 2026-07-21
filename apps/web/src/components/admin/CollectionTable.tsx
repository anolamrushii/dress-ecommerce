import type { Collection } from "@/lib/types";
import { ICON_BUTTON } from "@/lib/adminStyles";

function Badge({ tone, children }: { tone: "gold" | "neutral"; children: React.ReactNode }) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 font-body text-[0.65rem] font-medium uppercase tracking-wide ${
        tone === "gold" ? "bg-gold/10 text-gold-dark" : "bg-charcoal/5 text-muted-foreground"
      }`}
    >
      {children}
    </span>
  );
}

export default function CollectionTable({
  collections,
  onEdit,
  onDelete,
}: {
  collections: Collection[];
  onEdit: (collection: Collection) => void;
  onDelete: (collection: Collection) => void;
}) {
  if (collections.length === 0) {
    return (
      <div className="rounded border border-dashed border-gold-light/60 bg-ivory/40 px-6 py-12 text-center">
        <p className="font-body text-sm text-muted-foreground">
          No collections yet. Add your first one below.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="flex items-center gap-4 rounded border border-gold-light/40 bg-white p-3 transition-shadow hover:shadow-sm sm:p-4"
        >
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded bg-ivory sm:h-20 sm:w-20">
            {collection.cover_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={collection.cover_image_url}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-body text-[0.6rem] text-muted-foreground">
                No image
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-lg leading-tight text-charcoal">
              {collection.name}
            </p>
            <p className="truncate font-body text-xs text-muted-foreground">
              {collection.slug}
              {collection.season ? ` · ${collection.season}` : ""}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge tone={collection.is_published ? "gold" : "neutral"}>
                {collection.is_published ? "Published" : "Draft"}
              </Badge>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-1">
            <button onClick={() => onEdit(collection)} aria-label="Edit" className={ICON_BUTTON}>
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
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(collection)}
              aria-label="Delete"
              className={`${ICON_BUTTON} hover:bg-red-50 hover:text-red-600`}
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
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
