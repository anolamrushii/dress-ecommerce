"use client";

import { useState, type FormEvent } from "react";
import { createCollection, updateCollection } from "@/lib/api";
import type { Collection } from "@/lib/types";

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
          placeholder="spring-2026"
          className="w-full border border-gold-light bg-white px-4 py-2 font-body text-charcoal focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block font-body text-sm text-charcoal">Season</label>
        <input
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          placeholder="Spring/Summer 2026"
          className="w-full border border-gold-light bg-white px-4 py-2 font-body text-charcoal focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block font-body text-sm text-charcoal">Cover image URL</label>
        <input
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          placeholder="https://res.cloudinary.com/..."
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
          id="is_published"
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
        <label htmlFor="is_published" className="font-body text-sm text-charcoal">
          Published (visible on the public site)
        </label>
      </div>

      {error && <p className="font-body text-sm text-red-600 sm:col-span-2">{error}</p>}

      <div className="flex gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-gold px-8 py-3 font-body text-sm uppercase tracking-widest text-white transition-colors hover:bg-gold-dark disabled:opacity-60"
        >
          {submitting ? "Saving..." : isEditing ? "Save Changes" : "Add Collection"}
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
