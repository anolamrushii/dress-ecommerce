"use client";

import { useState, type FormEvent } from "react";
import { createCollection, updateCollection } from "@/lib/api";
import type { Collection } from "@/lib/types";
import { BUTTON_PRIMARY, BUTTON_SECONDARY, FIELD_INPUT, FIELD_LABEL } from "@/lib/adminStyles";
import Toggle from "./Toggle";

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
  const [description, setDescription] = useState(initialCollection?.description ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialCollection?.cover_image_url ?? "");
  const [isPublished, setIsPublished] = useState(initialCollection?.is_published ?? true);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      name,
      slug,
      season: season || null,
      description: description || null,
      cover_image_url: coverImageUrl || null,
      is_published: isPublished,
    };

    try {
      const collection = isEditing
        ? await updateCollection(initialCollection!.id, payload, token)
        : await createCollection(payload, token);
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
          <label className={FIELD_LABEL}>Cover image URL</label>
          <input
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="https://res.cloudinary.com/..."
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
