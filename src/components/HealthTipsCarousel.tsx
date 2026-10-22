import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  HeartPulse,
  Droplets,
  Wind,
  Pill,
  Baby,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { ClinicConfig } from '../data/clinicData';

interface HealthTip {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  actionAdvice: string;
  icon: React.ElementType;
  accentColor: string;
  relatedService: string;
}

const HEALTH_TIPS: HealthTip[] = [
  {
    id: 'tip-1',
    category: 'PENCEGAHAN HIPERTENSI · KARDIOVASKULAR',
    title: 'Pemeriksaan Rutin Tekanan Darah',
    tagline: 'Deteksi Dini Tanpa Gejala Awal',
    description:
      'Tekanan darah tinggi sering disebut "silent killer" karena kerap berkembang tanpa keluhan fisik yang terasa. Memeriksakan tensi secara berkala di klinik tingkat pertama merupakan langkah paling efektif untuk mencegah komplikasi jantung dan stroke.',
    actionAdvice: 'Cek tensi berkala minimal sebulan sekali, terutama bagi usia di atas 35 tahun.',
    icon: HeartPulse,
    accentColor: '#43AD35',
    relatedService: 'Pemeriksaan Umum',
  },
  {
    id: 'tip-2',
    category: 'HIDRASI & METABOLISME PESISIR',
    title: 'Kecukupan Cairan di Iklim Hangat',
    tagline: 'Menjaga Fungsi Ginjal dan Daya Tahan',
    description:
      'Wilayah pesisir Madura memiliki paparan sinar matahari dan kelembapan yang khas. Dehidrasi ringan dapat memicu sakit kepala, penurunan konsentrasi, dan memperberat kerja ginjal. Biasakan minum air putih sebelum rasa haus muncul.',
    actionAdvice: 'Konsumsi minimal 1,5 hingga 2 liter air matang per hari dan batasi minuman manis berlebih.',
    icon: Droplets,
    accentColor: '#102C24',
    relatedService: 'Konsultasi Kesehatan',
  },
  {
    id: 'tip-3',
    category: 'SALURAN NAPAS · KESEHATAN MASYARAKAT',
    title: 'Etika Batuk & Pencegahan ISPA',
    tagline: 'Lindungi Anggota Keluarga di Rumah',
    description:
      'Infeksi saluran pernapasan akut mudah menular melalui droplet udara. Menerapkan etika batuk dengan menutup mulut menggunakan lengan dalam serta mencuci tangan dengan sabun secara rutin secara signifikan memutus rantai penularan.',
    actionAdvice: 'Gunakan masker saat merasa flu dan periksakan diri jika demam berlangsung lebih dari 3 hari.',
    icon: Wind,
    accentColor: '#E94F9A',
    relatedService: 'Pemeriksaan Umum',
  },
  {
    id: 'tip-4',
    category: 'PENGGUNAAN OBAT RASIONAL',
    title: 'Kepatuhan Resep & Bahaya Antibiotik Sembarangan',
    tagline: 'Gunakan Obat Sesuai Petunjuk Medis',
    description:
      'Membeli antibiotik tanpa resep dokter atau menghentikan konsumsi obat sebelum habis dapat menyebabkan kuman menjadi resisten (kebal). Selalu konsultasikan keluhan Anda ke petugas kesehatan agar terapi obat tepat sasaran.',
    actionAdvice: 'Habiskan antibiotik sesuai anjuran dan jangan membagi sisa obat kepada orang lain.',
    icon: Pill,
    accentColor: '#43AD35',
    relatedService: 'Layanan Farmasi',
  },
  {
    id: 'tip-5',
    category: 'KESEHATAN IBU & TUMBUH KEMBANG',
    title: 'Pemantauan Tumbuh Kembang Balita',
    tagline: 'Pencegahan Stunting Sejak Dini',
    description:
      '1.000 hari pertama kehidupan merupakan periode emas pertumbuhan anak. Penimbangan berat badan, pengukuran tinggi badan, dan pemantauan perkembangan motorik secara rutin di fasilitas kesehatan primer membantu anak tumbuh optimal.',
    actionAdvice: 'Catat grafik pertumbuhan balita setiap bulan dan konsultasikan kebutuhan asupan gizi seimbang.',
    icon: Baby,
    accentColor: '#102C24',
    relatedService: 'Layanan Ibu dan Anak',
  },
];

interface HealthTipsCarouselProps {
  clinic: ClinicConfig;
}

export const HealthTipsCarousel: React.FC<HealthTipsCarouselProps> = ({ clinic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalTips = HEALTH_TIPS.length;
  const currentTip = HEALTH_TIPS[currentIndex];
  const Icon = currentTip.icon;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalTips);
  }, [totalTips]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalTips) % totalTips);
  }, [totalTips]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  useEffect(() => {
    if (isPlaying && !isHovered) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, nextSlide]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  return (
    <section
      id="edukasi"
      className="py-20 lg:py-28 bg-[#F5F5F2] border-t border-[#E2E6DF] overflow-hidden scroll-mt-16"
      aria-roledescription="carousel"
      aria-label="Edukasi dan Tips Kesehatan Pasien"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-[0.2em] text-[#43AD35] uppercase mb-3 select-none flex items-center gap-2">
              <span>EDUKASI KESEHATAN</span>
              <span className="text-[#646C67]" aria-hidden="true">·</span>
              <span>PANDUAN PREVENTIF</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#161A18] tracking-tight mb-3 font-sans">
              Tips Kesehatan Keluarga
            </h2>
            <p className="text-base text-[#646C67] leading-relaxed">
              Panduan praktis pencegahan dan pemeliharaan kesehatan sehari-hari dari tim medis Klinik Pratama Azizah untuk warga Sampang dan sekitarnya.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full border border-[#E2E6DF] bg-white hover:bg-[#F5F5F2] text-[#161A18] flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#43AD35]"
              aria-label={isPlaying ? 'Jeda perputaran otomatis tips kesehatan' : 'Mulai perputaran otomatis tips kesehatan'}
              title={isPlaying ? 'Jeda rotasi otomatis' : 'Mulai rotasi otomatis'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            {/* Index Counter Indicator */}
            <div className="px-3.5 py-2 text-xs font-mono font-bold text-[#102C24] bg-white border border-[#E2E6DF] rounded-full select-none">
              <span className="text-[#161A18]">0{currentIndex + 1}</span>
              <span className="text-[#646C67] mx-1">/</span>
              <span className="text-[#646C67]">0{totalTips}</span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-[#E2E6DF] bg-white hover:bg-[#F5F5F2] text-[#161A18] hover:text-[#43AD35] flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#43AD35]"
                aria-label="Tips kesehatan sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-[#E2E6DF] bg-white hover:bg-[#F5F5F2] text-[#161A18] hover:text-[#43AD35] flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#43AD35]"
                aria-label="Tips kesehatan berikutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Showcase Card */}
        <div
          className="relative bg-white border border-[#E2E6DF] rounded-2xl shadow-sm overflow-hidden"
          role="group"
          aria-roledescription="slide"
          aria-label={`Tips ${currentIndex + 1} dari ${totalTips}: ${currentTip.title}`}
        >
          {/* Top Progress Track */}
          <div className="w-full bg-[#E2E6DF]/60 h-1">
            <div
              className="h-1 bg-[#43AD35] transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalTips) * 100}%` }}
            />
          </div>

          <div className="p-7 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Icon & Classification */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white shadow-xs transition-colors duration-300"
                    style={{ backgroundColor: currentTip.accentColor }}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="text-[11px] font-bold tracking-wider uppercase text-[#646C67] mb-1.5">
                    {currentTip.category}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#161A18] leading-snug">
                    {currentTip.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#E94F9A] mt-2">
                    {currentTip.tagline}
                  </div>
                </div>

                {/* Related Clinic Service reference */}
                <div className="pt-6 border-t border-[#E2E6DF]">
                  <div className="text-[11px] uppercase tracking-wider text-[#646C67] font-semibold mb-1">
                    Layanan Terkait di Azizah:
                  </div>
                  <div className="text-xs font-bold text-[#102C24]">
                    {currentTip.relatedService}
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Narrative & Actionable Step */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-6 lg:pl-8 lg:border-l lg:border-[#E2E6DF]">
                <div className="space-y-4">
                  <p className="text-base sm:text-lg text-[#161A18]/90 leading-relaxed">
                    {currentTip.description}
                  </p>

                  {/* Practical Action Box */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#EDF5EA]/70 border border-[#43AD35]/20 flex items-start gap-3 mt-4">
                    <CheckCircle2 className="w-5 h-5 text-[#43AD35] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#102C24] mb-1">
                        Saran Praktis Tim Medis
                      </div>
                      <p className="text-xs sm:text-sm text-[#161A18] leading-relaxed">
                        {currentTip.actionAdvice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Action of Card */}
                <div className="pt-6 border-t border-[#E2E6DF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="text-xs text-[#646C67]">
                    Butuh konsultasi lebih lanjut mengenai keluhan Anda?
                  </div>

                  <a
                    href={`https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
                      `Halo Klinik Pratama Azizah, saya ingin menanyakan konsultasi mengenai: ${currentTip.title}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#43AD35] hover:underline"
                  >
                    <span>Konsultasikan via WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Interactive Thumbnail Selectors */}
          <div className="bg-[#F5F5F2] border-t border-[#E2E6DF] p-3 sm:p-4 flex items-center justify-center gap-2 overflow-x-auto">
            {HEALTH_TIPS.map((tip, idx) => (
              <button
                key={tip.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all flex items-center gap-2 focus-visible:outline-[#43AD35] ${
                  currentIndex === idx
                    ? 'bg-white text-[#161A18] font-bold shadow-2xs border border-[#E2E6DF]'
                    : 'text-[#646C67] hover:text-[#161A18] hover:bg-white/60'
                }`}
                aria-label={`Pilih topik ${idx + 1}: ${tip.title}`}
                aria-pressed={currentIndex === idx}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    currentIndex === idx ? 'bg-[#43AD35]' : 'bg-[#E2E6DF]'
                  }`}
                />
                <span className="hidden md:inline truncate max-w-[150px]">
                  {tip.title}
                </span>
                <span className="md:hidden">0{idx + 1}</span>
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
