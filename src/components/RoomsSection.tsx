import { Users, Bed, Bath, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import bedroomImage from "@/assets/bedroom.jpg";
import terraceImage from "@/assets/terrace-view.jpg";

const rooms = [
  {
    name: "Mountain View Suite",
    description: "Spacious bedroom with panoramic Himalayan views, king-size bed, and private balcony overlooking the cedar forest.",
    image: bedroomImage,
    capacity: "2-4 Guests",
    beds: "1 King Bed",
    bath: "Attached Bath",
    features: ["Mountain View", "Private Balcony", "Room Heater"],
  },
  {
    name: "Cedar Terrace Room",
    description: "Cozy room with direct terrace access, perfect for morning coffee with views of the misty mountains and lush valley.",
    image: terraceImage,
    capacity: "2-3 Guests",
    beds: "1 Queen Bed",
    bath: "Attached Bath",
    features: ["Terrace Access", "Valley View", "Wooden Interiors"],
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

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {rooms.map((room, index) => (
            <div
              key={room.name}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Image */}
              <div className="relative h-64 lg:h-80 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-2xl text-snow font-semibold">{room.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {room.description}
                </p>

                {/* Room Details */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Users className="w-4 h-4 text-cedar" />
                    <span>{room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Bed className="w-4 h-4 text-cedar" />
                    <span>{room.beds}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Bath className="w-4 h-4 text-cedar" />
                    <span>{room.bath}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-cedar/10 text-cedar text-sm rounded-full"
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
