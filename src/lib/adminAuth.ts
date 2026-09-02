import { NextRequest } from "next/server";

// Autenticación mínima para las rutas de administración mientras no exista
// un sistema de usuarios real. Compara un token compartido enviado en la
// cabecera `x-admin-token` contra la variable de entorno ADMIN_TOKEN.
// Sustituir por autenticación real (usuarios + roles) antes de producción.
export function isAdminRequest(request: NextRequest): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  const provided = request.headers.get("x-admin-token");
  return provided === expected;
}
