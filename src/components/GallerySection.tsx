import { useState } from "react";
import heroImage from "@/assets/hero-mountains.jpg";
import interiorImage from "@/assets/villa-interior.jpg";
import bedroomImage from "@/assets/bedroom.jpg";
import terraceImage from "@/assets/terrace-view.jpg";

const galleryImages = [
  { src: heroImage, alt: "Panoramic mountain view from La Cedar Villa", category: "Views" },
  { src: interiorImage, alt: "Luxurious living room interior", category: "Interior" },
  { src: bedroomImage, alt: "Comfortable bedroom with mountain view", category: "Rooms" },
  { src: terraceImage, alt: "Scenic terrace with valley views", category: "Outdoor" },
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
