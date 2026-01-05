
/**
 * Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('bookings-table-body');
    const emptyState = document.getElementById('empty-dashboard');
    const clearBtn = document.getElementById('clear-history');

    // Stats Elements
    const statTotal = document.getElementById('stat-total');
    const statActive = document.getElementById('stat-active');
    const statSpent = document.getElementById('stat-spent');

    function loadBookings() {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

        // Update Stats
        statTotal.textContent = bookings.length;
        const active = bookings.filter(b => b.status === 'Confirmed').length;
        statActive.textContent = active;

        // Calculate Total Spent (Removing $ and parsing float)
        const spent = bookings.reduce((acc, curr) => {
            if (curr.status !== 'Cancelled') {
                return acc + parseFloat(curr.total.replace('$', '').replace(',', ''));
            }
            return acc;
        }, 0);
        statSpent.textContent = `$${spent.toFixed(0)}`;

        // Render Table
        tableBody.innerHTML = '';

        if (bookings.length === 0) {
            emptyState.classList.remove('hidden');
            tableBody.closest('table').classList.add('hidden');
        } else {
            emptyState.classList.add('hidden');
            tableBody.closest('table').classList.remove('hidden');

            bookings.reverse().forEach(booking => {
                const tr = document.createElement('tr');
                tr.className = "hover:bg-gray-50 transition-colors";

                // Status Color
                let statusClass = '';
                if (booking.status === 'Confirmed') statusClass = 'bg-green-100 text-green-700';
                else if (booking.status === 'Cancelled') statusClass = 'bg-red-100 text-red-700';
                else statusClass = 'bg-gray-100 text-gray-700';

                // Format Dates nicely
                const start = new Date(booking.startDate).toLocaleDateString();
                const end = new Date(booking.dropoffDate || booking.endDate).toLocaleDateString(); // ensuring compatibility

                tr.innerHTML = `
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                            <img src="${booking.image}" class="w-12 h-8 rounded object-cover">
                            <div>
                                <p class="font-bold text-dark">${booking.vehicleName}</p>
                                <p class="text-xs text-gray-500">#${booking.id}</p>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 text-gray-600">
                        ${start} - ${end}
                    </td>
                    <td class="px-6 py-4 font-bold text-dark">
                        ${booking.total}
                    </td>
                    <td class="px-6 py-4">
                        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase ${statusClass}">
                            ${booking.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                        ${booking.status === 'Confirmed' ?
                        `<button onclick="cancelBooking(${booking.id})" class="text-red-500 hover:text-red-700 font-medium text-xs border border-red-200 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors">Cancel</button>`
                        : ''}
                    </td>
                `;
                tableBody.appendChild(tr);
            });
        }
        lucide.createIcons();
    }

    // Global function for Cancel Button
    window.cancelBooking = (id) => {
        if (confirm('Are you sure you want to cancel this booking?')) {
            const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            const index = bookings.findIndex(b => b.id === id);
            if (index !== -1) {
                bookings[index].status = 'Cancelled';
                localStorage.setItem('bookings', JSON.stringify(bookings));
                loadBookings();
            }
        }
    };

    // Clear History
    clearBtn.addEventListener('click', () => {
        if (confirm('Clear all booking history? This cannot be undone.')) {
            localStorage.removeItem('bookings');
            loadBookings();
        }
    });

    loadBookings();
});
