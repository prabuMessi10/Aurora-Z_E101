const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    platform: {
        type: String,
        enum: ['Uber', 'Ola', 'Rapido', 'Swiggy', 'Zomato', 'Porter'],
        required: true
    },
    vehicle_type: {
        type: String,
        enum: ['Bike', 'Auto', 'Car'],
        required: true
    },
    metrics: {
        total_pay: { type: Number, required: true },
        distance_km: { type: Number, required: true },
        duration_min: { type: Number, required: true },
        wait_time_min: { type: Number, default: 0 }
    },
    context: {
        mood: String,
        location: String
    },
    ai_verdict: {
        type: Object // Stores the full JSON result from Ollama
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Trip', TripSchema);
