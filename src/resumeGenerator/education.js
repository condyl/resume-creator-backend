
const generateEducationSection = (education) => {
    return education
        .map(
            (edu) => `
    \\resumeSubheading
      {${edu.school}}{${edu.dates}}
      {${edu.degree}}{${edu.location}}
    \\resumeItem
    {\\textbf{Relevant Coursework:} ${edu.coursework}}
    `
        )
        .join("\n");
};

module.exports = { generateEducationSection };