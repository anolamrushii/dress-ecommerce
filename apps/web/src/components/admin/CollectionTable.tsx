import type { Collection } from "@/lib/types";

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
      <p className="font-body text-charcoal/60">No collections yet. Add your first one below.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse font-body text-sm">
        <thead>
          <tr className="border-b border-gold-light text-left text-charcoal/60">
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Slug</th>
            <th className="py-2 pr-4">Season</th>
            <th className="py-2 pr-4">Published</th>
            <th className="py-2 pr-4" />
          </tr>
        </thead>
        <tbody>
          {collections.map((collection) => (
            <tr key={collection.id} className="border-b border-gold-light/30">
              <td className="py-3 pr-4 text-charcoal">{collection.name}</td>
              <td className="py-3 pr-4 text-charcoal/70">{collection.slug}</td>
              <td className="py-3 pr-4 text-charcoal/70">{collection.season ?? "-"}</td>
              <td className="py-3 pr-4">{collection.is_published ? "Yes" : "No"}</td>
              <td className="py-3 pr-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(collection)}
                    className="text-gold-dark hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(collection)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
