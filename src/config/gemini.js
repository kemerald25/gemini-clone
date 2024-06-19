
// Import imports in from the package

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyDTdhpwC59shrZEFwQ8uKHxeYvSLSdnaVg";
// const apiUrl = import.meta.env.GEMINI_API;


const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.0-pro",
});

const generationConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 0,
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
        ],
    });

    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    const response = result.response;
    return response.text();
}

export default run;