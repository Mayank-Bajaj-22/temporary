import React from 'react';
import { Outlet } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/common/ScrollToTop';

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#29251F]">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />

      <style>{`
        .site-main section:not(:first-of-type) {
          padding-top: 48px !important;
          padding-bottom: 48px !important;
        }

        @media (max-width: 640px) {
          .site-main section:not(:first-of-type) {
            padding-top: 28px !important;
            padding-bottom: 28px !important;
          }
        }
      `}</style>

      <main className="flex-1 site-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
