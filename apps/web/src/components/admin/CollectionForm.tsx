"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { createCollection, updateCollection, uploadCollectionCoverImage } from "@/lib/api";
import type { Collection } from "@/lib/types";
import { BUTTON_PRIMARY, BUTTON_SECONDARY, FIELD_INPUT, FIELD_LABEL } from "@/lib/adminStyles";
import Toggle from "./Toggle";
import ImageDropzone from "./ImageDropzone";

interface CollectionFormProps {
  token: string;
  initialCollection?: Collection | null;
  onSaved: (collection: Collection) => void;
  onCancel: () => void;
}

export default function CollectionForm({
  token,
  initialCollection,
  onSaved,
  onCancel,
}: CollectionFormProps) {
  const isEditing = Boolean(initialCollection);

  const [name, setName] = useState(initialCollection?.name ?? "");
  const [slug, setSlug] = useState(initialCollection?.slug ?? "");
  const [season, setSeason] = useState(initialCollection?.season ?? "");
  const [descriptionEn, setDescriptionEn] = useState(initialCollection?.description_en ?? "");
  const [descriptionSq, setDescriptionSq] = useState(initialCollection?.description_sq ?? "");
  const [existingCoverImageUrl, setExistingCoverImageUrl] = useState(
    initialCollection?.cover_image_url ?? "",
  );
  const [coverImageFile, setCoverImageFile] = useState<File[]>([]);
  const [isPublished, setIsPublished] = useState(initialCollection?.is_published ?? true);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removingCoverImage, setRemovingCoverImage] = useState(false);

  async function handleRemoveCoverImage() {
    if (!initialCollection) return;
    if (!confirm("Remove the cover image? This cannot be undone.")) return;

    setRemovingCoverImage(true);
    setError(null);
    try {
      await updateCollection(initialCollection.id, { cover_image_url: null }, token);
      setExistingCoverImageUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove cover image.");
    } finally {
      setRemovingCoverImage(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      name,
      slug,
      season: season || null,
      description_en: descriptionEn || null,
      description_sq: descriptionSq || null,
      is_published: isPublished,
    };

    try {
      let collection = isEditing
        ? await updateCollection(initialCollection!.id, payload, token)
        : await createCollection(payload, token);

      if (coverImageFile[0]) {
        collection = await uploadCollectionCoverImage(collection.id, coverImageFile[0], token);
      }

      onSaved(collection);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save collection.");
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
            placeholder="spring-2026"
            className={FIELD_INPUT}
          />
        </div>

        <div>
          <label className={FIELD_LABEL}>Season</label>
          <input
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            placeholder="Spring/Summer 2026"
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

      <div>
        {existingCoverImageUrl && coverImageFile.length === 0 && (
          <div className="relative mb-3 aspect-[3/2] w-full max-w-xs overflow-hidden rounded bg-ivory">
            <Image
              src={existingCoverImageUrl}
              alt="Current cover image"
              fill
              className="object-cover"
              sizes="320px"
            />
            <button
              type="button"
              onClick={handleRemoveCoverImage}
              disabled={removingCoverImage}
              aria-label="Remove cover image"
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
        )}
        <ImageDropzone
          files={coverImageFile}
          onChange={setCoverImageFile}
          label={existingCoverImageUrl ? "Replace cover image" : "Cover image"}
          maxFiles={1}
        />
      </div>

      <Toggle
        checked={isPublished}
        onChange={setIsPublished}
        label="Published"
        description="Visible on the public site"
      />

      {error && <p className="font-body text-sm text-red-600">{error}</p>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={submitting} className={BUTTON_PRIMARY}>
          {submitting ? "Saving..." : isEditing ? "Save Changes" : "Add Collection"}
        </button>
        <button type="button" onClick={onCancel} className={BUTTON_SECONDARY}>
          Cancel
        </button>
      </div>
    </form>
  );
}
