"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createDress, getCollections, updateDress, uploadDressImage } from "@/lib/api";
import type { Collection, Dress } from "@/lib/types";

interface DressFormProps {
  token: string;
  initialDress?: Dress | null;
  onSaved: (dress: Dress) => void;
  onCancel: () => void;
}

export default function DressForm({ token, initialDress, onSaved, onCancel }: DressFormProps) {
  const isEditing = Boolean(initialDress);

  const [collections, setCollections] = useState<Collection[]>([]);
  const [name, setName] = useState(initialDress?.name ?? "");
  const [slug, setSlug] = useState(initialDress?.slug ?? "");
  const [collectionId, setCollectionId] = useState(initialDress?.collection_id ?? "");
  const [description, setDescription] = useState(initialDress?.description ?? "");
  const [fabric, setFabric] = useState(initialDress?.fabric ?? "");
  const [sizes, setSizes] = useState(initialDress?.sizes?.join(", ") ?? "");
  const [price, setPrice] = useState(initialDress?.price ?? "");
  const [isFeatured, setIsFeatured] = useState(initialDress?.is_featured ?? false);
  const [isPublished, setIsPublished] = useState(initialDress?.is_published ?? true);
  const [files, setFiles] = useState<FileList | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCollections(token)
      .then(setCollections)
      .catch(() => setCollections([]));
  }, [token]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      name,
      slug,
      collection_id: collectionId || null,
      description: description || null,
      fabric: fabric || null,
      sizes: sizes
        ? sizes.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      price: price === "" ? null : Number(price),
      is_featured: isFeatured,
      is_published: isPublished,
    };

    try {
      const dress = isEditing
        ? await updateDress(initialDress!.id, payload, token)
        : await createDress(payload, token);

      if (files && files.length > 0) {
        for (const file of Array.from(files)) {
          await uploadDressImage(dress.id, file, token);
        }
      }

      onSaved(dress);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save dress.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block font-body text-sm text-charcoal">Name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gold-light bg-white px-4 py-2 font-body text-charcoal focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block font-body text-sm text-charcoal">Slug</label>
        <input
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="silk-evening-gown"
          className="w-full border border-gold-light bg-white px-4 py-2 font-body text-charcoal focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block font-body text-sm text-charcoal">Collection</label>
        <select
          value={collectionId ?? ""}
          onChange={(e) => setCollectionId(e.target.value)}
          className="w-full border border-gold-light bg-white px-4 py-2 font-body text-charcoal focus:border-gold focus:outline-none"
        >
          <option value="">None</option>
          {collections.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block font-body text-sm text-charcoal">Price (leave blank for &quot;Inquire&quot;)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gold-light bg-white px-4 py-2 font-body text-charcoal focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block font-body text-sm text-charcoal">Fabric</label>
        <input
          value={fabric}
          onChange={(e) => setFabric(e.target.value)}
          className="w-full border border-gold-light bg-white px-4 py-2 font-body text-charcoal focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block font-body text-sm text-charcoal">Sizes (comma separated)</label>
        <input
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
          placeholder="XS, S, M, L"
          className="w-full border border-gold-light bg-white px-4 py-2 font-body text-charcoal focus:border-gold focus:outline-none"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="mb-1 block font-body text-sm text-charcoal">Description</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gold-light bg-white px-4 py-2 font-body text-charcoal focus:border-gold focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="is_featured"
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        <label htmlFor="is_featured" className="font-body text-sm text-charcoal">
          Featured on homepage
        </label>
      </div>
      <div className="flex items-center gap-2">
        <input
          id="is_published"
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
        <label htmlFor="is_published" className="font-body text-sm text-charcoal">
          Published (visible on the public site)
        </label>
      </div>

      <div className="sm:col-span-2">
        <label className="mb-1 block font-body text-sm text-charcoal">
          {isEditing ? "Add more images" : "Images"}
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="w-full font-body text-sm text-charcoal"
        />
      </div>

      {error && <p className="font-body text-sm text-red-600 sm:col-span-2">{error}</p>}

      <div className="flex gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-gold px-8 py-3 font-body text-sm uppercase tracking-widest text-white transition-colors hover:bg-gold-dark disabled:opacity-60"
        >
          {submitting ? "Saving..." : isEditing ? "Save Changes" : "Add Dress"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-gold-light px-8 py-3 font-body text-sm uppercase tracking-widest text-charcoal transition-colors hover:bg-ivory"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
