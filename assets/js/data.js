
/**
 * Mock Data for Vehicle Booking App
 */

const vehicles = [
    {
        id: 1,
        name: "Tesla Model S Plaid",
        category: "Electric",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        priceHourly: 50,
        priceDaily: 350,
        rating: 4.9,
        reviews: 124,
        seats: 5,
        fuel: "Electric",
        transmission: "Automatic",
        available: true,
        location: "New York, NY"
    },
    {
        id: 2,
        name: "BMW M4 Competition",
        category: "Sports",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        priceHourly: 45,
        priceDaily: 300,
        rating: 4.8,
        reviews: 89,
        seats: 4,
        fuel: "Petrol",
        transmission: "Automatic",
        available: true,
        location: "Los Angeles, CA"
    },
    {
        id: 3,
        name: "Range Rover Sport",
        category: "SUV",
        image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        priceHourly: 40,
        priceDaily: 280,
        rating: 4.7,
        reviews: 215,
        seats: 7,
        fuel: "Diesel",
        transmission: "Automatic",
        available: false,
        location: "Miami, FL"
    },
    {
        id: 4,
        name: "Mercedes-Benz S-Class",
        category: "Luxury",
        image: "https://images.unsplash.com/photo-1622353696238-04f8773c24ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        priceHourly: 60,
        priceDaily: 400,
        rating: 4.9,
        reviews: 56,
        seats: 5,
        fuel: "Hybrid",
        transmission: "Automatic",
        available: true,
        location: "San Francisco, CA"
    },
    {
        id: 5,
        name: "Ford Mustang GT",
        category: "Sports",
        image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        priceHourly: 35,
        priceDaily: 220,
        rating: 4.6,
        reviews: 178,
        seats: 4,
        fuel: "Petrol",
        transmission: "Manual",
        available: true,
        location: "Austin, TX"
    },
    {
        id: 6,
        name: "Porsche 911 Carrera",
        category: "Sports",
        image: "https://images.unsplash.com/photo-1503376763036-066120622c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        priceHourly: 75,
        priceDaily: 500,
        rating: 5.0,
        reviews: 42,
        seats: 2,
        fuel: "Petrol",
        transmission: "Automatic",
        available: true,
        location: "Las Vegas, NV"
    }
];

// Provide globally
window.vehicleData = vehicles;
