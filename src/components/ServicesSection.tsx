import React from 'react';
import { ArrowUpRight, Plus, CheckCircle2, Clock, HelpCircle } from 'lucide-react';
import { ClinicConfig, ClinicService } from '../data/clinicData';

interface ServicesSectionProps {
  clinic: ClinicConfig;
  onOpenVerification: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ clinic, onOpenVerification }) => {
  return (
    <section id="layanan" className="py-20 lg:py-28 bg-[#102C24] text-white overflow-hidden scroll-mt-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Introduction */}
        <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-20">
          <div className="text-xs font-bold tracking-[0.2em] text-[#43AD35] uppercase mb-3 select-none">
            LAYANAN KLINIK
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans leading-tight">
            Layanan <span className="text-[#43AD35]">Kesehatan</span> <br />
            untuk Kebutuhan Anda.
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            Kenali informasi pelayanan Klinik Pratama Azizah.
          </p>
        </div>

        {/* 3-Column Service Card Grid on Desktop, 1-Column on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 mb-14">
          {clinic.services.map((service: ClinicService, index: number) => {
            const indexStr = String(index + 1).padStart(2, '0');

            return (
              <div
                key={service.id}
                className="bg-[#F5F5F2] text-[#161A18] rounded-xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl border border-white/10 group"
              >
                <div>
                  {/* Top Header: Category, Index Number & Geometric Plus Mark */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E6DF]">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#234D78]">
                      {service.category}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#646C67]">
                        {indexStr}
                      </span>
                      <div className="w-5 h-5 rounded-full bg-[#E2E6DF]/80 flex items-center justify-center text-[#161A18] group-hover:bg-[#43AD35] group-hover:text-white transition-colors">
                        <Plus className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl sm:text-[22px] font-bold text-[#161A18] mb-3 tracking-tight">
                    {service.name}
                  </h3>

                  {/* Short Readable Description */}
                  <p className="text-sm text-[#646C67] leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Notes / Availability */}
                  {service.notes && (
                    <div className="text-xs text-[#646C67]/90 italic mb-4">
                      {service.notes}
                    </div>
                  )}
                </div>

                {/* Card Footer: Confirmation Status & WhatsApp Action */}
                <div className="pt-4 border-t border-[#E2E6DF] flex items-center justify-between gap-2 mt-2">
                  {service.isConfirmed ? (
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#43AD35]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Terkonfirmasi</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#646C67]">
                      <Clock className="w-3.5 h-3.5 text-[#E94F9A]" />
                      <span>Tahap Konfirmasi</span>
                    </div>
                  )}

                  <a
                    href={`https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
                      `Halo Klinik Pratama Azizah, saya ingin menanyakan informasi pelayanan: ${service.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#234D78] group-hover:text-[#43AD35] transition-colors"
                  >
                    <span>Tanyakan</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scope Transparency Bar inside deep forest green section */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-[#43AD35] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-white/80 leading-relaxed">
              <span className="font-bold text-white">Transparansi Pelayanan: </span>
              Klinik Pratama Azizah hanya mempublikasikan layanan kesehatan primer yang telah terverifikasi. Untuk prosedur khusus atau kebutuhan rujukan, silakan hubungi tim medis klinik.
            </div>
          </div>
          <button
            onClick={onOpenVerification}
            className="shrink-0 text-xs font-bold text-[#43AD35] hover:text-white underline underline-offset-4 transition-colors"
          >
            Kelola Daftar Layanan
          </button>
        </div>

      </div>
    </section>
  );
};
