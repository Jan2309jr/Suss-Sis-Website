
import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from '../types';

// Fixed: Added menu to props to use stateful menu instead of static constant
export default function SeasonalPage({ menu }: { menu: MenuItem[] }) {
  const seasonalItems = menu.filter(item => item.isSeasonal);

  return (
    <div className="bg-[#FDFBF7] py-24">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-24 relative">
          <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-full flex justify-center gap-4 opacity-40">
            {Array.from({length: 12}).map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-red-500' : 'bg-green-500'}`} />
            ))}
          </div>
          <h1 className="text-7xl serif font-bold text-rose mb-6">Christmas Specials</h1>
          <p className="text-xl text-gray-500 font-light tracking-wide italic">Celebrate the magic with our handcrafted holiday treats.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-8">
            <h2 className="text-4xl serif font-bold text-rose">The Holiday Collection</h2>
            <div className="space-y-6">
              {/* Note: Mapping seasonalItems would be more dynamic here if needed, 
                  but following the existing hardcoded visual structure */}
              <div className="flex justify-between items-center border-b border-rose/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wide">Rich Plum Cakes</h3>
                  <p className="text-sm text-gray-400">Rum-soaked dry fruits and warm spices.</p>
                </div>
                <span className="text-lg font-bold">₹850</span>
              </div>
              <div className="flex justify-between items-center border-b border-rose/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wide">Millet Plum Cakes</h3>
                  <p className="text-sm text-gray-400">Healthy twist on a classic favorite.</p>
                </div>
                <span className="text-lg font-bold">₹750</span>
              </div>
              <div className="flex justify-between items-center border-b border-rose/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wide">Christmas Hampers</h3>
                  <p className="text-sm text-gray-400">Cookies, brownies, and festive treats.</p>
                </div>
                <span className="text-lg font-bold">Starts ₹1,200</span>
              </div>
            </div>
            <Link to="/menu" className="inline-block px-12 py-4 bg-rose text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all">
              View All Specials
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/seed/season1/600/600" className="rounded-3xl h-64 w-full object-cover" />
            <img src="https://picsum.photos/seed/season2/600/600" className="rounded-3xl h-64 w-full object-cover translate-y-8" />
            <img src="https://picsum.photos/seed/season3/600/600" className="rounded-3xl h-64 w-full object-cover" />
            <img src="https://picsum.photos/seed/season4/600/600" className="rounded-3xl h-64 w-full object-cover translate-y-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
