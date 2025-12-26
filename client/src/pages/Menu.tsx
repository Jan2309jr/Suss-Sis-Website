import { useState } from "react";
import { useMenu } from "@/hooks/use-menu";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Leaf, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const categories = ["All", "Seasonal", "Cakes", "Pastries", "Savory", "Beverages"];

const getSeasonalItems = () => {
  const month = new Date().getMonth();
  const seasonalNames: Record<number, string[]> = {
    0: ["New Year Chocolate Truffle Cake", "Sparkling Champagne Cake", "Lucky Citrus Pound Cake"],
    1: ["Red Velvet Romance Cake", "Strawberry Lover's Delight", "Chocolate Love Brownies"],
    2: ["Pistachio Spring Cake", "Lemon Blossoms", "Carrot Cake with Cream Cheese"],
    3: ["Easter Bunny Cake", "Pastel Egg Cupcakes", "Lavender Honey Cake"],
    4: ["Mango Paradise Cake", "Coconut Bliss", "Pineapple Upside Down Cake"],
    5: ["Chocolate Comfort Cake", "Rainy Day Pastries", "Walnut Spice Cake"],
    6: ["Rainbow Layer Cake", "Raspberry Cheesecake", "Blackberry Delight"],
    7: ["Peach Melba Cake", "Blueberry Bliss", "Hazelnut Dream"],
    8: ["Apple Cinnamon Cake", "Honey Walnut Delight", "Pear Ginger Cake"],
    9: ["Spiced Pumpkin Cake", "Caramel Apple Tart", "Cinnamon Roll Cake"],
    10: ["Diwali Gold Cake", "Spiced Gratitude Cake", "Kheer Flavored Delight"],
    11: ["Traditional Plum Cake", "Christmas Gingerbread", "White Christmas Cake"]
  };
  return seasonalNames[month] || [];
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: menuItems, isLoading } = useMenu();
  const { addItem } = useCart();
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const seasonalNames = getSeasonalItems();
  
  const filteredItems = menuItems?.filter(item => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Seasonal") return seasonalNames.some(name => item.name.toLowerCase().includes(name.toLowerCase()));
    return item.category === activeCategory;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20 pb-20 pt-10">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold text-primary mb-4">Our Menu</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Indulge in our selection of freshly baked goods and savory meals.
          </p>
          {activeCategory === "Seasonal" && (
            <div className="mt-4 inline-block px-6 py-2 bg-primary/10 rounded-full border border-primary/20">
              <p className="text-sm font-medium text-primary">
                ✨ Featuring this month's signature seasonal bestsellers
              </p>
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4">
          <div className="bg-white p-1.5 rounded-full shadow-sm border inline-flex gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-md" 
                    : "text-muted-foreground hover:bg-secondary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems?.map((item) => (
              <Dialog key={item.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 flex flex-col cursor-pointer"
                >
                  <DialogTrigger asChild>
                    <div onClick={() => setSelectedItem(item)} className="flex flex-col flex-1 h-full">
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img 
                          src={item.imageUrl || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&fit=crop"} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {item.isVeg && (
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur p-1.5 rounded-full shadow-sm" title="Vegetarian">
                            <Leaf className="w-4 h-4 text-green-600" fill="currentColor" />
                          </div>
                        )}
                        {!item.available && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold tracking-wider border-2 border-white px-4 py-1">SOLD OUT</span>
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-serif font-bold text-lg leading-tight">{item.name}</h3>
                          <span className="font-bold text-primary">₹{Number(item.price).toFixed(2)}</span>
                        </div>
                        
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                          {item.description || "Delightful and freshly prepared."}
                        </p>
                      </div>
                    </div>
                  </DialogTrigger>

                  <div className="p-5 pt-0">
                    <Button 
                      className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                      disabled={!item.available}
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(item);
                      }}
                      data-testid={`button-add-cart-${item.id}`}
                    >
                      {item.available ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </motion.div>

                <DialogContent className="sm:max-w-md" data-testid={`dialog-item-${item.id}`}>
                  <DialogHeader>
                    <DialogTitle className="font-serif text-2xl text-primary" data-testid={`dialog-title-${item.id}`}>{item.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <img 
                      src={item.imageUrl || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"} 
                      className="w-full h-48 object-cover rounded-lg" 
                      alt={item.name}
                      data-testid={`dialog-image-${item.id}`}
                    />
                    <p className="text-muted-foreground" data-testid={`dialog-description-${item.id}`}>{item.description || "Delightful and freshly prepared."}</p>
                    <div className="flex items-center justify-between font-medium">
                      <span>Price</span>
                      <span className="text-xl text-primary" data-testid={`dialog-price-${item.id}`}>₹{Number(item.price).toFixed(2)}</span>
                    </div>
                    <Button 
                      className="w-full btn-primary" 
                      onClick={() => { addItem(item); }}
                      disabled={!item.available}
                      data-testid={`dialog-add-cart-${item.id}`}
                    >
                      {item.available ? "Add to Cart" : "Currently Unavailable"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
