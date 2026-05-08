require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const { GoogleGenAI } = require('@google/genai');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3001;

// 1. Security Headers
app.use(helmet());

// 2. CORS Policies
app.use(cors({
    origin: '*', // Allowing all for hackathon, lock down in prod
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Body Parser & Prevent HTTP Parameter Pollution
app.use(express.json({ limit: '1mb' })); // Limit body payload to 1MB to prevent DOS
app.use(hpp());

// 4. Rate Limiting Middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests from this IP, please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiter specifically to the API routes to prevent API key abuse
app.use('/api/', apiLimiter);

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// 1. Generate Trip Endpoint
app.post('/api/generate-trip', async (req, res) => {
    try {
        const { destination, days, budget, vibe, userEmail } = req.body;

        const prompt = `
        You are an expert, highly localized travel agent.
        Create a ${days}-day itinerary for ${destination} with a "${vibe}" vibe and a ${budget} budget.
        
        Focus on hyper-niche local gems and avoid obvious tourist traps unless requested.
        
        Return the itinerary STRICTLY as a JSON object with this structure:
        {
          "destination": "String",
          "budget": "String",
          "vibe": "String",
          "itinerary": [
            {
              "day": 1,
              "activities": [
                {
                  "time": "09:00",
                  "title": "String",
                  "description": "String",
                  "location": "String",
                  "type": "indoor" | "outdoor"
                }
              ]
            }
          ]
        }
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        const itineraryJson = JSON.parse(response.text);
        
        // Save to Supabase asynchronously (don't block the response)
        if (userEmail) {
            supabase.from('trips').insert([
                { user_email: userEmail, destination, itinerary_json: itineraryJson }
            ]).then(({ error }) => {
                if (error) console.error("Supabase insert error:", error);
            });
        }

        res.json(itineraryJson);
    } catch (error) {
        console.error("Error generating trip:", error);
        res.status(500).json({ error: "Failed to generate trip" });
    }
});

// 2. Chat Replan Endpoint
app.post('/api/chat-replan', async (req, res) => {
    try {
        const { currentItinerary, userMessage } = req.body;

        const prompt = `
        You are a smart travel assistant. Here is the user's current JSON itinerary:
        ${JSON.stringify(currentItinerary)}
        
        The user wants to make a change. They say: "${userMessage}"
        
        Update the itinerary to reflect this change. Make sure the times make sense and the locations are logical.
        Return the UPDATED itinerary STRICTLY in the exact same JSON format as the input.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        const updatedItinerary = JSON.parse(response.text);
        res.json(updatedItinerary);
    } catch (error) {
        console.error("Error replanning trip:", error);
        res.status(500).json({ error: "Failed to replan trip" });
    }
});

// 3. Analytics Endpoint
app.get('/api/analytics', async (req, res) => {
    try {
        const { count: usersCount, error: ue } = await supabase.from('users').select('*', { count: 'exact', head: true });
        const { count: tripsCount, error: te } = await supabase.from('trips').select('*', { count: 'exact', head: true });
        
        // Fetch 5 recent trips
        const { data: recentTrips, error: re } = await supabase
            .from('trips')
            .select('destination, user_email, created_at')
            .order('created_at', { ascending: false })
            .limit(5);
            
        if (ue || te || re) {
            console.error(ue || te || re);
            return res.status(500).json({ error: "Supabase error" });
        }
        
        res.json({ 
            usersCount: usersCount || 0, 
            tripsCount: tripsCount || 0, 
            recentTrips: recentTrips || [] 
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
});

// For Demo Purposes: A hardcoded "Simulate Rain" endpoint
app.post('/api/simulate-rain', async (req, res) => {
    try {
        const { destination, currentItinerary } = req.body;
        
        const prompt = `
        You are a travel assistant. We are running a simulation where a massive rainstorm just hit ${destination}.
        
        Here is the user's itinerary:
        ${JSON.stringify(currentItinerary)}
        
        Modify the itinerary to cancel outdoor events today and replace them with great indoor alternatives.
        Add a field "alertMessage" at the root level explaining what was changed.
        Return strictly in the same JSON format.
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });
        
        const updatedItinerary = JSON.parse(response.text);
        return res.json({
            weatherCondition: "simulated_rain",
            replanned: true,
            itinerary: updatedItinerary,
            alertMessage: updatedItinerary.alertMessage || "Due to sudden rain, your outdoor plans were moved indoors!"
        });
    } catch (error) {
        console.error("Error simulating rain:", error);
        res.status(500).json({ error: "Failed to simulate rain" });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Voyazo Backend is live and listening on port ${port}`);
});
