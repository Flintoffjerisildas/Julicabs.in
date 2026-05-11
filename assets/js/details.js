
/**
 * Vehicle Details Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));

    const content = document.getElementById('main-content');
    const notFound = document.getElementById('not-found');

    // Elements to populate
    const els = {
        image: document.getElementById('main-image'),
        thumbnailsContainer: document.getElementById('image-thumbnails'),
        name: document.getElementById('vehicle-name'),
        category: document.getElementById('vehicle-category'),
        location: document.getElementById('vehicle-location'),
        seats: document.getElementById('spec-seats'),
        fuel: document.getElementById('spec-fuel'),
        trans: document.getElementById('spec-trans'),
        priceDaily: document.getElementById('price-daily'),
        priceHourly: document.getElementById('price-hourly')
    };

    // Find Vehicle
    const vehicle = window.vehicleData.find(v => v.id === id);

    if (!vehicle) {
        if (content) content.classList.add('hidden');
        if (notFound) notFound.classList.remove('hidden');
        return;
    }

    // Populate data
    els.image.src = vehicle.image;
    
    // Populate thumbnails
    if (els.thumbnailsContainer && vehicle.images && vehicle.images.length > 0) {
        els.thumbnailsContainer.innerHTML = '';
        vehicle.images.forEach((imgSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.className = `w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition-all flex-shrink-0 ${index === 0 ? 'border-primary' : 'border-transparent hover:border-primary/50'}`;
            thumb.addEventListener('click', () => {
                els.image.src = imgSrc;
                // Update active state
                Array.from(els.thumbnailsContainer.children).forEach(child => {
                    child.classList.remove('border-primary');
                    child.classList.add('border-transparent', 'hover:border-primary/50');
                });
                thumb.classList.remove('border-transparent', 'hover:border-primary/50');
                thumb.classList.add('border-primary');
            });
            els.thumbnailsContainer.appendChild(thumb);
        });
    }

    els.name.textContent = vehicle.name;
    els.category.textContent = vehicle.category;
    els.location.textContent = vehicle.location;
    els.seats.textContent = vehicle.seats;
    els.fuel.textContent = vehicle.fuel;
    els.trans.textContent = vehicle.transmission;
    els.priceDaily.textContent = `₹ ${vehicle.priceDaily}`;
    els.priceHourly.textContent = `₹ ${vehicle.priceHourly}`;

    // Handle Form Submission
    // Handle Contact Button
    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.href = `contact.html?vehicle=${encodeURIComponent(vehicle.name)}`;
    }

    lucide.createIcons();
});
