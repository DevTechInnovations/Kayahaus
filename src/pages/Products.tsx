import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductModal } from "@/components/products/ProductModal";
import { products, categories, Product } from "@/data/products";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <Layout>
      {/* Header */}
      <section className="hero-gradient py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4 animate-slide-up">
            Our Products
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto animate-fade-in">
            Browse our collection of handcrafted goods, each piece made with love and attention to detail.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-sm text-muted-foreground">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} onClick={setSelectedProduct} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
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

export default Products;
