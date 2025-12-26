import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-15" />
        
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm tracking-wide">
              Est. 2024 • Gourmet Bakery
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-[1.1]">
              Crafted with <span className="text-primary italic">Love</span>,<br/>Served with Joy
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Experience the finest artisanal cakes, pastries, and savory delights. 
              Made fresh daily with premium ingredients and a touch of magic.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/menu">
                <Button className="btn-primary h-14 text-lg">
                  View Full Menu
                </Button>
              </Link>
              <Link href="/custom-cakes">
                <Button variant="outline" className="btn-outline h-14 text-lg border-2">
                  Custom Cake Builder
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Beautiful bakery imagery composition */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl rotate-3 transform transition-transform hover:rotate-0 duration-500">
              <img 
                src="https://pixabay.com/get/g17162695da76ca573493e45680272de94ac1b478798b49f93734c33830212d9706041181dbadd591907d7dc261cf8a90f0e9d2d70ffd4e7a8b5d421adbac7f1c_1280.jpg" 
                alt="Delicious Cake" 
                className="w-full h-[600px] object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 z-20 bg-background/90 backdrop-blur p-6 rounded-2xl shadow-xl max-w-xs border border-primary/10">
              <div className="flex gap-1 text-yellow-400 mb-2">
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} />
              </div>
              <p className="text-sm font-medium italic">"The most exquisite red velvet cake I've ever tasted. Absolutely divine!"</p>
              <p className="text-xs text-muted-foreground mt-2 font-bold">— Sarah J.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seasonal Specials Section */}
      <section className="py-24" style={{ background: "linear-gradient(to bottom, #6B3232, #5A2828)" }}>
        <div className="container-wide">
          {(() => {
            const month = new Date().getMonth();
            const seasonalData: Record<number, { greeting: string; subtitle: string; items: Array<{ name: string; desc: string; img: string }> }> = {
              0: { // January
                greeting: "Happy New Year! Start with Sweetness",
                subtitle: "Ring in the new year with our delectable New Year specials",
                items: [
                  { name: "New Year Chocolate Truffle Cake", desc: "Rich chocolate with gold leaf accents", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Sparkling Champagne Cake", desc: "Elegant and celebratory", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Lucky Citrus Pound Cake", desc: "Fresh and zesty flavors", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" }
                ]
              },
              1: { // February
                greeting: "Love is in the Air",
                subtitle: "Celebrate love with our romantic Valentine's Day collection",
                items: [
                  { name: "Red Velvet Romance Cake", desc: "Classic beauty for your beloved", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Strawberry Lover's Delight", desc: "Fresh berries with cream", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Chocolate Love Brownies", desc: "Decadent and divine", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" }
                ]
              },
              2: { // March
                greeting: "Spring Awakening",
                subtitle: "Welcome spring with our fresh and floral creations",
                items: [
                  { name: "Pistachio Spring Cake", desc: "Delicate and nutty flavor", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Lemon Blossoms", desc: "Bright and refreshing", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Carrot Cake with Cream Cheese", desc: "Spring essential", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" }
                ]
              },
              3: { // April
                greeting: "Easter Celebrations",
                subtitle: "Hop into spring with our festive Easter treats",
                items: [
                  { name: "Easter Bunny Cake", desc: "Playful and delightful", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Pastel Egg Cupcakes", desc: "Colorful and fun", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Lavender Honey Cake", desc: "Subtle and sophisticated", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" }
                ]
              },
              4: { // May
                greeting: "Summer is Coming",
                subtitle: "Prepare for summer with our refreshing collection",
                items: [
                  { name: "Mango Paradise Cake", desc: "Tropical and juicy", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Coconut Bliss", desc: "Island vibes in every bite", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Pineapple Upside Down Cake", desc: "Classic summer favorite", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" }
                ]
              },
              5: { // June
                greeting: "Monsoon Comfort",
                subtitle: "Stay cozy with our warm and comforting monsoon specials",
                items: [
                  { name: "Chocolate Comfort Cake", desc: "Warm and soothing", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Rainy Day Pastries", desc: "Perfect with tea or coffee", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Walnut Spice Cake", desc: "Warm spices for monsoon", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" }
                ]
              },
              6: { // July
                greeting: "Mid-Year Celebration",
                subtitle: "Celebrate the year's milestone with our special treats",
                items: [
                  { name: "Rainbow Layer Cake", desc: "Vibrant and joyful", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Raspberry Cheesecake", desc: "Tangy and rich", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Blackberry Delight", desc: "Summer berries at their best", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" }
                ]
              },
              7: { // August
                greeting: "August Indulgence",
                subtitle: "Treat yourself to our decadent August specialties",
                items: [
                  { name: "Peach Melba Cake", desc: "Soft and elegant", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Blueberry Bliss", desc: "Antioxidant-rich and delicious", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Hazelnut Dream", desc: "Nutty and luxurious", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" }
                ]
              },
              8: { // September
                greeting: "Back to Happiness",
                subtitle: "Celebrate new beginnings with our September specials",
                items: [
                  { name: "Apple Cinnamon Cake", desc: "Warm and comforting", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Honey Walnut Delight", desc: "Nature's sweetness", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Pear Ginger Cake", desc: "Sophisticated flavors", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" }
                ]
              },
              9: { // October
                greeting: "Autumn Delights",
                subtitle: "Celebrate the season with our warm autumn creations",
                items: [
                  { name: "Spiced Pumpkin Cake", desc: "Season's signature flavor", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Caramel Apple Tart", desc: "Golden and delicious", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Cinnamon Roll Cake", desc: "All autumn flavors", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" }
                ]
              },
              10: { // November
                greeting: "Festive Season Begins",
                subtitle: "Thanksgiving and Diwali specials to celebrate together",
                items: [
                  { name: "Diwali Gold Cake", desc: "Festive and glamorous", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Spiced Gratitude Cake", desc: "Thanksgiving favorite", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Kheer Flavored Delight", desc: "Traditional meets modern", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" }
                ]
              },
              11: { // December
                greeting: "Christmas & Year-End Magic",
                subtitle: "Celebrate with our signature festive collection",
                items: [
                  { name: "Traditional Plum Cake", desc: "Rich, moist, and festive", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "Christmas Gingerbread", desc: "Spiced holiday classic", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
                  { name: "White Christmas Cake", desc: "Elegant and pristine", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" }
                ]
              }
            };

            const current = seasonalData[month];
            return (
              <div className="space-y-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center max-w-2xl mx-auto"
                >
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                    {current.greeting}
                  </h2>
                  <p className="text-lg text-gray-200">
                    {current.subtitle}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {current.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer"
                    >
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                        <p className="text-sm text-white/90">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <Link href="/menu">
                    <Button className="bg-white text-slate-900 hover:bg-gray-100 h-12 text-lg px-8 font-semibold">
                      View All Seasonal Items
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">Our Specialties</h2>
            <p className="text-muted-foreground">Discover our carefully curated selection of gourmet treats, perfect for any occasion.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Signature Cakes", 
                desc: "Elegant designs, unforgettable flavors.",
                img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600",
                link: "/menu?category=Cakes"
              },
              { 
                title: "Fresh Pastries", 
                desc: "Flaky, buttery, and baked to perfection.",
                img: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600",
                link: "/menu?category=Pastries"
              },
              { 
                title: "Savory Delights", 
                desc: "Gourmet pizzas, pastas, and more.",
                img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600",
                link: "/menu?category=Savory"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-96 overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              >
                <Link href={item.link}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                    <h3 className="text-2xl font-serif font-bold mb-2">{item.title}</h3>
                    <p className="text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-2 font-medium text-sm">
                      Explore <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-24 bg-gradient-to-b from-white to-secondary/20">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground">
              Join thousands of satisfied customers who have experienced our gourmet creations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Sarah Johnson",
                review: "The most exquisite red velvet cake I've ever tasted. Absolutely divine!",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                review: "Their custom cake design was perfect for our wedding. Highly recommended!",
                rating: 5
              },
              {
                name: "Priya Sharma",
                review: "Fresh pastries every morning, amazing coffee, and the sweetest staff. Love this place!",
                rating: 5
              }
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-primary/10 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 mb-4 text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} fill="currentColor" size={16} />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4 leading-relaxed">
                  "{review.review}"
                </p>
                <p className="font-semibold text-foreground">— {review.name}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://www.google.com/search?q=Suss+Sis+Gourmet+Bakery+Bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              data-testid="link-google-reviews"
            >
              View All Reviews on Google
            </a>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 bg-secondary/30">
        <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
             <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" className="rounded-2xl mt-8 shadow-lg" alt="Decadent chocolate cake"/>
                <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" className="rounded-2xl mb-8 shadow-lg" alt="Artisan cake decoration"/>
             </div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-4xl font-serif font-bold text-foreground">A Legacy of Sweetness</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Suss Sis, we believe that every bite should be a celebration. Started by a family of passionate bakers, 
              we've dedicated ourselves to the art of fine pastry. We use only locally sourced, organic ingredients 
              to ensure quality you can taste.
            </p>
            <ul className="space-y-3">
              {['Daily Fresh Baking', 'Organic Ingredients', 'Master Pastry Chefs'].map(item => (
                <li key={item} className="flex items-center gap-3 font-medium text-primary">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/about">
              <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-primary hover:text-white">
                Read Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
