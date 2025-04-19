// Interactive mall map functionality

let mapScale = 1;
let mapPosition = { x: 0, y: 0 };
let isDragging = false;
let dragStart = { x: 0, y: 0 };

// Render mall map
function renderMallMap() {
  const mapContainer = document.getElementById('mall-map');
  if (!mapContainer) return;
  
  // Clear map
  mapContainer.innerHTML = '';
  
  // Create mall floor
  const mallFloor = createElement('div', { class: 'mall-floor', id: 'mall-floor' });
  mapContainer.appendChild(mallFloor);
  
  // Add corridors
  mallData.mallMap.corridors.forEach((corridor, index) => {
    const corridorElement = createElement('div', { 
      class: `mall-corridor ${corridor.orientation}`,
      style: `left: ${corridor.x}px; top: ${corridor.y}px; width: ${corridor.width}px; height: ${corridor.height}px;`
    });
    
    mallFloor.appendChild(corridorElement);
  });
  
  // Add entrances
  mallData.mallMap.entrances.forEach((entrance, index) => {
    const entranceElement = createElement('div', { 
      class: 'mall-entrance',
      style: `left: ${entrance.x}px; top: ${entrance.y}px;`
    }, entrance.label);
    
    mallFloor.appendChild(entranceElement);
  });
  
  // Add stores
  mallData.stores.forEach((store, index) => {
    const { x, y, width, height } = store.mapPosition;
    const colorScheme = store.colorScheme || (index % 6) + 1;
    
    const storeElement = createElement('div', { 
      class: `mall-store store-color-${colorScheme}`,
      'data-store-id': store.id,
      style: `left: ${x}px; top: ${y}px; width: ${width}px; height: ${height}px;`
    });
    
    storeElement.innerHTML = `
      <div class="mall-store-header header-color-${colorScheme}">${store.name}</div>
      <div class="mall-store-content">
        <div class="mall-store-logo" style="background-image: url('${store.logo}')"></div>
      </div>
    `;
    
    mallFloor.appendChild(storeElement);
  });
  
  // Center the map
  centerMap();
}

// Center map in the container
function centerMap() {
  // Get map dimensions
  const mallFloor = document.getElementById('mall-floor');
  if (!mallFloor) return;
  
  // Reset scale and position
  mapScale = 1;
  mapPosition = { x: 0, y: 0 };
  
  // Update transform
  updateMapTransform();
}

// Update map transform
function updateMapTransform() {
  const mallFloor = document.getElementById('mall-floor');
  if (!mallFloor) return;
  
  mallFloor.style.transform = `scale(${mapScale}) translate(${mapPosition.x}px, ${mapPosition.y}px)`;
}

// Zoom in
function zoomIn() {
  if (mapScale < 2) {
    mapScale += 0.1;
    updateMapTransform();
  }
}

// Zoom out
function zoomOut() {
  if (mapScale > 0.5) {
    mapScale -= 0.1;
    updateMapTransform();
  }
}

// Initialize map event listeners
function initMapEvents() {
  // Map drag
  const mallMap = document.getElementById('mall-map');
  
  if (mallMap) {
    mallMap.addEventListener('mousedown', (e) => {
      if (e.target.closest('.mall-store') || e.target.closest('.map-popup')) {
        // Don't start dragging if clicking on a store or popup
        return;
      }
      
      isDragging = true;
      dragStart = {
        x: e.clientX - mapPosition.x,
        y: e.clientY - mapPosition.y
      };
      
      mallMap.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      mapPosition = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      };
      
      updateMapTransform();
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
      mallMap.style.cursor = 'grab';
    });
    
    // Touch events for mobile
    mallMap.addEventListener('touchstart', (e) => {
      if (e.target.closest('.mall-store') || e.target.closest('.map-popup')) {
        // Don't start dragging if touching a store or popup
        return;
      }
      
      isDragging = true;
      dragStart = {
        x: e.touches[0].clientX - mapPosition.x,
        y: e.touches[0].clientY - mapPosition.y
      };
    });
    
    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      mapPosition = {
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      };
      
      updateMapTransform();
    });
    
    document.addEventListener('touchend', () => {
      isDragging = false;
    });
  }
  
  // Zoom controls
  const zoomInBtn = document.getElementById('zoom-in');
  const zoomOutBtn = document.getElementById('zoom-out');
  const resetMapBtn = document.getElementById('reset-map');
  
  if (zoomInBtn) zoomInBtn.addEventListener('click', zoomIn);
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOut);
  if (resetMapBtn) resetMapBtn.addEventListener('click', centerMap);
  
  // Store click in map
  document.addEventListener('click', (e) => {
    const storeElement = e.target.closest('.mall-store');
    if (storeElement) {
      const storeId = parseInt(storeElement.getAttribute('data-store-id'));
      const store = mallData.stores.find(s => s.id === storeId);
      
      if (store) {
        // Highlight selected store
        document.querySelectorAll('.mall-store').forEach(el => {
          el.classList.remove('active');
        });
        storeElement.classList.add('active');
        
        // Update store list
        document.querySelectorAll('.map-store-item').forEach(el => {
          el.classList.remove('active');
          if (parseInt(el.getAttribute('data-store-id')) === storeId) {
            el.classList.add('active');
            // Scroll to the item
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
        
        // Show popup
        const rect = storeElement.getBoundingClientRect();
        const mapRect = document.getElementById('mall-map').getBoundingClientRect();
        
        const popupPosition = {
          x: rect.left + rect.width / 2 - mapRect.left - 120, // center popup horizontally
          y: rect.top - mapRect.top - 10 // position above the store
        };
        
        showStorePopup(store, popupPosition);
      }
    }
  });
  
  // Store directory items click
  document.addEventListener('click', (e) => {
    const storeItem = e.target.closest('.map-store-item');
    if (storeItem) {
      const storeId = parseInt(storeItem.getAttribute('data-store-id'));
      const positionData = JSON.parse(storeItem.getAttribute('data-store-position'));
      
      // Highlight selected store in list
      document.querySelectorAll('.map-store-item').forEach(el => {
        el.classList.remove('active');
      });
      storeItem.classList.add('active');
      
      // Highlight store in map
      document.querySelectorAll('.mall-store').forEach(el => {
        el.classList.remove('active');
        if (parseInt(el.getAttribute('data-store-id')) === storeId) {
          el.classList.add('active');
          
          // Center store in map
          const store = mallData.stores.find(s => s.id === storeId);
          centerStoreInMap(store);
        }
      });
    }
  });
}

// Center specific store in map
function centerStoreInMap(store) {
  const { x, y, width, height } = store.mapPosition;
  const mapContainer = document.getElementById('mall-map');
  
  if (!mapContainer) return;
  
  // Reset scale
  mapScale = 1;
  
  // Calculate center position
  const centerX = (mapContainer.clientWidth / 2 - (x + width / 2));
  const centerY = (mapContainer.clientHeight / 2 - (y + height / 2));
  
  // Update position
  mapPosition = { x: centerX, y: centerY };
  
  // Update transform
  updateMapTransform();
  
  // Find the store element and show popup
  setTimeout(() => {
    const storeElement = document.querySelector(`.mall-store[data-store-id="${store.id}"]`);
    if (storeElement) {
      const rect = storeElement.getBoundingClientRect();
      const mapRect = mapContainer.getBoundingClientRect();
      
      const popupPosition = {
        x: rect.left + rect.width / 2 - mapRect.left - 120,
        y: rect.top - mapRect.top - 10
      };
      
      showStorePopup(store, popupPosition);
    }
  }, 300); // Small delay to allow the transform to complete
}

// Toggle between shopping view and map view
function toggleMapView() {
  const isMapView = document.getElementById('view-toggle-input').checked;
  const shoppingView = document.getElementById('shopping-view');
  const mapView = document.getElementById('map-view');
  
  if (isMapView) {
    // Switch to map view
    shoppingView.classList.add('hidden');
    mapView.classList.remove('hidden');
    
    // Delay to allow the display change to take effect before animating
    setTimeout(() => {
      mapView.classList.add('active');
      
      // Render the map if it's empty
      if (document.getElementById('mall-floor') === null) {
        renderMallMap();
      }
    }, 50);
  } else {
    // Switch to shopping view
    mapView.classList.remove('active');
    
    // Wait for the animation to complete
    setTimeout(() => {
      mapView.classList.add('hidden');
      shoppingView.classList.remove('hidden');
    }, 300);
  }
}