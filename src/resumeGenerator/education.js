const { escapeLatex } = require('./escapeLatex');

const generateEducationSection = (education) => {
    return education
        .map(
            (edu) => `
    \\resumeSubheading
      {${escapeLatex(edu.school)}}{${escapeLatex(edu.dates)}}
      {${escapeLatex(edu.degree)}}{${escapeLatex(edu.location)}}
    \\resumeItem
    {\\textbf{Relevant Coursework:} ${escapeLatex(edu.coursework)}}
    `
        )
        .join("\n");
};

module.exports = { generateEducationSection };