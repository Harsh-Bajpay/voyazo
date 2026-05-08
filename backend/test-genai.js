require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function test() {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'Hello, world!',
        });
        console.log('Success:', response.text);
    } catch (error) {
        console.error('Error:', error.message);
    }
}
test();
