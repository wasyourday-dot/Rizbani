import React, { useState, useEffect } from 'react';
import { OfficialClinicLogo } from './OfficialClinicLogo';
import { Menu, X, Phone, ShieldCheck, MapPin } from 'lucide-react';
import { ClinicConfig } from '../data/clinicData';

interface HeaderProps {
  clinic: ClinicConfig;
  onOpenVerification: () => void;
}

export const Header: React.FC<HeaderProps> = ({ clinic, onOpenVerification }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang', href: '#tentang' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Fasilitas', href: '#fasilitas' },
    { label: 'Cerita Pasien', href: '#testimoni' },
    { label: 'FAQ', href: '#informasi' },
    { label: 'Lokasi', href: '#lokasi' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 py-3.5 sm:py-4 ${
          isScrolled
            ? 'bg-[#F5F5F2]/95 backdrop-blur-md border-b border-[#E2E6DF] shadow-xs'
            : 'bg-[#F5F5F2]'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Clinic Logo on the left */}
            <a
              href="#beranda"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#beranda');
              }}
              className="flex items-center transition-opacity hover:opacity-95 focus-visible:outline-2 focus-visible:outline-[#43AD35] focus-visible:outline-offset-4 rounded-sm"
              aria-label="Klinik Pratama Azizah - Beranda"
            >
              <OfficialClinicLogo className="h-10 sm:h-11" />
            </a>

            {/* Desktop Pill Navigation inspired by the reference: Deep Forest Green Pill */}
            <div className="hidden lg:flex items-center gap-3">
              <nav
                className="flex items-center gap-1 bg-[#102C24] text-white px-5 py-2 rounded-full shadow-sm border border-[#102C24]/80"
                aria-label="Navigasi Utama"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="px-3.5 py-1 text-[13px] font-medium text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                ))}

                {/* Bright green CTA embedded in the navigation rhythm */}
                <a
                  href={
                    clinic.whatsappConfirmed
                      ? `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
                          'Halo Klinik Pratama Azizah, saya ingin berkonsultasi.'
                        )}`
                      : '#lokasi'
                  }
                  target={clinic.whatsappConfirmed ? '_blank' : '_self'}
                  rel={clinic.whatsappConfirmed ? 'noopener noreferrer' : undefined}
                  className="ml-2 inline-flex items-center gap-1.5 bg-[#43AD35] hover:bg-[#3ca02f] text-white text-[13px] font-semibold px-4 py-1.5 rounded-full transition-colors shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hubungi Kami</span>
                </a>
              </nav>

              {/* Data Verification Shortcut */}
              <button
                onClick={onOpenVerification}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#646C67] hover:text-[#102C24] transition-colors px-3 py-1.5 rounded-full border border-[#E2E6DF] bg-white hover:bg-[#EDF5EA]/60 shadow-2xs"
                title="Kelola dan verifikasi rincian data klinik"
                aria-label="Kelola dan verifikasi data klinik"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#43AD35]" />
                <span>Verifikasi Data</span>
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={
                  clinic.whatsappConfirmed
                    ? `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
                        'Halo Klinik Pratama Azizah, saya ingin berkonsultasi.'
                      )}`
                    : `tel:${clinic.phoneReference.replace(/[^0-9]/g, '')}`
                }
                target={clinic.whatsappConfirmed ? '_blank' : '_self'}
                rel={clinic.whatsappConfirmed ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-1.5 bg-[#43AD35] text-white text-xs font-semibold px-3 py-2 rounded-full shadow-2xs"
                aria-label="Hubungi Kami"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Kontak</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#161A18] hover:text-[#43AD35] rounded-lg focus-visible:outline-[#43AD35]"
                aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#102C24] text-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <OfficialClinicLogo className="h-8" onDark={true} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-white/70 hover:text-white"
                  aria-label="Tutup navigasi"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="text-xs text-white/60">
                Bunten Barat, Ketapang, Sampang, Madura
              </div>

              <nav className="flex flex-col space-y-2 pt-2" aria-label="Menu Mobile">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="py-3 px-3 text-base font-semibold text-white/90 hover:text-[#43AD35] hover:bg-white/5 rounded-lg transition-colors border-b border-white/5"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenVerification();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-white/20 text-xs font-semibold text-white/90 hover:bg-white/10"
                >
                  <ShieldCheck className="w-4 h-4 text-[#43AD35]" />
                  <span>Verifikasi & Kelola Data Klinik</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <a
                href={
                  clinic.whatsappConfirmed
                    ? `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
                        'Halo Klinik Pratama Azizah, saya ingin berkonsultasi.'
                      )}`
                    : `tel:${clinic.phoneReference.replace(/[^0-9]/g, '')}`
                }
                target={clinic.whatsappConfirmed ? '_blank' : '_self'}
                rel={clinic.whatsappConfirmed ? 'noopener noreferrer' : undefined}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#43AD35] hover:bg-[#3ca02f] text-white text-sm font-bold rounded-full transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Hubungi Kami via WhatsApp</span>
              </a>

              <a
                href={clinic.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/10 text-white hover:bg-white/20 text-xs font-semibold rounded-full transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#43AD35]" />
                <span>Buka Petunjuk Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
