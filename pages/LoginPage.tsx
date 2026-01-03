
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { User } from '../types';

export default function LoginPage({ onLogin }: { onLogin: (user: User) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin Login
    if (email === 'admin@susssis.com' && password === 'admin') {
      const adminUser: User = {
        id: 'admin-1',
        name: 'Suss Sis Admin',
        email: 'admin@susssis.com',
        role: 'admin',
        loyaltyPoints: 0,
        loyaltyTier: 'Platinum'
      };
      onLogin(adminUser);
      navigate('/admin');
    } 
    // Regular User Login
    else if (email === 'user@example.com' && password === 'user') {
      const regularUser: User = {
        id: 'user-123',
        name: 'Rahul Sharma',
        email: 'user@example.com',
        role: 'user',
        loyaltyPoints: 1250,
        loyaltyTier: 'Gold'
      };
      onLogin(regularUser);
      navigate('/account');
    } else {
      alert("Invalid credentials. Try:\nAdmin: admin@susssis.com / admin\nUser: user@example.com / user");
    }
  };

  return (
    <div className="bg-[#fdf0e9] min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-[0_35px_60px_-15px_rgba(172,39,41,0.1)] border border-[#ac2729]/5">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#ac2729]/5 text-[#ac2729] rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={28} />
          </div>
          <h1 className="text-3xl serif font-bold text-[#ac2729] mb-2">Welcome Back</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#ac2729]/30 font-black">Secure Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#ac2729]/40 ml-4">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#ac2729]/30" size={18} />
              <input 
                type="email" 
                required
                className="w-full pl-16 pr-6 py-5 rounded-full border border-[#ac2729]/10 bg-[#fdf0e9]/20 focus:outline-none focus:ring-2 focus:ring-[#ac2729]/10 text-sm font-bold text-[#ac2729] transition-all"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#ac2729]/40 ml-4">Password</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#ac2729]/30" size={18} />
              <input 
                type="password" 
                required
                className="w-full pl-16 pr-6 py-5 rounded-full border border-[#ac2729]/10 bg-[#fdf0e9]/20 focus:outline-none focus:ring-2 focus:ring-[#ac2729]/10 text-sm font-bold text-[#ac2729] transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-6 bg-[#ac2729] text-white rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-opacity-90 shadow-xl shadow-[#ac2729]/20 transition-all flex items-center justify-center gap-3"
          >
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-12 pt-10 border-t border-[#ac2729]/5 flex flex-col gap-4">
          <div className="flex items-center gap-3 p-4 bg-[#fdf0e9]/30 rounded-2xl text-[10px] font-bold text-[#ac2729]/40">
             <ShieldCheck size={16} /> Admin: admin@susssis.com / admin
          </div>
          <div className="flex items-center gap-3 p-4 bg-[#fdf0e9]/30 rounded-2xl text-[10px] font-bold text-[#ac2729]/40">
             <ShieldCheck size={16} /> User: user@example.com / user
          </div>
        </div>
      </div>
    </div>
  );
}
