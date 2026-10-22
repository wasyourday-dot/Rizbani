import React from 'react';

export const ClinicSkeleton: React.FC = () => {
  return (
    <div
      className="w-full min-h-screen bg-[#F5F5F2] animate-pulse"
      aria-busy="true"
      aria-label="Memuat data Klinik Pratama Azizah..."
    >
      {/* Top subtle loading indicator bar in Brand Green */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#43AD35] to-transparent z-50 animate-[shimmer_1.5s_infinite]" />

      {/* Header Skeleton */}
      <div className="w-full bg-[#F5F5F2] py-4">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo outline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#E2E6DF]" />
            <div className="space-y-1.5">
              <div className="w-24 h-3 bg-[#E2E6DF] rounded" />
              <div className="w-20 h-4 bg-[#E2E6DF] rounded" />
            </div>
          </div>

          {/* Floating Pill Nav Skeleton */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-80 h-10 bg-[#102C24]/80 rounded-full" />
            <div className="w-28 h-9 bg-[#E2E6DF] rounded-full" />
          </div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="w-48 h-3.5 bg-[#E2E6DF] rounded" />

            <div className="space-y-3">
              <div className="w-4/5 h-12 lg:h-14 bg-[#E2E6DF] rounded" />
              <div className="w-3/5 h-12 lg:h-14 bg-[#E2E6DF] rounded" />
            </div>

            <div className="space-y-2 pt-2 max-w-lg">
              <div className="w-full h-4 bg-[#E2E6DF]/80 rounded" />
              <div className="w-11/12 h-4 bg-[#E2E6DF]/80 rounded" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-3">
              <div className="w-40 h-12 bg-[#43AD35]/40 rounded-full" />
              <div className="w-36 h-12 bg-[#E2E6DF] rounded-full" />
            </div>
          </div>

          {/* Right Column: Deep Forest Green Graphic Card Skeleton */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#102C24]/80 p-7 aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/4.2] flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div className="w-32 h-3 bg-white/20 rounded" />
                <div className="w-16 h-3 bg-white/20 rounded" />
              </div>
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-20 h-20 rounded-full bg-white/10" />
                <div className="w-28 h-5 bg-white/20 rounded" />
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="w-24 h-3 bg-white/20 rounded" />
                <div className="w-20 h-3 bg-white/20 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Stats Panel Skeleton */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-[#102C24]/80 rounded-2xl p-6 h-40" />
      </div>
    </div>
  );
};
