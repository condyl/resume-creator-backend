const { escapeLatex } = require('./escapeLatex');

const generateEducationSection = (education) => {
    return education
        .map(
            (edu) => `
    \\resumeSubheading
      {${escapeLatex(edu.school)}}{\\small ${escapeLatex(edu.dates)}}
      {${escapeLatex(edu.degree)}${edu.program ? ` in ${escapeLatex(edu.program)}` : ''}}{${escapeLatex(edu.location)}}${
        edu.showCoursework && edu.coursework ? 
        `\\resumeItem{\\textbf{Relevant Coursework:} ${escapeLatex(edu.coursework)}}` : 
        ''
      }`
        )
        .join("\n");
};

module.exports = { generateEducationSection };