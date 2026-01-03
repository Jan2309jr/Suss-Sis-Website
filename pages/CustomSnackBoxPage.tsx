
import React, { useState, useMemo } from 'react';
import { MenuItem, Category, CartItem } from '../types';
import { Package, Plus, Minus, IndianRupee, Info, ShoppingBag } from 'lucide-react';

export default function CustomSnackBoxPage({ menu, addToCart }: { menu: MenuItem[]; addToCart: (item: MenuItem, custom?: Partial<CartItem>) => void }) {
  const [budget, setBudget] = useState(500);
  const [selectedItems, setSelectedItems] = useState<{ item: MenuItem; quantity: number }[]>([]);

  const availableSnacks = useMemo(() => {
    return menu.filter(item => 
      item.category === Category.SAVORIES || 
      item.category === Category.PASTRIES || 
      item.category === Category.FRIES ||
      item.category === Category.BEVERAGES ||
      item.category === Category.BURGERS
    );
  }, [menu]);

  const totalSpent = selectedItems.reduce((acc, entry) => acc + (entry.item.price * entry.quantity), 0);
  const remainingBudget = budget - totalSpent;

  const addItem = (item: MenuItem) => {
    if (item.price > remainingBudget) return;
    
    setSelectedItems(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeItem = (itemId: string) => {
    setSelectedItems(prev => {
      const existing = prev.find(i => i.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.item.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.item.id !== itemId);
    });
  };

  const handleFinish = () => {
    if (selectedItems.length === 0) return;

    const boxContent = selectedItems.map(si => `${si.quantity}x ${si.item.name}`).join(', ');
    const customItem: MenuItem = {
      id: `snackbox-${Date.now()}`,
      name: `Gourmet Snack Box (Budget: ₹${budget})`,
      description: `Handpicked selection: ${boxContent}`,
      price: totalSpent,
      category: Category.SAVORIES,
      isVeg: selectedItems.every(si => si.item.isVeg),
      image: 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=600'
    };

    addToCart(customItem, {
      customInstructions: `Snack Box Items: ${boxContent}`
    });
    
    setSelectedItems([]);
    alert("Custom Snack Box added to your cart!");
  };

  return (
    <div className="bg-[#fdf0e9] min-h-screen py-24 pb-40">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-24">
          <span className="text-[#ac2729] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Personalized Picks</span>
          <h1 className="text-6xl serif font-bold text-[#ac2729] mb-6">Custom Snack Box</h1>
          <p className="text-[#ac2729]/60 font-light italic text-lg leading-relaxed">Design your perfect treat collection within your budget.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white p-12 rounded-[3.5rem] border border-[#ac2729]/10 shadow-sm space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl serif font-bold text-[#ac2729] flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#ac2729] text-white rounded-full flex items-center justify-center shadow-lg"><IndianRupee size={20} /></div>
                  Step 1: Set Your Budget
                </h2>
                <span className="text-4xl font-black text-[#ac2729]">₹{budget}</span>
              </div>
              <input 
                type="range" 
                min="200" 
                max="5000" 
                step="100"
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ac2729]"
              />
              <div className="flex justify-between text-[10px] uppercase font-black text-gray-400 tracking-[0.3em]">
                <span>Min: ₹200</span>
                <span>Max: ₹5000</span>
              </div>
            </div>

            <div className="space-y-10">
              <h2 className="text-2xl serif font-bold text-[#ac2729] flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ac2729] text-white rounded-full flex items-center justify-center shadow-lg"><Package size={20} /></div>
                Step 2: Pick Your Treats
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {availableSnacks.map(item => {
                  const canAfford = item.price <= remainingBudget;
                  return (
                    <div 
                      key={item.id} 
                      className={`bg-white p-6 rounded-[2.5rem] border transition-all flex items-center gap-6 ${
                        canAfford 
                          ? 'border-[#ac2729]/5 hover:border-[#ac2729]/20 hover:shadow-2xl transition-all' 
                          : 'opacity-40 border-transparent grayscale cursor-not-allowed'
                      }`}
                    >
                      <img src={item.image} className="w-24 h-24 rounded-3xl object-cover shrink-0 shadow-lg" alt={item.name} />
                      <div className="flex-grow">
                        <h3 className="text-sm font-black text-[#ac2729] uppercase tracking-tight mb-1">{item.name}</h3>
                        <p className="text-xs font-black text-[#ac2729]/60 mb-4">₹{item.price}</p>
                        <button 
                          disabled={!canAfford}
                          onClick={() => addItem(item)}
                          className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                            canAfford ? 'text-[#ac2729] hover:opacity-70' : 'text-gray-300'
                          }`}
                        >
                          <Plus size={16} /> Add to Box
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-12 rounded-[3.5rem] border border-[#ac2729]/10 shadow-sm sticky top-32 space-y-10">
              <h2 className="text-2xl serif font-bold text-[#ac2729] text-center">Box Summary</h2>
              <div className="space-y-4">
                <div className="h-3 w-full bg-[#fdf0e9] rounded-full overflow-hidden border border-[#ac2729]/5">
                  <div 
                    className="h-full bg-[#ac2729] transition-all duration-1000 ease-out" 
                    style={{ width: `${(totalSpent / budget) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] uppercase font-black tracking-widest px-1">
                  <span className="text-[#ac2729]">Spent: ₹{totalSpent}</span>
                  <span className={remainingBudget < 50 ? 'text-red-600' : 'text-[#ac2729]/40'}>
                    Left: ₹{remainingBudget}
                  </span>
                </div>
              </div>

              <div className="space-y-6 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
                {selectedItems.length === 0 ? (
                  <div className="text-center py-16 opacity-20 italic text-sm space-y-4">
                    <ShoppingBag size={48} className="mx-auto" />
                    <p>Your box is empty.</p>
                  </div>
                ) : (
                  selectedItems.map(({ item, quantity }) => (
                    <div key={item.id} className="flex items-center justify-between group animate-in fade-in slide-in-from-right-4">
                      <div className="flex-grow">
                        <p className="text-[11px] font-black uppercase tracking-tight text-[#ac2729]">{item.name}</p>
                        <p className="text-[10px] font-bold opacity-40 mt-0.5">₹{item.price} x {quantity}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => removeItem(item.id)} className="text-[#ac2729]/20 hover:text-[#ac2729] transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="text-xs font-black w-4 text-center">{quantity}</span>
                        <button 
                          onClick={() => addItem(item)} 
                          disabled={item.price > remainingBudget}
                          className="text-[#ac2729]/20 hover:text-[#ac2729] disabled:opacity-0 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-10 border-t border-[#ac2729]/5 space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Value</span>
                  <span className="text-4xl font-black text-[#ac2729]">₹{totalSpent}</span>
                </div>

                <button 
                  disabled={selectedItems.length === 0}
                  onClick={handleFinish}
                  className="w-full py-6 bg-[#ac2729] text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-2xl disabled:opacity-30"
                >
                  <ShoppingBag size={20} /> Add Box to Cart
                </button>
                
                <p className="text-[10px] text-center text-gray-300 uppercase font-black tracking-widest flex items-center justify-center gap-2">
                  <Info size={14} /> Packaging included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ac272920; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ac272950; }
      `}</style>
    </div>
  );
}
