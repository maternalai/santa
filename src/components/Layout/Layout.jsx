import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';
import SnowEffect from '../PixelEffects/SnowEffect';
import ChristmasLights from '../PixelEffects/ChristmasLights';
import StarField from '../PixelEffects/StarField';
import './Layout.css';

// Inline ScanLines component
const ScanLines = () => {
  return <div className="scan-lines"></div>;
};

const Layout = () => {
  return (
    <div className="app-layout">
      <StarField density="low" />
      <SnowEffect />
      <ScanLines />
      <ChristmasLights />
      
      <Header />
      
      <main className="main-content">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout; 