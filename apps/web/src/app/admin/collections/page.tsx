"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCollection, getCollections } from "@/lib/api";
import { clearToken, getToken } from "@/lib/auth";
import type { Collection } from "@/lib/types";
import CollectionTable from "@/components/admin/CollectionTable";
import CollectionForm from "@/components/admin/CollectionForm";

export default function AdminCollectionsPage() {
  const router = useRouter();
  const [token, setTokenState] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);

  useEffect(() => {
    const t = getToken();
    if (!t) {
      router.replace("/admin/login");
      return;
    }
    setTokenState(t);
  }, [router]);

  useEffect(() => {
    if (!token) return;
    loadCollections(token);
  }, [token]);

  async function loadCollections(t: string) {
    setLoading(true);
    try {
      const data = await getCollections(t);
      setCollections(data);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    clearToken();
    router.replace("/admin/login");
  }

  function handleAddNew() {
    setEditingCollection(null);
    setShowForm(true);
  }

  function handleEdit(collection: Collection) {
    setEditingCollection(collection);
    setShowForm(true);
  }

  async function handleDelete(collection: Collection) {
    if (!token) return;
    if (
      !confirm(
        `Delete "${collection.name}"? Dresses in this collection will be uncategorized, not deleted.`,
      )
    )
      return;
    await deleteCollection(collection.id, token);
    loadCollections(token);
  }

  function handleSaved() {
    setShowForm(false);
    setEditingCollection(null);
    if (token) loadCollections(token);
  }

  if (!token) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-charcoal">Collections</h1>
          <Link
            href="/admin/dashboard"
            className="font-body text-sm text-charcoal/60 hover:text-gold-dark hover:underline"
          >
            &larr; Back to dresses
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="font-body text-sm text-charcoal/60 hover:text-gold-dark hover:underline"
        >
          Log out
        </button>
      </div>

      <div className="mt-10">
        {loading ? (
          <p className="font-body text-charcoal/60">Loading...</p>
        ) : (
          <CollectionTable collections={collections} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>

      <div className="mt-12 border-t border-gold-light/40 pt-10">
        {showForm ? (
          <>
            <h2 className="mb-6 font-heading text-2xl text-charcoal">
              {editingCollection ? `Edit "${editingCollection.name}"` : "Add New Collection"}
            </h2>
            <CollectionForm
              token={token}
              initialCollection={editingCollection}
              onSaved={handleSaved}
              onCancel={() => {
                setShowForm(false);
                setEditingCollection(null);
              }}
            />
          </>
        ) : (
          <button
            onClick={handleAddNew}
            className="bg-gold px-8 py-3 font-body text-sm uppercase tracking-widest text-white transition-colors hover:bg-gold-dark"
          >
            Add New Collection
          </button>
        )}
      </div>
    </div>
  );
}
