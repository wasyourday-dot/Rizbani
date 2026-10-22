import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'emblem';
  onDark?: boolean;
}

export const OfficialClinicLogo: React.FC<LogoProps> = ({
  className = 'h-10 sm:h-11',
  variant = 'full',
  onDark = false,
}) => {
  // If variant is emblem only (cross + leaf with white outline + crescent + swoosh)
  if (variant === 'emblem') {
    return (
      <svg
        viewBox="0 0 170 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} aspect-square shrink-0`}
        role="img"
        aria-label="Lambang Resmi Klinik Pratama Azizah"
      >
        {/* Green Medical Cross (#1E942B) */}
        <rect x="74" y="20" width="44" height="110" rx="7" fill="#1E942B" />
        <rect x="34" y="53" width="124" height="44" rx="7" fill="#1E942B" />

        {/* Outer Green Crescent Arc */}
        <path
          d="M 22 72 C 18 108 42 144 98 150 C 74 146 45 131 34 107 C 26 92 24 81 22 72 Z"
          fill="#1E942B"
        />

        {/* Pink Leaf with white border separation */}
        <path
          d="M 54 100 C 47 75 70 51 106 46 C 110 70 99 95 54 100 Z"
          fill="#E82676"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Leaf Central Vein */}
        <path
          d="M 58 97 Q 80 73 102 50"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Pink Swoosh Ribbon */}
        <path
          d="M 38 98 C 42 116 64 135 98 135 C 130 135 158 126 170 114 C 150 123 126 127 96 125 C 68 125 50 111 46 97 Z"
          fill="#E82676"
        />
      </svg>
    );
  }

  // Full Official Logo Asset (Emblem + "KLINIK PRATAMA" + "AZIZAH")
  // 100% faithful to the authentic asset 'Klinik Pratama Azizah Logo.png'
  return (
    <svg
      viewBox="0 0 520 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} w-auto max-w-full shrink-0 select-none`}
      role="img"
      aria-label="Logo Resmi Klinik Pratama Azizah"
    >
      <defs>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&display=swap');
            .clinic-logo-title {
              font-family: 'Playfair Display', 'Times New Roman', Georgia, serif;
              font-size: 25px;
              font-weight: 800;
              letter-spacing: 1.8px;
            }
            .clinic-logo-brand {
              font-family: 'Playfair Display', 'Times New Roman', Georgia, serif;
              font-size: 64px;
              font-weight: 900;
              letter-spacing: 1.5px;
            }
          `}
        </style>
      </defs>

      {/* Left Emblem Group */}
      <g id="emblem">
        {/* Green Medical Cross (#1E942B) */}
        <rect x="74" y="20" width="44" height="110" rx="7" fill="#1E942B" />
        <rect x="34" y="53" width="124" height="44" rx="7" fill="#1E942B" />

        {/* Outer Green Crescent Arc */}
        <path
          d="M 22 72 C 18 108 42 144 98 150 C 74 146 45 131 34 107 C 26 92 24 81 22 72 Z"
          fill="#1E942B"
        />

        {/* Pink Leaf with crisp white border separation */}
        <path
          d="M 54 100 C 47 75 70 51 106 46 C 110 70 99 95 54 100 Z"
          fill="#E82676"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Leaf Central White Vein */}
        <path
          d="M 58 97 Q 80 73 102 50"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Pink Swoosh Ribbon flowing from under the cross directly into the first 'A' of AZIZAH */}
        <path
          d="M 38 98 C 42 116 64 135 98 135 C 136 135 174 122 222 98 C 172 115 134 125 96 125 C 68 125 50 111 46 97 Z"
          fill="#E82676"
        />
        <path
          d="M 96 125 C 136 125 174 114 234 94 C 182 108 142 116 96 116 Z"
          fill="#E82676"
          opacity="0.9"
        />
      </g>

      {/* Right Typography Group */}
      <g id="typography">
        {/* KLINIK PRATAMA: Navy (#0E3D6B) on light, White (#FFFFFF) on dark */}
        <text
          x="192"
          y="62"
          fill={onDark ? '#FFFFFF' : '#0E3D6B'}
          className="clinic-logo-title"
        >
          KLINIK PRATAMA
        </text>

        {/* AZIZAH: Vibrant Magenta Pink (#E82676) */}
        <text
          x="190"
          y="126"
          fill="#E82676"
          className="clinic-logo-brand"
        >
          AZIZAH
        </text>
      </g>
    </svg>
  );
};
