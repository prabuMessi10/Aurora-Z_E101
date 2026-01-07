const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { spawn } = require('child_process');
const Trip = require('./models/Trip');

const app = express();
app.use(express.json());
app.use(cors());

// --- CONFIGURATION ---
// Replace this with your actual connection string from MongoDB Atlas
const MONGO_URI = "mongodb+srv://GigGod:asdf_1234@cluster0.4nqxetz.mongodb.net/gigguard?retryWrites=true&w=majority";
const PORT = 5000;

// Connect to Database
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Atlas Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err));

// --- API ENDPOINT ---
app.post('/api/analyze', async (req, res) => {
    try {
        const tripData = req.body;
        console.log("📝 Processing Trip for:", tripData.platform);

        // 1. Spawn Python Process
        const pythonProcess = spawn('python', ['audit.py', JSON.stringify(tripData)]);

        let aiOutput = "";

        pythonProcess.stdout.on('data', (data) => {
            aiOutput += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python stderr: ${data}`);
        });

        pythonProcess.on('close', async (code) => {
            try {
                // 2. Parse AI Result
                // Cleanup: remove markdown code blocks if Ollama adds them
                const cleanJson = aiOutput.replace(/```json/g, '').replace(/```/g, '').trim();
                const aiResult = JSON.parse(cleanJson);

                // 3. Save to MongoDB (Manual Data + AI Verdict)
                const newTrip = new Trip({
                    ...tripData,
                    ai_verdict: aiResult
                });

                await newTrip.save();
                console.log("💾 Trip Saved to DB with ID:", newTrip._id);

                // 4. Send Response to React
                res.json({ success: true, ai_result: aiResult, trip_id: newTrip._id });

            } catch (err) {
                console.error("Parsing/Saving Error:", err);
                res.status(500).json({ error: "Failed to process AI response" });
            }
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
