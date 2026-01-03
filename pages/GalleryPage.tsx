
import React from 'react';

export default function GalleryPage() {
  const images = [
    { src: 'https://picsum.photos/seed/gall1/800/800', tag: 'Inauguration' },
    { src: 'https://picsum.photos/seed/gall2/800/800', tag: 'Special Orders' },
    { src: 'https://picsum.photos/seed/gall3/800/800', tag: 'Events' },
    { src: 'https://picsum.photos/seed/gall4/800/800', tag: 'Kids Visit' },
    { src: 'https://picsum.photos/seed/gall5/800/800', tag: 'Inauguration' },
    { src: 'https://picsum.photos/seed/gall6/800/800', tag: 'Events' },
  ];

  return (
    <div className="bg-cream py-16">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-5xl serif font-bold text-rose mb-4 uppercase">Visual Journey</h1>
          <p className="text-gray-600 font-light italic">Capturing sweet moments and memories at Suss Sis.</p>
        </header>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, i) => (
            <div key={i} className="relative group overflow-hidden rounded-[2rem] shadow-sm hover-lift">
              <img src={img.src} alt={img.tag} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-rose/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/90 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-rose">
                  {img.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
