
/**
 * Utility functions for the Vehicle Booking App
 */

const Utils = {
    // Format currency
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    },

    // Format date
    formatDate: (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    },

    // Generate Star Rating HTML
    getStarRating: (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let html = '';

        for (let i = 0; i < fullStars; i++) {
            html += '<i data-lucide="star" class="w-4 h-4 fill-yellow-400 text-yellow-400"></i>';
        }
        if (hasHalfStar) {
            html += '<i data-lucide="star-half" class="w-4 h-4 fill-yellow-400 text-yellow-400"></i>';
        }
        // Fill remaining with empty stars if needed (optional, keeping minimal for now)
        return html;
    },

    // Store data in local storage
    storeData: (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    },

    // Retrieve data from local storage
    getData: (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
};

// Export to global scope for simplicity in this vanilla setup
window.Utils = Utils;
