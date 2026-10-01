import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#F8F6F0] flex justify-center font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Full screen on mobile / Android: 100% width and height, max-w-md on desktop */}
      <main className="w-full max-w-md min-h-screen bg-[#F8F6F0] flex flex-col relative sm:shadow-lg">
        {children}
      </main>
    </div>
  );
};

