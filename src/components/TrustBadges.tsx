const badges = [
  { icon: "🔒", label: "Pago único, sin sorpresas" },
  { icon: "↩️", label: "Te devolvemos tus originales" },
  { icon: "💳", label: "Cinta no digitalizable, no se cobra" },
  { icon: "🕐", label: "Copia de seguridad 7 días" },
];

export function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`grid grid-cols-2 gap-3 text-xs font-semibold text-gris-tinta/80 sm:grid-cols-4 ${className}`}
    >
      {badges.map((b) => (
        <li
          key={b.label}
          className="flex items-center gap-2 rounded-xl bg-azul-suave/60 px-3 py-2"
        >
          <span aria-hidden>{b.icon}</span>
          <span>{b.label}</span>
        </li>
      ))}
    </ul>
  );
}
