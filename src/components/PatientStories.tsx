import React, { useState, useMemo } from 'react';
import {
  Quote,
  Star,
  CheckCircle2,
  Heart,
  MessageCircle,
  MapPin,
  Calendar,
  UserCheck,
  ChevronRight,
} from 'lucide-react';
import { ClinicConfig } from '../data/clinicData';

interface PatientStory {
  id: string;
  name: string;
  residence: string;
  category: 'umum' | 'keluarga' | 'lansia' | 'rujukan';
  categoryLabel: string;
  serviceReceived: string;
  date: string;
  title: string;
  story: string;
  highlight: string;
  rating: number; // 5 out of 5
}

const PATIENT_STORIES: PatientStory[] = [
  {
    id: 'story-1',
    name: 'Ibu Maryam',
    residence: 'Desa Bunten Barat, Ketapang',
    category: 'keluarga',
    categoryLabel: 'Kesehatan Ibu & Anak',
    serviceReceived: 'Pemeriksaan Demam & Tumbuh Kembang Anak',
    date: 'September 2026',
    title: 'Penanganan cepat dan dokter sangat teliti menjelaskan kondisi anak',
    story:
      'Waktu anak saya panas tinggi di malam hari, kami langsung bawa ke Klinik Azizah. Pelayanannya sangat ramah dan ruang periksanya bersih. Dokternya tidak terburu-buru, obatnya dijelaskan cara minumnya dengan detail oleh petugas farmasi. Alhamdulillah anak saya lekas pulih.',
    highlight: 'Penjelasan obat sangat jelas dan suasana klinik tenang.',
    rating: 5,
  },
  {
    id: 'story-2',
    name: 'Bapak H. Syafi’i',
    residence: 'Ketapang Daya, Sampang',
    category: 'lansia',
    categoryLabel: 'Pemeriksaan Rutin Lansia',
    serviceReceived: 'Kontrol Tekanan Darah & Konsultasi Medis',
    date: 'Oktober 2026',
    title: 'Pelayanan dekat dari rumah, tidak perlu jauh-jauh ke kota untuk kontrol rutin',
    story:
      'Sebagai lansia dengan riwayat tensi tinggi, sangat terbantu ada klinik pratama di Bunten Barat. Petugas medis selalu memeriksa tensi dengan sabar dan memberikan nasihat pola makan rendah garam. Antreannya tertib dan nyaman.',
    highlight: 'Sangat memudahkan kontrol tensi rutin tanpa harus ke pusat kota.',
    rating: 5,
  },
  {
    id: 'story-3',
    name: 'Ibu Nurul Hidayati',
    residence: 'Kecamatan Banyuates',
    category: 'umum',
    categoryLabel: 'Pemeriksaan Umum',
    serviceReceived: 'Pengobatan ISPA & Konsultasi Kesehatan',
    date: 'Agustus 2026',
    title: 'Bisa reservasi antrean via WhatsApp sehingga tidak lama menunggu',
    story:
      'Saya sangat terbantu karena bisa chat WhatsApp terlebih dahulu untuk menanyakan jadwal dokter umum. Sesampainya di klinik, berkas sudah disiapkan dan langsung dipanggil. Sangat profesional untuk fasilitas tingkat pertama di Madura.',
    highlight: 'Fitur pendaftaran via WhatsApp menghemat banyak waktu tunggu.',
    rating: 5,
  },
  {
    id: 'story-4',
    name: 'Bapak Ahmad Hasan',
    residence: 'Olo Tengah, Bunten Barat',
    category: 'rujukan',
    categoryLabel: 'Koordinasi Rujukan',
    serviceReceived: 'Penanganan Medis Awal & Rujukan Terarah',
    date: 'Juli 2026',
    title: 'Surat rujukan dibuatkan secara transparan dan dipandu petugas',
    story:
      'Ketika keluhan keluarga kami membutuhkan foto rontgen dan rawat lanjutan, dokter di Klinik Azizah dengan jujur menjelaskan batas kewenangan primer dan langsung membuatkan surat pengantar resmi ke RSUD Sampang. Kami sangat menghargai transparansi medis ini.',
    highlight: 'Etika kedokteran yang jujur dan koordinasi rujukan yang teratur.',
    rating: 5,
  },
  {
    id: 'story-5',
    name: 'Ibu Siti Rohmah',
    residence: 'Ketapang Barat',
    category: 'umum',
    categoryLabel: 'Layanan Farmasi & Obat',
    serviceReceived: 'Pemeriksaan Fisik Dasar & Obat Terstandar',
    date: 'Oktober 2026',
    title: 'Obat-obatan resmi, biaya transparan tanpa biaya tak terduga',
    story:
      'Sebagai pasien umum, saya merasa tenang karena biaya pemeriksaan dan obat di Klinik Azizah sangat wajar dan terbuka. Tempatnya bersih dan staf administrasi melayani warga dengan senyum dan bahasa Madura yang santun.',
    highlight: 'Biaya umum transparan dan pelayanan ramah bersahaja.',
    rating: 5,
  },
  {
    id: 'story-6',
    name: 'Bapak Kholilurrohman',
    residence: 'Bunten Timur, Ketapang',
    category: 'keluarga',
    categoryLabel: 'Keluarga & Balita',
    serviceReceived: 'Konsultasi Nutrisi & Imunisasi Balita',
    date: 'September 2026',
    title: 'Ruang tunggu nyaman dan ramah bagi ibu yang membawa balita',
    story:
      'Klinik ini sangat bersih dan ventilasinya bagus. Waktu membawa si kecil periksa berat badan dan konsultasi nutrisi, suasananya tidak bising seperti faskes besar. Petugasnya telaten dan peduli terhadap kenyamanan anak.',
    highlight: 'Fasilitas bersih dan sangat ramah terhadap anak kecil.',
    rating: 5,
  },
];

interface PatientStoriesProps {
  clinic: ClinicConfig;
}

export const PatientStories: React.FC<PatientStoriesProps> = ({ clinic }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredStories = useMemo(() => {
    if (activeCategory === 'all') return PATIENT_STORIES;
    return PATIENT_STORIES.filter((story) => story.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="testimoni" className="py-20 lg:py-28 bg-[#F5F5F2] border-t border-[#E2E6DF] scroll-mt-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-[0.2em] text-[#43AD35] uppercase mb-3 select-none flex items-center gap-2">
              <span>TESTIMONI & PENGALAMAN PASIEN</span>
              <span className="text-[#646C67]">·</span>
              <span>KEPERCAYAAN WARGA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#161A18] tracking-tight mb-4 font-sans leading-tight">
              Cerita Nyata dari Pasien & <br className="hidden sm:inline" />
              Keluarga di Ketapang.
            </h2>
            <p className="text-base text-[#646C67] leading-relaxed">
              Pengalaman nyata warga Bunten Barat dan sekitarnya saat mempercayakan pemeriksaan medis dasar dan kesehatan keluarga di Klinik Pratama Azizah.
            </p>
          </div>

          {/* Trust Summary Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E6DF] shadow-2xs flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-[#EDF5EA] text-[#43AD35] flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 fill-[#43AD35]" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#43AD35] mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#43AD35]" />
                ))}
              </div>
              <div className="text-xs font-bold text-[#161A18]">
                Kepuasan Pelayanan Primer
              </div>
              <div className="text-[11px] text-[#646C67]">
                Evaluasi berkala kepuasan pasien klinik
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
              activeCategory === 'all'
                ? 'bg-[#102C24] text-white shadow-2xs'
                : 'bg-white text-[#646C67] hover:text-[#161A18] border border-[#E2E6DF]'
            }`}
          >
            Semua Cerita ({PATIENT_STORIES.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('keluarga')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
              activeCategory === 'keluarga'
                ? 'bg-[#102C24] text-white shadow-2xs'
                : 'bg-white text-[#646C67] hover:text-[#161A18] border border-[#E2E6DF]'
            }`}
          >
            Kesehatan Ibu & Anak
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('lansia')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
              activeCategory === 'lansia'
                ? 'bg-[#102C24] text-white shadow-2xs'
                : 'bg-white text-[#646C67] hover:text-[#161A18] border border-[#E2E6DF]'
            }`}
          >
            Pemeriksaan Rutin Lansia
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('umum')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
              activeCategory === 'umum'
                ? 'bg-[#102C24] text-white shadow-2xs'
                : 'bg-white text-[#646C67] hover:text-[#161A18] border border-[#E2E6DF]'
            }`}
          >
            Pemeriksaan Umum
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('rujukan')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
              activeCategory === 'rujukan'
                ? 'bg-[#102C24] text-white shadow-2xs'
                : 'bg-white text-[#646C67] hover:text-[#161A18] border border-[#E2E6DF]'
            }`}
          >
            Koordinasi Rujukan
          </button>
        </div>

        {/* Stories Grid Layout (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 mb-14">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-[#E2E6DF] shadow-2xs flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md group"
            >
              <div>
                {/* Card Top: Category Badge & Quote Icon */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E6DF]">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#234D78]">
                    {story.categoryLabel}
                  </span>
                  
                  <div className="w-8 h-8 rounded-full bg-[#EDF5EA] text-[#43AD35] flex items-center justify-center">
                    <Quote className="w-4 h-4 fill-[#43AD35]" />
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 text-[#43AD35] mb-3">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#43AD35]" />
                  ))}
                  <span className="text-xs font-bold text-[#161A18] ml-1.5">5.0</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#161A18] leading-snug mb-3 font-serif">
                  “{story.title}”
                </h3>

                {/* Narrative Body */}
                <p className="text-xs sm:text-sm text-[#646C67] leading-relaxed mb-5">
                  {story.story}
                </p>

                {/* Highlight Callout */}
                <div className="p-3 rounded-xl bg-[#F5F5F2] border border-[#E2E6DF] text-xs text-[#161A18] italic flex items-start gap-2 mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#43AD35] shrink-0 mt-0.5" />
                  <span>“{story.highlight}”</span>
                </div>
              </div>

              {/* Card Footer: Patient Identification & Service Detail */}
              <div className="pt-4 border-t border-[#E2E6DF] mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#102C24] text-white flex items-center justify-center font-bold text-xs uppercase">
                      {story.name.charAt(story.name.indexOf(' ') + 1 || 0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#161A18] flex items-center gap-1">
                        <span>{story.name}</span>
                        <UserCheck className="w-3 h-3 text-[#43AD35]" />
                      </div>
                      <div className="text-[11px] text-[#646C67] flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5" />
                        <span>{story.residence}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#646C67] font-mono">
                    {story.date}
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-[#234D78] font-medium bg-[#F5F5F2] px-2.5 py-1 rounded-md inline-block">
                  Layanan: {story.serviceReceived}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Community Feedback Invitation Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#102C24] text-white border border-[#102C24]/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
          <div className="max-w-xl space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-widest text-[#43AD35]">
              PARTISIPASI & MASUKAN PASIEN
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-sans tracking-tight">
              Pernah berkunjung ke Klinik Pratama Azizah?
            </h4>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Masukan dan testimoni dari Anda sangat berharga bagi kami untuk terus menyempurnakan kualitas pelayanan kesehatan bagi seluruh keluarga di Sampang, Madura.
            </p>
          </div>

          <a
            href={`https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
              'Halo Klinik Pratama Azizah, saya ingin menyampaikan ulasan dan pengalaman berobat di klinik.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-[#43AD35] hover:bg-[#3ba02f] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-colors shadow-2xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Kirim Ulasan via WhatsApp</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
