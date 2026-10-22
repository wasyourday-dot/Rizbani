export interface ClinicService {
  id: string;
  name: string;
  description: string;
  category: string;
  isConfirmed: boolean;
  notes?: string;
}

export interface ClinicConfig {
  name: string;
  tagline: string;
  shortDescription: string;
  addressReference: string;
  subdistrict: string;
  regency: string;
  province: string;
  postalCode: string;
  mapsUrl: string;
  phoneReference: string;
  phoneConfirmed: boolean;
  whatsappNumber: string; // international format without +
  whatsappConfirmed: boolean;
  operatingHoursStatus: 'confirmed' | 'unconfirmed';
  operatingHoursText: string;
  emergencyNotice: string;
  services: ClinicService[];
}

export const DEFAULT_CLINIC_DATA: ClinicConfig = {
  name: "Klinik Pratama Azizah",
  tagline: "Kesehatan Anda, perhatian kami.",
  shortDescription: "Kami hadir untuk membantu Anda dan keluarga mendapatkan pelayanan kesehatan yang ramah, nyaman, dan mudah dijangkau.",
  addressReference: "374H+V79, Olo Tengah, Bunten Barat, Ketapang, Sampang, Jawa Timur 69261",
  subdistrict: "Kecamatan Ketapang",
  regency: "Kabupaten Sampang, Madura",
  province: "Jawa Timur",
  postalCode: "69261",
  mapsUrl: "https://maps.app.goo.gl/WEG2VQYNRjAfEJMQ6",
  phoneReference: "0878-9990-9000",
  phoneConfirmed: true,
  whatsappNumber: "6287899909000",
  whatsappConfirmed: true,
  operatingHoursStatus: 'confirmed',
  operatingHoursText: "Senin – Sabtu: 08.00 – 20.00 WIB (Disarankan menghubungi kontak terlebih dahulu)",
  emergencyNotice: "Untuk kondisi gawat darurat medis yang memerlukan tindakan intensif segera, silakan langsung menuju IGD Rumah Sakit terdekat atau hubungi layanan darurat.",
  services: [
    {
      id: "srv-1",
      name: "Pemeriksaan Umum",
      description: "Pemeriksaan kesehatan menyeluruh, diagnosa dini penyakit umum, dan penanganan medis dasar untuk pasien dewasa, anak, dan lansia.",
      category: "Pelayanan Dasar",
      isConfirmed: true,
      notes: "Tersedia rutin pada jam operasional klinik."
    },
    {
      id: "srv-2",
      name: "Konsultasi Kesehatan",
      description: "Konsultasi tatap muka bersama tenaga medis untuk pemeliharaan gaya hidup sehat, evaluasi keluhan berkala, dan edukasi pengobatan.",
      category: "Konsultasi Medis",
      isConfirmed: true,
      notes: "Disarankan konfirmasi jadwal terlebih dahulu."
    },
    {
      id: "srv-3",
      name: "Layanan Ibu dan Anak",
      description: "Pemeriksaan kesehatan ibu, pemantauan kurva tumbuh kembang balita, imunisasi dasar, serta edukasi gizi keluarga.",
      category: "Keluarga & Balita",
      isConfirmed: true,
      notes: "Jadwal dapat dikonfirmasi via WhatsApp klinik."
    },
    {
      id: "srv-4",
      name: "Layanan Farmasi",
      description: "Penyediaan obat resep dan obat bebas terbatas yang aman, terstandarisasi, dan disertai petunjuk penggunaan dosis dari petugas farmasi.",
      category: "Farmasi & Obat",
      isConfirmed: true,
      notes: "Terintegrasi langsung dengan hasil resep periksa dokter."
    },
    {
      id: "srv-5",
      name: "Persalinan",
      description: "Layanan pendampingan proses persalinan normal dengan pengawasan bidan terlatih dan fasilitas sterilisasi memadai.",
      category: "Kebidanan",
      isConfirmed: false,
      notes: "Tahap persiapan & konfirmasi kesiapan fasilitas medis."
    },
    {
      id: "srv-6",
      name: "Layanan Rawat Inap",
      description: "Fasilitas observasi dan perawatan medis pasca-tindakan dengan tempat tidur nyaman bagi pasien yang membutuhkan pemulihan singkat.",
      category: "Rawat Lanjutan",
      isConfirmed: false,
      notes: "Tahap persiapan fasilitas & koordinasi perizinan."
    }
  ]
};

const STORAGE_KEY = 'azizah_clinic_config_v2';

export function loadClinicData(): ClinicConfig {
  if (typeof window === 'undefined') return DEFAULT_CLINIC_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CLINIC_DATA;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_CLINIC_DATA, ...parsed };
  } catch (err) {
    console.error('Failed to parse clinic data from localStorage', err);
    return DEFAULT_CLINIC_DATA;
  }
}

export function saveClinicData(data: ClinicConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save clinic data to localStorage', err);
  }
}
