
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { User, Order } from '../types';
import { Clock, ChevronRight, Package, Award, User as UserIcon, LogOut, Star } from 'lucide-react';

export default function AccountPage({ user, onLogout }: { user: User | null, onLogout: () => void }) {
  if (!user || user.role !== 'user') return <Navigate to="/login" />;

  const pastOrders: Order[] = [
    { id: 'ORD-9912', date: '2024-05-12', total: 1250, status: 'Delivered', items: ['Chocolate Truffle', 'Penne Arrabbiata'] },
    { id: 'ORD-8821', date: '2024-04-28', total: 450, status: 'Delivered', items: ['Farmhouse Pizza'] },
  ];

  return (
    <div className="bg-[#fdf0e9] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-white text-[#ac2729] rounded-[2rem] flex items-center justify-center shadow-inner border border-[#ac2729]/5">
              <UserIcon size={48} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ac2729] mb-2 block">Personal Profile</span>
              <h1 className="text-4xl serif font-bold text-[#ac2729]">{user.name}</h1>
              <p className="text-[#ac2729]/40 text-xs font-medium mt-1">{user.email} • Member since 2024</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-8 py-4 bg-white text-[#ac2729]/40 rounded-full text-[10px] font-black uppercase tracking-widest hover:text-[#ac2729] transition-all border border-[#ac2729]/5 shadow-sm"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Reelu Loyalty Section */}
          <div className="lg:col-span-1">
            <div className="relative overflow-hidden bg-[#ac2729] p-10 rounded-[3.5rem] shadow-2xl text-white">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 space-y-12">
                <div className="flex justify-between items-start">
                  <div className="bg-white/20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                    Reelu Loyalty
                  </div>
                  <Award className="text-[#fdf0e9]" size={32} />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-60 mb-2">Points Balance</p>
                  <p className="text-6xl font-black">{user.loyaltyPoints} <span className="text-xl opacity-40">pts</span></p>
                </div>

                <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest opacity-40 mb-1">Tier Level</p>
                    <p className="font-bold text-[#fdf0e9] uppercase tracking-widest text-lg">{user.loyaltyTier}</p>
                  </div>
                  <ChevronRight size={24} className="opacity-20" />
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-8 bg-white rounded-[2rem] border border-[#ac2729]/5 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#ac2729]">Redeem Your points</h3>
              <p className="text-xs text-[#ac2729]/50 leading-relaxed">Redeem points for exclusive discounts or complimentary treats on your next visit.</p>
              <div className="h-2 bg-[#fdf0e9] rounded-full overflow-hidden">
                <div className="h-full bg-[#ac2729]" style={{ width: '65%' }} />
              </div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">650 points until Platinum status</p>
            </div>
          </div>

          {/* Past Orders Section */}
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl serif font-bold text-[#ac2729]">Order History</h2>
              <button className="text-[10px] font-black uppercase tracking-widest text-[#ac2729] hover:underline">View All</button>
            </div>

            <div className="space-y-6">
              {pastOrders.map(order => (
                <div key={order.id} className="p-8 bg-white border border-[#ac2729]/5 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-8 hover:shadow-xl hover:shadow-[#ac2729]/5 transition-all">
                  <div className="flex gap-8">
                    <div className="w-16 h-16 bg-[#fdf0e9] rounded-2xl flex items-center justify-center text-[#ac2729] shadow-sm">
                      <Package size={28} />
                    </div>
                    <div>
                      <h3 className="font-black text-[#ac2729] uppercase tracking-tight text-lg mb-1">{order.id}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#ac2729]/40 font-medium">
                        <span className="flex items-center gap-1"><Clock size={12} /> {order.date}</span>
                        <span>•</span>
                        <span>{order.items.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-12 pt-6 md:pt-0 border-t md:border-t-0 border-[#ac2729]/5">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#ac2729]/30 mb-1">Status</p>
                      <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        {order.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#ac2729]/30 mb-1">Total Amount</p>
                      <p className="text-xl font-black text-[#ac2729]">₹{order.total}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/menu" className="block p-12 bg-white border border-dashed border-[#ac2729]/20 rounded-[3rem] text-center group hover:bg-[#ac2729]/5 transition-all">
               <h3 className="text-xl serif font-bold text-[#ac2729] mb-2">Feeling Hungry?</h3>
               <p className="text-[#ac2729]/40 text-sm">Explore our current specials and reorder your favorites.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
