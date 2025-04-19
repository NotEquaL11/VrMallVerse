// Products handling functionality

// Render product card
function renderProductCard(product) {
  const badgeHTML = product.badge ? 
    `<div class="product-badge ${product.badge}">${product.badge}</div>` : '';
  
  const originalPriceHTML = product.originalPrice ? 
    `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : '';
  
  const priceClass = product.originalPrice ? 'sale-price' : '';
  
  const productCard = createElement('div', { class: 'product-card', 'data-product-id': product.id });
  
  productCard.innerHTML = `
    ${badgeHTML}
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-quick-actions">
        <button class="quick-action-btn quick-view-btn" data-product-id="${product.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
    </div>
    <div class="product-content">
      <div class="product-category">${product.category}</div>
      <h3 class="product-title">${truncateText(product.name, 50)}</h3>
      <div class="product-store">${product.store.name}</div>
      <div class="product-rating">
        <div class="stars">${generateStarRating(product.rating)}</div>
        <span class="rating-count">(${product.ratingCount})</span>
      </div>
      <div class="product-footer">
        <div class="product-price">
          ${originalPriceHTML}
          <span class="${priceClass}">${formatPrice(product.price)}</span>
        </div>
        <button class="add-to-cart" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </button>
      </div>
    </div>
  `;
  
  return productCard;
}

// Load featured products
function loadFeaturedProducts() {
  const featuredProductsContainer = document.getElementById('featured-products-container');
  if (!featuredProductsContainer) return;
  
  featuredProductsContainer.innerHTML = '';
  
  // Get 8 random products
  const shuffled = [...mallData.products].sort(() => 0.5 - Math.random());
  const featuredProducts = shuffled.slice(0, 8);
  
  featuredProducts.forEach(product => {
    const productCard = renderProductCard(product);
    featuredProductsContainer.appendChild(productCard);
  });
}

// Load deal products
function loadDealProducts() {
  const dealsProductsContainer = document.getElementById('deals-products-container');
  if (!dealsProductsContainer) return;
  
  dealsProductsContainer.innerHTML = '';
  
  // Get products with sale badge or original price
  const dealProducts = mallData.products.filter(product => 
    product.badge === 'sale' || product.originalPrice !== null
  ).slice(0, 4);
  
  dealProducts.forEach(product => {
    const productCard = renderProductCard(product);
    dealsProductsContainer.appendChild(productCard);
  });
}

// Open quick view modal
function openQuickView(productId) {
  const product = mallData.products.find(p => p.id === parseInt(productId));
  if (!product) return;
  
  const modalContent = document.getElementById('quick-view-content');
  
  const originalPriceHTML = product.originalPrice ? 
    `<span class="quick-view-original-price">${formatPrice(product.originalPrice)}</span>` : '';
  
  const priceClass = product.originalPrice ? 'sale-price' : '';
  
  const badgeHTML = product.badge ? 
    `<div class="product-badge ${product.badge}" style="position: absolute; top: 10px; left: 10px;">${product.badge}</div>` : '';
  
  modalContent.innerHTML = `
    <div class="quick-view-image">
      ${badgeHTML}
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="quick-view-details">
      <div class="quick-view-category">${product.category}</div>
      <h3>${product.name}</h3>
      <div class="product-rating">
        <div class="stars">${generateStarRating(product.rating)}</div>
        <span class="rating-count">(${product.ratingCount})</span>
      </div>
      <div class="quick-view-price">
        ${originalPriceHTML}
        <span class="${priceClass}">${formatPrice(product.price)}</span>
      </div>
      <p class="quick-view-description">${product.description}</p>
      <div class="quick-view-meta">
        <div class="meta-item">
          <span class="meta-label">Store:</span>
          <span class="meta-value">${product.store.name}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Category:</span>
          <span class="meta-value">${product.category}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Availability:</span>
          <span class="meta-value">${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
        </div>
      </div>
      <div class="quick-view-actions">
        <div class="quantity-selector">
          <button class="qty-btn qty-minus">-</button>
          <input type="number" class="qty-input" value="1" min="1" max="10">
          <button class="qty-btn qty-plus">+</button>
        </div>
        <button class="add-to-cart-btn" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Add to Cart
        </button>
      </div>
      <div class="quick-view-store">
        <div class="store-info-logo" style="background-image: url('${product.store.logo}')"></div>
        <div class="store-info-details">
          <h4>${product.store.name}</h4>
          <p>${product.store.location}</p>
        </div>
      </div>
    </div>
  `;
  
  // Set up quantity selectors
  const qtyInput = modalContent.querySelector('.qty-input');
  const qtyMinus = modalContent.querySelector('.qty-minus');
  const qtyPlus = modalContent.querySelector('.qty-plus');
  
  qtyMinus.addEventListener('click', () => {
    if (parseInt(qtyInput.value) > 1) {
      qtyInput.value = parseInt(qtyInput.value) - 1;
    }
  });
  
  qtyPlus.addEventListener('click', () => {
    if (parseInt(qtyInput.value) < 10) {
      qtyInput.value = parseInt(qtyInput.value) + 1;
    }
  });
  
  // Add to cart from modal
  const addToCartBtn = modalContent.querySelector('.add-to-cart-btn');
  addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(qtyInput.value);
    addToCart(product, quantity);
    hideModal('quick-view-modal');
  });
  
  showModal('quick-view-modal');
}

// Load products by store
function loadProductsByStore(storeId) {
  const storeProducts = mallData.products.filter(product => product.store.id === parseInt(storeId));
  
  const productsContainer = document.querySelector('.products-grid');
  productsContainer.innerHTML = '';
  
  if (storeProducts.length === 0) {
    productsContainer.innerHTML = '<p class="text-center">No products found for this store.</p>';
    return;
  }
  
  storeProducts.forEach(product => {
    const productCard = renderProductCard(product);
    productsContainer.appendChild(productCard);
  });
}

// Load products by category
function loadProductsByCategory(categoryId) {
  const category = mallData.categories.find(cat => cat.id === parseInt(categoryId));
  if (!category) return;
  
  const categoryProducts = mallData.products.filter(product => 
    product.category.toLowerCase() === category.name.toLowerCase()
  );
  
  const productsContainer = document.querySelector('.products-grid');
  productsContainer.innerHTML = '';
  
  if (categoryProducts.length === 0) {
    productsContainer.innerHTML = '<p class="text-center">No products found in this category.</p>';
    return;
  }
  
  categoryProducts.forEach(product => {
    const productCard = renderProductCard(product);
    productsContainer.appendChild(productCard);
  });
}

// Load categories
function loadCategories() {
  const categoriesContainer = document.getElementById('categories-container');
  if (!categoriesContainer) return;
  
  categoriesContainer.innerHTML = '';
  
  mallData.categories.forEach(category => {
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';
    categoryCard.setAttribute('data-category-id', category.id);
    
    categoryCard.innerHTML = `
      <div class="category-image" style="background-image: url('${category.image}')"></div>
      <div class="category-content">
        <h3>${category.name}</h3>
        <p>${category.description}</p>
      </div>
    `;
    
    categoryCard.addEventListener('click', () => {
      loadProductsByCategory(category.id);
    });
    
    categoriesContainer.appendChild(categoryCard);
  });
}

// Search products
function searchProducts(searchTerm) {
  const filteredProducts = filterProducts(mallData.products, searchTerm);
  
  const productsContainer = document.createElement('div');
  productsContainer.className = 'products-grid';
  
  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = '<p class="text-center">No products found matching your search.</p>';
    return productsContainer;
  }
  
  filteredProducts.forEach(product => {
    const productCard = renderProductCard(product);
    productsContainer.appendChild(productCard);
  });
  
  return productsContainer;
}

// Initialize product event listeners
function initProductEvents() {
  // Quick view buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.quick-view-btn')) {
      const productId = e.target.closest('.quick-view-btn').getAttribute('data-product-id');
      openQuickView(productId);
    }
  });
  
  // Add to cart buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart')) {
      const productId = e.target.closest('.add-to-cart').getAttribute('data-product-id');
      const product = mallData.products.find(p => p.id === parseInt(productId));
      if (product) {
        addToCart(product);
      }
    }
  });
  
  // Close modal
  document.querySelector('.close-modal').addEventListener('click', () => {
    hideModal('quick-view-modal');
  });
  
  // Close modal when clicking outside
  document.getElementById('quick-view-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('quick-view-modal')) {
      hideModal('quick-view-modal');
    }
  });
  
  // Search functionality
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  
  const performSearch = () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm.length > 0) {
      const searchResults = searchProducts(searchTerm);
      
      // Clear main content and show search results
      const mainContent = document.querySelector('main');
      const shoppingView = document.getElementById('shopping-view');
      
      // Keep only the shopping view div
      mainContent.innerHTML = '';
      mainContent.appendChild(shoppingView);
      
      // Clear shopping view and add search results
      shoppingView.innerHTML = `
        <section class="search-results">
          <div class="container">
            <h2 class="section-title">Search Results for "${searchTerm}"</h2>
            <div id="search-results-container"></div>
          </div>
        </section>
      `;
      
      document.getElementById('search-results-container').appendChild(searchResults);
    }
  };
  
  searchBtn.addEventListener('click', performSearch);
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}