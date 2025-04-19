/**
 * Utility functions for the VRMall Verse application
 */

// Format price to local currency
function formatPrice(price) {
  return '₹' + price.toFixed(2);
}

// Generate stars for product ratings
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let starsHTML = '';
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  }
  
  // Half star
  if (halfStar) {
    starsHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2L8.91 8.26 2 9.27 7 14.14 5.82 21.02 12 17.77z"/><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77z" opacity="0.3"/></svg>';
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  }
  
  return starsHTML;
}

// Truncate text to a specified length
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Create HTML element with attributes and content
function createElement(tag, attributes = {}, content = '') {
  const element = document.createElement(tag);
  
  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'class') {
      value.split(' ').forEach(cls => {
        if (cls) element.classList.add(cls);
      });
    } else {
      element.setAttribute(key, value);
    }
  }
  
  if (content) {
    if (typeof content === 'string') {
      element.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      element.appendChild(content);
    }
  }
  
  return element;
}

// Create loading spinner
function createLoadingSpinner() {
  const loadingContainer = createElement('div', { class: 'loading-container' });
  const spinner = createElement('div', { class: 'loading' });
  loadingContainer.appendChild(spinner);
  return loadingContainer;
}

// Debounce function for search input
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Filter products by search term
function filterProducts(products, searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.category.toLowerCase().includes(searchTerm) ||
    product.store.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
}

// Filter stores by search term
function filterStores(stores, searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  return stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm) || 
    store.category.toLowerCase().includes(searchTerm) ||
    store.description.toLowerCase().includes(searchTerm)
  );
}

// Show modal
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Hide modal
function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

// Show toast notification
function showToast(message, type = 'success', duration = 3000) {
  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = createElement('div', { class: 'toast-container' });
    document.body.appendChild(toastContainer);
    
    // Add styles for toast container
    const style = document.createElement('style');
    style.textContent = `
      .toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
      }
      .toast {
        padding: 12px 16px;
        border-radius: 4px;
        margin-bottom: 8px;
        min-width: 250px;
        max-width: 350px;
        color: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation: slideIn 0.3s, fadeOut 0.5s ${duration / 1000 - 0.5}s forwards;
      }
      .toast-success {
        background-color: #43AA8B;
      }
      .toast-error {
        background-color: #F94144;
      }
      .toast-info {
        background-color: #4CC9F0;
      }
      .toast-warning {
        background-color: #F9C74F;
      }
      @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Create toast element
  const toast = createElement('div', { class: `toast toast-${type}` }, message);
  toastContainer.appendChild(toast);
  
  // Remove toast after duration
  setTimeout(() => {
    toast.remove();
  }, duration);
}