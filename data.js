// Store data for the mall
const storesData = [
  {
    id: 1,
    name: "Apple Store",
    logo: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=800",
    banner: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Electronics",
    description: "Official Apple retailer with the latest iPhones, MacBooks, and accessories.",
    rating: 4.8,
    location: "Ground Floor, North Wing",
    mapPosition: { x: 100, y: 100, width: 120, height: 80 },
    colorScheme: 1
  },
  {
    id: 2,
    name: "Nike",
    logo: "https://images.pexels.com/photos/4325/sport-brand-nike.jpg?auto=compress&cs=tinysrgb&w=800",
    banner: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Sports & Fitness",
    description: "Athletic footwear, apparel, and accessories for all your sporting needs.",
    rating: 4.6,
    location: "First Floor, East Wing",
    mapPosition: { x: 300, y: 150, width: 100, height: 90 },
    colorScheme: 2
  },
  {
    id: 3,
    name: "Zara",
    logo: "https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=800",
    banner: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Fashion",
    description: "Trendy clothing, accessories, and footwear for men and women.",
    rating: 4.5,
    location: "Second Floor, West Wing",
    mapPosition: { x: 200, y: 300, width: 130, height: 70 },
    colorScheme: 3
  },
  {
    id: 4,
    name: "Sephora",
    logo: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=800",
    banner: "https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Beauty & Cosmetics",
    description: "Premier beauty retailer offering makeup, skincare, and fragrances.",
    rating: 4.7,
    location: "First Floor, South Wing",
    mapPosition: { x: 400, y: 200, width: 90, height: 100 },
    colorScheme: 4
  },
  {
    id: 5,
    name: "H&M",
    logo: "https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=800",
    banner: "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Fashion",
    description: "Affordable fashion and quality clothing for the whole family.",
    rating: 4.3,
    location: "Ground Floor, East Wing",
    mapPosition: { x: 150, y: 250, width: 110, height: 85 },
    colorScheme: 5
  },
  {
    id: 6,
    name: "Starbucks",
    logo: "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=800",
    banner: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Food & Beverages",
    description: "Premium coffee, tea, and snacks in a cozy café atmosphere.",
    rating: 4.4,
    location: "Second Floor, North Wing",
    mapPosition: { x: 350, y: 100, width: 80, height: 80 },
    colorScheme: 6
  },
  {
    id: 7,
    name: "Samsung",
    logo: "https://images.pexels.com/photos/6770775/pexels-photo-6770775.jpeg?auto=compress&cs=tinysrgb&w=800",
    banner: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Electronics",
    description: "Latest smartphones, TVs, and home appliances from Samsung.",
    rating: 4.5,
    location: "Ground Floor, West Wing",
    mapPosition: { x: 250, y: 50, width: 120, height: 70 },
    colorScheme: 2
  },
  {
    id: 8,
    name: "UNIQLO",
    logo: "https://images.pexels.com/photos/4641825/pexels-photo-4641825.jpeg?auto=compress&cs=tinysrgb&w=800",
    banner: "https://images.pexels.com/photos/102129/pexels-photo-102129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Fashion",
    description: "Simple, high-quality casual wear at affordable prices.",
    rating: 4.4,
    location: "First Floor, North Wing",
    mapPosition: { x: 50, y: 350, width: 100, height: 90 },
    colorScheme: 1
  }
];

// Product data for the mall
const productsData = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    image: "https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 999.99,
    originalPrice: 1099.99,
    category: "Smartphones",
    store: storesData.find(store => store.name === "Apple Store"),
    description: "The latest iPhone with a stunning Super Retina XDR display, A15 Bionic chip, and pro camera system.",
    badge: "new",
    rating: 4.9,
    ratingCount: 256,
    inStock: true
  },
  {
    id: 2,
    name: "MacBook Air M1",
    image: "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 899.99,
    originalPrice: 999.99,
    category: "Laptops",
    store: storesData.find(store => store.name === "Apple Store"),
    description: "Ultra-thin and lightweight laptop with Apple's powerful M1 chip, providing incredible performance and battery life.",
    badge: "sale",
    rating: 4.8,
    ratingCount: 189,
    inStock: true
  },
  {
    id: 3,
    name: "Air Zoom Pegasus 38",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 120.00,
    originalPrice: null,
    category: "Footwear",
    store: storesData.find(store => store.name === "Nike"),
    description: "Responsive running shoes with Zoom Air cushioning for comfort during your daily miles.",
    badge: null,
    rating: 4.6,
    ratingCount: 145,
    inStock: true
  },
  {
    id: 4,
    name: "Dri-FIT Running Jacket",
    image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 79.99,
    originalPrice: 99.99,
    category: "Apparel",
    store: storesData.find(store => store.name === "Nike"),
    description: "Lightweight running jacket with moisture-wicking technology to keep you dry and comfortable.",
    badge: "sale",
    rating: 4.5,
    ratingCount: 87,
    inStock: true
  },
  {
    id: 5,
    name: "Women's Floral Dress",
    image: "https://images.pexels.com/photos/4380970/pexels-photo-4380970.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 49.99,
    originalPrice: null,
    category: "Women's Clothing",
    store: storesData.find(store => store.name === "Zara"),
    description: "Elegant floral print dress perfect for spring and summer occasions.",
    badge: "new",
    rating: 4.7,
    ratingCount: 112,
    inStock: true
  },
  {
    id: 6,
    name: "Men's Slim Fit Blazer",
    image: "https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 89.99,
    originalPrice: 110.00,
    category: "Men's Clothing",
    store: storesData.find(store => store.name === "Zara"),
    description: "Tailored slim fit blazer for a modern, sophisticated look.",
    badge: "sale",
    rating: 4.4,
    ratingCount: 78,
    inStock: true
  },
  {
    id: 7,
    name: "Fenty Beauty Foundation",
    image: "https://images.pexels.com/photos/2633986/pexels-photo-2633986.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 36.00,
    originalPrice: null,
    category: "Makeup",
    store: storesData.find(store => store.name === "Sephora"),
    description: "Soft matte, long-wear foundation with buildable, medium-to-full coverage.",
    badge: null,
    rating: 4.8,
    ratingCount: 324,
    inStock: true
  },
  {
    id: 8,
    name: "Dior J'adore Perfume",
    image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 135.00,
    originalPrice: null,
    category: "Fragrances",
    store: storesData.find(store => store.name === "Sephora"),
    description: "Floral fragrance with notes of ylang-ylang, Damascus rose, and jasmine.",
    badge: null,
    rating: 4.9,
    ratingCount: 267,
    inStock: true
  },
  {
    id: 9,
    name: "Striped T-Shirt",
    image: "https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 19.99,
    originalPrice: null,
    category: "Casual Wear",
    store: storesData.find(store => store.name === "H&M"),
    description: "Comfortable striped t-shirt made from 100% organic cotton.",
    badge: null,
    rating: 4.3,
    ratingCount: 123,
    inStock: true
  },
  {
    id: 10,
    name: "Denim Jacket",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 49.99,
    originalPrice: 59.99,
    category: "Outerwear",
    store: storesData.find(store => store.name === "H&M"),
    description: "Classic denim jacket with a vintage wash and comfortable fit.",
    badge: "sale",
    rating: 4.5,
    ratingCount: 98,
    inStock: true
  },
  {
    id: 11,
    name: "Caramel Macchiato",
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 4.99,
    originalPrice: null,
    category: "Beverages",
    store: storesData.find(store => store.name === "Starbucks"),
    description: "Espresso combined with vanilla-flavored syrup, milk, and caramel sauce.",
    badge: null,
    rating: 4.6,
    ratingCount: 456,
    inStock: true
  },
  {
    id: 12,
    name: "Chocolate Chip Cookie",
    image: "https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 2.49,
    originalPrice: null,
    category: "Bakery",
    store: storesData.find(store => store.name === "Starbucks"),
    description: "Freshly baked cookie with semi-sweet chocolate chips.",
    badge: null,
    rating: 4.5,
    ratingCount: 321,
    inStock: true
  },
  {
    id: 13,
    name: "Galaxy S22 Ultra",
    image: "https://images.pexels.com/photos/12324060/pexels-photo-12324060.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1199.99,
    originalPrice: 1299.99,
    category: "Smartphones",
    store: storesData.find(store => store.name === "Samsung"),
    description: "Flagship smartphone with a 6.8\" Dynamic AMOLED display and advanced camera system.",
    badge: "sale",
    rating: 4.7,
    ratingCount: 187,
    inStock: true
  },
  {
    id: 14,
    name: "65\" QLED 4K Smart TV",
    image: "https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 999.99,
    originalPrice: 1299.99,
    category: "TVs",
    store: storesData.find(store => store.name === "Samsung"),
    description: "Brilliant 4K resolution with Quantum Dot technology for lifelike colors.",
    badge: "sale",
    rating: 4.8,
    ratingCount: 145,
    inStock: true
  },
  {
    id: 15,
    name: "Ultra Light Down Jacket",
    image: "https://images.pexels.com/photos/7206287/pexels-photo-7206287.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 79.99,
    originalPrice: null,
    category: "Outerwear",
    store: storesData.find(store => store.name === "UNIQLO"),
    description: "Lightweight, warm down jacket that compacts into a pouch for easy carrying.",
    badge: null,
    rating: 4.6,
    ratingCount: 210,
    inStock: true
  },
  {
    id: 16,
    name: "AIRism Face Mask",
    image: "https://images.pexels.com/photos/3873193/pexels-photo-3873193.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 14.99,
    originalPrice: null,
    category: "Accessories",
    store: storesData.find(store => store.name === "UNIQLO"),
    description: "Breathable face mask with UV protection and cooling technology.",
    badge: "new",
    rating: 4.4,
    ratingCount: 178,
    inStock: true
  }
];

// Category data for the mall
const categoriesData = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Smartphones, laptops, and gadgets"
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Clothing, shoes, and accessories"
  },
  {
    id: 3,
    name: "Beauty",
    image: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Makeup, skincare, and fragrances"
  },
  {
    id: 4,
    name: "Sports",
    image: "https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Athletic wear and equipment"
  },
  {
    id: 5,
    name: "Food",
    image: "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Restaurants, cafes, and food court"
  },
  {
    id: 6,
    name: "Home",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Furniture, decor, and appliances"
  }
];

// Mall map data
const mallMapData = {
  corridors: [
    { x: 130, y: 50, width: 340, height: 20, orientation: "horizontal" },
    { x: 130, y: 350, width: 340, height: 20, orientation: "horizontal" },
    { x: 130, y: 50, width: 20, height: 320, orientation: "vertical" },
    { x: 450, y: 50, width: 20, height: 320, orientation: "vertical" },
    { x: 290, y: 70, width: 20, height: 280, orientation: "vertical" }
  ],
  entrances: [
    { x: 290, y: 40, label: "N" },
    { x: 290, y: 380, label: "S" },
    { x: 120, y: 210, label: "W" },
    { x: 460, y: 210, label: "E" }
  ]
};

// Export the data
const mallData = {
  stores: storesData,
  products: productsData,
  categories: categoriesData,
  mallMap: mallMapData
};