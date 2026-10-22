import React from 'react';
import { HeartHandshake, Compass, ShieldCheck } from 'lucide-react';
import { ClinicConfig } from '../data/clinicData';

interface AboutSectionProps {
  clinic: ClinicConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ clinic }) => {
  return (
    <section id="tentang" className="py-20 lg:py-28 bg-[#F5F5F2] border-t border-[#E2E6DF] scroll-mt-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Large Typographic Statement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-bold tracking-[0.2em] text-[#234D78] uppercase select-none">
              TENTANG KLINIK
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#161A18] tracking-tight leading-[1.08] font-serif">
              Melayani dengan <br />
              <span className="text-[#43AD35]">Kepedulian.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#646C67] leading-relaxed pt-2">
              Klinik Pratama Azizah beroperasi sebagai fasilitas pelayanan kesehatan tingkat pertama di Bunten Barat, Kecamatan Ketapang, Kabupaten Sampang, Madura.
            </p>

            {/* Factual Institutional Highlights */}
            <div className="pt-6 border-t border-[#E2E6DF] space-y-3.5 text-xs text-[#161A18]">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#43AD35] shrink-0" />
                <span className="font-semibold">Klasifikasi: Fasilitas Kesehatan Tingkat Pertama (Klinik Pratama)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-[#43AD35] shrink-0" />
                <span>Wilayah Operasional: Bunten Barat, Ketapang, Sampang</span>
              </div>
              <div className="flex items-center gap-2.5">
                <HeartHandshake className="w-4 h-4 text-[#43AD35] shrink-0" />
                <span>Prinsip: Pelayanan Medis Humanis & Berkelanjutan</span>
              </div>
            </div>
          </div>

          {/* Right Side: Concise Factual Narrative & Structured Columns */}
          <div className="lg:col-span-7 space-y-8 lg:pl-6 lg:border-l lg:border-[#E2E6DF]">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#161A18] tracking-tight">
                Komitmen Pelayanan Primer untuk Masyarakat Sampang
              </h3>
              <p className="text-base text-[#646C67] leading-relaxed">
                Sebagai klinik pratama di wilayah Ketapang, fokus utama kami adalah mendengarkan keluhan pasien secara seksama, memberikan pemeriksaan medis dasar yang teliti, dan mengupayakan solusi kesehatan yang mudah dipahami setiap keluarga.
              </p>
              <p className="text-base text-[#646C67] leading-relaxed">
                Kami berpegang teguh pada etika kedokteran dan transparansi pelayanan. Apabila kondisi medis pasien membutuhkan pemeriksaan penunjang tingkat lanjut, tim kami siap memberikan arahan dan koordinasi rujukan ke rumah sakit rujukan daerah.
              </p>
            </div>

            {/* Structured Value Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <div className="bg-white p-6 rounded-xl border border-[#E2E6DF] shadow-2xs">
                <div className="text-xs font-mono font-bold text-[#43AD35] mb-2 uppercase">
                  Pilar 01
                </div>
                <h4 className="text-base font-bold text-[#161A18] mb-1.5">
                  Pendekatan Humanis
                </h4>
                <p className="text-xs sm:text-sm text-[#646C67] leading-relaxed">
                  Menjaga suasana klinik yang tenang dan bersahabat agar pasien merasa didengar dan dihargai saat berkonsultasi.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#E2E6DF] shadow-2xs">
                <div className="text-xs font-mono font-bold text-[#43AD35] mb-2 uppercase">
                  Pilar 02
                </div>
                <h4 className="text-base font-bold text-[#161A18] mb-1.5">
                  Aksesibilitas Wilayah
                </h4>
                <p className="text-xs sm:text-sm text-[#646C67] leading-relaxed">
                  Memperpendek jarak tempuh warga Ketapang dan sekitarnya untuk mendapatkan pertolongan pertama dan pengobatan primer.
                </p>
              </div>
            </div>

            {/* Integrity note */}
            <div className="p-4 rounded-lg bg-white border border-[#E2E6DF] text-xs text-[#646C67] leading-relaxed">
              <span className="font-bold text-[#161A18]">Transparansi Informasi: </span>
              Seluruh informasi profil disajikan secara faktual berdasarkan legalitas pelayanan kesehatan primer di Kabupaten Sampang, tanpa klaim rekaan atau testimoni palsu.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
