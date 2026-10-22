import React, { useState } from 'react';
import { X, ShieldCheck, Save, RotateCcw, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { ClinicConfig, ClinicService, DEFAULT_CLINIC_DATA } from '../data/clinicData';

interface VerificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  clinic: ClinicConfig;
  onSave: (updated: ClinicConfig) => void;
  onReset: () => void;
  onSimulateReload?: () => void;
}

export const VerificationDrawer: React.FC<VerificationDrawerProps> = ({
  isOpen,
  onClose,
  clinic,
  onSave,
  onReset,
  onSimulateReload,
}) => {
  const [formData, setFormData] = useState<ClinicConfig>({ ...clinic });
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Pelayanan Dasar');
  const [newServiceDesc, setNewServiceDesc] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setFormData({ ...clinic });
    }
  }, [clinic, isOpen]);

  if (!isOpen) return null;

  const handleTextChange = (field: keyof ClinicConfig, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleService = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.map((s) =>
        s.id === id ? { ...s, isConfirmed: !s.isConfirmed } : s
      ),
    }));
  };

  const handleDeleteService = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    const newSrv: ClinicService = {
      id: `srv-${Date.now()}`,
      name: newServiceName.trim(),
      category: newServiceCategory.trim() || 'Layanan Umum',
      description: newServiceDesc.trim() || 'Pelayanan kesehatan primer terkonfirmasi.',
      isConfirmed: true,
    };

    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, newSrv],
    }));

    setNewServiceName('');
    setNewServiceDesc('');
  };

  const handleSave = () => {
    // Sync whatsapp number automatically from phone reference if appropriate
    const cleanNumber = formData.phoneReference.replace(/[^0-9]/g, '');
    let formattedWa = cleanNumber;
    if (formattedWa.startsWith('0')) {
      formattedWa = '62' + formattedWa.slice(1);
    }
    
    const prepared: ClinicConfig = {
      ...formData,
      whatsappNumber: formattedWa,
    };

    onSave(prepared);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E3E7E0] flex items-center justify-between bg-[#F7F8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#EDF5EA] text-[#43AD35] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 id="modal-title" className="text-base font-bold text-[#202923] font-serif">
                Verifikasi & Kelola Data Klinik
              </h3>
              <p className="text-xs text-[#667067]">
                Perbarui rincian resmi kontak, alamat, jam buka, dan layanan aktif.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#667067] hover:text-[#202923] rounded-md focus-visible:outline-[#43AD35]"
            aria-label="Tutup panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* Note Banner */}
          <div className="p-3.5 bg-[#EDF5EA]/70 border border-[#43AD35]/20 rounded-md text-xs text-[#202923] leading-relaxed">
            <span className="font-semibold">Ketentuan Integritas: </span>
            Data yang tertera bersumber dari direktori publik. Gunakan formulir ini untuk memverifikasi nomor telepon, alamat, dan layanan klinik secara akurat sebelum dipublikasikan kepada pasien.
          </div>

          {/* Section 1: Kontak */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#234D78] pb-1 border-b border-[#E3E7E0]">
              1. Kontak Telepon & WhatsApp
            </h4>
            
            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Nomor Telepon / WhatsApp
              </label>
              <input
                type="text"
                value={formData.phoneReference}
                onChange={(e) => handleTextChange('phoneReference', e.target.value)}
                placeholder="0878-9990-9000"
                className="w-full px-3 py-2 border border-[#E3E7E0] rounded font-mono text-sm focus:border-[#43AD35] focus:outline-none"
              />
              <span className="text-[11px] text-[#667067] mt-1 block">
                Format nomor Indonesia (misal: 0878-9990-9000). Tautan WhatsApp akan otomatis disesuaikan ke kode internasional 62.
              </span>
            </div>
          </div>

          {/* Section 2: Alamat Fisik & Google Maps */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#234D78] pb-1 border-b border-[#E3E7E0]">
              2. Alamat & Google Maps
            </h4>

            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Alamat Fisik Lengkap
              </label>
              <textarea
                rows={2}
                value={formData.addressReference}
                onChange={(e) => handleTextChange('addressReference', e.target.value)}
                placeholder="374H+V79, Olo Tengah, Bunten Barat, Ketapang, Sampang, Jawa Timur 69261"
                className="w-full px-3 py-2 border border-[#E3E7E0] rounded text-sm focus:border-[#43AD35] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Tautan Google Maps Resmi
              </label>
              <input
                type="url"
                value={formData.mapsUrl}
                onChange={(e) => handleTextChange('mapsUrl', e.target.value)}
                placeholder="https://maps.app.goo.gl/WEG2VQYNRjAfEJMQ6"
                className="w-full px-3 py-2 border border-[#E3E7E0] rounded font-mono text-xs focus:border-[#43AD35] focus:outline-none"
              />
              <span className="text-[11px] text-[#667067] mt-1 block">
                Tautan Google Maps yang diberikan oleh pemilik klinik.
              </span>
            </div>
          </div>

          {/* Section 3: Jam Operasional */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#234D78] pb-1 border-b border-[#E3E7E0]">
              3. Jam Pelayanan
            </h4>

            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Keterangan Jam Operasional
              </label>
              <input
                type="text"
                value={formData.operatingHoursText}
                onChange={(e) => handleTextChange('operatingHoursText', e.target.value)}
                placeholder="Senin – Sabtu: 08.00 – 20.00 WIB (Disarankan menghubungi kontak terlebih dahulu)"
                className="w-full px-3 py-2 border border-[#E3E7E0] rounded text-sm focus:border-[#43AD35] focus:outline-none"
              />
            </div>
          </div>

          {/* Section 4: Daftar Layanan Aktif */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#E3E7E0]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#234D78]">
                4. Daftar Layanan Medis ({formData.services.length})
              </h4>
            </div>

            <div className="space-y-2.5">
              {formData.services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-3 rounded border border-[#E3E7E0] bg-[#F7F8F5] flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#202923]">{srv.name}</span>
                      <span className="text-[10px] text-[#234D78] uppercase font-bold">
                        · {srv.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#667067] line-clamp-2 mt-0.5">
                      {srv.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleService(srv.id)}
                      className={`text-xs p-1 rounded ${
                        srv.isConfirmed
                          ? 'text-[#43AD35] hover:bg-[#EDF5EA]'
                          : 'text-[#667067] hover:bg-gray-200'
                      }`}
                      title={srv.isConfirmed ? 'Layanan Terkonfirmasi' : 'Dalam Verifikasi'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteService(srv.id)}
                      className="text-xs text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                      title="Hapus layanan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Tambah Layanan Form */}
            <form onSubmit={handleAddService} className="pt-3 border-t border-[#E3E7E0] space-y-2">
              <span className="text-xs font-semibold text-[#202923] block">Tambah Layanan Baru</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Nama layanan (mis. Pemeriksaan Umum)"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="px-3 py-1.5 border border-[#E3E7E0] rounded text-xs focus:border-[#43AD35] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Kategori (mis. Layanan Dasar)"
                  value={newServiceCategory}
                  onChange={(e) => setNewServiceCategory(e.target.value)}
                  className="px-3 py-1.5 border border-[#E3E7E0] rounded text-xs focus:border-[#43AD35] focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Deskripsi singkat layanan..."
                value={newServiceDesc}
                onChange={(e) => setNewServiceDesc(e.target.value)}
                className="w-full px-3 py-1.5 border border-[#E3E7E0] rounded text-xs focus:border-[#43AD35] focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 bg-[#EDF5EA] text-[#43AD35] hover:bg-[#e0eedb] text-xs font-bold px-3 py-1.5 rounded transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambahkan ke Daftar</span>
              </button>
            </form>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-[#E3E7E0] bg-[#F7F8F5] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (confirm('Kembalikan ke data awal bawaan direktori?')) {
                  onReset();
                  setFormData({ ...DEFAULT_CLINIC_DATA });
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs text-[#667067] hover:text-red-600 transition-colors py-2 px-3 rounded"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>

            {onSimulateReload && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSimulateReload();
                }}
                className="hidden sm:inline-flex items-center gap-1 text-xs text-[#234D78] hover:text-[#43AD35] transition-colors py-2 px-2.5 rounded hover:bg-[#EDF5EA]"
                title="Simulasi transisi pemuatan data dari storage"
              >
                <span>Uji Transisi Muat</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#667067] hover:text-[#202923] border border-[#E3E7E0] rounded bg-white hover:bg-[#F7F8F5] transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[#43AD35] hover:bg-[#39962c] rounded transition-colors shadow-2xs"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
