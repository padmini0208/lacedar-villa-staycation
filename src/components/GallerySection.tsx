import { useState } from "react";
import gallery1 from "@/assets/gallery-new-1.png";
import gallery2 from "@/assets/gallery-new-2.png";
import gallery3 from "@/assets/gallery-new-3.png";
import gallery4 from "@/assets/gallery-new-4.png";
import gallery5 from "@/assets/gallery-new-5.png";
import gallery6 from "@/assets/gallery-new-6.png";
import gallery7 from "@/assets/gallery-new-7.png";
import gallery8 from "@/assets/gallery-new-8.png";
import gallery9 from "@/assets/gallery-new-9.png";
import gallery10 from "@/assets/gallery-new-10.png";
import gallery11 from "@/assets/gallery-new-11.png";
import gallery12 from "@/assets/gallery-new-12.png";
import gallery13 from "@/assets/gallery-new-13.png";
import gallery14 from "@/assets/gallery-new-14.png";

const galleryImages = [
  { src: gallery1, alt: "Bedroom with forest and mountain view", category: "Bedroom" },
  { src: gallery2, alt: "Room seating area with mountain view", category: "Seating" },
  { src: gallery3, alt: "Jungle view and mountain view room", category: "Bedroom" },
  { src: gallery4, alt: "Mountain view bedroom", category: "Bedroom" },
  { src: gallery5, alt: "Mountain view room with TV unit", category: "Bedroom" },
  { src: gallery6, alt: "Balcony with jungle view", category: "Balcony" },
  { src: gallery7, alt: "Jungle view bedroom", category: "Bedroom" },
  { src: gallery8, alt: "Jungle view room with attached bathroom", category: "Bedroom" },
  { src: gallery9, alt: "Party zone with grass decor", category: "Party Zone" },
  { src: gallery10, alt: "Luxurious living area with orange sofas", category: "Living" },
  { src: gallery11, alt: "Living room with elegant decor", category: "Living" },
  { src: gallery12, alt: "Modern kitchen with bar counter", category: "Kitchen" },
  { src: gallery13, alt: "Outdoor terrace with seating", category: "Terrace" },
  { src: gallery14, alt: "Decorated entrance with floral wall", category: "Entrance" },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-cedar font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Visual Journey
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6">
            Gallery
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore the beauty of La Cedar Villa through our collection of stunning photographs.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  index === 0 ? "h-full min-h-[400px]" : "h-48 lg:h-56"
                }`}
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300 flex items-center justify-center">
                <span className="text-snow font-display text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Gallery preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              className="absolute -top-12 right-0 text-snow text-lg hover:text-gold transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
