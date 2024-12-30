const { escapeLatex } = require('./escapeLatex');

const generateProjectsSection = (projects) => {
    return projects
        .map(
            (project) => {
                const links = [];
                if (project.liveUrl) links.push(`\\href{${escapeLatex(project.liveUrl)}}{\\underline{Live Demo}}`);
                if (project.githubUrl) links.push(`\\href{${escapeLatex(project.githubUrl)}}{\\underline{GitHub}}`);
                const linkText = links.length > 0 ? `${links.join(' $|$ ')}` : '';
                const techText = project.technologies ? ` $|$ \\emph{${escapeLatex(project.technologies)}}` : '';

                return `
        \\resumeProjectHeading
          {\\textbf{${escapeLatex(project.name)}}${techText}}{${linkText}}
          \\resumeItemListStart
            ${project.details.map((detail) => `\\resumeItem{${escapeLatex(detail)}}`).join("\n")}
            \\resumeItemListEnd
        `
            }
        )
        .join("\n");
};

module.exports = { generateProjectsSection };