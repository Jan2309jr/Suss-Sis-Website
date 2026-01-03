
import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ArrowRight, Instagram } from 'lucide-react';

// Fixed: Added cms prop to accept content from CMS
export default function ContactPage({ cms }: { cms: any }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "917019302460";
    const text = encodeURIComponent(`Hi Suss Sis! My name is ${name}.\n\nMessage: ${message}`);
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <header className="text-center mb-24 space-y-6">
          <span className="text-[#ac2729] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Let's Connect</span>
          {/* Fixed: Use dynamic title and subtitle from CMS */}
          <h1 className="text-6xl serif font-bold text-gray-900 leading-tight">{cms?.title || "Contact Us"}</h1>
          <p className="text-gray-500 font-light italic max-w-2xl mx-auto text-lg leading-relaxed">
            {cms?.subtitle || "Have a question about our menu or want to discuss a custom order? Reach out to us through any of the channels below."}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Info & Map */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:shadow-red-900/5 transition-all">
                <div className="w-12 h-12 bg-[#ac2729] text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-900/20">
                  <MapPin size={24} />
                </div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3">Our Location</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  {CONTACT_INFO.address}
                </p>
              </div>

              <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:shadow-red-900/5 transition-all">
                <div className="w-12 h-12 bg-[#ac2729] text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-900/20">
                  <Phone size={24} />
                </div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3">Call Us</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  {CONTACT_INFO.phone}
                </p>
              </div>

              <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:shadow-red-900/5 transition-all">
                <div className="w-12 h-12 bg-[#ac2729] text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-900/20">
                  <Mail size={24} />
                </div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3">Email Us</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed break-all">
                  {CONTACT_INFO.email}
                </p>
              </div>

              <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:shadow-red-900/5 transition-all">
                <div className="w-12 h-12 bg-[#ac2729] text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-900/20">
                  <Clock size={24} />
                </div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3">Hours</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Mon - Sun: 10:00 AM - 10:00 PM
                </p>
              </div>
            </div>

            {/* Google Map Snippet */}
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-gray-50 h-[400px] relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.669864757134!2d77.56846177507904!3d13.12003888720872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae196414777a9b%3A0xc3f12ef4ef01309e!2sSuss%20Sis%20Gourmet%20Bakery%20%26%20Cafe!5e0!3m2!1sen!2sin!4v1716500000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.3] contrast-[1.1] transition-all duration-700 group-hover:grayscale-0"
              />
            </div>
          </div>

          {/* Right Column: Message Card */}
          <div className="sticky top-32">
            <div className="bg-white p-10 md:p-16 rounded-[4rem] border border-gray-100 shadow-[0_40px_100px_-20px_rgba(172,39,41,0.1)] space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ac2729]/5 rounded-bl-[8rem]" />
              
              <div className="relative">
                <h2 className="text-3xl serif font-bold text-gray-900 mb-4">Send a Message</h2>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  Fill out the details below and we'll instantly open a chat with our team on WhatsApp.
                </p>
              </div>

              <form onSubmit={handleWhatsAppSend} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-4">Your Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="E.g. Rahul Sharma"
                    className="w-full px-8 py-5 rounded-full border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ac2729]/10 transition-all text-sm font-bold text-gray-700"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-4">Your Message</label>
                  <textarea 
                    required
                    placeholder="How can we help you today?"
                    className="w-full px-8 py-6 rounded-[2rem] border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ac2729]/10 transition-all text-sm font-medium text-gray-700 min-h-[160px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-6 bg-[#ac2729] text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-red-900/30"
                >
                  <MessageCircle size={20} />
                  Send on WhatsApp
                  <ArrowRight size={18} />
                </button>
              </form>

              <div className="pt-8 border-t border-gray-50 text-center">
                <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mb-6">Or follow our journey</p>
                <div className="flex justify-center gap-6">
                  <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-50 text-[#ac2729] rounded-full hover:bg-[#ac2729] hover:text-white transition-all shadow-sm">
                    <Instagram size={20} />
                  </a>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="p-4 bg-gray-50 text-[#ac2729] rounded-full hover:bg-[#ac2729] hover:text-white transition-all shadow-sm">
                    <Phone size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
