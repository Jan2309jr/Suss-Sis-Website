import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useOrders } from "@/hooks/use-orders";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useLocation } from "wouter";
import { Loader2 } from "lucide-react";

export default function Checkout() {
  const { items, total } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const [, setLocation] = useLocation();
  
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      deliveryType: "pickup",
      customerName: user?.username || "",
      customerPhone: user?.phone || "",
      deliveryAddress: user?.address || ""
    }
  });

  const deliveryType = watch("deliveryType");

  const onSubmit = (data: any) => {
    createOrder.mutate({
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      deliveryType: data.deliveryType,
      deliveryAddress: data.deliveryAddress,
      totalAmount: total.toString(),
      items: items,
      userId: user?.id
    }, {
      onSuccess: () => setLocation("/success")
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-serif">Your cart is empty</h2>
        <Link href="/menu"><Button>Browse Menu</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20 py-12">
      <div className="container-wide max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Order Form */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-8">Checkout</h1>
          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-2xl shadow-sm">
            
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Contact Info</h3>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input {...register("customerName", { required: true })} placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input {...register("customerPhone", { required: true })} placeholder="+1 234 567 8900" />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-bold text-lg">Delivery Method</h3>
              <RadioGroup defaultValue="pickup" className="flex gap-4" {...register("deliveryType")}>
                <div className="flex items-center space-x-2 border p-4 rounded-lg flex-1 cursor-pointer hover:bg-secondary/20">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup">Store Pickup</Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg flex-1 cursor-pointer hover:bg-secondary/20">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery">Delivery</Label>
                </div>
              </RadioGroup>
            </div>

            {deliveryType === "delivery" && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <Label>Delivery Address</Label>
                <Input {...register("deliveryAddress", { required: true })} placeholder="123 Street Name, City" />
              </div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-secondary/30 p-8 rounded-2xl h-fit">
          <h2 className="text-2xl font-serif font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start text-sm">
                <div>
                  <span className="font-bold">{item.quantity}x</span> {item.name}
                  {item.customization && <div className="text-xs text-muted-foreground">{item.customization}</div>}
                </div>
                <span>₹{(Number(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-primary/20 pt-4 space-y-2">
             <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
             </div>
             <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>₹{(total * 0.05).toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-xl font-bold text-primary pt-2">
                <span>Total</span>
                <span>₹{(total * 1.05).toFixed(2)}</span>
             </div>
          </div>

          <Button 
            form="checkout-form"
            type="submit" 
            className="w-full mt-8 btn-primary h-14 text-lg" 
            disabled={createOrder.isPending}
          >
            {createOrder.isPending ? <Loader2 className="animate-spin" /> : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}
