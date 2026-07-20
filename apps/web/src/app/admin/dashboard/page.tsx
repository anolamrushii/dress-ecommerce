"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteDress, getDresses } from "@/lib/api";
import { clearToken, getToken } from "@/lib/auth";
import type { Dress } from "@/lib/types";
import DressTable from "@/components/admin/DressTable";
import DressForm from "@/components/admin/DressForm";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setTokenState] = useState<string | null>(null);
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDress, setEditingDress] = useState<Dress | null>(null);

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

  if (!token) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-charcoal">Dress Dashboard</h1>
          <Link
            href="/admin/collections"
            className="font-body text-sm text-charcoal/60 hover:text-gold-dark hover:underline"
          >
            Manage collections &rarr;
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
          <DressTable dresses={dresses} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>

      <div className="mt-12 border-t border-gold-light/40 pt-10">
        {showForm ? (
          <>
            <h2 className="mb-6 font-heading text-2xl text-charcoal">
              {editingDress ? `Edit "${editingDress.name}"` : "Add New Dress"}
            </h2>
            <DressForm
              token={token}
              initialDress={editingDress}
              onSaved={handleSaved}
              onCancel={() => {
                setShowForm(false);
                setEditingDress(null);
              }}
            />
          </>
        ) : (
          <button
            onClick={handleAddNew}
            className="bg-gold px-8 py-3 font-body text-sm uppercase tracking-widest text-white transition-colors hover:bg-gold-dark"
          >
            Add New Dress
          </button>
        )}
      </div>
    </div>
  );
}
