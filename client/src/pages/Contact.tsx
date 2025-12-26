import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Instagram, Globe } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { data: companyConfig } = useQuery({
    queryKey: ["/api/company"],
    queryFn: async () => {
      const response = await fetch("/api/company");
      return response.json();
    }
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormData({ name: "", email: "", subject: "", message: "" });
        alert("Thank you! We'll get back to you soon.");
      }
    } catch (error) {
      alert("Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!companyConfig) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#FFF8F5] to-[#FFFBF9] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-serif font-bold text-[#5A3A3A] mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-[#7A5555]">
            We'd love to hear from you. Reach out with any questions or inquiries.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-[#D4A5A5] hover-elevate text-center">
              <Phone className="w-8 h-8 text-[#8B4242] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#5A3A3A] mb-2">Phone</h3>
              <a href={`tel:${companyConfig.phone}`} className="text-[#8B4242] hover:underline font-semibold">
                {companyConfig.phone}
              </a>
            </Card>

            <Card className="p-8 border-[#D4A5A5] hover-elevate text-center">
              <Mail className="w-8 h-8 text-[#8B4242] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#5A3A3A] mb-2">Email</h3>
              <a href={`mailto:${companyConfig.email}`} className="text-[#8B4242] hover:underline font-semibold">
                {companyConfig.email}
              </a>
            </Card>

            <Card className="p-8 border-[#D4A5A5] hover-elevate text-center">
              <MapPin className="w-8 h-8 text-[#8B4242] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#5A3A3A] mb-2">Location</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {companyConfig.address.split(",").slice(-2).join(", ")}
              </p>
            </Card>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 border-[#D4A5A5]">
            <h2 className="text-2xl font-serif font-bold text-[#5A3A3A] mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#5A3A3A] mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  data-testid="input-name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#5A3A3A] mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  data-testid="input-email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#5A3A3A] mb-2">
                  Subject
                </label>
                <Input
                  type="text"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                  data-testid="input-subject"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#5A3A3A] mb-2">
                  Message
                </label>
                <Textarea
                  placeholder="Tell us what's on your mind..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  className="min-h-32"
                  data-testid="textarea-message"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8B4242] hover:bg-[#6B3232] text-white"
                data-testid="button-submit-contact"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 px-4 bg-[#FFFBF9]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-[#5A3A3A] mb-8">
            Follow Us
          </h2>
          <div className="flex justify-center gap-6">
            <a
              href={`https://instagram.com/${companyConfig.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#D4A5A5] rounded-md text-[#8B4242] hover:bg-[#FFF8F5] transition"
              data-testid="link-instagram"
            >
              <Instagram className="w-5 h-5" />
              Instagram
            </a>
            <a
              href={companyConfig.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#D4A5A5] rounded-md text-[#8B4242] hover:bg-[#FFF8F5] transition"
              data-testid="link-website"
            >
              <Globe className="w-5 h-5" />
              Website
            </a>
          </div>
        </div>
      </section>

      {/* Map/Location Preview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-[#5A3A3A] mb-8 text-center">
            Find Us
          </h2>
          <Card className="p-0 border-[#D4A5A5] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7497929373803!2d77.58765!3d13.11562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae178a8e7e5555%3A0x3456789abcdef123!2s833%2F23%20RTO%20Bypass%20Road%2C%20Singanayakanahalli%2C%20Bengaluru%2C%20Karnataka%20560119!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Suss Sis Bakery Location"
              data-testid="map-location"
            ></iframe>
          </Card>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-[#D4A5A5] bg-[#FFFBF9]">
              <h3 className="font-semibold text-[#5A3A3A] mb-2">Address</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{companyConfig.address}</p>
            </Card>
            <Card className="p-6 border-[#D4A5A5] bg-[#FFFBF9]">
              <h3 className="font-semibold text-[#5A3A3A] mb-2">Contact</h3>
              <p className="text-gray-700 text-sm mb-2">
                <a href={`tel:${companyConfig.phone}`} className="text-[#8B4242] hover:underline">
                  {companyConfig.phone}
                </a>
              </p>
              <p className="text-gray-700 text-sm">
                <a href={`mailto:${companyConfig.email}`} className="text-[#8B4242] hover:underline">
                  {companyConfig.email}
                </a>
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
