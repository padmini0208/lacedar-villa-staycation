import { 
  Wifi, 
  Car, 
  UtensilsCrossed, 
  Flame, 
  TreePine, 
  Mountain, 
  Coffee, 
  ShieldCheck,
  Sparkles,
  Thermometer,
  Tv,
  Bath
} from "lucide-react";

const amenities = [
  {
    icon: Mountain,
    title: "Panoramic Views",
    description: "Wake up to breathtaking views of snow-capped Himalayan peaks",
  },
  {
    icon: TreePine,
    title: "Cedar Forest",
    description: "Surrounded by ancient cedar and pine trees",
  },
  {
    icon: Flame,
    title: "Room Heater",
    description: "Stay warm and cozy with in-room heating",
  },
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    description: "High-speed internet throughout the property",
  },
  {
    icon: Car,
    title: "Free Parking",
    description: "Secure parking space for your vehicle",
  },
  {
    icon: UtensilsCrossed,
    title: "Home-cooked Meals",
    description: "Authentic Himachali cuisine prepared fresh daily",
  },
  {
    icon: Coffee,
    title: "Tea/Coffee",
    description: "Complimentary beverages to enjoy the views",
  },
  {
    icon: Tv,
    title: "Smart TV",
    description: "Entertainment with streaming services",
  },
  {
    icon: Bath,
    title: "Hot Water",
    description: "24/7 hot water supply for your comfort",
  },
  {
    icon: Thermometer,
    title: "Geyser",
    description: "Instant water heating in all bathrooms",
  },
  {
    icon: Sparkles,
    title: "Daily Housekeeping",
    description: "Clean and fresh rooms every day",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    description: "Round-the-clock security for peace of mind",
  },
];

const AmenitiesSection = () => {
  return (
    <section id="amenities" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-cedar font-medium tracking-[0.2em] uppercase text-sm mb-4">
            What We Offer
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6">
            Amenities & Services
          </h2>
          <p className="text-muted-foreground text-lg">
            Every detail has been thoughtfully considered to ensure your mountain retreat is nothing short of perfect.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {amenities.map((amenity, index) => (
            <div
              key={amenity.title}
              className="group p-6 bg-card rounded-xl border border-border/50 hover:border-cedar/30 hover:shadow-soft transition-all duration-300 text-center"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-14 h-14 bg-cedar/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cedar/20 transition-colors">
                <amenity.icon className="w-7 h-7 text-cedar" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {amenity.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
