"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createDress, getCollections, updateDress, uploadDressImage } from "@/lib/api";
import type { Collection, Dress } from "@/lib/types";
import { BUTTON_PRIMARY, BUTTON_SECONDARY, FIELD_INPUT, FIELD_LABEL } from "@/lib/adminStyles";
import Toggle from "./Toggle";
import ImageDropzone from "./ImageDropzone";

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
  const [files, setFiles] = useState<File[]>([]);

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

      for (const file of files) {
        await uploadDressImage(dress.id, file, token);
      }

      onSaved(dress);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save dress.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={FIELD_LABEL}>Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={FIELD_INPUT}
          />
        </div>
        <div>
          <label className={FIELD_LABEL}>Slug</label>
          <input
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="silk-evening-gown"
            className={FIELD_INPUT}
          />
        </div>

        <div>
          <label className={FIELD_LABEL}>Collection</label>
          <select
            value={collectionId ?? ""}
            onChange={(e) => setCollectionId(e.target.value)}
            className={FIELD_INPUT}
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
          <label className={FIELD_LABEL}>Price (leave blank for &quot;Inquire&quot;)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={FIELD_INPUT}
          />
        </div>

        <div>
          <label className={FIELD_LABEL}>Fabric</label>
          <input
            value={fabric}
            onChange={(e) => setFabric(e.target.value)}
            className={FIELD_INPUT}
          />
        </div>
        <div>
          <label className={FIELD_LABEL}>Sizes (comma separated)</label>
          <input
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            placeholder="XS, S, M, L"
            className={FIELD_INPUT}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={FIELD_LABEL}>Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={FIELD_INPUT}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Toggle
          checked={isPublished}
          onChange={setIsPublished}
          label="Published"
          description="Visible on the public site"
        />
        <Toggle
          checked={isFeatured}
          onChange={setIsFeatured}
          label="Featured"
          description="Shown on the homepage"
        />
      </div>

      <ImageDropzone files={files} onChange={setFiles} label={isEditing ? "Add more images" : "Images"} />

      {error && <p className="font-body text-sm text-red-600">{error}</p>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={submitting} className={BUTTON_PRIMARY}>
          {submitting ? "Saving..." : isEditing ? "Save Changes" : "Add Dress"}
        </button>
        <button type="button" onClick={onCancel} className={BUTTON_SECONDARY}>
          Cancel
        </button>
      </div>
    </form>
  );
}
