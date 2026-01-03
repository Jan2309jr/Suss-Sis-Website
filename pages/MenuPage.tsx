
import React, { useState, useMemo } from 'react';
import { Category, MenuItem } from '../types';
import { Search, ShoppingBag, Leaf } from 'lucide-react';

interface Props {
  menu: MenuItem[];
  addToCart: (item: MenuItem) => void;
}

export default function MenuPage({ menu, addToCart }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'All' | 'Veg' | 'Non-Veg'>('All');

  const filteredItems = useMemo(() => {
    return menu.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiet = dietaryFilter === 'All' || 
                         (dietaryFilter === 'Veg' && item.isVeg) || 
                         (dietaryFilter === 'Non-Veg' && !item.isVeg);
      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [selectedCategory, searchQuery, dietaryFilter, menu]);

  const categories = ['All', ...Object.values(Category)];

  return (
    <div className="bg-[#fdf0e9] min-h-screen pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-20">
          <span className="text-[#ac2729] text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">Artisan Selection</span>
          <h1 className="text-6xl serif font-bold text-[#ac2729] mb-6">Our Menu</h1>
          <p className="text-[#ac2729]/60 font-light max-w-xl mx-auto italic text-lg leading-relaxed">
            Carefully crafted flavors designed to delight.
          </p>
        </header>

        {/* Filters */}
        <div className="mb-20 space-y-10">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative flex-grow">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#ac2729]/30" size={20} />
              <input 
                type="text" 
                placeholder="Search menu..." 
                className="w-full pl-16 pr-8 py-5 rounded-full border border-[#ac2729]/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#ac2729]/20 transition-all text-sm font-medium text-[#ac2729]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              {(['All', 'Veg', 'Non-Veg'] as const).map(diet => (
                <button
                  key={diet}
                  onClick={() => setDietaryFilter(diet)}
                  className={`px-8 py-5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all border ${
                    dietaryFilter === diet 
                      ? 'bg-[#ac2729] text-white border-[#ac2729] shadow-xl shadow-[#ac2729]/20' 
                      : 'bg-white text-[#ac2729]/40 border-[#ac2729]/10 hover:border-[#ac2729]/30'
                  }`}
                >
                  {diet === 'Veg' ? <Leaf size={14} className="inline mr-2" /> : null}
                  {diet}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`px-8 py-3.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all border ${
                  selectedCategory === cat 
                    ? 'bg-[#ac2729] text-white border-[#ac2729] shadow-lg shadow-[#ac2729]/10' 
                    : 'bg-white text-[#ac2729] border-[#ac2729]/10 hover:bg-[#ac2729]/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-[3rem] overflow-hidden border border-[#ac2729]/5 group hover:shadow-2xl transition-all duration-500">
              <div className="relative h-72 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-6 left-6">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl ${item.isVeg ? 'bg-green-500 text-white' : 'bg-[#ac2729] text-white'}`}>
                    {item.isVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl serif font-bold text-[#ac2729]">{item.name}</h3>
                  <span className="text-xl font-black text-[#ac2729]">₹{item.price}</span>
                </div>
                <p className="text-[#ac2729]/60 text-sm font-light mb-10 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full py-5 bg-[#fdf0e9] border border-[#ac2729]/10 text-[#ac2729] font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-[#ac2729] hover:text-white transition-all flex items-center justify-center gap-3 shadow-sm"
                >
                  <ShoppingBag size={18} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
