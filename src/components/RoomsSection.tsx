import { useState } from "react";
import { Users, Bed, Bath, Utensils, Mountain, TreePine, ChefHat, X, ChevronLeft, ChevronRight, Sofa } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import bedroom1 from "@/assets/bedroom-1.jpg";
import bedroom2 from "@/assets/bedroom-2.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import galleryNew1 from "@/assets/gallery-new-1.png";
import galleryNew2 from "@/assets/gallery-new-2.png";
import galleryNew3 from "@/assets/gallery-new-3.png";
import galleryNew4 from "@/assets/gallery-new-4.png";
import galleryNew5 from "@/assets/gallery-new-5.png";
import galleryNew6 from "@/assets/gallery-new-6.png";
import galleryNew7 from "@/assets/gallery-new-7.png";
import galleryNew8 from "@/assets/gallery-new-8.png";
import galleryNew9 from "@/assets/gallery-new-9.png";
import galleryNew10 from "@/assets/gallery-new-10.png";
import galleryNew11 from "@/assets/gallery-new-11.png";
import galleryNew12 from "@/assets/gallery-new-12.png";
import galleryNew13 from "@/assets/gallery-new-13.png";
import galleryNew14 from "@/assets/gallery-new-14.png";
// Pir Panjal images
import pirPanjalTerrace1 from "@/assets/pir-panjal-terrace-1.png";
import pirPanjalTerrace2 from "@/assets/pir-panjal-terrace-2.png";
import pirPanjalTerrace3 from "@/assets/pir-panjal-terrace-3.png";
import pirPanjalAttic1 from "@/assets/pir-panjal-attic-1.png";
import pirPanjalAttic12 from "@/assets/pir-panjal-attic-1-2.png";
import pirPanjalAttic21 from "@/assets/pir-panjal-attic-2-1.png";
import pirPanjalAttic22 from "@/assets/pir-panjal-attic-2-2.png";
import pirPanjalRoom21 from "@/assets/pir-panjal-room-2-1.png";
import pirPanjalRoom22 from "@/assets/pir-panjal-room-2-2.png";
import pirPanjalRoom1View from "@/assets/pir-panjal-room-1-view.png";
import pirPanjalRoom13 from "@/assets/pir-panjal-room-1-3.png";
import pirPanjalRoom12 from "@/assets/pir-panjal-room-1-2.png";
import pirPanjalRoom11 from "@/assets/pir-panjal-room-1-1.png";
import pirPanjalKitchen from "@/assets/pir-panjal-kitchen.png";
import pirPanjalBhukari1 from "@/assets/pir-panjal-bhukari-1.png";
import pirPanjalBhukari2 from "@/assets/pir-panjal-bhukari-2.png";
import pirPanjalLiving1 from "@/assets/pir-panjal-living-1.png";
import pirPanjalLiving2 from "@/assets/pir-panjal-living-2.png";

const dhauladharGallery = [
  { src: galleryNew1, alt: "Bedroom with forest and mountain view" },
  { src: galleryNew2, alt: "Room seating area with mountain view" },
  { src: galleryNew3, alt: "Jungle view and mountain view room" },
  { src: galleryNew4, alt: "Mountain view bedroom" },
  { src: galleryNew5, alt: "Mountain view room with TV unit" },
  { src: galleryNew6, alt: "Balcony with jungle view" },
  { src: galleryNew7, alt: "Jungle view bedroom" },
  { src: galleryNew8, alt: "Jungle view room with attached bathroom" },
  { src: galleryNew9, alt: "Party zone with grass decor" },
  { src: galleryNew10, alt: "Living area with orange sofas" },
  { src: galleryNew11, alt: "Living room with elegant decor" },
  { src: galleryNew12, alt: "Modern kitchen with bar counter" },
  { src: galleryNew13, alt: "Terrace with seating area" },
  { src: galleryNew14, alt: "Decorated entrance" },
];

const pirPanjalGallery = [
  { src: pirPanjalRoom11, alt: "Room 1 with scenic view" },
  { src: pirPanjalRoom12, alt: "Room 1 alternate view" },
  { src: pirPanjalRoom13, alt: "Room 1 bedroom" },
  { src: pirPanjalRoom21, alt: "Room 2 view" },
  { src: pirPanjalRoom22, alt: "Room 2 alternate view" },
  { src: pirPanjalRoom1View, alt: "Room with mountain view" },
  { src: pirPanjalAttic1, alt: "Attic room 1" },
  { src: pirPanjalAttic12, alt: "Attic room 1 alternate view" },
  { src: pirPanjalAttic21, alt: "Attic room 2" },
  { src: pirPanjalAttic22, alt: "Attic room 2 alternate view" },
  { src: pirPanjalLiving1, alt: "Living room with bhukari" },
  { src: pirPanjalLiving2, alt: "Living room with mountain view" },
  { src: pirPanjalBhukari1, alt: "Bhukari area" },
  { src: pirPanjalBhukari2, alt: "Bhukari living space" },
  { src: pirPanjalKitchen, alt: "Modern kitchen" },
  { src: pirPanjalTerrace1, alt: "4BHK Villa terrace view" },
  { src: pirPanjalTerrace2, alt: "Terrace seating area" },
  { src: pirPanjalTerrace3, alt: "Terrace with mountain view" },
];

const villas = [
  {
    name: "Shivalik",
    floor: "1st Floor Villa",
    type: "3 BHK",
    description: "Elegant ground floor villa with easy access, featuring 3 spacious bedrooms with panoramic Himalayan views and modern amenities.",
    image: bedroom1,
    capacity: "6-8 Guests",
    bedrooms: "3 Bedrooms",
    bath: "3 Attached Baths",
    features: ["Ground Floor", "Mountain View", "Fully Furnished", "Kitchen"],
    clickable: false,
  },
  {
    name: "Dhauladhar",
    floor: "2nd Floor Villa",
    type: "3 BHK",
    description: "Mid-level villa offering stunning valley views, 3 comfortable bedrooms, and a private balcony perfect for morning tea.",
    image: bedroom2,
    capacity: "6-8 Guests",
    bedrooms: "3 Bedrooms",
    bath: "3 Attached Baths",
    features: ["Valley View", "Private Balcony", "Fully Furnished", "Kitchen"],
    clickable: true,
  },
  {
    name: "Pir Panjal",
    floor: "3rd Floor Villa",
    type: "4 BHK",
    description: "Premium top floor villa with 4 luxurious bedrooms, wraparound terrace, and unobstructed 360° views of the majestic mountains.",
    image: gallery1,
    capacity: "8-10 Guests",
    bedrooms: "4 Bedrooms",
    bath: "4 Attached Baths",
    features: ["360° Views", "Wraparound Terrace", "Premium Interiors", "Kitchen"],
    clickable: true,
  },
];

const RoomsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeVilla, setActiveVilla] = useState<string | null>(null);

  const handleVillaClick = (villaName: string) => {
    if (villaName === "Dhauladhar" || villaName === "Pir Panjal") {
      setActiveVilla(villaName);
      setIsModalOpen(true);
      setCurrentImageIndex(0);
    }
  };

  const getActiveGallery = () => {
    if (activeVilla === "Dhauladhar") return dhauladharGallery;
    if (activeVilla === "Pir Panjal") return pirPanjalGallery;
    return [];
  };

  const nextImage = () => {
    const gallery = getActiveGallery();
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    const gallery = getActiveGallery();
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <section id="rooms" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-cedar font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Accommodations
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6">
            Our Rooms & Suites
          </h2>
          <p className="text-muted-foreground text-lg">
            Each room is thoughtfully designed to offer comfort and stunning views of the Himalayan landscape.
          </p>
        </div>

        {/* Villas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villas.map((villa, index) => (
            <div
              key={villa.name}
              className={`group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 ${
                villa.clickable ? "cursor-pointer ring-2 ring-transparent hover:ring-cedar/50" : ""
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => villa.clickable && handleVillaClick(villa.name)}
            >
              {/* Image */}
              <div className="relative h-56 lg:h-64 overflow-hidden">
                <img
                  src={villa.image}
                  alt={villa.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-snow/80 text-sm mb-1">{villa.floor} • {villa.type}</p>
                  <h3 className={`font-display text-2xl text-snow font-semibold ${villa.clickable ? "underline decoration-gold/50 underline-offset-4" : ""}`}>
                    {villa.name}
                  </h3>
                </div>
                {villa.clickable && (
                  <div className="absolute top-4 right-4 bg-gold text-foreground text-xs px-2 py-1 rounded-full font-medium">
                    Click to explore
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-muted-foreground mb-5 leading-relaxed text-sm">
                  {villa.description}
                </p>

                {/* Villa Details */}
                <div className="flex flex-wrap gap-3 mb-5">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Users className="w-4 h-4 text-cedar" />
                    <span>{villa.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Bed className="w-4 h-4 text-cedar" />
                    <span>{villa.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Bath className="w-4 h-4 text-cedar" />
                    <span>{villa.bath}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {villa.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-cedar/10 text-cedar text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Button variant="cedar" className="w-full">
                  Check Availability
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Villa Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl md:text-3xl text-foreground">
              {activeVilla} Villa
            </DialogTitle>
            <p className="text-muted-foreground">
              {activeVilla === "Dhauladhar" ? "2nd Floor • 3 BHK Premium Villa" : "3rd Floor • 4 BHK Premium Villa"}
            </p>
          </DialogHeader>

          {/* Image Gallery */}
          <div className="relative mt-4">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
              {getActiveGallery().length > 0 && (
                <img
                  src={getActiveGallery()[currentImageIndex]?.src}
                  alt={getActiveGallery()[currentImageIndex]?.alt}
                  className="w-full h-full object-cover"
                />
              )}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-foreground/50 hover:bg-foreground/70 text-snow p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-foreground/50 hover:bg-foreground/70 text-snow p-2 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {getActiveGallery().map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === idx ? "border-cedar" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Villa Details */}
          <div className="mt-6 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              {activeVilla === "Dhauladhar" 
                ? "Experience luxury living at Dhauladhar Villa, our beautifully designed 2nd floor retreat offering breathtaking mountain and jungle views. Perfect for families or groups seeking comfort and tranquility."
                : "Discover the pinnacle of luxury at Pir Panjal Villa, our premium top floor retreat featuring 4 spacious bedrooms, wraparound terrace with 360° views, and an exclusive attic room. Ideal for large families or groups."}
            </p>

            {/* Room Configuration */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-secondary/50 p-4 rounded-xl text-center">
                <Bed className="w-6 h-6 text-cedar mx-auto mb-2" />
                <p className="text-foreground font-semibold">{activeVilla === "Dhauladhar" ? "3 Bedrooms" : "4 Bedrooms"}</p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-xl text-center">
                <Bath className="w-6 h-6 text-cedar mx-auto mb-2" />
                <p className="text-foreground font-semibold">{activeVilla === "Dhauladhar" ? "3 Bathrooms" : "4 Bathrooms"}</p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-xl text-center">
                <Sofa className="w-6 h-6 text-cedar mx-auto mb-2" />
                <p className="text-foreground font-semibold">1 Living Area</p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-xl text-center">
                <Utensils className="w-6 h-6 text-cedar mx-auto mb-2" />
                <p className="text-foreground font-semibold">1 Kitchen</p>
              </div>
            </div>

            {/* Special Features */}
            <div className="bg-cedar/10 p-5 rounded-xl">
              <h4 className="font-display text-lg text-foreground font-semibold mb-4">Special Features</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-cedar/20 p-2 rounded-lg">
                    <Mountain className="w-5 h-5 text-cedar" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Mountain View</p>
                    <p className="text-muted-foreground text-sm">Stunning Himalayan panorama from bedrooms</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-cedar/20 p-2 rounded-lg">
                    <TreePine className="w-5 h-5 text-cedar" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Jungle View</p>
                    <p className="text-muted-foreground text-sm">Lush forest views with cedar trees</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-cedar/20 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-cedar" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{activeVilla === "Pir Panjal" ? "Wraparound Terrace" : "Terrace with Seating"}</p>
                    <p className="text-muted-foreground text-sm">{activeVilla === "Pir Panjal" ? "360° views with spacious outdoor seating" : "Private outdoor area perfect for relaxation"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-cedar/20 p-2 rounded-lg">
                    <ChefHat className="w-5 h-5 text-cedar" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Multicuisine Menu</p>
                    <p className="text-muted-foreground text-sm">Wide variety of dishes to choose from</p>
                  </div>
                </div>
              </div>
            </div>

            <Button variant="cedar" className="w-full" size="lg">
              Book {activeVilla} Villa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RoomsSection;
