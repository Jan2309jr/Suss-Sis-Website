import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop",
    alt: "Delicious Chocolate Cake",
    category: "Cakes"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&h=600&fit=crop",
    alt: "Premium Wedding Cake",
    category: "Cakes"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?w=800&h=600&fit=crop",
    alt: "Classic White Forest",
    category: "Cakes"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1519915212666-fea6f6d692cc?w=800&h=600&fit=crop",
    alt: "Artisan Pastries",
    category: "Pastries"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop",
    alt: "Fresh Bread Selection",
    category: "Breads"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1585763970359-9b5cce830574?w=800&h=600&fit=crop",
    alt: "Gourmet Bakery Interior",
    category: "Cafe"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    alt: "Cupcake Creations",
    category: "Pastries"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
    alt: "Cafe Ambiance",
    category: "Cafe"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&h=600&fit=crop",
    alt: "Chocolate Delights",
    category: "Cakes"
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary">
              Our Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of delicious creations and beautiful moments from Suss Sis Gourmet Bakery & Cafe
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setSelectedImage(image)}
                className="group cursor-pointer rounded-lg overflow-hidden bg-card shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium">{image.alt}</p>
                    <p className="text-white/80 text-xs">{image.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          data-testid="lightbox-modal"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
              aria-label="Close lightbox"
              data-testid="button-close-lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-foreground">{selectedImage.alt}</h3>
              <p className="text-sm text-muted-foreground">{selectedImage.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
