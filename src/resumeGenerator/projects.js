const { escapeLatex } = require('./escapeLatex');

const generateProjectsSection = (projects) => {
    return projects
        .map(
            (project) => `
        \\resumeProjectHeading
          {\\textbf{\\href{${escapeLatex(project.link)}}{\\underline{${escapeLatex(project.title)}}}} $|$ \\emph{${escapeLatex(project.technologies)}}}{}
          \\resumeItemListStart
            ${project.details.map((detail) => `\\resumeItem{${escapeLatex(detail)}}`).join("\n")}
            \\resumeItemListEnd
        `
        )
        .join("\n");
};

module.exports = { generateProjectsSection };