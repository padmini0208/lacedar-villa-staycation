import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import staycationHero from "@/assets/staycation-hero.png";

interface LandingScreenProps {
  onEnter: () => void;
}

const LandingScreen = ({ onEnter }: LandingScreenProps) => {
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const locations = [
    {
      name: "Manali, Himachal Pradesh",
      properties: ["La Cedar Villa"]
    }
  ];

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setSelectedProperty(null);
  };

  const handlePropertySelect = (property: string) => {
    setSelectedProperty(property);
    setTimeout(() => {
      onEnter();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-snow overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={staycationHero}
          alt="Staycation - La Cedar Villa"
          className="w-full h-full object-contain md:object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-snow/20 via-transparent to-snow/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 mt-auto pb-8 md:pb-12">
        {/* Location Selector */}
        <div className="relative w-full max-w-sm">
          <button
            onClick={() => setLocationOpen(!locationOpen)}
            className="w-full flex items-center justify-between gap-3 px-6 py-4 bg-snow/90 backdrop-blur-sm border border-cedar/20 rounded-lg shadow-soft hover:shadow-elevated transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-cedar" />
              <span className="font-body text-foreground">
                {selectedProperty || selectedLocation || "Select Location"}
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${locationOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown */}
          {locationOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-snow/95 backdrop-blur-md border border-cedar/20 rounded-lg shadow-elevated overflow-hidden animate-fade-in z-20">
              {locations.map((location) => (
                <div key={location.name}>
                  <button
                    onClick={() => handleLocationSelect(location.name)}
                    className={`w-full px-6 py-4 text-left font-body hover:bg-cedar/10 transition-colors flex items-center gap-3 ${
                      selectedLocation === location.name ? "bg-cedar/10 text-cedar" : "text-foreground"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    {location.name}
                  </button>
                  
                  {/* Properties sub-menu */}
                  {selectedLocation === location.name && (
                    <div className="border-t border-cedar/10">
                      {location.properties.map((property) => (
                        <button
                          key={property}
                          onClick={() => handlePropertySelect(property)}
                          className="w-full px-6 py-3 pl-12 text-left font-body text-sm hover:bg-cedar/10 transition-colors text-muted-foreground hover:text-cedar"
                        >
                          {property}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Or explore button */}
        <Button 
          variant="ghost" 
          className="mt-4 text-mountain hover:text-cedar font-body"
          onClick={onEnter}
        >
          Explore All Properties
        </Button>
      </div>
    </div>
  );
};

export default LandingScreen;
