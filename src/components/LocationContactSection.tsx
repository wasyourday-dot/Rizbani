import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  Navigation,
  Clock,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { ClinicConfig } from '../data/clinicData';

interface LocationContactSectionProps {
  clinic: ClinicConfig;
  onOpenVerification: () => void;
  onShowToast: (message: string) => void;
}

export const LocationContactSection: React.FC<LocationContactSectionProps> = ({
  clinic,
  onOpenVerification,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(clinic.addressReference);
      setCopied(true);
      onShowToast('Alamat klinik berhasil disalin ke papan klip');
      setTimeout(() => setCopied(false), 2400);
    } catch {
      onShowToast('Gagal menyalin alamat secara otomatis');
    }
  };

  const cleanPhone = clinic.phoneReference.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Halo Klinik Pratama Azizah, saya ingin menanyakan informasi pelayanan kesehatan dan petunjuk arah ke klinik.'
  )}`;

  return (
    <section id="lokasi" className="py-20 lg:py-28 bg-[#F5F5F2] border-t border-[#E2E6DF] scroll-mt-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold tracking-[0.2em] text-[#43AD35] uppercase mb-3 select-none">
            LOKASI & KONTAK
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#161A18] tracking-tight mb-4 font-sans">
            Temukan Klinik Azizah
          </h2>
          <p className="text-base sm:text-lg text-[#646C67] leading-relaxed">
            Lihat lokasi Klinik Pratama Azizah dan temukan informasi resmi untuk menghubungi klinik. Kami siap melayani kebutuhan kesehatan dasar Anda dan keluarga.
          </p>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Directory Data & Direct Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Address Card */}
            <div className="bg-white p-7 sm:p-8 rounded-xl border border-[#E2E6DF] shadow-2xs">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#EDF5EA] text-[#43AD35] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#646C67]">
                    Alamat Fisik Klinik
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#234D78] hover:text-[#43AD35] transition-colors p-1.5 rounded hover:bg-[#F5F5F2]"
                  aria-label="Salin alamat lengkap"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#43AD35]" />
                      <span className="text-[#43AD35]">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Alamat</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-1 text-[#161A18] mb-6">
                <div className="text-xl font-bold font-serif">Klinik Pratama Azizah</div>
                <div className="text-sm sm:text-base leading-relaxed text-[#161A18]/90">
                  {clinic.addressReference}
                </div>
                <div className="text-xs text-[#646C67] pt-1">
                  Wilayah: Bunten Barat, Kecamatan Ketapang, Kabupaten Sampang, Jawa Timur
                </div>
              </div>

              {/* Map CTA Buttons: Prominent Buka Google Maps */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#E2E6DF]">
                <a
                  href={clinic.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#43AD35] hover:bg-[#3ba02f] text-white text-sm font-bold px-5 py-3 rounded-full transition-colors shadow-2xs"
                >
                  <Navigation className="w-4 h-4 shrink-0" />
                  <span>Buka Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F5F5F2] text-[#161A18] border border-[#E2E6DF] text-sm font-semibold px-4 py-3 rounded-full transition-colors"
                >
                  <Copy className="w-4 h-4 text-[#646C67]" />
                  <span>Salin Alamat</span>
                </button>
              </div>
            </div>

            {/* Direct Contact Card (Phone & WhatsApp) */}
            <div className="bg-white p-7 sm:p-8 rounded-xl border border-[#E2E6DF] shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-[#646C67]">
                  Saluran Komunikasi Resmi
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#43AD35] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Kontak Terverifikasi</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* WhatsApp Action */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-[#43AD35]/30 bg-[#EDF5EA]/40 hover:bg-[#EDF5EA] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#43AD35] uppercase mb-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Klinik</span>
                    </div>
                    <div className="text-base font-bold font-mono text-[#161A18]">
                      {clinic.phoneReference}
                    </div>
                    <div className="text-xs text-[#646C67] mt-1">
                      Pesan konsultasi langsung ke petugas
                    </div>
                  </div>
                  <div className="mt-4 text-xs font-bold text-[#43AD35] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Chat WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </a>

                {/* Direct Phone Call */}
                <a
                  href={`tel:${cleanPhone}`}
                  className="p-4 rounded-xl border border-[#102C24]/10 bg-white hover:bg-[#F5F5F2] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#102C24] uppercase mb-1">
                      <Phone className="w-4 h-4" />
                      <span>Panggilan Telepon</span>
                    </div>
                    <div className="text-base font-bold font-mono text-[#161A18]">
                      {clinic.phoneReference}
                    </div>
                    <div className="text-xs text-[#646C67] mt-1">
                      Sambungan telepon seluler langsung
                    </div>
                  </div>
                  <div className="mt-4 text-xs font-bold text-[#102C24] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Panggil Langsung</span>
                    <Phone className="w-3 h-3" />
                  </div>
                </a>
              </div>

              {/* Operating Hours & Advisory */}
              <div className="pt-4 border-t border-[#E2E6DF] space-y-2 text-xs text-[#646C67]">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#43AD35] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#161A18]">Waktu Operasional: </span>
                    {clinic.operatingHoursText}
                  </div>
                </div>
                <div className="flex items-start gap-2 pt-1">
                  <AlertTriangle className="w-4 h-4 text-[#E94F9A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#161A18]">Keadaan Darurat Akut: </span>
                    {clinic.emergencyNotice}
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Verification Notice */}
            <div className="p-4 bg-white rounded-xl border border-dashed border-[#E2E6DF] flex items-center justify-between text-xs text-[#646C67]">
              <span>Ingin memperbarui rincian kontak atau jadwal dokter?</span>
              <button
                type="button"
                onClick={onOpenVerification}
                className="font-bold text-[#102C24] hover:text-[#43AD35] underline underline-offset-2"
              >
                Kelola Data
              </button>
            </div>

          </div>

          {/* Right Column: Google Maps Location Frame */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-xl border border-[#E2E6DF] shadow-2xs overflow-hidden">
              
              {/* Top Banner on Map */}
              <div className="p-4 bg-white border-b border-[#E2E6DF] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#102C24]">
                    Peta Wilayah & Titik Navigasi
                  </div>
                  <div className="text-xs text-[#646C67]">
                    Bunten Barat, Ketapang, Sampang, Madura
                  </div>
                </div>
                <a
                  href={clinic.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#43AD35] hover:text-[#3ba02f]"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Map Preview Embed */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-[#e5e3df] overflow-hidden">
                <iframe
                  title="Peta Lokasi Klinik Pratama Azizah"
                  src="https://maps.google.com/maps?q=374H%2BV79%20Bunten%20Barat%20Ketapang%20Sampang&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Location Card inside Map */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-lg border border-[#E2E6DF] shadow-md pointer-events-auto">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-[#EDF5EA] text-[#43AD35] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#161A18]">Klinik Pratama Azizah</div>
                      <div className="text-[11px] text-[#646C67] truncate">
                        Olo Tengah, Bunten Barat, Ketapang
                      </div>
                      <a
                        href={clinic.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#43AD35] hover:underline mt-1"
                      >
                        <span>Mulai Rute Navigasi</span>
                        <Navigation className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transportation Arrival Guide */}
              <div className="p-5 bg-[#F5F5F2] border-t border-[#E2E6DF] text-xs text-[#646C67] space-y-2">
                <div className="font-bold text-[#161A18]">Petunjuk Akses Transportasi:</div>
                <p className="leading-relaxed">
                  Terletak di jalur Bunten Barat, Kecamatan Ketapang. Dapat diakses dengan kendaraan roda dua maupun roda empat dengan area parkir yang tersedia di depan klinik.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
