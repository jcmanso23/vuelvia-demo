"use client";

import { useState } from "react";
import { useAdminToken } from "./useAdminToken";

// Puerta de acceso mínima mientras no exista un sistema de usuarios real
// (brief: "requerirá acceso protegido"). El token se compara en el
// servidor contra ADMIN_TOKEN; aquí solo se guarda en este navegador.
export function AdminTokenGate({
  children,
}: {
  children: (token: string) => React.ReactNode;
}) {
  const { token, saveToken } = useAdminToken();
  const [draft, setDraft] = useState("");

  if (token) return <>{children(token)}</>;

  return (
    <div className="mx-auto max-w-sm rounded-2xl bg-white p-6 text-center">
      <p className="font-bold text-gris-tinta">Acceso de administración</p>
      <p className="mt-1 text-sm text-gris-tinta/70">
        Introduce el token de administración (variable ADMIN_TOKEN en el servidor).
      </p>
      <input
        type="password"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        className="mt-4 w-full rounded-lg border border-black/10 px-4 py-2.5 focus:border-azul-noche focus:outline-none focus:ring-2 focus:ring-azul-principal/30"
      />
      <button
        onClick={() => saveToken(draft)}
        className="mt-3 w-full rounded-full bg-azul-noche px-6 py-2.5 font-bold text-white hover:opacity-90"
      >
        Entrar
      </button>
    </div>
  );
}
