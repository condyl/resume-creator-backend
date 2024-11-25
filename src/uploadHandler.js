
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const { getResumeFeedback, formatFeedbackToArray } = require("./feedbackUtils");

const handleUpload = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "../", req.file.path);

    try {
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        const resumeText = pdfData.text;
        const feedback = await getResumeFeedback(resumeText);
        const feedbackArray = formatFeedbackToArray(feedback);

        res.status(200).json({
            message: "File uploaded and parsed successfully",
            text: resumeText,
            feedback: feedbackArray,
        });

        fs.unlinkSync(filePath);
    } catch (error) {
        console.error("Error parsing PDF:", error);
        res.status(500).json({ message: "Failed to parse PDF", error: error.message });
    }
};

module.exports = { handleUpload };