export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 40"
      className={className}
      role="img"
      aria-label="Vuelvia"
    >
      <rect x="2" y="8" width="24" height="24" rx="4" fill="#22A7FF" />
      <rect x="8" y="14" width="4" height="4" fill="#DDF4FF" />
      <rect x="15" y="14" width="4" height="4" fill="#DDF4FF" />
      <rect x="8" y="22" width="4" height="4" fill="#DDF4FF" />
      <rect x="15" y="22" width="4" height="4" fill="#DDF4FF" />
      <path d="M30 10 L48 20 L30 30 Z" fill="#FF6A4D" />
      <text
        x="54"
        y="28"
        fontFamily="var(--font-baloo), sans-serif"
        fontWeight="700"
        fontSize="24"
        fill="#22A7FF"
      >
        Vuelvia
      </text>
    </svg>
  );
}
