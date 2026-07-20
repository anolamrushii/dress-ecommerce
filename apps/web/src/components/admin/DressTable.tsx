import type { Dress } from "@/lib/types";

export default function DressTable({
  dresses,
  onEdit,
  onDelete,
}: {
  dresses: Dress[];
  onEdit: (dress: Dress) => void;
  onDelete: (dress: Dress) => void;
}) {
  if (dresses.length === 0) {
    return <p className="font-body text-charcoal/60">No dresses yet. Add your first one below.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse font-body text-sm">
        <thead>
          <tr className="border-b border-gold-light text-left text-charcoal/60">
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Slug</th>
            <th className="py-2 pr-4">Price</th>
            <th className="py-2 pr-4">Published</th>
            <th className="py-2 pr-4">Featured</th>
            <th className="py-2 pr-4">Images</th>
            <th className="py-2 pr-4" />
          </tr>
        </thead>
        <tbody>
          {dresses.map((dress) => (
            <tr key={dress.id} className="border-b border-gold-light/30">
              <td className="py-3 pr-4 text-charcoal">{dress.name}</td>
              <td className="py-3 pr-4 text-charcoal/70">{dress.slug}</td>
              <td className="py-3 pr-4 text-charcoal/70">
                {dress.price ? `$${dress.price}` : "Inquire"}
              </td>
              <td className="py-3 pr-4">{dress.is_published ? "Yes" : "No"}</td>
              <td className="py-3 pr-4">{dress.is_featured ? "Yes" : "No"}</td>
              <td className="py-3 pr-4">{dress.images.length}</td>
              <td className="py-3 pr-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(dress)}
                    className="text-gold-dark hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(dress)}
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
