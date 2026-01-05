
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
        name: document.getElementById('vehicle-name'),
        category: document.getElementById('vehicle-category'),
        location: document.getElementById('vehicle-location'),
        rating: document.getElementById('vehicle-rating'),
        reviews: document.getElementById('vehicle-reviews'),
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
    els.name.textContent = vehicle.name;
    els.category.textContent = vehicle.category;
    els.location.textContent = vehicle.location;
    els.rating.textContent = vehicle.rating;
    els.reviews.textContent = vehicle.reviews;
    els.seats.textContent = vehicle.seats;
    els.fuel.textContent = vehicle.fuel;
    els.trans.textContent = vehicle.transmission;
    els.priceDaily.textContent = `$${vehicle.priceDaily}`;
    els.priceHourly.textContent = `$${vehicle.priceHourly}`;

    // Handle Form Submission
    const form = document.getElementById('booking-preview-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app we would validate dates here
            // For now, redirect to booking page with ID
            window.location.href = `booking.html?id=${id}`;
        });
    }

    lucide.createIcons();
});
