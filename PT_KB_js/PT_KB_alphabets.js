var PT_KBalp = {}

PT_KBalp.alpPL = [
    ['`', '~', ''], ['1', '!', ''], ['2', '@', ''],
    ['3', '#', ''], ['4', '$', ''], ['5', '%', ''],
    ['6', '^', ''], ['7', '&amp;', ''], ['8', '*', ''],
    ['9', '(', ''], ['0', ')', ''], ['-', '_', ''],
    ['=', '+', ''],
    ['q', '', ''], ['w', '', ''], ['e', '', 'ę'],
    ['r', '', ''], ['t', '', ''], ['y', '', ''],
    ['u', '', ''], ['i', '', ''], ['o', '', 'ó'],
    ['p', '', ''], ['[', '{', ''], [']', '}', ''],
    ['\\', '|', ''],
    ['a', '', 'ą'], ['s', '', 'ś'], ['d', '', ''],
    ['f', '', ''], ['g', '', ''], ['h', '', ''],
    ['j', '', ''], ['k', '', ''], ['l', '', 'ł'],
    [';', ':', ''], ['\'', '"', ''],
    ['z', '', 'ż'], ['x', '', 'ź'], ['c', '', 'ć'],
    ['v', '', ''], ['b', '', ''], ['n', '', 'ń'],
    ['m', '', ''], [',', '&lt;', ''], ['.', '&gt;', ''],
    ['/', '?', '']
];

PT_KBalp.escapeHtml = function (txt) {
    return txt
        .replace('&amp;', '&')
        .replace('&lt;', '<')
        .replace('&gt;', '>')
        .replace('&quot;', '"')
        .replace('&#039;', '\'');
}