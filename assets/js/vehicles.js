
/**
 * Vehicle Listing Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('vehicles-grid');
    const emptyState = document.getElementById('empty-state');
    const typeCheckboxes = document.querySelectorAll('#type-filters input');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const resetBtn = document.getElementById('reset-filters');
    const seatBtns = document.querySelectorAll('.seat-filter-btn');

    let currentFilters = {
        types: [],
        maxPrice: 1000,
        seats: null,
        search: '',
        sort: 'recommended'
    };

    // Check URL Params for initial filter
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');

    if (typeParam) {
        // capitalize
        const typeFormatted = typeParam.charAt(0).toUpperCase() + typeParam.slice(1);
        currentFilters.types.push(typeFormatted);

        // Update UI checkbox
        typeCheckboxes.forEach(cb => {
            if (cb.value.toLowerCase() === typeParam.toLowerCase()) {
                cb.checked = true;
            }
        });
    }

    // --- Functions ---

    function renderVehicles() {
        grid.innerHTML = '';

        // Filter
        let filtered = window.vehicleData.filter(v => {
            // Type
            if (currentFilters.types.length > 0 && !currentFilters.types.includes(v.category)) return false;
            // Price
            if (v.priceDaily > currentFilters.maxPrice) return false;
            // Seats
            if (currentFilters.seats) {
                if (currentFilters.seats === 7) {
                    if (v.seats < 7) return false;
                } else {
                    if (v.seats !== currentFilters.seats) return false;
                }
            }
            // Search
            if (currentFilters.search) {
                const term = currentFilters.search.toLowerCase();
                if (!v.name.toLowerCase().includes(term) && !v.category.toLowerCase().includes(term)) return false;
            }
            return true;
        });

        // Sort
        if (currentFilters.sort === 'price-low') {
            filtered.sort((a, b) => a.priceDaily - b.priceDaily);
        } else if (currentFilters.sort === 'price-high') {
            filtered.sort((a, b) => b.priceDaily - a.priceDaily);
        } else if (currentFilters.sort === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        // Empty State
        if (filtered.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');

            filtered.forEach(v => {
                const card = document.createElement('div');
                card.className = "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group";

                card.innerHTML = `
                  <div class="relative h-56 overflow-hidden">
                       <img src="${v.image}" alt="${v.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                       ${!v.available ? '<div class="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center"><span class="bg-red-500 text-white px-3 py-1 rounded-lg font-bold">Unavailble</span></div>' : ''}
                  </div>
                  <div class="p-5 flex flex-col flex-grow">
                      <div class="flex justify-between items-start mb-2">
                          <span class="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">${v.category}</span>
                          <div class="flex items-center gap-1 text-sm font-bold text-gray-700">
                              <i data-lucide="star" class="w-3 h-3 fill-yellow-400 text-yellow-400"></i> ${v.rating}
                          </div>
                      </div>
                      
                      <h3 class="text-lg font-bold text-dark mb-1">${v.name}</h3>
                      <p class="text-sm text-gray-500 mb-4 line-clamp-1"><i data-lucide="map-pin" class="w-3 h-3 inline"></i> ${v.location}</p>
                      
                      <div class="grid grid-cols-2 gap-2 mb-4">
                          <span class="text-xs text-secondary bg-gray-50 px-2 py-1.5 rounded flex items-center gap-1"><i data-lucide="users" class="w-3 h-3"></i> ${v.seats} Seats</span>
                          <span class="text-xs text-secondary bg-gray-50 px-2 py-1.5 rounded flex items-center gap-1"><i data-lucide="fuel" class="w-3 h-3"></i> ${v.fuel}</span>
                      </div>
                      
                      <div class="mt-auto flex items-end justify-between pt-4 border-t border-gray-100">
                          <div>
                              <span class="text-xl font-bold text-primary">$${v.priceDaily}</span>
                              <span class="text-xs text-gray-400">/day</span>
                          </div>
                          <a href="details.html?id=${v.id}" class="bg-dark text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl">
                              View Details
                          </a>
                      </div>
                  </div>
              `;
                grid.appendChild(card);
            });
        }

        lucide.createIcons();
    }

    // --- Event Listeners ---

    // Search
    searchInput.addEventListener('input', (e) => {
        currentFilters.search = e.target.value;
        renderVehicles();
    });

    // Type
    typeCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            if (cb.checked) {
                currentFilters.types.push(cb.value);
            } else {
                currentFilters.types = currentFilters.types.filter(t => t !== cb.value);
            }
            renderVehicles();
        });
    });

    // Price
    priceRange.addEventListener('input', (e) => {
        currentFilters.maxPrice = parseInt(e.target.value);
        priceValue.textContent = `$${currentFilters.maxPrice}`;
        renderVehicles();
    });

    // Seats
    seatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = parseInt(btn.dataset.seats);
            // Toggle logic
            if (currentFilters.seats === val) {
                currentFilters.seats = null;
                btn.classList.remove('border-primary', 'text-primary', 'bg-primary/5');
                btn.classList.add('border-gray-200', 'text-gray-600');
            } else {
                currentFilters.seats = val;
                // reset others
                seatBtns.forEach(b => {
                    b.classList.remove('border-primary', 'text-primary', 'bg-primary/5');
                    b.classList.add('border-gray-200', 'text-gray-600');
                });
                btn.classList.remove('border-gray-200', 'text-gray-600');
                btn.classList.add('border-primary', 'text-primary', 'bg-primary/5');
            }
            renderVehicles();
        });
    });

    // Sort
    sortSelect.addEventListener('change', (e) => {
        currentFilters.sort = e.target.value;
        renderVehicles();
    });

    // Reset
    resetBtn.addEventListener('click', () => {
        currentFilters = {
            types: [],
            maxPrice: 1000,
            seats: null,
            search: '',
            sort: 'recommended'
        };

        // UI Reset
        typeCheckboxes.forEach(cb => cb.checked = false);
        searchInput.value = '';
        priceRange.value = 1000;
        priceValue.textContent = '$1000';
        seatBtns.forEach(b => {
            b.classList.remove('border-primary', 'text-primary', 'bg-primary/5');
            b.classList.add('border-gray-200', 'text-gray-600');
        });
        sortSelect.value = 'recommended';

        renderVehicles();
    });

    // Initial Render
    renderVehicles();
});
