import type { Metadata } from 'next';
import './globals.css';
import SiteLayoutWrapper from '@/components/SiteLayoutWrapper';

export const metadata: Metadata = {
  title: 'Mishva International Courier Service | Ahmedabad Global Express Cargo',
  description: 'Fastest door-to-door international express courier from Ahmedabad, Gujarat to USA, UK, Canada, UAE, Australia and 220+ countries. Specializing in NRI food, medicines, and student documents with free pickup.',
  keywords: 'international courier ahmedabad, mishva courier, mishra international courier, food courier to usa, medicine courier to uk, dtdc ahmedabad, dhl fedex chandkheda, international parcel tracking',
  icons: {
    icon: '/images/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 antialiased selection:bg-red-600 selection:text-white">
        <SiteLayoutWrapper>
          {children}
        </SiteLayoutWrapper>
      </body>
    </html>
  );
}
