"use client";

import { useState } from "react";

const CONTACT_EMAIL = "hola@vuelvia.app";

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", pedido: "", mensaje: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      form.pedido ? `Consulta sobre pedido ${form.pedido}` : "Consulta desde la web"
    );
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nEmail: ${form.email}\nPedido: ${form.pedido || "—"}\n\n${form.mensaje}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-center font-[family-name:var(--font-baloo)] text-4xl font-bold text-gris-tinta">
        Estamos al otro lado.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center text-gris-tinta/70">
        Si tienes una cinta rara, dudas sobre el envío o simplemente quieres
        preguntarnos algo antes de mandarlas, escríbenos.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 text-center">
          <p className="text-sm font-bold text-gris-tinta/60">Email</p>
          <p className="mt-1 font-bold text-azul-principal">{CONTACT_EMAIL}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 text-center">
          <p className="text-sm font-bold text-gris-tinta/60">Seguimiento de pedido</p>
          <a href="/pedido" className="mt-1 inline-block font-bold text-azul-principal hover:text-azul-noche">
            Ver estado de mi pedido →
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-4 rounded-2xl bg-white p-6">
        <div>
          <label className="text-sm font-bold text-gris-tinta">Nombre</label>
          <input
            required
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 focus:border-azul-principal focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gris-tinta">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 focus:border-azul-principal focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gris-tinta">
            Número de pedido <span className="font-normal text-gris-tinta/50">(si tienes uno)</span>
          </label>
          <input
            value={form.pedido}
            onChange={(e) => setForm({ ...form, pedido: e.target.value })}
            placeholder="VLV-2026XXXXX"
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 focus:border-azul-principal focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gris-tinta">Mensaje</label>
          <textarea
            required
            rows={4}
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 focus:border-azul-principal focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-azul-principal px-6 py-3 font-bold text-white transition hover:bg-azul-noche"
        >
          Escribir a Vuelvia
        </button>
      </form>
    </div>
  );
}
