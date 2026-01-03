
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, X, Phone, Instagram, MapPin, User as UserIcon, LogIn, ChevronRight, Cake, Package, LogOut } from 'lucide-react';
import { MenuItem, CartItem, Category, User, CMSContent } from './types';
import { CONTACT_INFO, LOGO_SVG, INITIAL_MENU } from './constants';

// Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import CustomCakePage from './pages/CustomCakePage';
import CustomSnackBoxPage from './pages/CustomSnackBoxPage';
import GalleryPage from './pages/GalleryPage';
import SeasonalPage from './pages/SeasonalPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';

const safeLocalStorage = {
  getItem: (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage access denied');
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('localStorage access denied');
    }
  }
};

const Layout = ({ 
  children, 
  cartCount, 
  user, 
  onLogout 
}: { 
  children: React.ReactNode, 
  cartCount: number, 
  user: User | null, 
  onLogout: () => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  if (isAdminPath) return <>{children}</>;

  return (
    <div className="flex flex-col min-h-screen bg-[#fdf0e9]">
      <nav className="sticky top-0 z-50 bg-[#fdf0e9]/95 backdrop-blur-md border-b border-[#ac2729]/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-[#ac2729] font-black text-2xl serif tracking-tighter flex items-center gap-2">
                <span className="hidden sm:inline">{LOGO_SVG}</span>
                Suss Sis
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-8 text-[11px] font-black uppercase tracking-[0.2em] text-[#ac2729]">
              <Link to="/" className="hover:opacity-70 transition-opacity">Home</Link>
              <Link to="/about" className="hover:opacity-70 transition-opacity">Our Story</Link>
              <Link to="/menu" className="hover:opacity-70 transition-opacity">Menu</Link>
              <Link to="/custom-cakes" className="hover:opacity-70 transition-opacity">Custom Cakes</Link>
              <Link to="/custom-snack-box" className="hover:opacity-70 transition-opacity">Snack Box</Link>
              <Link to="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <Link to={user.role === 'admin' ? '/admin' : '/account'} className="p-2 text-[#ac2729] hover:bg-[#ac2729]/5 rounded-full transition-all flex items-center gap-2 border border-[#ac2729]/20 px-4 py-2">
                    <UserIcon size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{user.name.split(' ')[0]}</span>
                  </Link>
                  <button onClick={onLogout} className="text-[#ac2729]/50 hover:text-[#ac2729] transition-colors">
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="p-2 text-[#ac2729] hover:bg-[#ac2729]/5 rounded-full transition-all">
                  <LogIn size={22} />
                </Link>
              )}
              
              <Link to="/checkout" className="relative p-2 text-[#ac2729] hover:bg-[#ac2729]/5 rounded-full transition-all">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#ac2729] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-[#ac2729]">
                {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-[#fdf0e9] border-b border-[#ac2729]/10 py-6 px-4 space-y-4 shadow-xl">
            <Link to="/" onClick={() => setIsOpen(false)} className="block text-sm font-bold text-[#ac2729] uppercase tracking-wider">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block text-sm font-bold text-[#ac2729] uppercase tracking-wider">Our Story</Link>
            <Link to="/menu" onClick={() => setIsOpen(false)} className="block text-sm font-bold text-[#ac2729] uppercase tracking-wider">Menu</Link>
            <Link to="/custom-cakes" onClick={() => setIsOpen(false)} className="block text-sm font-bold text-[#ac2729] uppercase tracking-wider">Custom Cakes</Link>
            <Link to="/custom-snack-box" onClick={() => setIsOpen(false)} className="block text-sm font-bold text-[#ac2729] uppercase tracking-wider">Snack Box</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-sm font-bold text-[#ac2729] uppercase tracking-wider">Contact</Link>
            <Link to="/menu" onClick={() => setIsOpen(false)} className="block w-full text-center bg-[#ac2729] text-white py-4 rounded-full font-bold uppercase tracking-widest shadow-lg">Order Online</Link>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[#fdf0e9] border-t border-[#ac2729]/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-[#ac2729] font-black text-xl serif tracking-tighter">Suss Sis</div>
            </div>
            <p className="text-sm text-[#ac2729]/70 leading-relaxed italic">
              "Handcrafted pastries, artisanal breads, and the warmth of home in every bite."
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#ac2729] mb-6">Location</h3>
            <p className="text-sm text-[#ac2729]/70 flex gap-2">
              <MapPin size={18} className="shrink-0 text-[#ac2729]" />
              {CONTACT_INFO.address}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#ac2729] mb-6">Contact</h3>
            <ul className="space-y-3 text-sm text-[#ac2729]/70">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#ac2729]" /> {CONTACT_INFO.phone}
              </li>
              <li className="flex items-center gap-2 underline">
                {CONTACT_INFO.email}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#ac2729] mb-6">Follow Us</h3>
            <div className="flex gap-4">
              <a href={CONTACT_INFO.instagram} className="p-2 bg-[#ac2729] text-white rounded-full hover:scale-110 transition-transform shadow-lg shadow-[#ac2729]/20">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-[#ac2729]/5 text-center text-[11px] text-[#ac2729]/40 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Suss Sis Gourmet Bakery & Cafe. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = safeLocalStorage.getItem('suss_sis_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cms, setCms] = useState<CMSContent>(() => {
    const saved = safeLocalStorage.getItem('suss_sis_cms');
    return saved ? JSON.parse(saved) : {
      home: {
        heroTitle: "Sweeten Your",
        heroAccent: "Moments",
        heroSubtitle: "Handcrafted pastries, artisanal breads, and the warmth of home in every bite.",
        heroImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1920"
      },
      about: {
        title: "Mudra Khatri's Journey",
        founderName: "Mudra Khatri",
        founderBio: "A Certified Pastry Professional from India's reputed IIHM Institute of Patisserie & Culinary...",
        founderImage: "https://picsum.photos/seed/mudra/800/1000"
      },
      contact: {
        title: "Contact Us",
        subtitle: "Have a question about our menu or want to discuss a custom order?"
      }
    };
  });

  const [menu, setMenu] = useState<MenuItem[]>(() => {
    const saved = safeLocalStorage.getItem('suss_sis_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = safeLocalStorage.getItem('suss_sis_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    safeLocalStorage.setItem('suss_sis_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    safeLocalStorage.setItem('suss_sis_cms', JSON.stringify(cms));
  }, [cms]);

  useEffect(() => {
    safeLocalStorage.setItem('suss_sis_menu', JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    safeLocalStorage.setItem('suss_sis_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: MenuItem, customization?: Partial<CartItem>) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(i => 
        i.id === item.id && 
        JSON.stringify(i.cakeFlavor) === JSON.stringify(customization?.cakeFlavor) &&
        JSON.stringify(i.customInstructions) === JSON.stringify(customization?.customInstructions)
      );
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += 1;
        return newCart;
      }
      return [...prev, { ...item, quantity: 1, ...customization }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <AppContent 
        user={user} 
        setUser={setUser} 
        cms={cms} 
        setCms={setCms} 
        menu={menu} 
        setMenu={setMenu}
        cart={cart}
        cartCount={cartCount}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </Router>
  );
}

function AppContent({ 
  user, setUser, cms, setCms, menu, setMenu, cart, cartCount, addToCart, removeFromCart, updateQuantity 
}: any) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <Layout cartCount={cartCount} user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<HomePage cms={cms.home} menu={menu} />} />
        <Route path="/menu" element={<MenuPage menu={menu} addToCart={addToCart} />} />
        <Route path="/about" element={<AboutPage cms={cms.about} />} />
        <Route path="/custom-cakes" element={<CustomCakePage addToCart={addToCart} />} />
        <Route path="/custom-snack-box" element={<CustomSnackBoxPage menu={menu} addToCart={addToCart} />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/seasonal" element={<SeasonalPage menu={menu} />} />
        <Route path="/contact" element={<ContactPage cms={cms.contact} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/account" element={<AccountPage user={user} onLogout={handleLogout} />} />
        <Route path="/admin/*" element={<AdminDashboard menu={menu} setMenu={setMenu} cms={cms} setCms={setCms} onLogout={handleLogout} />} />
      </Routes>
    </Layout>
  );
}
