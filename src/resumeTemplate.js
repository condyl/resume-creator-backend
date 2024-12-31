const { escapeLatex } = require('./resumeGenerator/escapeLatex');

const getLatexTemplate = (personalInfo, educationSection, skillsSection, workExperienceSection, projectsSection) => `
\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
    \\vspace{-2pt}\\item\\small
        \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
            \\textbf{#1} & #2 \\\\
            \\textit{#3} & \\textit{#4} \\\\
        \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape ${escapeLatex(personalInfo.name)}} 
    \\\\ \\vspace{1pt} 
    ${getPersonalInfoString(personalInfo)}
\\end{center}

\\section{Education}
\\resumeSubHeadingListStart
${educationSection}
\\resumeSubHeadingListEnd

\\section{Experience}
\\resumeSubHeadingListStart
${workExperienceSection}
\\resumeSubHeadingListEnd

\\section{Projects}
\\resumeSubHeadingListStart
${projectsSection}
\\resumeSubHeadingListEnd

\\section{Skills}
${skillsSection}

\\end{document}
`;

function getPersonalInfoString(personalInfo) {
  const personalInfoArray = [
    personalInfo.email ? `\\href{mailto:${escapeLatex(personalInfo.email)}}{\\underline{${escapeLatex(personalInfo.email)}}}` : "",
    personalInfo.email && (personalInfo.linkedin || personalInfo.github || personalInfo.website || personalInfo.phone) ? "$|$" : "",
    personalInfo.linkedin ? `\\href{https://linkedin.com/in/${escapeLatex(personalInfo.linkedin)}}{\\underline{LinkedIn}}` : "",
    personalInfo.linkedin && (personalInfo.github || personalInfo.website || personalInfo.phone) ? "$|$" : "",
    personalInfo.github ? `\\href{https://github.com/${escapeLatex(personalInfo.github)}}{\\underline{GitHub}}` : "",
    personalInfo.github && (personalInfo.website || personalInfo.phone) ? "$|$" : "",
    personalInfo.website ? `\\href{${escapeLatex(personalInfo.website)}}{{\\underline{Website}}}` : "",
    personalInfo.website && personalInfo.phone ? "$|$" : "",
    personalInfo.phone ? escapeLatex(personalInfo.phone) : ""
  ];
  
  return personalInfoArray.filter(Boolean).join(" ");
}

module.exports = getLatexTemplate;
