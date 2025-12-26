import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShoppingBag, Menu as MenuIcon, X, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import logo from "@assets/logo_1766654185147.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { items, setIsOpen: setOpenCart } = useCart();
  const { user, logout } = useAuth();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Custom Cakes", href: "/custom-cakes" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm" style={{ backgroundColor: "#6B3232" }}>
      <div className="container-wide flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img src={logo} alt="Suss Sis Logo" className="h-12 w-auto object-contain" />
            <span className="hidden md:block font-serif text-xl font-bold tracking-tight text-white">
              Suss Sis
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                location === link.href ? "text-white font-bold" : "text-gray-100 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-100 hover:text-white hover:bg-white/10"
            onClick={() => setOpenCart(true)}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white text-[10px] font-bold text-[#6B3232] flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-gray-100 hover:text-white hover:bg-white/10">
                  <UserIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-bold">{user.username}</DropdownMenuItem>
                {user.role === 'admin' && (
                  <Link href="/admin">
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button size="sm" className="hidden md:flex rounded-full bg-white text-[#6B3232] hover:bg-gray-100 font-semibold">
                Login
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-100 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/10"
          style={{ backgroundColor: "#6B3232" }}
        >
          <div className="container-wide py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium py-2 border-b border-white/10 text-white hover:text-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!user && (
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full mt-2 bg-white text-[#6B3232] hover:bg-gray-100 font-semibold">Login / Sign Up</Button>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}
