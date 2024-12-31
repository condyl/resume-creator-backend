const { escapeLatex } = require('./escapeLatex');

const formatDate = (dateString) => {
    if (dateString === 'Present') return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

const generateProjectsSection = (projects) => {
    return projects
        .map(
            (project) => {
                const links = [];
                if (project.liveUrl) links.push(`\\href{${escapeLatex(project.liveUrl)}}{\\underline{Live Demo}}`);
                if (project.githubUrl) links.push(`\\href{${escapeLatex(project.githubUrl)}}{\\underline{GitHub}}`);
                const linkText = links.length > 0 ? `${links.join(' $|$ ')}` : '';
                const techText = project.technologies ? ` $|$ \\emph{${escapeLatex(project.technologies)}}` : '';
                const formattedDate = project.showDate ? (project.endDate === 'Present' ? 
                    `${formatDate(project.startDate)} - Present` : 
                    `${formatDate(project.startDate)} - ${formatDate(project.endDate)}`) : '';
                const dateText = formattedDate ? (links.length > 0 ? ` $|$ ${escapeLatex(formattedDate)}` : ` ${escapeLatex(formattedDate)}`) : '';

                return `
        \\resumeProjectHeading
          {\\textbf{${escapeLatex(project.name)}}${techText}}{\\small ${linkText}${dateText}}
          \\resumeItemListStart
            ${project.details.map((detail) => `\\resumeItem{${escapeLatex(detail)}}`).join("\n")}
            \\resumeItemListEnd
        `
            }
        )
        .join("\n");
};

module.exports = { generateProjectsSection };