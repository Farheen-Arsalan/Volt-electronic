import React, { useState, useEffect, useMemo } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryPills } from './components/CategoryPills';
import { DealsSection } from './components/DealsSection';
import { ShopSection } from './components/ShopSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { BrandMarquee } from './components/BrandMarquee';
import { FeaturedProductsSection } from './components/FeaturedProductsSection';
import { WhyShopWithUsStrip } from './components/WhyShopWithUsStrip';
import { DealsOfTheWeekBanner } from './components/DealsOfTheWeekBanner';
import { Footer } from './components/Footer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Toast } from './components/Toast';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ToastNotification } from './types';

export default function App() {
  // Navigation active section
  const [activeSection, setActiveSection] = useState<string>('home');
  
  // Search query
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Category selection
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal and Drawers State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Cart & Wishlist State (with default items for a rich initial front-end experience)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // iPhone 16 Pro Max
      quantity: 1,
      selectedColor: 'Desert Titanium',
    },
    {
      product: PRODUCTS[1], // Sony WH-1000XM5
      quantity: 1,
      selectedColor: 'Midnight Black',
    },
  ]);

  const [wishlistIds, setWishlistIds] = useState<Set<string>>(
    new Set(['prod-3', 'prod-4'])
  );

  // Checkout Data state
  const [checkoutData, setCheckoutData] = useState({
    subtotal: 0,
    discount: 0,
    shippingFee: 0,
    total: 0,
    promoCode: '',
    shippingType: 'standard' as 'standard' | 'express',
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = (toast: Omit<ToastNotification, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart counts
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Wishlist products
  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.has(p.id));
  }, [wishlistIds]);

  // Deal products for DealsSection
  const dealProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.isDeal);
  }, []);

  // Handlers
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Smooth scroll to target section
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(`${sectionId}-section`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleAddToCart = (product: Product, quantity = 1, color?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === (color || product.colors?.[0] || 'Default')
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedColor: color || product.colors?.[0] || 'Default',
          },
        ];
      }
    });

    addToast({
      type: 'cart',
      title: 'Added to Basket',
      message: `${quantity}x ${product.name} ready in your cart.`,
      product,
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        addToast({
          type: 'info',
          title: 'Removed from Saved',
          message: `${product.name} removed from your wishlist.`,
        });
      } else {
        next.add(product.id);
        addToast({
          type: 'wishlist',
          title: 'Saved to Wishlist',
          message: `${product.name} saved for later.`,
          product,
        });
      }
      return next;
    });
  };

  const handleProceedToCheckout = (data: typeof checkoutData) => {
    setCheckoutData(data);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderId: string) => {
    handleClearCart();
    addToast({
      type: 'success',
      title: 'Order Confirmed!',
      message: `Reference: ${orderId}. Preparing dispatch in Dubai.`,
    });
  };

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    const shopEl = document.getElementById('shop-section');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Top Navbar: Volt Electronics with Lightning Icon, Search, Cart Badge, Nav Links */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        products={PRODUCTS}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          featuredProducts={PRODUCTS}
          onSelectProduct={(product) => setQuickViewProduct(product)}
          onNavigate={handleNavigate}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onSelectCategory={handleCategorySelect}
        />

        {/* Brand Marquee */}
        <BrandMarquee />

        {/* Categories Section */}
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Featured Products Section (8 Cards: Smartphone, Laptop, Wireless Headphones, Smartwatch, Tablet, Bluetooth Speaker, Gaming Console, Power Bank) */}
        <FeaturedProductsSection
          onSelectProduct={(product) => setQuickViewProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onNavigate={handleNavigate}
        />

        {/* 1) Why shop with us strip with 5 icons and labels: Genuine products, 1 year warranty, Free UAE delivery, Easy 7-day returns, Cash on Delivery */}
        <WhyShopWithUsStrip />

        {/* 2) Colourful Deals of the week banner with button */}
        <DealsOfTheWeekBanner onNavigate={handleNavigate} />

        {/* Flash Deals Section */}
        <DealsSection
          dealProducts={dealProducts}
          onSelectProduct={(product) => setQuickViewProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onNavigate={handleNavigate}
        />

        {/* Shop / Catalog Section */}
        <ShopSection
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectProduct={(product) => setQuickViewProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          searchQuery={searchQuery}
        />

        {/* About ABC Electronics / Showroom Section */}
        <AboutSection />

        {/* Contact & Dubai Store Section */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Quick View Product Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(product) => handleAddToCart(product, 1)}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      {/* Simulated Front-end Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        cartData={checkoutData}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Floating Interactive Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />

    </div>
  );
}
