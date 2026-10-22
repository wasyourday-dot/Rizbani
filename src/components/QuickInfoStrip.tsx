import React from 'react';
import { MapPin, Clock, Phone, ArrowUpRight } from 'lucide-react';
import { ClinicConfig } from '../data/clinicData';

interface QuickInfoStripProps {
  clinic: ClinicConfig;
}

export const QuickInfoStrip: React.FC<QuickInfoStripProps> = ({ clinic }) => {
  return (
    <section className="relative z-20 -mt-4 mb-16 lg:mb-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E3E7E0] rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E3E7E0]">
            
            {/* Block 1: Lokasi */}
            <div className="p-6 lg:p-7 flex items-start gap-4 hover:bg-[#F7F8F5]/60 transition-colors">
              <div className="w-10 h-10 rounded-md bg-[#EDF5EA] flex items-center justify-center shrink-0 text-[#43AD35]">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-[#667067] mb-1">
                  Lokasi Fasilitas
                </div>
                <div className="text-base font-bold text-[#202923] truncate">
                  Bunten Barat, Ketapang
                </div>
                <div className="text-xs text-[#667067] mt-0.5">
                  Kabupaten Sampang, Madura
                </div>
                <a
                  href={clinic.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#234D78] hover:text-[#43AD35] transition-colors"
                >
                  <span>Buka Petunjuk Peta</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Block 2: Jam Operasional */}
            <div className="p-6 lg:p-7 flex items-start gap-4 hover:bg-[#F7F8F5]/60 transition-colors">
              <div className="w-10 h-10 rounded-md bg-[#EDF5EA] flex items-center justify-center shrink-0 text-[#43AD35]">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-[#667067] mb-1">
                  Jam Operasional
                </div>
                <div className="text-base font-bold text-[#202923]">
                  {clinic.operatingHoursStatus === 'confirmed' ? 'Senin – Sabtu' : 'Konfirmasi Terlebih Dahulu'}
                </div>
                <div className="text-xs text-[#667067] mt-0.5 leading-relaxed">
                  {clinic.operatingHoursText}
                </div>
              </div>
            </div>

            {/* Block 3: Kontak Pelayanan */}
            <div className="p-6 lg:p-7 flex items-start gap-4 hover:bg-[#F7F8F5]/60 transition-colors">
              <div className="w-10 h-10 rounded-md bg-[#FFF0F6] flex items-center justify-center shrink-0 text-[#E94F9A]">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-[#667067] mb-1">
                  Kontak Informasi
                </div>
                <div className="text-base font-bold font-mono text-[#202923]">
                  {clinic.phoneReference}
                </div>
                <div className="text-xs text-[#667067] mt-0.5">
                  Panggilan Telepon & Pesan WhatsApp
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href={`https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
                      'Halo Klinik Pratama Azizah, saya ingin menanyakan informasi pelayanan.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#43AD35] hover:underline"
                  >
                    <span>Kirim Pesan WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
