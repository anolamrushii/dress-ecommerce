"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteDress, getDresses } from "@/lib/api";
import { clearToken, getToken } from "@/lib/auth";
import type { Dress } from "@/lib/types";
import DressTable from "@/components/admin/DressTable";
import DressForm from "@/components/admin/DressForm";
import AdminNav from "@/components/admin/AdminNav";
import LoadingSpinner from "@/components/LoadingSpinner";
import Modal from "@/components/admin/Modal";
import FabButton from "@/components/admin/FabButton";
import { FIELD_INPUT } from "@/lib/adminStyles";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setTokenState] = useState<string | null>(null);
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDress, setEditingDress] = useState<Dress | null>(null);
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
    loadDresses(token);
  }, [token]);

  async function loadDresses(t: string) {
    setLoading(true);
    try {
      const data = await getDresses(t);
      setDresses(data);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    clearToken();
    router.replace("/admin/login");
  }

  function handleAddNew() {
    setEditingDress(null);
    setShowForm(true);
  }

  function handleEdit(dress: Dress) {
    setEditingDress(dress);
    setShowForm(true);
  }

  async function handleDelete(dress: Dress) {
    if (!token) return;
    if (!confirm(`Delete "${dress.name}"? This cannot be undone.`)) return;
    await deleteDress(dress.id, token);
    loadDresses(token);
  }

  function handleSaved() {
    setShowForm(false);
    setEditingDress(null);
    if (token) loadDresses(token);
  }

  function closeForm() {
    setShowForm(false);
    setEditingDress(null);
  }

  const filteredDresses = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return dresses;
    return dresses.filter(
      (d) => d.name.toLowerCase().includes(q) || d.slug.toLowerCase().includes(q),
    );
  }, [dresses, search]);

  if (!token) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <AdminNav onLogout={handleLogout} />

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-heading text-2xl text-charcoal sm:text-3xl">
          Dresses <span className="text-lg text-muted-foreground">({dresses.length})</span>
        </h1>
        {dresses.length > 0 && (
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
          <DressTable dresses={filteredDresses} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>

      <FabButton onClick={handleAddNew} label="Add new dress" />

      <Modal
        open={showForm}
        onClose={closeForm}
        title={editingDress ? `Edit "${editingDress.name}"` : "Add New Dress"}
      >
        <DressForm
          token={token}
          initialDress={editingDress}
          onSaved={handleSaved}
          onCancel={closeForm}
        />
      </Modal>
    </div>
  );
}
