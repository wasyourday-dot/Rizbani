import React from 'react';
import { Phone, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { ClinicConfig } from '../data/clinicData';
import { OfficialClinicLogo } from './OfficialClinicLogo';

interface HeroSectionProps {
  clinic: ClinicConfig;
  onOpenVerification: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ clinic }) => {
  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#layanan');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="beranda" className="relative pt-8 pb-16 lg:pt-14 lg:pb-20 bg-[#F5F5F2] overflow-hidden">
      {/* Background Clinic Building Exterior with Editorial Transparency Overlay */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <img
          src="/assets/aistudio/Modern_Klinik_Azizah_Exterior_Hero_4d323aba.png"
          alt="Gedung Klinik Pratama Azizah Sampang"
          className="w-full h-full object-cover object-[center_25%] lg:object-[65%_center] opacity-25 filter contrast-[1.05]"
        />
        {/* Multi-stop Editorial Gradient Overlays to preserve 100% typography readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F2] via-[#F5F5F2]/80 to-[#F5F5F2]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F2] via-transparent to-[#F5F5F2]/40" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Editorial Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow: Zero-pill discipline */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-[#234D78] uppercase mb-5 select-none">
              <span>KLINIK PRATAMA AZIZAH</span>
              <span className="text-[#646C67]" aria-hidden="true">·</span>
              <span>SAMPANG, MADURA</span>
            </div>

            {/* Main Headline: Bold oversized typography (58-68px desktop) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-[#161A18] tracking-tight leading-[1.06] mb-6">
              Pelayanan Kesehatan, <br />
              Lebih Dekat <br />
              <span className="text-[#43AD35]">Untuk Keluarga.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#646C67] leading-relaxed max-w-xl mb-8">
              Kami hadir untuk membantu Anda dan keluarga mendapatkan pelayanan kesehatan yang ramah, nyaman, dan mudah dijangkau.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-7">
              {/* Primary CTA */}
              <a
                href={
                  clinic.whatsappConfirmed
                    ? `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
                        'Halo Klinik Pratama Azizah, saya ingin berkonsultasi mengenai pelayanan kesehatan.'
                      )}`
                    : `tel:${clinic.phoneReference.replace(/[^0-9]/g, '')}`
                }
                target={clinic.whatsappConfirmed ? '_blank' : '_self'}
                rel={clinic.whatsappConfirmed ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center gap-2.5 bg-[#43AD35] hover:bg-[#3ba02f] text-white text-base font-bold px-7 py-3.5 rounded-full transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-[#102C24]"
              >
                <Phone className="w-4 h-4" />
                <span>Hubungi Klinik</span>
              </a>

              {/* Secondary CTA */}
              <a
                href="#layanan"
                onClick={handleScrollToServices}
                className="inline-flex items-center justify-center gap-2 text-[#161A18] hover:text-[#43AD35] text-base font-semibold px-6 py-3.5 rounded-full border border-[#E2E6DF] hover:border-[#43AD35] bg-white transition-all focus-visible:outline-2 focus-visible:outline-[#43AD35]"
              >
                <span>Jelajahi Layanan</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Restrained Trust Line */}
            <div className="flex items-center gap-2.5 text-xs text-[#646C67] pt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#43AD35]" />
              <span>Pelayanan yang mengutamakan kenyamanan dan kebutuhan pasien.</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Pure CSS/HTML Typographic Art-Directed Composition (NO PHOTOGRAPHY) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#102C24] text-white p-7 sm:p-9 shadow-lg border border-[#102C24]/80 overflow-hidden flex flex-col justify-between aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/4.2]">
              
              {/* Subtle editorial background grid lines */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Watermark Typographic Element */}
              <div className="absolute -bottom-8 -right-8 pointer-events-none select-none text-[110px] sm:text-[140px] font-extrabold font-sans text-white/[0.04] leading-none tracking-tighter">
                AZIZAH
              </div>

              {/* Top Row: Coordinates & Category */}
              <div className="relative z-10 flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#43AD35] animate-pulse" />
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#43AD35] font-bold">
                    CARE, CLOSER TO YOU.
                  </span>
                </div>
                <div className="text-[11px] font-mono text-white/50 tracking-wider">
                  374H+V79
                </div>
              </div>

              {/* Center Architectural Monogram Composition */}
              <div className="relative z-10 py-6 my-auto flex flex-col items-center justify-center text-center">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 flex items-center justify-center">
                  {/* Outer circle accent */}
                  <div className="absolute inset-0 rounded-full border border-white/10" />
                  <div className="absolute inset-2 rounded-full border border-[#43AD35]/20" />
                  
                  {/* Official Clinic Emblem Graphic from authentic asset */}
                  <OfficialClinicLogo variant="emblem" className="w-20 h-20 sm:w-24 sm:h-24" />
                </div>

                {/* Monumental Brand Typography */}
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
                  AZIZAH
                </div>
                <div className="text-xs tracking-[0.2em] uppercase text-white/60 mt-1 font-medium">
                  KLINIK PRATAMA
                </div>
                {/* Pink accent hairline */}
                <div className="w-12 h-0.5 bg-[#E94F9A] mt-3" />
              </div>

              {/* Bottom Row: Location Badge & Status */}
              <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-white/70">
                  <MapPin className="w-3.5 h-3.5 text-[#43AD35]" />
                  <span>SAMPANG, MADURA</span>
                </div>
                <div className="text-[11px] font-mono text-[#43AD35] uppercase font-bold tracking-wider">
                  PELAYANAN PRIMER
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
