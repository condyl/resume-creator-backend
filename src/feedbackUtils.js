
const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../config.json")));

const openai = new OpenAI({
    apiKey: config.openaiApiKey,
});

const getResumeFeedback = async (resumeText) => {
    const response = await openai.Completions.create({
        model: "text-davinci-003",
        prompt: `Provide feedback for the following resume:\n\n${resumeText}`,
        max_tokens: 150,
    });
    return response.choices[0].text.trim();
};

const formatFeedbackToArray = (feedback) => {
    return feedback.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
};

module.exports = { getResumeFeedback, formatFeedbackToArray };