"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCollection, getCollections } from "@/lib/api";
import { clearToken, getToken } from "@/lib/auth";
import type { Collection } from "@/lib/types";
import CollectionTable from "@/components/admin/CollectionTable";
import CollectionForm from "@/components/admin/CollectionForm";
import AdminNav from "@/components/admin/AdminNav";
import LoadingSpinner from "@/components/LoadingSpinner";
import Modal from "@/components/admin/Modal";
import FabButton from "@/components/admin/FabButton";
import { FIELD_INPUT } from "@/lib/adminStyles";

export default function AdminCollectionsPage() {
  const router = useRouter();
  const [token, setTokenState] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [search, setSearch] = useState("");

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

  function closeForm() {
    setShowForm(false);
    setEditingCollection(null);
  }

  const filteredCollections = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return collections;
    return collections.filter(
      (c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q),
    );
  }, [collections, search]);

  if (!token) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <AdminNav onLogout={handleLogout} />

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-heading text-2xl text-charcoal sm:text-3xl">
          Collections <span className="text-lg text-muted-foreground">({collections.length})</span>
        </h1>
        {collections.length > 0 && (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or slug..."
            className={`${FIELD_INPUT} sm:max-w-xs`}
          />
        )}
      </div>

      <div className="mt-6 pb-24">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <CollectionTable
            collections={filteredCollections}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <FabButton onClick={handleAddNew} label="Add Collection" />

      <Modal
        open={showForm}
        onClose={closeForm}
        title={editingCollection ? `Edit "${editingCollection.name}"` : "Add New Collection"}
      >
        <CollectionForm
          token={token}
          initialCollection={editingCollection}
          onSaved={handleSaved}
          onCancel={closeForm}
        />
      </Modal>
    </div>
  );
}
