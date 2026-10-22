import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  Clock,
  CalendarCheck,
  ShieldAlert,
  FileText,
  MapPin,
  Ambulance,
  Search,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';
import { ClinicConfig } from '../data/clinicData';

interface PatientInfoSectionProps {
  clinic: ClinicConfig;
}

type FaqCategory = 'all' | 'hours' | 'booking' | 'insurance' | 'preparation';

interface FaqItem {
  id: string;
  category: FaqCategory;
  categoryLabel: string;
  icon: React.ElementType;
  question: string;
  answer: React.ReactNode;
}

export const PatientInfoSection: React.FC<PatientInfoSectionProps> = ({ clinic }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const faqItems: FaqItem[] = useMemo(
    () => [
      {
        id: 'faq-1',
        category: 'hours',
        categoryLabel: 'Operasional & Jadwal',
        icon: Clock,
        question: 'Kapan jam operasional Klinik Pratama Azizah dan apakah dokter selalu bertugas?',
        answer: (
          <div className="space-y-2 text-[#646C67]">
            <p>
              Pelayanan rutin dibuka pada hari <strong>Senin hingga Sabtu</strong> mulai pukul <strong>08.00 hingga 20.00 WIB</strong>.
            </p>
            <p className="text-xs leading-relaxed">
              Dokter umum dan perawat bertugas secara teratur selama jam buka. Demi kepastian jadwal dokter pada hari tertentu dan untuk menghindari waktu tunggu yang terlalu lama pada jam sibuk, Anda sangat disarankan untuk mengirimkan pesan singkat ke WhatsApp klinik sebelum berangkat.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-[#43AD35] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Hari Minggu & Hari Libur Nasional: Konfirmasi via kontak terlebih dahulu</span>
            </div>
          </div>
        ),
      },
      {
        id: 'faq-2',
        category: 'booking',
        categoryLabel: 'Pendaftaran & Janji Temu',
        icon: CalendarCheck,
        question: 'Bagaimana prosedur pendaftaran atau pemesanan janji temu (appointment booking)?',
        answer: (
          <div className="space-y-2 text-[#646C67]">
            <p>
              Anda dapat melakukan pendaftaran dengan dua cara yang sangat mudah:
            </p>
            <ul className="list-disc list-inside text-xs space-y-1.5 pl-1">
              <li>
                <strong>Pendaftaran Langsung (Walk-In):</strong> Silakan datang langsung ke meja administrasi klinik pada jam operasional untuk mengambil antrean periksa hari itu juga.
              </li>
              <li>
                <strong>Reservasi Janji Temu via WhatsApp:</strong> Hubungi nomor{' '}
                <strong className="text-[#161A18] font-mono">{clinic.phoneReference}</strong> dengan menyertakan nama pasien, perkiraan jam kedatangan, dan keluhan singkat. Petugas kami akan membantu mencatatkan jadwal agar proses periksa lebih teratur.
              </li>
            </ul>
          </div>
        ),
      },
      {
        id: 'faq-3',
        category: 'insurance',
        categoryLabel: 'Jaminan Kesehatan & Biaya',
        icon: ShieldAlert,
        question: 'Apakah Klinik Pratama Azizah melayani jaminan BPJS Kesehatan atau asuransi?',
        answer: (
          <div className="space-y-2 text-[#646C67]">
            <p>
              Klinik Pratama Azizah melayani pasien <strong>Umum / Mandiri</strong> dengan biaya konsultasi dan tindakan medis primer yang terjangkau dan transparan bagi seluruh warga Ketapang dan sekitarnya.
            </p>
            <p className="text-xs leading-relaxed">
              Terkait status kepesertaan <strong>BPJS Kesehatan (Fasilitas Kesehatan Tingkat Pertama / FKTP)</strong> maupun asuransi mitra perusahaan tertentu, proses verifikasi administrasi dapat dikonfirmasikan langsung kepada petugas melalui WhatsApp dengan melampirkan foto kartu kepesertaan Anda.
            </p>
          </div>
        ),
      },
      {
        id: 'faq-4',
        category: 'preparation',
        categoryLabel: 'Persiapan Kunjungan',
        icon: FileText,
        question: 'Dokumen dan berkas apa saja yang wajib dibawa saat berobat ke klinik?',
        answer: (
          <div className="space-y-2 text-[#646C67]">
            <p>
              Untuk kelancaran pencatatan rekam medis dan keselamatan pasien, kami menganjurkan membawa:
            </p>
            <ul className="list-disc list-inside text-xs space-y-1 pl-1">
              <li>Kartu Identitas Diri (KTP asli untuk dewasa, atau Kartu Keluarga untuk anak-anak).</li>
              <li>Contoh atau catatan obat-obatan rutin yang sedang dikonsumsi saat ini.</li>
              <li>Catatan riwayat alergi obat atau makanan (jika ada) untuk disampaikan ke dokter.</li>
              <li>Kartu asuransi/jaminan kesehatan jika ingin berkonsultasi mengenai administrasi rujukan.</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'faq-5',
        category: 'hours',
        categoryLabel: 'Akses & Lokasi',
        icon: MapPin,
        question: 'Di mana lokasi fisik klinik dan bagaimana akses jalan di Bunten Barat?',
        answer: (
          <div className="space-y-2 text-[#646C67]">
            <p>
              Klinik beralamat di{' '}
              <strong>374H+V79, Olo Tengah, Bunten Barat, Kecamatan Ketapang, Kabupaten Sampang, Jawa Timur 69261</strong>.
            </p>
            <p className="text-xs leading-relaxed">
              Jalan menuju klinik mudah diakses menggunakan sepeda motor, mobil pribadi, maupun ambulans desa. Tersedia area parkir di depan gedung klinik. Anda dapat menekan tombol <strong>"Buka Google Maps"</strong> pada menu navigasi untuk panduan rute GPS langsung ke titik klinik.
            </p>
          </div>
        ),
      },
      {
        id: 'faq-6',
        category: 'preparation',
        categoryLabel: 'Rujukan & Spesialis',
        icon: FileText,
        question: 'Bagaimana alur rujukan jika pasien memerlukan penanganan spesialis atau rumah sakit?',
        answer: (
          <div className="space-y-2 text-[#646C67]">
            <p>
              Sebagai fasilitas kesehatan primer, dokter umum kami akan melakukan evaluasi medis menyeluruh terlebih dahulu.
            </p>
            <p className="text-xs leading-relaxed">
              Apabila kondisi klinis pasien terindikasi membutuhkan tindakan medis spesialistik atau rawat inap lanjutan, klinik akan menerbitkan <strong>Surat Pengantar Rujukan Resmi</strong> yang memuat riwayat diagnosa dan terapi awal untuk mempermudah penerimaan di Rumah Sakit Umum Daerah (RSUD) rujukan di Kabupaten Sampang.
            </p>
          </div>
        ),
      },
      {
        id: 'faq-7',
        category: 'hours',
        categoryLabel: 'Keadaan Darurat',
        icon: Ambulance,
        question: 'Bagaimana penanganan jika terjadi kondisi gawat darurat di luar jam kerja?',
        answer: (
          <div className="space-y-2 text-[#646C67]">
            <p>
              Klinik Pratama Azizah melayani penanganan keluhan medis dasar pada jam operasional reguler.
            </p>
            <p className="text-xs leading-relaxed">
              Untuk kondisi medis yang mengancam nyawa (seperti sesak napas berat, nyeri dada hebat, penurunan kesadaran tiba-tiba, trauma kecelakaan berat, atau perdarahan akut), keluarga pasien dianjurkan untuk <strong>langsung menuju Instalasi Gawat Darurat (IGD) Rumah Sakit terdekat</strong> yang beroperasi 24 jam dengan fasilitas intensif.
            </p>
          </div>
        ),
      },
    ],
    [clinic.phoneReference]
  );

  // Filter items based on category and search query
  const filteredFaqs = useMemo(() => {
    return faqItems.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [faqItems, selectedCategory, searchQuery]);

  return (
    <section id="informasi" className="py-20 lg:py-28 bg-[#F5F5F2] border-t border-[#E2E6DF] scroll-mt-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-[0.2em] text-[#43AD35] uppercase mb-3 select-none">
            PERTANYAAN UMUM (FAQ) · INFORMASI PASIEN
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#161A18] tracking-tight mb-4 font-sans leading-tight">
            Jawaban Cepat Seputar <br className="hidden sm:inline" />
            Layanan & Kunjungan.
          </h2>
          <p className="text-base text-[#646C67] leading-relaxed">
            Temukan informasi praktis mengenai jam buka, prosedur pendaftaran janji temu, penerimaan jaminan kesehatan, dan panduan kunjungan ke Klinik Pratama Azizah.
          </p>
        </div>

        {/* Search and Category Filter Controls (Frontend Design Constitution Compliant) */}
        <div className="mb-10 space-y-4">
          
          {/* Instant Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#646C67] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan (misal: jam buka, janji temu, BPJS)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#E2E6DF] text-xs sm:text-sm text-[#161A18] placeholder-[#646C67] focus:outline-none focus:border-[#43AD35] focus:ring-1 focus:ring-[#43AD35] shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#646C67] hover:text-[#161A18] absolute right-3.5 top-1/2 -translate-y-1/2"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Segmented Control Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E2E6DF] rounded-xl overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[#102C24] text-white shadow-xs'
                  : 'text-[#646C67] hover:text-[#161A18] hover:bg-[#F5F5F2]'
              }`}
            >
              Semua Pertanyaan ({faqItems.length})
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('hours')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
                selectedCategory === 'hours'
                  ? 'bg-[#102C24] text-white shadow-xs'
                  : 'text-[#646C67] hover:text-[#161A18] hover:bg-[#F5F5F2]'
              }`}
            >
              Jam Buka & Operasional
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('booking')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
                selectedCategory === 'booking'
                  ? 'bg-[#102C24] text-white shadow-xs'
                  : 'text-[#646C67] hover:text-[#161A18] hover:bg-[#F5F5F2]'
              }`}
            >
              Janji Temu & Pendaftaran
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('insurance')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
                selectedCategory === 'insurance'
                  ? 'bg-[#102C24] text-white shadow-xs'
                  : 'text-[#646C67] hover:text-[#161A18] hover:bg-[#F5F5F2]'
              }`}
            >
              Jaminan Kesehatan & BPJS
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('preparation')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
                selectedCategory === 'preparation'
                  ? 'bg-[#102C24] text-white shadow-xs'
                  : 'text-[#646C67] hover:text-[#161A18] hover:bg-[#F5F5F2]'
              }`}
            >
              Berkas & Rujukan
            </button>
          </div>

        </div>

        {/* Clean Accordion List */}
        <div className="max-w-4xl bg-white border border-[#E2E6DF] rounded-2xl shadow-2xs divide-y divide-[#E2E6DF] overflow-hidden">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-[#646C67] text-sm">
              Tidak ada pertanyaan yang sesuai dengan kata kunci "{searchQuery}".
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-xs font-bold text-[#43AD35] hover:underline"
                >
                  Tampilkan semua pertanyaan
                </button>
              </div>
            </div>
          ) : (
            filteredFaqs.map((item) => {
              const isOpen = openId === item.id;
              const Icon = item.icon;

              return (
                <div key={item.id} className="transition-colors">
                  <button
                    type="button"
                    id={`faq-btn-${item.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between text-left p-5 sm:p-6 group focus-visible:outline-2 focus-visible:outline-[#43AD35] focus-visible:outline-offset-2"
                  >
                    <div className="flex items-start sm:items-center gap-4 pr-4 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-[#43AD35] text-white'
                            : 'bg-[#F5F5F2] text-[#646C67] border border-[#E2E6DF] group-hover:text-[#161A18]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#234D78] mb-1">
                          {item.categoryLabel}
                        </div>
                        <span
                          className={`text-base sm:text-lg font-bold transition-colors font-sans block ${
                            isOpen ? 'text-[#102C24]' : 'text-[#161A18] group-hover:text-[#43AD35]'
                          }`}
                        >
                          {item.question}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 border border-[#E2E6DF] ${
                        isOpen ? 'rotate-180 bg-[#102C24] text-white' : 'bg-white text-[#646C67]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${item.id}`}
                      className="px-5 pb-6 pt-1 sm:px-6 sm:pb-7 pl-16 sm:pl-19 text-sm sm:text-base text-[#646C67] leading-relaxed border-t border-[#E2E6DF]/60 bg-[#F5F5F2]/40 animate-in fade-in slide-in-from-top-1 duration-150"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Help Banner for Unanswered Inquiries */}
        <div className="mt-8 max-w-4xl p-6 rounded-2xl bg-white border border-[#E2E6DF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#EDF5EA] text-[#43AD35] flex items-center justify-center shrink-0 mt-0.5">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#161A18]">
                Punya pertanyaan lain mengenai layanan kesehatan?
              </div>
              <p className="text-xs text-[#646C67] mt-0.5">
                Staf administrasi kami siap menjawab konfirmasi jadwal dokter, antrean, atau kebutuhan surat rujukan.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
              'Halo Klinik Pratama Azizah, saya ingin menanyakan informasi seputar layanan klinik.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-[#43AD35] hover:bg-[#3ba02f] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors shadow-2xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat WhatsApp Petugas</span>
          </a>
        </div>

      </div>
    </section>
  );
};
