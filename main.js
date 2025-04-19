// Main application file

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Load data components
  loadCategories();
  loadFeaturedProducts();
  loadStores();
  loadDealProducts();
  loadStoreDirectory();
  
  // Initialize components
  initProductEvents();
  initStoreEvents();
  initCart();
  initMapEvents();
  initMobileNavigation();
  
  // View toggle
  const viewToggle = document.getElementById('view-toggle-input');
  viewToggle.addEventListener('change', toggleMapView);
  
  // Initialize navigation
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
});

// Initialize mobile navigation
function initMobileNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('show');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav') && !e.target.closest('#mobile-menu-btn') && mainNav.classList.contains('show')) {
      mainNav.classList.remove('show');
    }
  });
}

// Home button functionality
document.addEventListener('click', (e) => {
  if (e.target.closest('.logo') || e.target.closest('.logo a')) {
    e.preventDefault();
    window.location.reload();
  }
});