import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const TrustStatsPanel: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative z-20 pb-16 lg:pb-24 bg-[#F5F5F2]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Panel with Deep Forest Green Background */}
        <div className="bg-[#102C24] text-white rounded-2xl p-4 sm:p-6 lg:p-7 shadow-xl border border-[#102C24]/90 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Highlighted Bright Green Block on the Left (4 cols) */}
            <div className="lg:col-span-4 bg-[#43AD35] text-white p-7 sm:p-8 rounded-xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="text-xs font-mono font-bold tracking-widest uppercase text-white/80 mb-2">
                  KLINIK PRATAMA
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight mb-2">
                  AZIZAH
                </h2>
                <div className="text-lg font-bold text-white mb-3">
                  Dekat, Ramah, Peduli
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                  Pelayanan kesehatan yang berfokus pada kenyamanan dan kebutuhan pasien di Sampang, Madura.
                </p>
              </div>
            </div>

            {/* Three Statistic / Informational Columns to its right (8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10 items-center">
              
              {/* Column 1: Pelayanan */}
              <div
                onClick={() => handleScrollTo('#layanan')}
                className="pt-4 md:pt-0 md:px-5 flex flex-col justify-between h-full group cursor-pointer"
              >
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#43AD35] font-mono tracking-tight mb-2">
                    01
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center gap-1 group-hover:text-[#43AD35] transition-colors">
                    <span>Pelayanan</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Informasi layanan medis dasar klinik dalam satu tempat yang tertata rapi.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#43AD35] font-semibold uppercase tracking-wider">
                  Lihat Detail Layanan →
                </div>
              </div>

              {/* Column 2: Informasi */}
              <div
                onClick={() => handleScrollTo('#informasi')}
                className="pt-4 md:pt-0 md:px-5 flex flex-col justify-between h-full group cursor-pointer"
              >
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#43AD35] font-mono tracking-tight mb-2">
                    02
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center gap-1 group-hover:text-[#43AD35] transition-colors">
                    <span>Informasi</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Kenali jam operasional, persiapan berkas, dan panduan kunjungan.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#43AD35] font-semibold uppercase tracking-wider">
                  Panduan Kunjungan →
                </div>
              </div>

              {/* Column 3: Lokasi */}
              <div
                onClick={() => handleScrollTo('#lokasi')}
                className="pt-4 md:pt-0 md:px-5 flex flex-col justify-between h-full group cursor-pointer"
              >
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#43AD35] font-mono tracking-tight mb-2">
                    03
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center gap-1 group-hover:text-[#43AD35] transition-colors">
                    <span>Lokasi</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Temukan lokasi klinik di Ketapang, Sampang dengan petunjuk Google Maps.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#43AD35] font-semibold uppercase tracking-wider">
                  Peta & Rute →
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
