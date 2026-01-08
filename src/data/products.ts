export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  stock: number;
  reviews: Review[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Handcrafted Ceramic Vase",
    price: 89.00,
    description: "Beautiful hand-thrown ceramic vase with a unique glaze finish. Each piece is one of a kind, crafted by skilled artisans using traditional techniques passed down through generations.",
    category: "Home Decor",
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800",
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800",
    ],
    stock: 12,
    reviews: [
      { id: "r1", author: "Sarah M.", rating: 5, comment: "Absolutely stunning! The craftsmanship is impeccable.", date: "2024-01-15" },
      { id: "r2", author: "James L.", rating: 4, comment: "Beautiful piece, arrived well packaged.", date: "2024-01-10" },
    ],
  },
  {
    id: "2",
    name: "Organic Linen Throw Blanket",
    price: 145.00,
    description: "Luxuriously soft organic linen blanket, perfect for cozy evenings. Made from 100% organic European flax, this blanket becomes softer with each wash.",
    category: "Textiles",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800",
    ],
    stock: 8,
    reviews: [
      { id: "r3", author: "Emma W.", rating: 5, comment: "So soft and cozy! Love the natural color.", date: "2024-01-20" },
    ],
  },
  {
    id: "3",
    name: "Artisan Wooden Cutting Board",
    price: 65.00,
    description: "Hand-carved walnut cutting board with a beautiful grain pattern. Each board is unique and treated with food-safe mineral oil for longevity.",
    category: "Kitchen",
    images: [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800",
      "https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?w=800",
    ],
    stock: 15,
    reviews: [
      { id: "r4", author: "Michael R.", rating: 5, comment: "Excellent quality wood, looks great in my kitchen!", date: "2024-01-18" },
      { id: "r5", author: "Lisa K.", rating: 5, comment: "The perfect gift. Beautifully made.", date: "2024-01-12" },
      { id: "r6", author: "David P.", rating: 4, comment: "Solid construction, very happy with purchase.", date: "2024-01-05" },
    ],
  },
  {
    id: "4",
    name: "Hand-Poured Soy Candle Set",
    price: 48.00,
    description: "Set of three hand-poured soy candles with essential oil blends. Featuring lavender, eucalyptus, and vanilla scents for a calming ambiance.",
    category: "Home Decor",
    images: [
      "https://images.unsplash.com/photo-1602607434776-24cfb9d35a32?w=800",
      "https://images.unsplash.com/photo-1603905235048-2f4e9deafc42?w=800",
    ],
    stock: 25,
    reviews: [
      { id: "r7", author: "Anna B.", rating: 5, comment: "These smell amazing! Long burning time too.", date: "2024-01-22" },
    ],
  },
  {
    id: "5",
    name: "Woven Rattan Basket Set",
    price: 72.00,
    description: "Set of three nesting baskets handwoven from sustainable rattan. Perfect for storage or as decorative accents in any room.",
    category: "Storage",
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800",
    ],
    stock: 6,
    reviews: [
      { id: "r8", author: "Jennifer T.", rating: 4, comment: "Beautiful baskets, very sturdy.", date: "2024-01-14" },
      { id: "r9", author: "Robert H.", rating: 5, comment: "Great quality for the price!", date: "2024-01-08" },
    ],
  },
  {
    id: "6",
    name: "Macramé Wall Hanging",
    price: 95.00,
    description: "Intricate handmade macramé wall art using natural cotton rope. A stunning statement piece that adds bohemian charm to any space.",
    category: "Wall Art",
    images: [
      "https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?w=800",
      "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=800",
    ],
    stock: 4,
    reviews: [
      { id: "r10", author: "Sophia G.", rating: 5, comment: "Absolutely gorgeous! Even better in person.", date: "2024-01-25" },
    ],
  },
];

export const categories = ["All", "Home Decor", "Textiles", "Kitchen", "Storage", "Wall Art"];
