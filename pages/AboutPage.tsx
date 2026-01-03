
import React from 'react';
import { Award, Heart, Utensils, Sprout } from 'lucide-react';

interface Props {
  cms: any;
}

export default function AboutPage({ cms }: Props) {
  return (
    <div className="bg-[#fdf0e9]">
      <section className="relative h-96 flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[#ac2729]/5" />
        <div className="relative z-10 max-w-3xl">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ac2729] mb-4 block">Handcrafted Excellence</span>
          <h1 className="text-6xl serif font-bold text-[#ac2729] mb-6">Our Story</h1>
          <p className="text-xl text-[#ac2729]/60 font-light italic leading-relaxed">
            "Suss" symbolizes sweetness, mirroring the delightful flavors in our treats.
            "Sis" stands for the bonds of sisterhood and community.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ac2729] mb-4 block">The Founder</span>
            <h2 className="text-5xl serif font-bold text-[#ac2729] mb-8">{cms.title}</h2>
            <div className="prose prose-rose font-light text-[#ac2729]/70 space-y-8 leading-loose text-lg">
              <p>{cms.founderBio}</p>
              <p>
                What began as a small home kitchen project has blossomed into Suss Sis Gourmet Bakery & Cafe, known for its warm atmosphere and artisanal excellence.
              </p>
            </div>
            
            <div className="mt-12 p-10 bg-white rounded-[3rem] border border-[#ac2729]/5 italic font-light text-[#ac2729]/60">
               "Each treat we serve is a piece of our heart, designed to turn ordinary moments into extraordinary memories."
               <p className="mt-4 font-black not-italic text-[#ac2729] text-xs uppercase tracking-widest">— {cms.founderName}</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-full h-full border-2 border-[#ac2729]/10 rounded-[4rem]" />
            <img src={cms.founderImage} className="relative z-10 w-full h-[700px] object-cover rounded-[4rem] shadow-2xl" alt={cms.founderName} />
          </div>
        </div>
      </section>

      <section className="bg-white py-32 border-y border-[#ac2729]/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16">
          {[
            { title: "Quality Ingredients", icon: <Award />, desc: "We prioritize quality by sourcing the best produce and premium ingredients available." },
            { title: "Skilled Team", icon: <Utensils />, desc: "A talented team of bakers and chefs dedicated to excellence and a passion for culinary art." },
            { title: "Craftsmanship", icon: <Heart />, desc: "Each recipe blends years of expertise with traditional and modern techniques." },
            { title: "Sustainability", icon: <Sprout />, desc: "Committed to responsible sourcing and using eco-friendly packaging for a better tomorrow." }
          ].map((item, idx) => (
            <div key={idx} className="text-center space-y-8">
              <div className="w-20 h-20 bg-[#fdf0e9] shadow-xl shadow-[#ac2729]/5 rounded-full flex items-center justify-center mx-auto text-[#ac2729]">
                {/* Fixed: Added cast to React.ReactElement<any> to allow 'size' property */}
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <h3 className="text-xl serif font-bold text-[#ac2729] uppercase tracking-widest">{item.title}</h3>
              <p className="text-sm font-light text-[#ac2729]/40 leading-relaxed max-w-[200px] mx-auto">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
