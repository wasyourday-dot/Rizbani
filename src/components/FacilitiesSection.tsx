import React from 'react';
import { Stethoscope, Activity, Pill, Users } from 'lucide-react';

interface FacilityItem {
  number: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

const FACILITIES: FacilityItem[] = [
  {
    number: '01',
    name: 'Ruang Konsultasi & Pemeriksaan',
    description: 'Ruang periksa privat yang tenang untuk konsultasi medis umum, evaluasi tanda vital, dan diagnosa awal secara tertutup.',
    icon: Stethoscope,
  },
  {
    number: '02',
    name: 'Ruang Tindakan & Observasi',
    description: 'Dilengkapi tempat tidur periksa steril dan peralatan medis dasar untuk penanganan luka ringan atau observasi pasca-tindakan.',
    icon: Activity,
  },
  {
    number: '03',
    name: 'Instalasi Farmasi Terpadu',
    description: 'Penyimpanan obat terstandar untuk melayani resep dokter klinik dengan penjelasan dosis yang jelas oleh petugas.',
    icon: Pill,
  },
  {
    number: '04',
    name: 'Area Tunggu & Penerimaan Pasien',
    description: 'Ruang tunggu berudara segar dan tertata rapi untuk memastikan antrean pasien berlangsung nyaman dan teratur.',
    icon: Users,
  },
];

export const FacilitiesSection: React.FC = () => {
  return (
    <section id="fasilitas" className="py-20 lg:py-28 bg-[#F5F5F2] border-t border-[#E2E6DF] scroll-mt-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-bold tracking-[0.2em] text-[#43AD35] uppercase mb-3 select-none">
            FASILITAS KLINIK
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#161A18] tracking-tight mb-4 font-sans">
            Fasilitas Pelayanan Primer
          </h2>
          <p className="text-base text-[#646C67] leading-relaxed">
            Sarana fisik pelayanan medis di Bunten Barat, Ketapang yang dirancang untuk mendukung kenyamanan, kebersihan, dan privasi setiap pasien.
          </p>
        </div>

        {/* 4-Item Grid with Swiss-inspired precision */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACILITIES.map((fac) => {
            const Icon = fac.icon;
            return (
              <div
                key={fac.number}
                className="bg-white p-7 rounded-xl border border-[#E2E6DF] flex flex-col justify-between hover:border-[#43AD35] transition-colors shadow-2xs group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E6DF]">
                    <span className="text-xs font-mono font-bold text-[#43AD35]">
                      {fac.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#EDF5EA] text-[#43AD35] flex items-center justify-center group-hover:bg-[#43AD35] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#161A18] mb-2 font-serif">
                    {fac.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#646C67] leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E2E6DF] text-[11px] text-[#646C67] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#43AD35]" />
                  <span>Standar Klinik Pratama</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
