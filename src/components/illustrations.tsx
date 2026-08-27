// Ilustraciones vectoriales propias en el estilo de marca Vuelvia
// (formas redondeadas, paleta cálida azul/coral) — ver Guía visual, página 4.

export function FamilyMemoryIllustration({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 320" className={className} role="img" aria-label="Familia revisando recuerdos">
      <rect width="420" height="320" rx="24" fill="#DDF4FF" />
      <circle cx="340" cy="60" r="46" fill="#FFB24C" opacity="0.35" />
      <rect x="24" y="230" width="372" height="18" rx="9" fill="#22A7FF" opacity="0.15" />

      {/* mesa */}
      <rect x="60" y="220" width="300" height="14" rx="7" fill="#0C3C78" opacity="0.15" />

      {/* persona 1 (abuelo) */}
      <g>
        <circle cx="140" cy="150" r="34" fill="#F4C9A6" />
        <path d="M106 150a34 34 0 0 1 68 0v10h-68z" fill="#1F2A37" />
        <rect x="104" y="184" width="72" height="70" rx="20" fill="#22A7FF" />
      </g>

      {/* persona 2 (nieta) */}
      <g>
        <circle cx="235" cy="160" r="28" fill="#E8AF87" />
        <path d="M207 160a28 28 0 0 1 56 0v6h-56z" fill="#3A2A1E" />
        <rect x="207" y="188" width="56" height="66" rx="18" fill="#FF6A4D" />
      </g>

      {/* foto/cinta compartida */}
      <g transform="translate(150,120)">
        <rect x="0" y="0" width="70" height="46" rx="6" fill="#ffffff" stroke="#0C3C78" strokeWidth="3" />
        <rect x="8" y="8" width="54" height="24" rx="3" fill="#DDF4FF" />
        <path d="M25 30 L45 20 L25 10 Z" fill="#FF6A4D" />
      </g>

      {/* píxeles decorativos */}
      <rect x="330" y="140" width="10" height="10" fill="#22A7FF" opacity="0.5" />
      <rect x="348" y="140" width="10" height="10" fill="#22A7FF" opacity="0.3" />
      <rect x="330" y="158" width="10" height="10" fill="#22A7FF" opacity="0.3" />
    </svg>
  );
}

export function UnboxingIllustration({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 320" className={className} role="img" aria-label="Caja con recuerdos digitalizados">
      <rect width="420" height="320" rx="24" fill="#F4F7FB" />
      <rect x="130" y="150" width="160" height="120" rx="10" fill="#22A7FF" />
      <rect x="130" y="150" width="160" height="30" fill="#0C3C78" />
      <path d="M130 150 L210 110 L290 150" fill="none" stroke="#0C3C78" strokeWidth="8" strokeLinecap="round" />
      <rect x="185" y="150" width="50" height="60" rx="4" fill="#DDF4FF" />

      {/* fotos saliendo */}
      <g transform="rotate(-8 150 110)">
        <rect x="120" y="90" width="60" height="46" rx="4" fill="#ffffff" stroke="#FF6A4D" strokeWidth="3" />
      </g>
      <g transform="rotate(10 260 100)">
        <rect x="235" y="80" width="60" height="46" rx="4" fill="#ffffff" stroke="#FFB24C" strokeWidth="3" />
      </g>
      <path d="M330 90 L360 100 L330 110 Z" fill="#FF6A4D" />
      <rect x="300" y="95" width="24" height="10" fill="#22A7FF" opacity="0.4" />
    </svg>
  );
}

export function LaptopPlayIllustration({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 320" className={className} role="img" aria-label="Vídeo digitalizado reproduciéndose">
      <rect width="420" height="320" rx="24" fill="#DDF4FF" />
      <rect x="110" y="80" width="200" height="130" rx="10" fill="#1F2A37" />
      <rect x="122" y="92" width="176" height="106" rx="4" fill="#0C3C78" />
      <circle cx="210" cy="145" r="30" fill="#22A7FF" />
      <path d="M200 130 L228 145 L200 160 Z" fill="#ffffff" />
      <path d="M90 226 L330 226 L310 244 L110 244 Z" fill="#1F2A37" />
      <rect x="60" y="240" width="60" height="8" rx="4" fill="#FFB24C" />
      <rect x="140" y="250" width="16" height="16" fill="#FF6A4D" opacity="0.7" />
      <rect x="160" y="250" width="16" height="16" fill="#FF6A4D" opacity="0.4" />
    </svg>
  );
}

export function CareHandsIllustration({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 320" className={className} role="img" aria-label="Cuidado profesional de las cintas">
      <rect width="420" height="320" rx="24" fill="#F4F7FB" />
      <rect x="150" y="120" width="120" height="80" rx="8" fill="#0C3C78" />
      <rect x="166" y="136" width="34" height="24" fill="#DDF4FF" />
      <rect x="220" y="136" width="34" height="24" fill="#DDF4FF" />
      <rect x="150" y="188" width="120" height="12" fill="#22A7FF" />
      {/* manos */}
      <path
        d="M110 230c10-30 40-40 60-30l10 20-30 40c-20 10-45-5-40-30z"
        fill="#F4C9A6"
      />
      <path
        d="M310 230c-10-30-40-40-60-30l-10 20 30 40c20 10 45-5 40-30z"
        fill="#E8AF87"
      />
      <circle cx="330" cy="90" r="8" fill="#FF6A4D" />
      <circle cx="352" cy="90" r="8" fill="#FFB24C" opacity="0.7" />
    </svg>
  );
}
