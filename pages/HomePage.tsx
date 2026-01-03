
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, Award, Users, ShoppingBag } from 'lucide-react';
import { MenuItem } from '../types';

interface Props {
  cms: any;
  menu: MenuItem[];
}

export default function HomePage({ cms, menu }: Props) {
  // Best sellers from the stateful menu
  const bestSellers = menu.filter(item => item.isSeasonal || item.price > 500).slice(0, 3);

  return (
    <div className="space-y-0">
      {/* Dynamic Hero Section */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={cms.heroImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover blur-[1px] brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdf0e9] via-transparent to-transparent opacity-90 h-full" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          <div className="space-y-4 md:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="inline-block text-white text-[12px] md:text-[14px] font-bold uppercase tracking-[0.6em] mb-4 opacity-100 drop-shadow-lg">
              Artisan Bakery & Café
            </span>
            
            <div className="relative flex flex-col items-center">
              <h1 className="hero-title-main text-white drop-shadow-2xl">
                {cms.heroTitle}
              </h1>
              <h1 className="hero-title-accent drop-shadow-xl text-[#ac2729]">
                {cms.heroAccent}
              </h1>
            </div>

            <p className="text-white text-sm md:text-xl max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg opacity-90 mb-10">
              {cms.heroSubtitle || "Handcrafted pastries, artisanal breads, and the warmth of home in every bite."}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/menu" className="bg-[#ac2729] text-white px-14 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl">
                View Menu
              </Link>
              <Link to="/about" className="bg-white/20 backdrop-blur-md text-white border-2 border-white/60 px-14 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/30 transition-all shadow-xl">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#fdf0e9] py-32 relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Heart size={28} />, title: "Our Vision", desc: "We aim to bring joy and comfort through gourmet baked goods that satisfy every palate." },
              { icon: <Users size={28} />, title: "Our Mission", desc: "We want to create memorable moments through the power of food and community connection." },
              { icon: <Award size={28} />, title: "Our Legacy", desc: "Founded on quality and passion, ensuring that each visit to our cafe is a cherished experience." }
            ].map((value, idx) => (
              <div key={idx} className="text-center p-10 border border-[#ac2729]/10 rounded-[3rem] hover:shadow-2xl transition-all bg-[#fdf0e9] group">
                <div className="bg-[#ac2729]/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-[#ac2729] group-hover:bg-[#ac2729] group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl serif font-bold text-[#ac2729] mb-4 uppercase tracking-wider">{value.title}</h3>
                <p className="text-[#ac2729]/60 font-light text-sm leading-relaxed max-w-xs mx-auto">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-white py-32 border-y border-[#ac2729]/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-20">
            <div className="max-w-xl">
              <span className="text-[#ac2729] text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">Hand-picked</span>
              <h2 className="text-5xl serif font-bold text-[#ac2729] leading-tight">Trending Treats</h2>
            </div>
            <Link to="/menu" className="hidden md:flex text-[#ac2729] font-bold text-xs uppercase tracking-[0.3em] items-center gap-2 group">
              Full Menu <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {bestSellers.map(item => (
              <div key={item.id} className="bg-[#fdf0e9] rounded-[3rem] border border-[#ac2729]/5 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="relative h-96 overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-8 left-8 bg-[#ac2729] text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2 rounded-full shadow-2xl">
                    Popular
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl serif font-bold text-[#ac2729] mb-4">{item.name}</h3>
                  <p className="text-[#ac2729]/60 text-sm font-light mb-8 line-clamp-2 leading-relaxed">{item.description}</p>
                  <div className="flex items-center justify-between pt-8 border-t border-[#ac2729]/10">
                    <span className="text-2xl font-black text-[#ac2729]">₹{item.price}</span>
                    <Link to="/menu" className="bg-[#ac2729] text-white p-4 rounded-full hover:scale-110 transition-all shadow-xl shadow-[#ac2729]/20">
                      <ShoppingBag size={22} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
