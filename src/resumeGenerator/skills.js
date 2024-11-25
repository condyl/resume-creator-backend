
const generateSkillsSection = (skills) => {
    return `
\\begin{itemize}[leftmargin=0.15in, label={}]
\\small{\\item{
\\textbf{Languages}: ${skills.languages} \\\\
\\textbf{Libraries \\& Frameworks}: ${skills.frameworks} \\\\
\\textbf{Developer Tools}: ${skills.tools}
}}
\\end{itemize}
`;
};

module.exports = { generateSkillsSection };