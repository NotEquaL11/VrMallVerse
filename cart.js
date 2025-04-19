// Shopping cart functionality

// Cart state
let cart = {
  items: [],
  totalPrice: 0
};

// Add product to cart
function addToCart(product, quantity = 1) {
  // Check if product is already in cart
  const existingItem = cart.items.find(item => item.product.id === product.id);
  
  if (existingItem) {
    // Update quantity
    existingItem.quantity += quantity;
  } else {
    // Add new item
    cart.items.push({
      product,
      quantity
    });
  }
  
  // Update total price
  updateCartTotal();
  
  // Update cart UI
  updateCartUI();
  
  // Show toast notification
  showToast(`${product.name} added to cart`, 'success');
  
  // Open cart sidebar
  openCart();
}

// Remove product from cart
function removeFromCart(productId) {
  const index = cart.items.findIndex(item => item.product.id === productId);
  
  if (index !== -1) {
    const removedItem = cart.items[index];
    cart.items.splice(index, 1);
    
    // Update total price
    updateCartTotal();
    
    // Update cart UI
    updateCartUI();
    
    // Show toast notification
    showToast(`${removedItem.product.name} removed from cart`, 'info');
  }
}

// Update quantity of product in cart
function updateCartItemQuantity(productId, quantity) {
  const item = cart.items.find(item => item.product.id === productId);
  
  if (item) {
    item.quantity = quantity;
    
    // Update total price
    updateCartTotal();
    
    // Update cart UI
    updateCartUI();
  }
}

// Calculate total price of cart
function updateCartTotal() {
  cart.totalPrice = cart.items.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
}

// Update cart UI
function updateCartUI() {
  // Update cart count
  const cartCount = document.getElementById('cart-count');
  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
  
  // Update cart items
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';
  
  if (cart.items.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        <p>Your cart is empty</p>
        <button class="cta-button" id="continue-shopping">Continue Shopping</button>
      </div>
    `;
    
    // Continue shopping button
    document.getElementById('continue-shopping').addEventListener('click', () => {
      closeCart();
    });
  } else {
    cart.items.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.product.image}" alt="${item.product.name}">
        </div>
        <div class="cart-item-content">
          <div class="cart-item-title">${item.product.name}</div>
          <div class="cart-item-store">${item.product.store.name}</div>
          <div class="cart-item-price">${formatPrice(item.product.price)}</div>
          <div class="cart-item-actions">
            <div class="cart-quantity">
              <button class="cart-qty-minus" data-product-id="${item.product.id}">-</button>
              <span>${item.quantity}</span>
              <button class="cart-qty-plus" data-product-id="${item.product.id}">+</button>
            </div>
            <button class="remove-item" data-product-id="${item.product.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            </button>
          </div>
        </div>
      `;
      
      cartItemsContainer.appendChild(cartItem);
    });
  }
  
  // Update cart total
  const cartTotalAmount = document.getElementById('cart-total-amount');
  cartTotalAmount.textContent = formatPrice(cart.totalPrice);
  
  // Update checkout button state
  const checkoutBtn = document.getElementById('checkout-btn');
  checkoutBtn.disabled = cart.items.length === 0;
}

// Open cart sidebar
function openCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  cartSidebar.classList.add('show');
  
  // Add overlay
  let cartOverlay = document.querySelector('.cart-overlay');
  if (!cartOverlay) {
    cartOverlay = document.createElement('div');
    cartOverlay.className = 'cart-overlay';
    document.body.appendChild(cartOverlay);
    
    // Close cart when clicking overlay
    cartOverlay.addEventListener('click', closeCart);
  }
  
  // Show overlay
  setTimeout(() => {
    cartOverlay.classList.add('show');
  }, 10);
}

// Close cart sidebar
function closeCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  cartSidebar.classList.remove('show');
  
  // Hide overlay
  const cartOverlay = document.querySelector('.cart-overlay');
  if (cartOverlay) {
    cartOverlay.classList.remove('show');
    
    // Remove overlay after transition
    setTimeout(() => {
      cartOverlay.remove();
    }, 300);
  }
}

// Initialize cart
function initCart() {
  // Cart icon click
  document.getElementById('cart-icon').addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
  });
  
  // Close cart button
  document.getElementById('close-cart').addEventListener('click', closeCart);
  
  // Checkout button
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.items.length > 0) {
      // Show checkout confirmation
      closeCart();
      showToast('Checkout functionality coming soon!', 'info');
    }
  });
  
  // Cart item quantity buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.cart-qty-minus')) {
      const productId = parseInt(e.target.getAttribute('data-product-id'));
      const item = cart.items.find(item => item.product.id === productId);
      
      if (item && item.quantity > 1) {
        updateCartItemQuantity(productId, item.quantity - 1);
      }
    }
    
    if (e.target.closest('.cart-qty-plus')) {
      const productId = parseInt(e.target.getAttribute('data-product-id'));
      const item = cart.items.find(item => item.product.id === productId);
      
      if (item && item.quantity < 10) {
        updateCartItemQuantity(productId, item.quantity + 1);
      }
    }
  });
  
  // Remove item button
  document.addEventListener('click', (e) => {
    if (e.target.closest('.remove-item')) {
      const productId = parseInt(e.target.closest('.remove-item').getAttribute('data-product-id'));
      removeFromCart(productId);
    }
  });
  
  // Initialize cart UI
  updateCartUI();
}