import { useCart } from "@/hooks/use-cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl text-primary">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <span className="text-4xl">🧺</span>
              <p className="text-muted-foreground font-medium">Your cart is empty</p>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.customization}`} className="flex gap-4 p-4 rounded-xl bg-secondary/30">
                  <div className="h-20 w-20 rounded-lg overflow-hidden bg-white shrink-0">
                     <img 
                      src={item.imageUrl || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&h=150&fit=crop"} 
                      alt={item.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-foreground truncate">{item.name}</h4>
                    <p className="text-sm text-primary font-medium">₹{Number(item.price).toFixed(2)}</p>
                    {item.customization && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.customization}</p>
                    )}
                    
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1 bg-white rounded-md border border-border p-0.5">
                        <button 
                          className="h-6 w-6 flex items-center justify-center hover:bg-secondary rounded text-foreground"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          className="h-6 w-6 flex items-center justify-center hover:bg-secondary rounded text-foreground"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button 
                        className="text-muted-foreground hover:text-destructive transition-colors ml-auto"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t pt-4">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <Link href="/checkout" onClick={() => setIsOpen(false)}>
                <Button className="w-full btn-primary rounded-xl py-6 text-lg">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
