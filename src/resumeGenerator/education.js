const { escapeLatex } = require('./escapeLatex');

const generateEducationSection = (education, showCoursework = true) => {
    return education
        .map(
            (edu) => `
    \\resumeSubheading
      {${escapeLatex(edu.school)}}{${escapeLatex(edu.dates)}}
      {${escapeLatex(edu.degree)}${edu.program ? ` in ${escapeLatex(edu.program)}` : ''}}{${escapeLatex(edu.location)}}
    ${showCoursework && edu.coursework ? `\\resumeItem{\\textbf{Relevant Coursework:} ${escapeLatex(edu.coursework)}}` : ''}`
        )
        .join("\n");
};

module.exports = { generateEducationSection };