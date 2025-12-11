import { Users, Bed, Bath, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import bedroom1 from "@/assets/bedroom-1.jpg";
import bedroom2 from "@/assets/bedroom-2.jpg";
import livingRoom1 from "@/assets/living-room-1.jpg";

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
  },
  {
    name: "Pir Panjal",
    floor: "3rd Floor Villa",
    type: "4 BHK",
    description: "Premium top floor villa with 4 luxurious bedrooms, wraparound terrace, and unobstructed 360° views of the majestic mountains.",
    image: livingRoom1,
    capacity: "8-10 Guests",
    bedrooms: "4 Bedrooms",
    bath: "4 Attached Baths",
    features: ["360° Views", "Wraparound Terrace", "Premium Interiors", "Kitchen"],
  },
];

const RoomsSection = () => {
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
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500"
              style={{ animationDelay: `${index * 0.2}s` }}
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
                  <h3 className="font-display text-2xl text-snow font-semibold">{villa.name}</h3>
                </div>
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
    </section>
  );
};

export default RoomsSection;
