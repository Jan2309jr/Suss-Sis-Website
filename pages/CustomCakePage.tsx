
import React, { useState, useRef } from 'react';
import { MenuItem, Category, CartItem, CakeDesign } from '../types';
import { CAKE_DESIGNS } from '../constants';
import { 
  ChevronRight, 
  Check, 
  Upload, 
  X, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2,
  Trash2
} from 'lucide-react';

export default function CustomCakePage({ addToCart }: { addToCart: (item: MenuItem, custom?: Partial<CartItem>) => void }) {
  const [selectedCake, setSelectedCake] = useState<CakeDesign | null>(null);
  const [isUploadMode, setIsUploadMode] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [flavor, setFlavor] = useState('Belgian Chocolate');
  const [weight, setWeight] = useState('1kg');
  const [requestStatus, setRequestStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const flavors = ['Belgian Chocolate', 'Vanilla Bean', 'Red Velvet', 'Hazelnut Praline', 'Lotus Biscoff', 'Fruit Overload'];
  const weights = ['500g', '1kg', '1.5kg', '2kg+'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitRequest = (isCustom: boolean) => {
    setRequestStatus('sending');
    setTimeout(() => {
      setRequestStatus('success');
      setTimeout(() => {
        setRequestStatus('idle');
        setSelectedCake(null);
        setIsUploadMode(false);
        setUploadedImage(null);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="bg-[#fdf0e9] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-24 space-y-6">
          <span className="text-[#ac2729] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Artisanal Designs</span>
          <h1 className="text-6xl serif font-bold text-[#ac2729]">Designer Cakes</h1>
          <p className="text-[#ac2729]/60 font-light italic max-w-2xl mx-auto text-lg leading-relaxed">
            Explore our curated gallery of designer cakes or bring your own vision to life.
            Every masterpiece is handcrafted to perfection.
          </p>
        </header>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 p-10 bg-white rounded-[3rem] border border-[#ac2729]/10 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#ac2729]/5 rounded-full flex items-center justify-center text-[#ac2729] shadow-inner">
              <Upload size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#ac2729] uppercase tracking-tight">Have a unique design in mind?</h3>
              <p className="text-xs text-[#ac2729]/50 font-medium">Upload your reference image and get a personalized quote.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsUploadMode(true)}
            className="px-12 py-5 bg-[#ac2729] text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl shadow-[#ac2729]/20"
          >
            Upload My Design
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {CAKE_DESIGNS.map((cake) => (
            <div 
              key={cake.id} 
              className="bg-white rounded-[3rem] overflow-hidden border border-[#ac2729]/5 group hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedCake(cake)}
            >
              <div className="relative h-96 overflow-hidden">
                <img src={cake.image} alt={cake.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md text-[#ac2729] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                  <Clock size={14} /> Starts ₹{cake.basePrice}
                </div>
              </div>
              <div className="p-10 text-center">
                <h3 className="text-2xl serif font-bold text-[#ac2729] mb-3">{cake.name}</h3>
                <p className="text-[#ac2729]/30 text-[10px] uppercase tracking-[0.3em] font-black mb-8">Designer Collection</p>
                <div className="flex items-center justify-center gap-2 text-[#ac2729] font-black text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Configure & Request <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center opacity-30">
          <div className="flex flex-wrap items-center justify-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-[#ac2729]">
            <span className="flex items-center gap-2"><Check size={16} /> Freshly Baked</span>
            <span className="flex items-center gap-2"><ShieldCheck size={16} /> Certified Ingredients</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> 48h Prior Notice</span>
          </div>
        </div>
      </div>

      {selectedCake && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#ac2729]/20 backdrop-blur-md" onClick={() => setSelectedCake(null)} />
          <div className="relative bg-[#fdf0e9] w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[90vh] animate-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedCake(null)}
              className="absolute top-8 right-8 z-10 p-3 bg-white/80 backdrop-blur-md rounded-full text-[#ac2729] hover:bg-[#ac2729] hover:text-white transition-all shadow-xl"
            >
              <X size={24} />
            </button>
            <div className="w-full md:w-1/2 h-80 md:h-auto shrink-0 overflow-hidden">
              <img src={selectedCake.image} className="w-full h-full object-cover" alt={selectedCake.name} />
            </div>
            <div className="w-full md:w-1/2 p-10 md:p-16 overflow-y-auto bg-white">
              {requestStatus === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <div className="w-28 h-28 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={56} />
                  </div>
                  <h2 className="text-4xl serif font-bold text-[#ac2729]">Request Sent!</h2>
                  <p className="text-[#ac2729]/60 text-lg leading-relaxed">Our team will review your request and contact you within 4 hours for approval and payment details.</p>
                </div>
              ) : (
                <div className="space-y-10">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ac2729] mb-4 block">Selection Details</span>
                    <h2 className="text-4xl serif font-bold text-[#ac2729] leading-tight">{selectedCake.name}</h2>
                    <p className="mt-6 text-[#ac2729]/60 font-light leading-relaxed text-lg">
                      A masterpiece of culinary art, meticulously decorated with premium finishes. This cake is designed for celebrations that demand elegance.
                    </p>
                  </div>
                  <div className="space-y-8">
                    <div className="flex items-center gap-6 p-6 bg-green-50 text-green-700 rounded-3xl border border-green-100">
                      <CheckCircle2 size={24} />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest">Available for Order</p>
                        <p className="text-xs font-medium opacity-80 mt-1">Next available slot: {new Date(Date.now() + 172800000).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Select Flavor</label>
                      <select 
                        className="w-full p-5 rounded-2xl border border-gray-100 bg-[#fdf0e9]/50 focus:outline-none focus:ring-2 focus:ring-[#ac2729]/10 text-sm font-bold text-gray-700"
                        value={flavor}
                        onChange={(e) => setFlavor(e.target.value)}
                      >
                        {flavors.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Select Weight</label>
                      <div className="flex gap-3">
                        {weights.map(w => (
                          <button
                            key={w}
                            onClick={() => setWeight(w)}
                            className={`flex-1 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                              weight === w ? 'bg-[#ac2729] text-white border-[#ac2729] shadow-xl' : 'bg-white text-gray-400 border-gray-100'
                            }`}
                          >
                            {w}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pt-10 border-t border-[#ac2729]/5">
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Starting Quote</span>
                      <span className="text-4xl font-black text-[#ac2729]">₹{selectedCake.basePrice}</span>
                    </div>
                    <button 
                      onClick={() => submitRequest(false)}
                      className="w-full py-6 bg-[#ac2729] text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-2xl"
                    >
                      {requestStatus === 'sending' ? 'Sending Request...' : 'Request for Approval'}
                    </button>
                    <p className="mt-6 text-[10px] text-center text-gray-400 italic font-medium flex items-center justify-center gap-2">
                      <AlertCircle size={14} /> Approval is required for designer cakes.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isUploadMode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#ac2729]/20 backdrop-blur-md" onClick={() => setIsUploadMode(false)} />
          <div className="relative bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh] animate-in zoom-in duration-300">
            <button 
              onClick={() => setIsUploadMode(false)}
              className="absolute top-8 right-8 z-10 p-3 bg-white/80 backdrop-blur-md rounded-full text-[#ac2729] hover:bg-[#ac2729] hover:text-white transition-all shadow-xl"
            >
              <X size={24} />
            </button>
            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col items-center justify-center bg-[#fdf0e9]/30 border-r border-[#ac2729]/5">
              {uploadedImage ? (
                <div className="w-full h-full space-y-6">
                  <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl">
                    <img src={uploadedImage} className="w-full h-full object-cover" alt="Uploaded reference" />
                    <button 
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-2xl hover:bg-red-700 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-square border-4 border-dashed border-[#ac2729]/10 rounded-[3rem] flex flex-col items-center justify-center gap-8 cursor-pointer hover:border-[#ac2729]/30 hover:bg-[#ac2729]/5 transition-all group"
                >
                  <div className="w-24 h-24 bg-[#ac2729] text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Upload size={36} />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-xl font-black text-[#ac2729] uppercase tracking-tight">Select Reference Image</p>
                    <p className="text-xs text-[#ac2729]/40 font-bold uppercase tracking-widest">JPG, PNG up to 10MB</p>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 p-10 md:p-16 overflow-y-auto">
              {requestStatus === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <div className="w-28 h-28 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={56} />
                  </div>
                  <h2 className="text-3xl serif font-bold text-[#ac2729] leading-tight">Custom Request Sent</h2>
                  <p className="text-[#ac2729]/60 text-lg leading-relaxed">Mudra and our chefs will review your design and get back with a custom quote.</p>
                </div>
              ) : (
                <div className="space-y-10">
                  <div>
                    <h2 className="text-3xl serif font-bold text-[#ac2729] leading-tight">Request Custom Design</h2>
                    <p className="mt-4 text-sm text-[#ac2729]/50 font-medium leading-relaxed">
                      Upload any reference from Pinterest, Instagram or your sketches. We'll bring your dream cake to life.
                    </p>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Preferred Flavor</label>
                      <select 
                        className="w-full p-5 rounded-2xl border border-gray-100 bg-[#fdf0e9]/20 focus:outline-none focus:ring-2 focus:ring-[#ac2729]/10 text-sm font-bold text-gray-700"
                        value={flavor}
                        onChange={(e) => setFlavor(e.target.value)}
                      >
                        {flavors.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Additional Notes</label>
                      <textarea 
                        className="w-full p-6 rounded-3xl border border-gray-100 bg-[#fdf0e9]/20 focus:outline-none focus:ring-2 focus:ring-[#ac2729]/10 text-sm font-medium min-h-[140px]"
                        placeholder="Color preferences, themes, or special messages..."
                      />
                    </div>
                  </div>
                  <div className="pt-10 border-t border-[#ac2729]/5">
                    <button 
                      disabled={!uploadedImage || requestStatus === 'sending'}
                      onClick={() => submitRequest(true)}
                      className="w-full py-6 bg-[#ac2729] text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-2xl disabled:opacity-30"
                    >
                      {requestStatus === 'sending' ? 'Submitting...' : 'Submit Design for Approval'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
