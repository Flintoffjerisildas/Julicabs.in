
/**
 * Booking Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));

    // Elements
    const els = {
        image: document.getElementById('summary-image'),
        name: document.getElementById('summary-name'),
        category: document.getElementById('summary-category'),
        rating: document.getElementById('summary-rating'),
        rate: document.getElementById('summary-price'),
        days: document.getElementById('summary-days'),
        tax: document.getElementById('summary-tax'),
        total: document.getElementById('summary-total'),
        pickup: document.getElementById('pickup-date'),
        dropoff: document.getElementById('dropoff-date'),
        confirmBtn: document.getElementById('confirm-btn'),
        modal: document.getElementById('success-modal'),
        modalContent: document.getElementById('success-modal-content')
    };

    // Find Vehicle
    const vehicle = window.vehicleData.find(v => v.id === id);

    if (!vehicle) {
        alert('Vehicle not found. Redirecting...');
        window.location.href = 'vehicles.html';
        return;
    }

    // Populate Vehicle Summary
    els.image.src = vehicle.image;
    els.name.textContent = vehicle.name;
    els.category.textContent = vehicle.category;
    els.rating.textContent = vehicle.rating;
    els.rate.textContent = `$${vehicle.priceDaily}`;

    // Calculation Logic
    function calculateTotal() {
        const start = new Date(els.pickup.value);
        const end = new Date(els.dropoff.value);

        if (start && end && end > start) {
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const subtotal = diffDays * vehicle.priceDaily;
            const taxes = subtotal * 0.10; // 10% tax
            const total = subtotal + taxes;

            els.days.textContent = diffDays;
            els.tax.textContent = `$${taxes.toFixed(2)}`;
            els.total.textContent = `$${total.toFixed(2)}`;
        } else {
            els.days.textContent = '0';
            els.tax.textContent = '$0.00';
            els.total.textContent = '$0.00';
        }
    }

    // Set default dates (Today + Tomorrow)
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    els.pickup.value = now.toISOString().slice(0, 16);

    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    els.dropoff.value = tomorrow.toISOString().slice(0, 16);

    calculateTotal();

    // Listeners
    els.pickup.addEventListener('change', calculateTotal);
    els.dropoff.addEventListener('change', calculateTotal);

    // Confirm Booking
    els.confirmBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Basic Validation
        if (!els.pickup.value || !els.dropoff.value) {
            alert('Please select valid dates.');
            return;
        }

        // Show Modal with Animation
        els.modal.classList.remove('hidden');
        // Small delay to allow display block to apply before opacity
        setTimeout(() => {
            els.modal.classList.remove('opacity-0');
            els.modalContent.classList.remove('scale-90');
            els.modalContent.classList.add('scale-100');
        }, 10);

        // Store Booking in LocalStorage (Mock Backend)
        const booking = {
            id: Date.now(),
            vehicleId: vehicle.id,
            vehicleName: vehicle.name,
            image: vehicle.image,
            startDate: els.pickup.value,
            endDate: els.dropoff.value,
            total: els.total.textContent,
            status: 'Confirmed',
            date: new Date().toLocaleDateString()
        };

        let existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        existingBookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(existingBookings));
    });
});
