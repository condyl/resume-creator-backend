
const generateWorkExperienceSection = (workExperience) => {
    return workExperience
        .map(
            (work) => `
    \\resumeSubheading
      {${work.position}}{${work.dates}}
      {${work.company}}{${work.location}}
      \\resumeItemListStart
        ${work.details.map((detail) => `\\resumeItem{${detail}}`).join("\n")}
        \\resumeItemListEnd
    `
        )
        .join("\n");
};

module.exports = { generateWorkExperienceSection };