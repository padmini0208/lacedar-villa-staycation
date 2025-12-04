import { TreePine, Mountain, Home } from "lucide-react";
import interiorImage from "@/assets/villa-interior.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative animate-slide-in-left">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={interiorImage}
                alt="Luxurious interior of La Cedar Villa with mountain views"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cedar/10 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/20 rounded-full -z-10" />
          </div>

          {/* Content */}
          <div className="animate-slide-in-right">
            <p className="text-cedar font-medium tracking-[0.2em] uppercase text-sm mb-4">
              About Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6 leading-tight">
              A Retreat Named After 
              <span className="text-gradient"> Nature's Giants</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              The name "Cedar Villa" is derived from the majestic Cedar tree — a distinctive tall evergreen 
              with a wide buttressing base and fibrous trunk adorned in cinnamon-red bark. Just like its namesake, 
              our villa stands proud amidst the Himalayan landscape, offering shelter and serenity to all who visit.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Located on the scenic Kullu-Naggar-Manali Road, La Cedar Villa offers an escape from the ordinary. 
              Our luxury homestay combines modern comfort with rustic mountain charm, creating the perfect sanctuary 
              for families, couples, and nature enthusiasts alike.
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-xl bg-secondary/50">
                <TreePine className="w-8 h-8 text-cedar mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Cedar Forest</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-secondary/50">
                <Mountain className="w-8 h-8 text-cedar mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Mountain Views</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-secondary/50">
                <Home className="w-8 h-8 text-cedar mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Luxury Stay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
