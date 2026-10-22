import React from 'react';
import { OfficialClinicLogo } from './OfficialClinicLogo';
import { MapPin, Phone, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { ClinicConfig } from '../data/clinicData';

interface FooterProps {
  clinic: ClinicConfig;
  onOpenVerification: () => void;
}

export const Footer: React.FC<FooterProps> = ({ clinic, onOpenVerification }) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#102C24] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Factual Description (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <OfficialClinicLogo className="h-10 sm:h-11" onDark={true} />
            
            <p className="text-sm text-white/70 leading-relaxed max-w-sm pt-2">
              Fasilitas pelayanan kesehatan tingkat pertama (Klinik Pratama) yang berkomitmen melayani kebutuhan medis dasar warga Bunten Barat, Kecamatan Ketapang, Kabupaten Sampang, Madura secara profesional, ramah, dan manusiawi.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#43AD35] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Pelayanan Kesehatan Primer Terdaftar</span>
            </div>
          </div>

          {/* Column 2: Navigasi Halaman (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
              Navigasi Halaman
            </div>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a
                  href="#beranda"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#beranda');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#tentang"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#tentang');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Tentang Klinik
                </a>
              </li>
              <li>
                <a
                  href="#layanan"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#layanan');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Layanan Klinik
                </a>
              </li>
              <li>
                <a
                  href="#fasilitas"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#fasilitas');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Fasilitas
                </a>
              </li>
              <li>
                <a
                  href="#edukasi"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#edukasi');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Edukasi Kesehatan
                </a>
              </li>
              <li>
                <a
                  href="#testimoni"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#testimoni');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Cerita Pasien
                </a>
              </li>
              <li>
                <a
                  href="#informasi"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#informasi');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Pertanyaan Umum (FAQ)
                </a>
              </li>
              <li>
                <a
                  href="#lokasi"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#lokasi');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Lokasi & Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Alamat & Kontak Resmi (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
              Informasi Kontak Resmi
            </div>
            
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70">
              <MapPin className="w-4 h-4 text-[#43AD35] shrink-0 mt-0.5" />
              <span>{clinic.addressReference}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/70">
              <Phone className="w-4 h-4 text-[#43AD35] shrink-0" />
              <a
                href={`tel:${clinic.phoneReference.replace(/[^0-9]/g, '')}`}
                className="hover:text-white font-mono"
              >
                {clinic.phoneReference}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/70">
              <MessageCircle className="w-4 h-4 text-[#E94F9A] shrink-0" />
              <a
                href={`https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
                  'Halo Klinik Pratama Azizah, saya ingin berkonsultasi.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white inline-flex items-center gap-1"
              >
                <span>WhatsApp: {clinic.phoneReference}</span>
                <ExternalLink className="w-3 h-3 text-white/50" />
              </a>
            </div>

            <div className="pt-2">
              <a
                href={clinic.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#43AD35] hover:underline"
              >
                <span>Buka Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Verification Shortcut */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {currentYear} Klinik Pratama Azizah. Seluruh hak cipta dilindungi.
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenVerification}
              className="text-white/60 hover:text-white transition-colors underline underline-offset-4"
            >
              Kelola & Verifikasi Data Klinik
            </button>
            <span className="text-white/30">·</span>
            <span>Sampang, Madura</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
