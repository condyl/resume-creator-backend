const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { v4: uuidv4 } = require("uuid");
const getLatexTemplate = require("./resumeTemplate");
const { generateEducationSection } = require("./resumeGenerator/education");
const { generateWorkExperienceSection } = require("./resumeGenerator/workExperience");
const { generateProjectsSection } = require("./resumeGenerator/projects");
const { generateSkillsSection } = require("./resumeGenerator/skills");

const generateResume = (req, res) => {
    const { personalInfo, education, workExperience, projects, skills, showIcons, format } = req.body;

    const filteredPersonalInfo = Object.keys(personalInfo).reduce((acc, key) => {
        if (showIcons[key] !== false) {
            acc[key] = personalInfo[key];
        }
        return acc;
    }, {});

    const educationSection = generateEducationSection(education);
    const workExperienceSection = generateWorkExperienceSection(workExperience);
    const projectsSection = generateProjectsSection(projects);
    const skillsSection = generateSkillsSection(skills);

    const latexTemplate = getLatexTemplate(
        filteredPersonalInfo,
        educationSection,
        skillsSection,
        workExperienceSection,
        projectsSection
    );

    // If format is latex, return the source code directly
    if (format === 'latex') {
        return res.json({ latex: latexTemplate });
    }

    // Otherwise, generate PDF as before
    const uniqueId = uuidv4();
    const texFileName = `resume_${uniqueId}.tex`;
    const pdfFileName = `resume_${uniqueId}.pdf`;

    const filePath = path.join(__dirname, "../uploads", texFileName);
    fs.writeFileSync(filePath, latexTemplate);

    exec(`pdflatex ${texFileName}`, { cwd: path.join(__dirname, "../uploads") }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error generating PDF: ${error.message}`);
            return res.status(500).json({ message: "Failed to generate resume" });
        }

        const pdfPath = path.join(__dirname, "../uploads", pdfFileName);
        res.download(pdfPath, pdfFileName, (err) => {
            if (err) {
                console.error(`Error sending PDF: ${err.message}`);
                res.status(500).json({ message: "Failed to send resume" });
            } else {
                // Delete extra files
                const auxFile = path.join(__dirname, "../uploads", `resume_${uniqueId}.aux`);
                const logFile = path.join(__dirname, "../uploads", `resume_${uniqueId}.log`);
                const outFile = path.join(__dirname, "../uploads", `resume_${uniqueId}.out`);
                const texFile = path.join(__dirname, "../uploads", texFileName);
                const pdfFile = path.join(__dirname, "../uploads", pdfFileName);

                [auxFile, logFile, outFile, texFile, pdfFile].forEach(file => {
                    fs.unlink(file, (err) => {
                        if (err) console.error(`Error deleting file ${file}: ${err.message}`);
                    });
                });
            }
        });
    });
};

module.exports = { generateResume };