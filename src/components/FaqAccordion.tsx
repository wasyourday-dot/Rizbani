import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  Clock,
  CalendarCheck,
  ShieldCheck,
  FileText,
  MapPin,
  Ambulance,
  Search,
  MessageCircle,
  HelpCircle,
  ExternalLink,
  Navigation,
  Sparkles,
  Loader2,
  Send,
} from 'lucide-react';
import { ClinicConfig } from '../data/clinicData';

interface FaqAccordionProps {
  clinic: ClinicConfig;
}

type FaqCategory = 'all' | 'insurance' | 'booking' | 'hours' | 'preparation' | 'location';

interface FaqItem {
  id: string;
  category: FaqCategory;
  categoryLabel: string;
  icon: React.ElementType;
  question: string;
  answer: React.ReactNode;
}

interface GroundingChunk {
  maps?: {
    uri: string;
    title: string;
  };
  web?: {
    uri: string;
    title: string;
  };
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ clinic }) => {
  const [openId, setOpenId] = useState<string | null>('faq-insurance');
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Maps Grounding State
  const [mapsQuery, setMapsQuery] = useState('');
  const [mapsLoading, setMapsLoading] = useState(false);
  const [mapsResult, setMapsResult] = useState<{
    text: string;
    groundingChunks: GroundingChunk[];
  } | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const faqItems: FaqItem[] = useMemo(
    () => [
      {
        id: 'faq-insurance',
        category: 'insurance',
        categoryLabel: 'Jaminan Kesehatan & Asuransi',
        icon: ShieldCheck,
        question: 'Apakah Klinik Pratama Azizah menerima jaminan BPJS Kesehatan atau asuransi swasta?',
        answer: (
          <div className="space-y-3 text-[#646C67]">
            <p>
              Klinik Pratama Azizah melayani pasien <strong>Umum / Mandiri</strong> dengan biaya pemeriksaan dokter dan tindakan medis primer yang terjangkau, transparan, dan dapat diakses oleh seluruh lapisan masyarakat.
            </p>
            <div className="p-3.5 rounded-xl bg-[#EDF5EA]/80 border border-[#43AD35]/20 text-xs text-[#161A18] leading-relaxed">
              <strong className="text-[#102C24] block mb-1">Ketentuan BPJS Kesehatan & Asuransi Mitra:</strong>
              Untuk memastikan status kepesertaan Faskes Tingkat Pertama (FKTP) BPJS Kesehatan Anda atau kerja sama dengan asuransi mitra perusahaan tertentu, silakan kirimkan foto kartu kepesertaan Anda ke nomor WhatsApp klinik untuk konfirmasi administrasi sebelum berkunjung.
            </div>
            <p className="text-xs">
              Petugas kami akan memberikan estimasi biaya pelayanan dasar secara terbuka tanpa biaya tersembunyi.
            </p>
          </div>
        ),
      },
      {
        id: 'faq-booking',
        category: 'booking',
        categoryLabel: 'Pendaftaran & Janji Temu',
        icon: CalendarCheck,
        question: 'Bagaimana prosedur pendaftaran atau pemesanan janji temu (appointment booking)?',
        answer: (
          <div className="space-y-3 text-[#646C67]">
            <p>
              Pendaftaran pasien di Klinik Pratama Azizah dirancang fleksibel untuk memudahkan warga:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white border border-[#E2E6DF]">
                <div className="text-xs font-bold text-[#102C24] uppercase mb-1">
                  1. Pendaftaran Langsung (Walk-In)
                </div>
                <p className="text-xs text-[#646C67] leading-relaxed">
                  Datang langsung ke meja pendaftaran klinik selama jam operasional untuk mengambil antrean periksa pada hari yang sama.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E2E6DF]">
                <div className="text-xs font-bold text-[#43AD35] uppercase mb-1">
                  2. Reservasi via WhatsApp
                </div>
                <p className="text-xs text-[#646C67] leading-relaxed">
                  Kirim pesan ke nomor <strong className="font-mono text-[#161A18]">{clinic.phoneReference}</strong> dengan format: Nama Pasien / Usia / Perkiraan Jam Kedatangan / Keluhan Singkat.
                </p>
              </div>
            </div>
            <p className="text-xs">
              Reservasi online sangat dianjurkan untuk mengurangi waktu tunggu Anda di ruang antrean.
            </p>
          </div>
        ),
      },
      {
        id: 'faq-hours',
        category: 'hours',
        categoryLabel: 'Jam Operasional & Jadwal',
        icon: Clock,
        question: 'Kapan jam operasional klinik dan apakah dokter selalu tersedia?',
        answer: (
          <div className="space-y-2 text-[#646C67]">
            <p>
              Klinik buka rutin pada hari <strong>Senin hingga Sabtu</strong>, mulai pukul <strong>08.00 sampai 20.00 WIB</strong>.
            </p>
            <p className="text-xs leading-relaxed">
              Dokter umum dan perawat bertugas sesuai jadwal sif periksa. Pada hari Minggu dan hari libur nasional, disarankan melakukan konfirmasi terlebih dahulu melalui WhatsApp guna memastikan ketersediaan dokter jaga.
            </p>
          </div>
        ),
      },
      {
        id: 'faq-prep',
        category: 'preparation',
        categoryLabel: 'Persiapan Dokumen',
        icon: FileText,
        question: 'Dokumen dan berkas apa saja yang wajib dibawa saat berobat?',
        answer: (
          <div className="space-y-2 text-[#646C67]">
            <p>
              Untuk kelancaran pencatatan administrasi medis pasien baru maupun lama, harap membawa:
            </p>
            <ul className="list-disc list-inside text-xs space-y-1.5 pl-1">
              <li><strong>Kartu Identitas Diri:</strong> KTP asli untuk pasien dewasa, atau Kartu Keluarga (KK) bagi pasien anak-anak/balita.</li>
              <li><strong>Daftar Obat Rutin:</strong> Contoh atau kemasan obat yang sedang rutin dikonsumsi saat ini.</li>
              <li><strong>Catatan Alergi:</strong> Riwayat alergi obat atau makanan tertentu untuk disampaikan ke dokter.</li>
              <li><strong>Kartu Jaminan:</strong> Kartu asuransi/BPJS (jika ingin berkonsultasi mengenai administrasi faskes).</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'faq-location',
        category: 'location',
        categoryLabel: 'Lokasi & Rute Akses',
        icon: MapPin,
        question: 'Di mana lokasi tepat klinik dan bagaimana petunjuk akses rute di Bunten Barat?',
        answer: (
          <div className="space-y-2.5 text-[#646C67]">
            <p>
              Klinik Pratama Azizah berlokasi di{' '}
              <strong className="text-[#161A18]">374H+V79, Olo Tengah, Bunten Barat, Kecamatan Ketapang, Kabupaten Sampang, Jawa Timur 69261</strong>.
            </p>
            <p className="text-xs leading-relaxed">
              Terletak strategis di jalur wilayah pesisir Ketapang, dapat dilalui oleh kendaraan roda dua maupun mobil pribadi dengan area parkir yang memadai di pelataran klinik.
            </p>
            <div className="pt-1">
              <a
                href={clinic.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#43AD35] hover:text-[#3ba02f] hover:underline"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Buka Rute Langsung di Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ),
      },
      {
        id: 'faq-referral',
        category: 'preparation',
        categoryLabel: 'Alur Rujukan',
        icon: FileText,
        question: 'Bagaimana prosedur rujukan jika pasien membutuhkan penanganan dokter spesialis atau rumah sakit?',
        answer: (
          <div className="space-y-2 text-[#646C67]">
            <p>
              Sebagai fasilitas pelayanan primer, dokter kami akan melakukan pemeriksaan awal yang komprehensif.
            </p>
            <p className="text-xs leading-relaxed">
              Bila pasien memerlukan tindakan diagnostik khusus, konsultasi dokter spesialis, atau rawat inap intensif, dokter kami akan menerbitkan <strong>Surat Pengantar Rujukan Resmi</strong> yang terhubung ke Rumah Sakit Umum Daerah (RSUD) rujukan di Kabupaten Sampang.
            </p>
          </div>
        ),
      },
      {
        id: 'faq-emergency',
        category: 'hours',
        categoryLabel: 'Kasus Gawat Darurat',
        icon: Ambulance,
        question: 'Bagaimana jika pasien mengalami kondisi darurat di luar jam operasional?',
        answer: (
          <div className="space-y-2 text-[#646C67]">
            <p>
              Klinik Pratama Azizah melayani kasus medis tingkat pertama pada jam kerja reguler.
            </p>
            <p className="text-xs leading-relaxed text-[#161A18]">
              Untuk kondisi gawat darurat yang mengancam nyawa (seperti sesak napas berat, nyeri dada menusuk, kehilangan kesadaran mendadak, kejang, cedera kepala parah, atau perdarahan hebat), keluarga pasien dimohon <strong>segera membawa pasien langsung ke Instalasi Gawat Darurat (IGD) Rumah Sakit terdekat</strong> yang siaga 24 jam dengan peralatan resusitasi lengkap.
            </p>
          </div>
        ),
      },
    ],
    [clinic.phoneReference, clinic.mapsUrl]
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

  // Handler for Maps Grounding query
  const handleMapsGroundingSearch = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const queryToSend = customQuery || mapsQuery;
    if (!queryToSend.trim()) return;

    setMapsLoading(true);
    try {
      const res = await fetch('/api/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryToSend,
          latitude: -6.9147,
          longitude: 113.2922,
        }),
      });
      const data = await res.json();
      setMapsResult({
        text: data.text || 'Informasi peta lokasi berhasil dimuat.',
        groundingChunks: data.groundingChunks || [],
      });
    } catch (err) {
      console.error('Maps Grounding error:', err);
      setMapsResult({
        text:
          'Klinik Pratama Azizah berlokasi di Bunten Barat, Ketapang, Sampang, Madura (Plus Code: 374H+V79). Tautan rute resmi dapat diakses melalui Google Maps.',
        groundingChunks: [
          {
            maps: {
              uri: 'https://maps.app.goo.gl/WEG2VQYNRjAfEJMQ6',
              title: 'Klinik Pratama Azizah (Google Maps Resmi)',
            },
          },
        ],
      });
    } finally {
      setMapsLoading(false);
    }
  };

  return (
    <section id="informasi" className="py-20 lg:py-28 bg-[#F5F5F2] border-t border-[#E2E6DF] scroll-mt-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-[0.2em] text-[#43AD35] uppercase mb-3 select-none flex items-center gap-2">
            <span>INFORMASI PASIEN</span>
            <span className="text-[#646C67]">·</span>
            <span>TANYA JAWAB UMUM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#161A18] tracking-tight mb-4 font-sans leading-tight">
            Jawaban Cepat Seputar <br className="hidden sm:inline" />
            Layanan & Kunjungan.
          </h2>
          <p className="text-base text-[#646C67] leading-relaxed">
            Panduan lengkap mengenai penerimaan asuransi/BPJS, alur pemesanan janji temu, jam operasional, persiapan berkas, serta petunjuk navigasi menuju Klinik Pratama Azizah di Ketapang, Sampang.
          </p>
        </div>

        {/* Filter Controls & Live Search */}
        <div className="mb-8 space-y-4">
          
          {/* Instant Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#646C67] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari FAQ (mis. BPJS, janji temu, jam buka, rute)..."
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

          {/* Segmented Category Buttons */}
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
              onClick={() => setSelectedCategory('insurance')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
                selectedCategory === 'insurance'
                  ? 'bg-[#102C24] text-white shadow-xs'
                  : 'text-[#646C67] hover:text-[#161A18] hover:bg-[#F5F5F2]'
              }`}
            >
              Jaminan & Asuransi
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
              onClick={() => setSelectedCategory('hours')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
                selectedCategory === 'hours'
                  ? 'bg-[#102C24] text-white shadow-xs'
                  : 'text-[#646C67] hover:text-[#161A18] hover:bg-[#F5F5F2]'
              }`}
            >
              Jam Operasional
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('location')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
                selectedCategory === 'location'
                  ? 'bg-[#102C24] text-white shadow-xs'
                  : 'text-[#646C67] hover:text-[#161A18] hover:bg-[#F5F5F2]'
              }`}
            >
              Lokasi & Akses
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
              Berkas & Dokumen
            </button>
          </div>

        </div>

        {/* Collapsible Accordion Container */}
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

        {/* MAPS GROUNDING ASSISTANT FEATURE (Accurate Google Maps Data with gemini-3.8-flash) */}
        <div className="mt-10 max-w-4xl p-6 sm:p-7 rounded-2xl bg-[#102C24] text-white border border-[#102C24]/80 shadow-md">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-[#43AD35] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#43AD35]">
              BANTUAN NAVIGASI & FASILITAS SEKITAR · GOOGLE MAPS GROUNDING
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight mb-2">
            Tanya Info Peta & Rute ke Klinik Azizah
          </h3>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-5 max-w-2xl">
            Gunakan asisten navigasi berbasis Google Maps Grounding untuk mengetahui rute transportasi dari kecamatan sekitar, lokasi apotek, atau jarak ke fasilitas kesehatan terdekat di Kabupaten Sampang.
          </p>

          {/* Quick Query Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              type="button"
              onClick={() => {
                setMapsQuery('Rute dari Sampang Kota ke Klinik Pratama Azizah di Bunten Barat Ketapang');
                handleMapsGroundingSearch(undefined, 'Rute dari Sampang Kota ke Klinik Pratama Azizah di Bunten Barat Ketapang');
              }}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
            >
              📍 Rute dari Sampang Kota
            </button>
            <button
              type="button"
              onClick={() => {
                setMapsQuery('Akses dari Banyuates ke Klinik Pratama Azizah');
                handleMapsGroundingSearch(undefined, 'Akses dari Banyuates ke Klinik Pratama Azizah');
              }}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
            >
              📍 Akses dari Banyuates
            </button>
            <button
              type="button"
              onClick={() => {
                setMapsQuery('Rumah sakit rujukan terdekat dari Bunten Barat Ketapang Sampang');
                handleMapsGroundingSearch(undefined, 'Rumah sakit rujukan terdekat dari Bunten Barat Ketapang Sampang');
              }}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
            >
              🏥 Rumah Sakit Rujukan Terdekat
            </button>
          </div>

          {/* Maps Grounding Form */}
          <form onSubmit={handleMapsGroundingSearch} className="flex gap-2">
            <input
              type="text"
              value={mapsQuery}
              onChange={(e) => setMapsQuery(e.target.value)}
              placeholder="Tanyakan rute jalan atau fasilitas sekitar (misal: rute dari Ketapang)..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#43AD35] focus:bg-white/15"
            />
            <button
              type="submit"
              disabled={mapsLoading || !mapsQuery.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#43AD35] hover:bg-[#3ba02f] disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors shadow-2xs shrink-0"
            >
              {mapsLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memuat...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Tanyakan</span>
                </>
              )}
            </button>
          </form>

          {/* Grounding Results Display */}
          {mapsResult && (
            <div className="mt-5 p-4 sm:p-5 rounded-xl bg-white/5 border border-white/15 space-y-3 animate-in fade-in duration-200">
              <div className="text-xs sm:text-sm text-white/90 leading-relaxed">
                {mapsResult.text}
              </div>

              {/* Grounded Map Links extracted from groundingChunks */}
              {mapsResult.groundingChunks && mapsResult.groundingChunks.length > 0 && (
                <div className="pt-3 border-t border-white/10">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#43AD35] mb-2 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Tautan Google Maps Terverifikasi:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mapsResult.groundingChunks.map((chunk, idx) => {
                      const uri = chunk.maps?.uri || chunk.web?.uri;
                      const title = chunk.maps?.title || chunk.web?.title || 'Buka di Google Maps';
                      if (!uri) return null;
                      return (
                        <a
                          key={idx}
                          href={uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white border border-white/15 hover:border-[#43AD35] transition-colors"
                        >
                          <Navigation className="w-3 h-3 text-[#43AD35]" />
                          <span>{title}</span>
                          <ExternalLink className="w-3 h-3 text-white/50" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
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
                Masih memiliki pertanyaan yang belum terjawab?
              </div>
              <p className="text-xs text-[#646C67] mt-0.5">
                Staf administrasi Klinik Pratama Azizah siap membantu menjawab konfirmasi biaya, pendaftaran, dan jadwal periksa.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
              'Halo Klinik Pratama Azizah, saya ingin menanyakan informasi seputar jaminan kesehatan dan prosedur janji temu.'
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
