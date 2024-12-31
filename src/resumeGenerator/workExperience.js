const { escapeLatex } = require('./escapeLatex');

const generateWorkExperienceSection = (workExperience) => {
    return workExperience
        .map(
            (work) => `
    \\resumeSubheading
      {${escapeLatex(work.position)}}{\\small ${escapeLatex(work.dates)}}
      {${escapeLatex(work.company)}}{\\small ${escapeLatex(work.location)}}
      \\resumeItemListStart
        ${work.details.map((detail) => `\\resumeItem{${escapeLatex(detail)}}`).join("\n")}
        \\resumeItemListEnd
    `
        )
        .join("\n");
};

module.exports = { generateWorkExperienceSection };