import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Truck, Shield } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductModal } from "@/components/products/ProductModal";
import { useState } from "react";
import { Product } from "@/data/products";

const features = [
  {
    icon: Sparkles,
    title: "Handcrafted Quality",
    description: "Every piece is made with care by skilled artisans.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary shipping on orders over $100.",
  },
  {
    icon: Shield,
    title: "Secure Checkout",
    description: "Your payment information is always protected.",
  },
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const featuredProducts = products.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
              Discover Handcrafted
              <span className="text-primary"> Treasures</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Curated collection of artisan-made products crafted with passion, 
              tradition, and sustainable materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="button-shadow gap-2">
                  Shop Collection
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover our most loved handcrafted pieces, each one telling its own unique story.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} onClick={setSelectedProduct} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="outline" size="lg" className="gap-2">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-foreground text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Need Something Custom?
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
            We offer bespoke services for special orders. Let us create something unique just for you.
          </p>
          <Link to="/services">
            <Button size="lg" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
              Explore Services
            </Button>
          </Link>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </Layout>
  );
};

export default Index;
