
const generateProjectsSection = (projects) => {
    return projects
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
};

module.exports = { generateProjectsSection };