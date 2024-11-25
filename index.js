const express = require("express");
const multer = require("multer");
const cors = require("cors");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");
const { exec } = require("child_process");
const getLatexTemplate = require("./resumeTemplate");

const config = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json")));

const openai = new OpenAI({
    apiKey: config.openaiApiKey,
});

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.post("/api/uploads", upload.single("resume"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join(__dirname, req.file.path);

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
});

app.post("/api/generate-resume", (req, res) => {
    const { personalInfo, education, workExperience, projects, skills } = req.body;

    const educationSection = education
        .map(
            (edu) => `
    \\resumeSubheading
      {${edu.school}}{${edu.dates}}
      {${edu.degree}}{${edu.location}}
    \\resumeItem
    {\\textbf{Relevant Coursework:} ${edu.coursework}}
    `
        )
        .join("\n");

    const workExperienceSection = workExperience
        .map(
            (work) => `
    \\resumeSubheading
      {${work.position}}{${work.dates}}
      {${work.company}}{${work.location}}
      \\resumeItemListStart
        ${work.details.map((detail) => `\\resumeItem{${detail}}`).join("\n")}
        \\resumeItemListEnd
    `
        )
        .join("\n");

    const projectsSection = projects
        .map(
            (project) => `
        \\resumeProjectHeading
          {\\textbf{\\href{${project.link}}{\\underline{${project.title}}}} $|$ \\emph{${project.technologies}}}{}
          \\resumeItemListStart
            ${project.details.map((detail) => `\\resumeItem{${detail}}`).join("\n")}
            \\resumeItemListEnd
        `
        )
        .join("\n");

    const skillsSection = `
\\begin{itemize}[leftmargin=0.15in, label={}]
\\small{\\item{
\\textbf{Languages}: ${skills.languages} \\\\
\\textbf{Libraries \\& Frameworks}: ${skills.frameworks} \\\\
\\textbf{Developer Tools}: ${skills.tools}
}}
\\end{itemize}
`;


    const latexTemplate = getLatexTemplate(
        personalInfo,
        educationSection,
        skillsSection,
        workExperienceSection,
        projectsSection
    );

    const filePath = path.join(__dirname, "uploads", "resume.tex");
    fs.writeFileSync(filePath, latexTemplate);

    exec(`pdflatex resume.tex`, { cwd: uploadsDir }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error generating PDF: ${error.message}`);
            return res.status(500).json({ message: "Failed to generate resume" });
        }

        const pdfPath = path.join(uploadsDir, "resume.pdf");
        res.download(pdfPath, "resume.pdf", (err) => {
            if (err) {
                console.error(`Error sending PDF: ${err.message}`);
                res.status(500).json({ message: "Failed to send resume" });
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
