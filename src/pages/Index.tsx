import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RoomsSection from "@/components/RoomsSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LandingScreen from "@/components/LandingScreen";

const Index = () => {
  const [showLanding, setShowLanding] = useState(true);

  const handleBackToStaycation = () => {
    setShowLanding(true);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {showLanding && (
        <LandingScreen onEnter={() => setShowLanding(false)} />
      )}
      <div className={`min-h-screen ${showLanding ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}>
        <Header onBackToStaycation={handleBackToStaycation} />
        <main>
          <HeroSection />
          <AboutSection />
          <RoomsSection />
          <AmenitiesSection />
          <GallerySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
