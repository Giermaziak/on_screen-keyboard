var PT_KB = {}

PT_KB.main = function () {
    PT_KBf.loadKeyboard();
    PT_KBf.focusListener();//adding events to inputs
    let keyboardHeader = document.querySelector('#PT_KB_header');
    let keyboardWrapp = document.querySelector('#PT_KB_wrapper');
    PT.makeDragable(keyboardWrapp, keyboardHeader);
    PT_KBf.alphInserter(PT_KBcon.language, 0);//generate alph in keyboard, PT_KBcon.language in config
}

document.addEventListener('DOMContentLoaded', PT_KB.main);


