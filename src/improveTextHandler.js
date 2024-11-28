const { OpenAI } = require("openai");
const fs = require("fs");
const path = require("path");
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../config.json")));

const openai = new OpenAI({
    apiKey: config.openaiApiKey,
});

const improveText = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: "No text provided" });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: `You are a professional resume writer and career coach specializing in crafting concise, impactful dot jots for resumes and project descriptions. Your task is to analyze the input provided and create a polished, professional set of dot jots. The input may either be:
                        A written resume dot jot in need of improvement, or
                        An informal explanation of a project or experience.
                        For a written resume dot jot, improve clarity, grammar, formatting, and word choice to make it concise and achievement-oriented while retaining accuracy.
                        For an informal explanation of a project or experience, extract the key information and format it into professional dot jots suitable for a resume. Focus on using action verbs, quantifiable achievements, and relevant technical or industry-specific language.

                        The final output should be a single dot jot of reasonable length for a resume, and should include at least one quantifiable number or value that is relavant to the existing dot jot.  Do not include a dash or bullet point at the beginning of the dot jot.  Do not have more than one sentence.

                        If there is an issue or error with the input, respond with "ERROR" in all capitals.  

                        Here is the input:\n\n${text}`,
                },
            ],
            max_tokens: 300,
        });

        const improvedText = response.choices[0].message.content.trim();
        res.status(200).json({ improvedText });
    } catch (error) {
        console.error("Error improving text:", error);
        res.status(500).json({ message: "Failed to improve text", error: error.message });
    }
};

module.exports = { improveText };
