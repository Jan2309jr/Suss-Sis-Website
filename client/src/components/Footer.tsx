import { Link } from "wouter";
import logo from "@assets/logo_1766654185147.png";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export function Footer() {
  const { data: companyConfig } = useQuery({
    queryKey: ["/api/company"],
    queryFn: async () => {
      const response = await fetch("/api/company");
      return response.json();
    }
  });

  if (!companyConfig) return null;

  return (
    <footer className="bg-secondary/50 pt-16 pb-8 border-t border-primary/10">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img src={logo} alt="Suss Sis" className="h-14 w-auto object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Crafted with love, served with joy. Bringing the finest gourmet bakery experience to your special moments.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://instagram.com/susssisbakery" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors" data-testid="link-instagram-footer">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.google.com/search?q=Suss+Sis+Gourmet+Bakery+Bengaluru" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors" data-testid="link-google-footer">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors">Our Menu</Link></li>
              <li><Link href="/custom-cakes" className="text-muted-foreground hover:text-primary transition-colors">Custom Cakes</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{companyConfig.address}</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href={`tel:${companyConfig.phone}`} className="hover:text-primary transition-colors">{companyConfig.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href={`mailto:${companyConfig.email}`} className="hover:text-primary transition-colors">{companyConfig.email}</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-foreground">Opening Hours</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="font-medium text-foreground">{companyConfig.hours.monday}</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium text-foreground">{companyConfig.hours.saturday}</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium text-foreground">{companyConfig.hours.sunday}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Suss Sis Gourmet Bakery. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/admin" className="hover:text-primary">Admin Login</Link>
          </div>
        </div>
      </div>
      
      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${companyConfig.phone.replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all z-50 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
        data-testid="button-whatsapp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>
    </footer>
  );
}
