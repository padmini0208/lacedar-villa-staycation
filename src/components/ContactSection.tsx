import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.email || !formData.message) {
      toast({
        title: "Please fill in required fields",
        description: "First name, email and message are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly by phone.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div>
            <p className="text-cedar font-medium tracking-[0.2em] uppercase text-sm mb-4">
              Get in Touch
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-6">
              Contact Us
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Ready to experience the serenity of the Himalayas? Reach out to us for bookings, 
              inquiries, or just to say hello. We'd love to host you at La Cedar Villa.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cedar/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-cedar" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">Location</h3>
                  <p className="text-muted-foreground">
                    Village Dhamsu, PO, Teh Manali<br />
                    Sajla, Manali, Himachal Pradesh 175143
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cedar/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-cedar" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">Phone</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+919582762742" className="hover:text-cedar transition-colors">+91 9582762742</a><br />
                    <a href="tel:+918076760431" className="hover:text-cedar transition-colors">+91 8076760431</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cedar/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-cedar" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:mviney86@gmail.com" className="hover:text-cedar transition-colors">mviney86@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cedar/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-cedar" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">Check-in / Check-out</h3>
                  <p className="text-muted-foreground">
                    Check-in: 1:00 PM<br />
                    Check-out: 11:00 AM
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10 flex gap-4">
              <a
                href="#"
                className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-cedar hover:text-snow transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-cedar hover:text-snow transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 lg:p-10 rounded-2xl shadow-soft">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
              Send us a Message
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cedar/50 transition-all"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cedar/50 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cedar/50 transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cedar/50 transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cedar/50 transition-all resize-none"
                  placeholder="Tell us about your stay preferences..."
                  required
                />
              </div>

              <Button variant="cedar" size="xl" className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
