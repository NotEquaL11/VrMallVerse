// Stores handling functionality

// Render store card
function renderStoreCard(store) {
  const storeCard = createElement('div', { class: 'store-card', 'data-store-id': store.id });
  
  storeCard.innerHTML = `
    <div class="store-banner" style="background-image: url('${store.banner}')">
      <div class="store-logo" style="background-image: url('${store.logo}')"></div>
    </div>
    <div class="store-content">
      <h3>${store.name}</h3>
      <div class="store-meta">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          ${store.category}
        </span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          ${store.rating}
        </span>
      </div>
      <p>${truncateText(store.description, 80)}</p>
      <a href="#" class="store-cta" data-store-id="${store.id}">Shop Now</a>
    </div>
  `;
  
  return storeCard;
}

// Load stores
function loadStores() {
  const storesContainer = document.getElementById('stores-container');
  if (!storesContainer) return;
  
  storesContainer.innerHTML = '';
  
  // Get 4 random stores
  const shuffled = [...mallData.stores].sort(() => 0.5 - Math.random());
  const featuredStores = shuffled.slice(0, 4);
  
  featuredStores.forEach(store => {
    const storeCard = renderStoreCard(store);
    storesContainer.appendChild(storeCard);
  });
}

// Render store directory item for map view
function renderStoreDirectoryItem(store) {
  const storeItem = createElement('div', { 
    class: 'map-store-item', 
    'data-store-id': store.id,
    'data-store-position': JSON.stringify(store.mapPosition)
  });
  
  storeItem.innerHTML = `
    <div class="map-store-logo" style="background-image: url('${store.logo}')"></div>
    <div class="map-store-info">
      <h4>${store.name}</h4>
      <p>${store.location}</p>
    </div>
  `;
  
  return storeItem;
}

// Load store directory for map view
function loadStoreDirectory() {
  const storeListContainer = document.getElementById('map-store-list');
  if (!storeListContainer) return;
  
  storeListContainer.innerHTML = '';
  
  mallData.stores.forEach(store => {
    const storeItem = renderStoreDirectoryItem(store);
    storeListContainer.appendChild(storeItem);
  });
}

// Show store details in map popup
function showStorePopup(store, position) {
  // Remove any existing popups
  const existingPopup = document.querySelector('.map-popup');
  if (existingPopup) existingPopup.remove();
  
  const popup = createElement('div', { class: 'map-popup' });
  
  popup.innerHTML = `
    <div class="popup-header">
      <div class="popup-store-logo" style="background-image: url('${store.logo}')"></div>
      <div>
        <div class="popup-store-name">${store.name}</div>
        <div class="popup-store-category">${store.category}</div>
      </div>
    </div>
    <div class="popup-content">
      <p>${truncateText(store.description, 100)}</p>
    </div>
    <div class="popup-actions">
      <button class="popup-action-btn popup-view-btn" data-store-id="${store.id}">View Store</button>
      <button class="popup-action-btn popup-close-btn">Close</button>
    </div>
  `;
  
  // Position the popup
  popup.style.left = `${position.x}px`;
  popup.style.top = `${position.y}px`;
  
  document.querySelector('.mall-map').appendChild(popup);
  
  // Show the popup with a slight delay for animation
  setTimeout(() => {
    popup.classList.add('show');
  }, 10);
  
  // Event listeners
  popup.querySelector('.popup-view-btn').addEventListener('click', () => {
    // Switch to shopping view and show store products
    document.getElementById('view-toggle-input').checked = false;
    toggleMapView();
    loadProductsByStore(store.id);
  });
  
  popup.querySelector('.popup-close-btn').addEventListener('click', () => {
    popup.classList.remove('show');
    setTimeout(() => {
      popup.remove();
    }, 300);
  });
}

// Show store page
function showStorePage(storeId) {
  const store = mallData.stores.find(s => s.id === parseInt(storeId));
  if (!store) return;
  
  // Clear main content and create store page
  const mainContent = document.querySelector('main');
  const shoppingView = document.getElementById('shopping-view');
  
  // Keep only the shopping view div
  mainContent.innerHTML = '';
  mainContent.appendChild(shoppingView);
  
  // Clear shopping view and add store page
  shoppingView.innerHTML = `
    <section class="store-hero" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${store.banner}')">
      <div class="container">
        <div class="store-hero-content">
          <div class="store-hero-logo" style="background-image: url('${store.logo}')"></div>
          <h2>${store.name}</h2>
          <div class="store-hero-meta">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              ${store.category}
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${store.rating}
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              ${store.location}
            </span>
          </div>
          <p class="store-hero-description">${store.description}</p>
        </div>
      </div>
    </section>
    <section class="store-products">
      <div class="container">
        <h2 class="section-title">Products from ${store.name}</h2>
        <div class="products-grid" id="store-products-container"></div>
      </div>
    </section>
  `;
  
  // Add some custom CSS for the store page
  const style = document.createElement('style');
  style.textContent = `
    .store-hero {
      padding: var(--spacing-10) 0;
      color: white;
      background-size: cover;
      background-position: center;
      text-align: center;
    }
    
    .store-hero-content {
      max-width: 700px;
      margin: 0 auto;
    }
    
    .store-hero-logo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: white;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      margin: 0 auto var(--spacing-4);
      border: 4px solid white;
      box-shadow: var(--shadow-md);
    }
    
    .store-hero h2 {
      font-size: 2.5rem;
      margin-bottom: var(--spacing-3);
      color: white;
    }
    
    .store-hero-meta {
      display: flex;
      justify-content: center;
      gap: var(--spacing-6);
      margin-bottom: var(--spacing-4);
    }
    
    .store-hero-meta span {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }
    
    .store-hero-description {
      font-size: 1.1rem;
      margin-bottom: 0;
    }
    
    .store-products {
      padding: var(--spacing-10) 0;
    }
  `;
  
  document.head.appendChild(style);
  
  // Load store products
  loadProductsByStore(storeId);
}

// Initialize store event listeners
function initStoreEvents() {
  // Store CTA buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.store-cta')) {
      e.preventDefault();
      const storeId = e.target.closest('.store-cta').getAttribute('data-store-id');
      showStorePage(storeId);
    }
  });
  
  // Store cards
  document.addEventListener('click', (e) => {
    if (e.target.closest('.store-card') && !e.target.closest('.store-cta')) {
      const storeId = e.target.closest('.store-card').getAttribute('data-store-id');
      showStorePage(storeId);
    }
  });
  
  // Stores link in nav
  document.getElementById('stores-link').addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create stores page
    const mainContent = document.querySelector('main');
    const shoppingView = document.getElementById('shopping-view');
    
    // Keep only the shopping view div
    mainContent.innerHTML = '';
    mainContent.appendChild(shoppingView);
    
    // Clear shopping view and add stores page
    shoppingView.innerHTML = `
      <section class="all-stores">
        <div class="container">
          <h2 class="section-title">All Stores</h2>
          <div class="stores-grid" id="all-stores-container"></div>
        </div>
      </section>
    `;
    
    // Load all stores
    const allStoresContainer = document.getElementById('all-stores-container');
    mallData.stores.forEach(store => {
      const storeCard = renderStoreCard(store);
      allStoresContainer.appendChild(storeCard);
    });
  });
}