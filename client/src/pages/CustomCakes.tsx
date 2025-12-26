import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { MenuItem } from "@shared/schema";

const STEPS = [
  { id: 1, title: "Shape & Design" },
  { id: 2, title: "Flavor" },
  { id: 3, title: "Size & Details" },
];

const SHAPES = [
  { id: "round", name: "Classic Round", img: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=200" },
  { id: "square", name: "Modern Square", img: "https://images.unsplash.com/photo-1562772379-08ae7e4324a6?w=200" },
  { id: "heart", name: "Heart Shape", img: "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?w=200" },
];

const FLAVORS = [
  { id: "vanilla", name: "Classic Vanilla", color: "#f3e5ab" },
  { id: "chocolate", name: "Rich Chocolate", color: "#3e2723" },
  { id: "redvelvet", name: "Red Velvet", color: "#9c0b1f" },
  { id: "lemon", name: "Zesty Lemon", color: "#fff9c4" },
];

export default function CustomCakes() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, watch, setValue } = useForm();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const formData = watch();

  const onSubmit = (data: any) => {
    // Create a pseudo menu item for the cart
    const customCakeItem: MenuItem = {
      id: Math.floor(Math.random() * 10000), // temp ID
      name: "Custom Cake",
      description: `${data.shape} - ${data.flavor} - ${data.weight}kg`,
      price: (50 * Number(data.weight || 1)).toString(),
      category: "Custom",
      imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400",
      isVeg: data.isEggless,
      available: true
    };
    
    addItem(customCakeItem, 1, `Shape: ${data.shape}, Flavor: ${data.flavor}, Msg: ${data.message}`);
    toast({ title: "Added to Cart", description: "Your custom cake design has been saved!" });
    // Reset or redirect could go here
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-secondary/20 py-12">
      <div className="container-wide max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-primary">Build Your Dream Cake</h1>
          <p className="text-muted-foreground mt-2">Customize every layer to perfection</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -z-10" />
          {STEPS.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2 bg-secondary/20 px-2">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  step >= s.id ? "bg-primary text-white" : "bg-white border-2 border-muted text-muted-foreground"
                }`}
              >
                {step > s.id ? <Check size={18} /> : s.id}
              </div>
              <span className={`text-xs font-medium ${step >= s.id ? "text-primary" : "text-muted-foreground"}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[400px]">
            {/* Step 1: Shape */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-2xl font-serif font-bold">Choose a Shape</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {SHAPES.map((shape) => (
                    <div 
                      key={shape.id}
                      onClick={() => setValue("shape", shape.id)}
                      className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all hover:shadow-lg ${
                        formData.shape === shape.id ? "border-primary ring-2 ring-primary/20" : "border-transparent"
                      }`}
                    >
                      <img src={shape.img} alt={shape.name} className="w-full h-48 object-cover" />
                      <div className="p-4 text-center font-bold text-foreground">{shape.name}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Flavor */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-2xl font-serif font-bold">Pick a Flavor</h2>
                <div className="grid grid-cols-2 gap-4">
                  {FLAVORS.map((flavor) => (
                    <div 
                      key={flavor.id}
                      onClick={() => setValue("flavor", flavor.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.flavor === flavor.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full shadow-inner" style={{ backgroundColor: flavor.color }} />
                      <span className="font-bold text-lg">{flavor.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-2xl font-serif font-bold">Final Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Weight (kg)</Label>
                    <Input type="number" step="0.5" min="0.5" {...register("weight")} defaultValue={1} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Dietary Preference</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" {...register("isEggless")} className="w-4 h-4 text-primary" />
                        <span>Eggless</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" {...register("sugarFree")} className="w-4 h-4 text-primary" />
                        <span>Sugar Free</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Message on Cake</Label>
                  <Input placeholder="Happy Birthday..." {...register("message")} />
                </div>

                <div className="space-y-2">
                  <Label>Special Instructions</Label>
                  <Textarea placeholder="Any allergies or specific design requests..." {...register("instructions")} />
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep} 
              disabled={step === 1}
              className="w-32"
            >
              Back
            </Button>
            
            {step < 3 ? (
              <Button type="button" onClick={nextStep} className="w-32 btn-primary">
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" className="w-40 btn-primary bg-green-600 hover:bg-green-700">
                Add to Cart
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
