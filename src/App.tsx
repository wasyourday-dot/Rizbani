import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustStatsPanel } from './components/TrustStatsPanel';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { HealthTipsCarousel } from './components/HealthTipsCarousel';
import { PatientStories } from './components/PatientStories';
import { FaqAccordion } from './components/FaqAccordion';
import { LocationContactSection } from './components/LocationContactSection';
import { Footer } from './components/Footer';
import { VerificationDrawer } from './components/VerificationDrawer';
import { Toast } from './components/Toast';
import { ClinicSkeleton } from './components/ClinicSkeleton';
import { ClinicConfig, loadClinicData, saveClinicData, DEFAULT_CLINIC_DATA } from './data/clinicData';

export default function App() {
  const [clinic, setClinic] = useState<ClinicConfig>(DEFAULT_CLINIC_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load persisted clinic config on mount
  useEffect(() => {
    const loaded = loadClinicData();
    setClinic(loaded);

    // Subtle transition timer to prevent layout flashing and ensure smooth perceived load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 320);

    return () => clearTimeout(timer);
  }, []);

  const handleSaveClinicData = (updated: ClinicConfig) => {
    setClinic(updated);
    saveClinicData(updated);
    setToastMessage('Data klinik berhasil disimpan dan diperbarui.');
  };

  const handleResetClinicData = () => {
    setClinic(DEFAULT_CLINIC_DATA);
    saveClinicData(DEFAULT_CLINIC_DATA);
    setToastMessage('Data klinik dikembalikan ke pengaturan awal.');
  };

  const handleSimulateReload = () => {
    setIsLoading(true);
    setTimeout(() => {
      const loaded = loadClinicData();
      setClinic(loaded);
      setIsLoading(false);
      setToastMessage('Simulasi pemuatan data klinik selesai.');
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F2] text-[#161A18] font-sans selection:bg-[#EDF5EA] selection:text-[#102C24]">
      {/* Subtle Skeleton Loading State */}
      {isLoading ? (
        <ClinicSkeleton />
      ) : (
        <div className="flex-1 flex flex-col transition-opacity duration-300 ease-out opacity-100">
          {/* Header with compact floating deep forest green pill navigation */}
          <Header
            clinic={clinic}
            onOpenVerification={() => setIsVerificationOpen(true)}
          />

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Hero Section: Asymmetric two-column, 58-68px headline, pure CSS/HTML graphic composition */}
            <HeroSection
              clinic={clinic}
              onOpenVerification={() => setIsVerificationOpen(true)}
            />

            {/* Statistics / Trust Panel: Deep forest green with highlighted green block and 3 columns */}
            <TrustStatsPanel />

            {/* About Section: Editorial split layout "Melayani dengan Kepedulian" */}
            <AboutSection clinic={clinic} />

            {/* Medical Services Section: Full-width deep forest green with 3-column warm white cards */}
            <ServicesSection
              clinic={clinic}
              onOpenVerification={() => setIsVerificationOpen(true)}
            />

            {/* Facilities Section: 4 primary care facility areas */}
            <FacilitiesSection />

            {/* Health Education & Tips Carousel */}
            <HealthTipsCarousel clinic={clinic} />

            {/* Patient Stories & Testimonials Grid */}
            <PatientStories clinic={clinic} />

            {/* FAQ Accordion Section: Common patient inquiries & Maps Grounding */}
            <FaqAccordion clinic={clinic} />

            {/* Location & Contact Section: Address, prominent Google Maps CTA, phone/wa */}
            <LocationContactSection
              clinic={clinic}
              onOpenVerification={() => setIsVerificationOpen(true)}
              onShowToast={(msg) => setToastMessage(msg)}
            />
          </main>

          {/* Footer: Deep forest green with original logo and verified details */}
          <Footer
            clinic={clinic}
            onOpenVerification={() => setIsVerificationOpen(true)}
          />
        </div>
      )}

      {/* Clinic Verification & Data Management Drawer */}
      <VerificationDrawer
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
        clinic={clinic}
        onSave={handleSaveClinicData}
        onReset={handleResetClinicData}
        onSimulateReload={handleSimulateReload}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
