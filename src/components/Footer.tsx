import { MapPin, Phone, Mail, Heart } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-snow">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="La Cedar Villa" className="h-14 w-auto brightness-0 invert" />
              <div>
                <h3 className="font-display text-xl font-semibold">La Cedar Villa</h3>
                <p className="text-snow/60 text-sm">by Staycation</p>
              </div>
            </div>
            <p className="text-snow/70 max-w-md leading-relaxed mb-6">
              Experience the perfect blend of luxury and nature at La Cedar Villa. 
              Nestled in the heart of Manali, our homestay offers breathtaking views, 
              warm hospitality, and unforgettable memories.
            </p>
            <div className="flex items-center gap-2 text-snow/70">
              <MapPin className="w-4 h-4 text-gold" />
              <span>Kullu - Naggar - Manali Road, Manali, HP 175136</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Rooms", "Amenities", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-snow/70 hover:text-gold transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <span className="text-snow/70">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <span className="text-snow/70">bookings@lacedarvilla.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-snow/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-snow/50 text-sm">
              © {currentYear} La Cedar Villa by Staycation. All rights reserved.
            </p>
            <p className="text-snow/50 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> in the Himalayas
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
