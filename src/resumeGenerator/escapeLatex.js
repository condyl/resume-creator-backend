const escapeLatex = (text) => {
    if (typeof text !== 'string') {
        return text;
    }
    const replacements = {
        '\\': '\\textbackslash{}',
        '{': '\\{',
        '}': '\\}',
        '$': '\\$',
        '&': '\\&',
        '#': '\\#',
        '_': '\\_',
        '%': '\\%',
        '~': '\\textasciitilde{}',
        '^': '\\textasciicircum{}'
    };
    return text.replace(/[\\{}$&#_%~^]/g, (match) => replacements[match]);
};

module.exports = { escapeLatex };