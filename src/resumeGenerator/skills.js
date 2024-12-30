const { escapeLatex } = require('./escapeLatex');

const generateSkillsSection = (skills) => {
    return `
\\begin{itemize}[leftmargin=0.15in, label={}]
\\small{\\item{
\\textbf{Programming Languages}: ${escapeLatex(skills.languages)} \\\\[4pt]
\\textbf{Frameworks \\& Libraries}: ${escapeLatex(skills.frameworks)} \\\\[4pt]
\\textbf{Tools \\& Technologies}: ${escapeLatex(skills.tools)}
}}
\\end{itemize}
`;
};

module.exports = { generateSkillsSection };