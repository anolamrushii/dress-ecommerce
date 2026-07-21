"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import {
  createDress,
  deleteDressImage,
  getCollections,
  updateDress,
  uploadDressImage,
} from "@/lib/api";
import type { Collection, Dress, DressImage } from "@/lib/types";
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
  const [descriptionEn, setDescriptionEn] = useState(initialDress?.description_en ?? "");
  const [descriptionSq, setDescriptionSq] = useState(initialDress?.description_sq ?? "");
  const [fabric, setFabric] = useState(initialDress?.fabric ?? "");
  const [sizes, setSizes] = useState(initialDress?.sizes?.join(", ") ?? "");
  const [price, setPrice] = useState(initialDress?.price ?? "");
  const [isFeatured, setIsFeatured] = useState(initialDress?.is_featured ?? false);
  const [isPublished, setIsPublished] = useState(initialDress?.is_published ?? true);
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<DressImage[]>(initialDress?.images ?? []);
  const [removingImageId, setRemovingImageId] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRemoveExistingImage(image: DressImage) {
    if (!initialDress) return;
    if (!confirm("Remove this photo? This cannot be undone.")) return;

    setRemovingImageId(image.id);
    setError(null);
    try {
      await deleteDressImage(initialDress.id, image.id, token);
      setExistingImages((imgs) => imgs.filter((img) => img.id !== image.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove image.");
    } finally {
      setRemovingImageId(null);
    }
  }

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
      description_en: descriptionEn || null,
      description_sq: descriptionSq || null,
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

        <div>
          <label className={FIELD_LABEL}>Description (English)</label>
          <textarea
            rows={3}
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            className={FIELD_INPUT}
          />
        </div>
        <div>
          <label className={FIELD_LABEL}>Description (Albanian)</label>
          <textarea
            rows={3}
            value={descriptionSq}
            onChange={(e) => setDescriptionSq(e.target.value)}
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

      {existingImages.length > 0 && (
        <div>
          <label className={FIELD_LABEL}>Current photos</label>
          <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {existingImages.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded bg-ivory"
              >
                <Image
                  src={image.image_url}
                  alt={image.alt_text ?? ""}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(image)}
                  disabled={removingImageId === image.id}
                  aria-label="Remove photo"
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal/70 text-white transition-colors hover:bg-charcoal disabled:opacity-50"
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
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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
