import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Success() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
      </motion.div>
      
      <h1 className="text-4xl font-serif font-bold text-primary mb-4">Order Placed Successfully!</h1>
      <p className="text-muted-foreground text-lg max-w-md mb-8">
        Thank you for your order. We're getting everything ready for you. 
        You'll receive a confirmation email shortly.
      </p>
      
      <div className="flex gap-4">
        <Link href="/">
          <Button variant="outline" className="border-primary text-primary">Return Home</Button>
        </Link>
        <Link href="/menu">
          <Button className="btn-primary">Order More</Button>
        </Link>
      </div>
    </div>
  );
}
