import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/villa-night.webp";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Panoramic view of Himalayan mountains from La Cedar Villa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-snow/90 text-sm md:text-base tracking-[0.3em] uppercase mb-6 animate-fade-in font-body">
            Welcome to
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-snow font-bold mb-4 animate-fade-in-up leading-tight tracking-wide">
            La Cedar Villa
          </h1>
          <p className="text-snow font-display text-2xl md:text-3xl lg:text-4xl tracking-[0.15em] mb-2 animate-fade-in-up font-semibold" style={{ animationDelay: "0.2s" }}>
            BY STAYCATION
          </p>
          <div className="w-24 h-0.5 bg-gold mx-auto my-8 animate-scale-in" style={{ animationDelay: "0.3s" }} />
          <p className="text-snow text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up font-body bg-foreground/80 px-6 py-4 rounded-lg backdrop-blur-sm" style={{ animationDelay: "0.4s" }}>
            Experience luxury amidst the majestic Himalayas. A serene retreat nestled in the heart of Manali, 
            surrounded by towering cedar trees and breathtaking mountain views.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <Button variant="hero" size="xl" asChild>
              <a href="tel:+919582762742">Reserve Your Stay</a>
            </Button>
            <Button variant="heroOutline" size="xl">
              Explore Villa
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-snow/80 animate-float cursor-pointer"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
};

export default HeroSection;
