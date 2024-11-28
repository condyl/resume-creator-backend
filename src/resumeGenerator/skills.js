const { escapeLatex } = require('./escapeLatex');

const generateSkillsSection = (skills) => {
    return `
\\begin{itemize}[leftmargin=0.15in, label={}]
\\small{\\item{
\\textbf{Languages}: ${escapeLatex(skills.languages)} \\\\
\\textbf{Libraries \\& Frameworks}: ${escapeLatex(skills.frameworks)} \\\\
\\textbf{Developer Tools}: ${escapeLatex(skills.tools)}
}}
\\end{itemize}
`;
};

module.exports = { generateSkillsSection };