
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, CreditCard, Truck, Store, Calendar, ArrowRight } from 'lucide-react';

interface Props {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
}

export default function CheckoutPage({ cart, removeFromCart, updateQuantity }: Props) {
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('delivery');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryCharge = deliveryType === 'delivery' ? 50 : 0;
  const total = subtotal + deliveryCharge;

  const handleCheckout = () => {
    // Simulate PetPooja POS Sync
    console.log("Syncing order to PetPooja POS...");
    console.log("Order payload:", { cart, total, deliveryType, address, deliveryDate });
    
    // Simulate Payment
    alert("Redirecting to Razorpay for UPI payment...");
    alert("Success! Your order has been placed. Order ID: SS-" + Math.random().toString(36).substr(2, 9).toUpperCase());
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-8">
        <div className="w-24 h-24 bg-rose/5 rounded-full flex items-center justify-center mx-auto">
          <Truck className="text-rose opacity-20" size={48} />
        </div>
        <h1 className="text-4xl serif font-bold text-rose">Your cart is empty.</h1>
        <p className="text-gray-500 font-light">Looks like you haven't added any treats yet.</p>
        <Link to="/menu" className="inline-block bg-rose text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all">
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl serif font-bold text-rose mb-12">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-rose/5 shadow-sm">
              <h2 className="text-xl serif font-bold text-rose mb-8">Review Order</h2>
              <div className="divide-y divide-rose/5">
                {cart.map((item) => (
                  <div key={item.id} className="py-6 flex gap-6">
                    <img src={item.image} className="w-24 h-24 rounded-2xl object-cover shrink-0" />
                    <div className="flex-grow">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-bold text-rose uppercase tracking-wide text-sm">{item.name}</h3>
                        <span className="font-bold">₹{item.price * item.quantity}</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-4">{item.category}</p>
                      {item.cakeFlavor && (
                        <p className="text-[10px] text-rose font-bold mb-4 uppercase tracking-tighter">
                          {item.cakeFlavor} • {item.weight} • {item.isEggless ? 'Eggless' : 'With Egg'}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 bg-cream px-4 py-2 rounded-full border border-rose/5">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-rose hover:scale-110"><Minus size={14}/></button>
                          <span className="text-sm font-bold min-w-[20px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-rose hover:scale-110"><Plus size={14}/></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-rose/5 shadow-sm space-y-8">
              <h2 className="text-xl serif font-bold text-rose">Order Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                    deliveryType === 'delivery' ? 'bg-rose text-white border-rose' : 'bg-white text-rose border-rose/10'
                  }`}
                >
                  <Truck size={24} />
                  <span className="font-bold text-xs uppercase tracking-widest">Home Delivery</span>
                </button>
                <button 
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                    deliveryType === 'pickup' ? 'bg-rose text-white border-rose' : 'bg-white text-rose border-rose/10'
                  }`}
                >
                  <Store size={24} />
                  <span className="font-bold text-xs uppercase tracking-widest">Store Pickup</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Scheduled Date & Time</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-rose/40" size={18} />
                    <input 
                      type="datetime-local" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-rose/10 focus:outline-none focus:ring-2 focus:ring-rose/20 text-sm"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                    />
                  </div>
                </div>
                {deliveryType === 'delivery' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Delivery Address</label>
                    <input 
                      type="text" 
                      placeholder="Street, Building, Flat No."
                      className="w-full px-6 py-4 rounded-2xl border border-rose/10 focus:outline-none focus:ring-2 focus:ring-rose/20 text-sm"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 border border-rose/5 shadow-sm sticky top-28 space-y-8">
              <h2 className="text-xl serif font-bold text-rose">Payment Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delivery Fee</span>
                  <span className="font-bold">₹{deliveryCharge}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax (GST 5%)</span>
                  <span className="font-bold">₹{Math.round(subtotal * 0.05)}</span>
                </div>
                <div className="pt-4 border-t border-rose/5 flex justify-between items-center">
                  <span className="text-lg font-bold text-rose">Total</span>
                  <span className="text-2xl font-black text-rose">₹{Math.round(total + (subtotal * 0.05))}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full py-5 bg-rose text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-rose/20"
              >
                Pay & Place Order <ArrowRight size={18} />
              </button>
              
              <div className="flex items-center justify-center gap-4 opacity-30 grayscale pt-4">
                <CreditCard size={24} />
                <span className="text-[10px] uppercase font-bold">Secure UPI Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
