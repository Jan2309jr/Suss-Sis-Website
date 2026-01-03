
import React, { useState } from 'react';
import { ShoppingBag, Plus, Settings, LogOut, ChevronRight, Clock, Trash2, Edit3, Save, X, Eye, FileText, Layout, Image as ImageIcon } from 'lucide-react';
import { MenuItem, Category, CMSContent } from '../types';

interface Props {
  menu: MenuItem[];
  setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  cms: CMSContent;
  setCms: React.Dispatch<React.SetStateAction<CMSContent>>;
  onLogout: () => void;
}

export default function AdminDashboard({ menu, setMenu, cms, setCms, onLogout }: Props) {
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'cms'>('menu');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const saveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    
    setMenu(prev => {
      const exists = prev.find(i => i.id === editingItem.id);
      if (exists) return prev.map(i => i.id === editingItem.id ? editingItem : i);
      return [...prev, editingItem];
    });
    setEditingItem(null);
  };

  const deleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setMenu(prev => prev.filter(i => i.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fdf0e9]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#ac2729] text-white p-10 flex flex-col shrink-0 sticky top-0 h-screen shadow-2xl">
        <h1 className="text-3xl serif font-bold mb-16 tracking-tighter">Suss Sis Admin</h1>
        <nav className="space-y-6 flex-grow">
          {[
            { id: 'orders', label: 'Order Feed', icon: <ShoppingBag size={20} /> },
            { id: 'menu', label: 'Menu Database', icon: <Layout size={20} /> },
            { id: 'cms', label: 'Page Content', icon: <FileText size={20} /> }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-[#fdf0e9] text-[#ac2729] shadow-2xl' : 'hover:bg-white/10'}`}
            >
              {tab.icon} <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </nav>
        <button 
          onClick={onLogout}
          className="mt-auto flex items-center gap-5 px-6 py-4 hover:bg-white/10 rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest"
        >
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-16 overflow-y-auto">
        {activeTab === 'menu' && (
          <div className="space-y-12">
            <header className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl serif font-bold text-[#ac2729]">Menu Management</h2>
                <p className="text-[#ac2729]/40 text-sm mt-2">Manage your offerings, prices, and imagery.</p>
              </div>
              <button 
                onClick={() => setEditingItem({ id: `new-${Date.now()}`, name: '', description: '', price: 0, category: Category.CAKES, isVeg: true, image: '' })}
                className="bg-[#ac2729] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-2xl shadow-[#ac2729]/20"
              >
                <Plus size={18} /> Add New Item
              </button>
            </header>

            <div className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-[#ac2729]/5">
              <table className="w-full text-left">
                <thead className="bg-[#fdf0e9]/50 text-[10px] uppercase tracking-[0.3em] font-black text-[#ac2729]/40">
                  <tr>
                    <th className="px-10 py-6">Product</th>
                    <th className="px-10 py-6">Category</th>
                    <th className="px-10 py-6">Price</th>
                    <th className="px-10 py-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ac2729]/5">
                  {menu.map(item => (
                    <tr key={item.id} className="text-sm group hover:bg-[#fdf0e9]/30 transition-colors">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <img src={item.image} className="w-14 h-14 rounded-2xl object-cover shadow-md" />
                          <div>
                            <span className="font-black text-[#ac2729] block">{item.name}</span>
                            <span className={`text-[9px] font-black uppercase tracking-widest ${item.isVeg ? 'text-green-600' : 'text-red-500'}`}>
                              {item.isVeg ? 'Veg' : 'Non-Veg'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-[#ac2729]/50 font-medium">{item.category}</td>
                      <td className="px-10 py-8 font-black text-[#ac2729]">₹{item.price}</td>
                      <td className="px-10 py-8">
                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setEditingItem(item)} className="p-3 bg-white text-[#ac2729] rounded-xl shadow-sm border border-[#ac2729]/10 hover:bg-[#ac2729] hover:text-white transition-all">
                            <Edit3 size={16} />
                          </button>
                          <button onClick={() => deleteItem(item.id)} className="p-3 bg-white text-red-500 rounded-xl shadow-sm border border-red-50 hover:bg-red-500 hover:text-white transition-all">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'cms' && (
          <div className="space-y-12 pb-24">
            <div>
              <h2 className="text-4xl serif font-bold text-[#ac2729]">Page Content Manager</h2>
              <p className="text-[#ac2729]/40 text-sm mt-2">Live-edit your website's primary text and visuals.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white p-12 rounded-[3.5rem] border border-[#ac2729]/5 shadow-sm space-y-10">
                <h3 className="text-xl serif font-bold text-[#ac2729] flex items-center gap-4">
                   <div className="w-10 h-10 bg-[#fdf0e9] text-[#ac2729] rounded-full flex items-center justify-center"><Edit3 size={18}/></div>
                   Home Page (Hero)
                </h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#ac2729]/30 ml-4">Heading</label>
                    <input className="w-full px-6 py-4 rounded-2xl bg-[#fdf0e9]/20 border border-[#ac2729]/10 text-[#ac2729] font-bold" value={cms.home.heroTitle} onChange={e => setCms({...cms, home: {...cms.home, heroTitle: e.target.value}})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#ac2729]/30 ml-4">Accent Text (Italic)</label>
                    <input className="w-full px-6 py-4 rounded-2xl bg-[#fdf0e9]/20 border border-[#ac2729]/10 text-[#ac2729] font-bold italic" value={cms.home.heroAccent} onChange={e => setCms({...cms, home: {...cms.home, heroAccent: e.target.value}})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#ac2729]/30 ml-4">Hero Image URL</label>
                    <input className="w-full px-6 py-4 rounded-2xl bg-[#fdf0e9]/20 border border-[#ac2729]/10 text-[#ac2729] font-bold" value={cms.home.heroImage} onChange={e => setCms({...cms, home: {...cms.home, heroImage: e.target.value}})} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-12 rounded-[3.5rem] border border-[#ac2729]/5 shadow-sm space-y-10">
                <h3 className="text-xl serif font-bold text-[#ac2729] flex items-center gap-4">
                   <div className="w-10 h-10 bg-[#fdf0e9] text-[#ac2729] rounded-full flex items-center justify-center"><Edit3 size={18}/></div>
                   About & Contacts
                </h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#ac2729]/30 ml-4">About Title</label>
                    <input className="w-full px-6 py-4 rounded-2xl bg-[#fdf0e9]/20 border border-[#ac2729]/10 text-[#ac2729] font-bold" value={cms.about.title} onChange={e => setCms({...cms, about: {...cms.about, title: e.target.value}})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#ac2729]/30 ml-4">Founder Biography</label>
                    <textarea className="w-full px-6 py-4 rounded-2xl bg-[#fdf0e9]/20 border border-[#ac2729]/10 text-[#ac2729] font-medium min-h-[140px]" value={cms.about.founderBio} onChange={e => setCms({...cms, about: {...cms.about, founderBio: e.target.value}})} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-8">
               <button onClick={() => alert("CMS changes saved locally!")} className="bg-[#ac2729] text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center gap-4 shadow-2xl shadow-[#ac2729]/30">
                  <Save size={20} /> Save Page Content
               </button>
            </div>
          </div>
        )}
      </main>

      {/* Editor Modal Overlay */}
      {editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#ac2729]/10 backdrop-blur-md" onClick={() => setEditingItem(null)} />
          <div className="relative bg-[#fdf0e9] w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <header className="px-12 py-10 bg-white border-b border-[#ac2729]/5 flex justify-between items-center">
              <div>
                <h3 className="text-2xl serif font-bold text-[#ac2729]">{editingItem.name ? 'Modify Product' : 'New Product'}</h3>
                <p className="text-[9px] uppercase tracking-widest text-[#ac2729]/30 font-black mt-1">Master Database Entry</p>
              </div>
              <button onClick={() => setEditingItem(null)} className="p-3 hover:bg-[#ac2729]/5 rounded-full transition-colors text-[#ac2729]"><X size={24}/></button>
            </header>
            
            <form onSubmit={saveItem} className="p-12 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#ac2729]/40">Name</label>
                  <input required className="w-full px-6 py-4 rounded-2xl bg-white border border-[#ac2729]/10 text-[#ac2729] font-bold" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#ac2729]/40">Price (₹)</label>
                  <input required type="number" className="w-full px-6 py-4 rounded-2xl bg-white border border-[#ac2729]/10 text-[#ac2729] font-bold" value={editingItem.price} onChange={e => setEditingItem({...editingItem, price: parseInt(e.target.value)})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#ac2729]/40">Image Link</label>
                <input required className="w-full px-6 py-4 rounded-2xl bg-white border border-[#ac2729]/10 text-[#ac2729] font-bold" value={editingItem.image} onChange={e => setEditingItem({...editingItem, image: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#ac2729]/40">Category</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-white border border-[#ac2729]/10 text-[#ac2729] font-bold" value={editingItem.category} onChange={e => setEditingItem({...editingItem, category: e.target.value as any})}>
                    {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#ac2729]/40">Type</label>
                  <div className="flex gap-4 p-1 bg-white rounded-2xl border border-[#ac2729]/10">
                    <button type="button" onClick={() => setEditingItem({...editingItem, isVeg: true})} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest ${editingItem.isVeg ? 'bg-green-500 text-white shadow-lg' : 'text-gray-400'}`}>Veg</button>
                    <button type="button" onClick={() => setEditingItem({...editingItem, isVeg: false})} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest ${!editingItem.isVeg ? 'bg-red-500 text-white shadow-lg' : 'text-gray-400'}`}>Non-Veg</button>
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full py-6 bg-[#ac2729] text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:scale-[1.02] transition-all">Apply Product Updates</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
