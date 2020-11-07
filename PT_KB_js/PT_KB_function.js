var PT_KBf = {}

PT_KBf.lastFocused = null;
PT_KBf.specialBtn = {
    'capsLock': false,
    'shift': false,
    'alt': false,
    'mode': 0
}

//łąduje klawiature
PT_KBf.loadKeyboard = function () {
    let keyboardWrapp = document.querySelector('#PT_KB_wrapper');
    keyboardWrapp.style.display = "none";

    PT_KBf.keyboardCreateBody(keyboardWrapp);

    if (PT_KBcon.defaultInputbox !== null) {
        let boxID = document.querySelector(PT_KBcon.defaultInputbox);
        if (boxID !== null)
            PT_KBf.lastFocused = boxID;
    }

    keyboardWrapp.style.right = "20px";
    keyboardWrapp.style.bottom = "20px";

    PT_KBf.btnClickEv(keyboardWrapp);
}

//dodanie eventów dla przycisków klawiatury
PT_KBf.btnClickEv = function (wrapp) {
    let buttons = wrapp.querySelectorAll('.PT_KB_key_Alphabet, #PT_KB_keyID_0, #PT_KB_keyID_7');

    wrapp.addEventListener('mousedown', function (e) {
        //zapobiega odklikiwaniu inputboxa podczas akcji na klawiaturze
        e.preventDefault();
    });

    for (let i = 0; i < buttons.length; i++) {

        //click text event
        buttons[i].addEventListener('click', function (e) {
            e.preventDefault();
            let btnId = buttons[i].getAttribute('id');
            let cont;
            if (btnId === 'PT_KB_keyID_7' || btnId === 'PT_KB_keyID_0')
                cont = " ";
            else {
                cont = buttons[i].querySelector('p').innerHTML;
                cont = PT_KBalp.escapeHtml(cont);
            }
            let focused = document.activeElement;
            if (!focused || focused == document.body) {
                if (PT_KBf.lastFocused === null)
                    focused = document.querySelector('input, textarea');
                else
                    focused = PT_KBf.lastFocused;
                focused.focus();
            }
            else if (document.querySelector)
                focused = document.querySelector(":focus");

            PT_KBf.lastFocused = focused;

            let text = focused.value;
            let caretData = PT.caretPosition(focused, true);

            if (caretData['cursorEnd'] - caretData['cursorPosition'] > 0) {
                text = text.substring(0, caretData['cursorPosition']) + text.substring(caretData['cursorEnd'], text.length);
                focused.value = text;
                focused.selectionStart = caretData['cursorPosition'];
                focused.selectionEnd = caretData['cursorPosition'];
            }

            let caretPos = PT.caretPosition(focused);
            text = focused.value;

            if (btnId !== 'PT_KB_keyID_0') {
                text = text.substring(0, caretPos) + cont + text.substring(caretPos, text.length);
                focused.value = text;
                focused.selectionStart = caretPos + 1;
                focused.selectionEnd = caretPos + 1;
            }
            else {
                if (caretPos > 0) {
                    text = text.substring(0, (caretPos - 1)) + text.substring(caretPos, text.length);
                    focused.value = text;
                    focused.selectionStart = caretPos - 1;
                    focused.selectionEnd = caretPos - 1;
                }
            }

            if (PT_KBf.specialBtn['shift']) {
                let ev = new Event('click');
                wrapp.querySelector('#PT_KB_keyID_4').dispatchEvent(ev);
            }

            if (PT_KBf.specialBtn['alt']) {
                let ev = new Event('click');
                wrapp.querySelector('#PT_KB_keyID_6').dispatchEvent(ev);
            }

        });

        //clickShadow
        buttons[i].addEventListener('mousedown', function (e) {
            e.preventDefault();
            let target = e.target;
            if (!target.classList.contains('PT_KB_key'))
                target = e.target.closest('.PT_KB_key');
            target.classList.add('PT_KB_keyClicked');
        });

        buttons[i].addEventListener('mouseleave', function (e) {
            e.preventDefault();
            let target = e.target;
            if (!target.classList.contains('PT_KB_key'))
                target = e.target.closest('.PT_KB_key');
            target.classList.remove('PT_KB_keyClicked');
        });

        buttons[i].addEventListener('mouseup', function (e) {
            e.preventDefault();
            let ev = new Event('mouseleave');
            buttons[i].dispatchEvent(ev);
        });
    }

    PT_KBf.btnSpecialClickEv(wrapp);
}

PT_KBf.btnSpecialClickEv = function (wrapp) {
    //capslockd
    let btn_0 = wrapp.querySelector('#PT_KB_keyID_3');
    btn_0.addEventListener('click', function (e) {
        e.preventDefault();
        PT_KBf.specialBtn['capsLock'] = !PT_KBf.specialBtn['capsLock'];
        PT_KBf.alphInserter(PT_KBcon.language, PT_KBf.specialBtn['mode']);
        if (PT_KBf.specialBtn['capsLock'])
            btn_0.classList.add('PT_KB_keyClicked');
        else
            btn_0.classList.remove('PT_KB_keyClicked');
    });
    //shift
    let btns_1 = wrapp.querySelectorAll('#PT_KB_keyID_4, #PT_KB_keyID_5');
    for (let i = 0; i < btns_1.length; i++)
        btns_1[i].addEventListener('click', function (e) {
            e.preventDefault();
            PT_KBf.specialBtn['shift'] = !PT_KBf.specialBtn['shift'];
            let clBl = PT_KBf.specialBtn['shift'];
            if (!PT_KBf.specialBtn['alt'])
                PT_KBf.alphInserter(PT_KBcon.language, ((clBl) ? 1 : 0));
            else
                PT_KBf.alphInserter(PT_KBcon.language, 2);

            for (let j = 0; j < btns_1.length; j++)
                if (PT_KBf.specialBtn['shift']) {
                    btns_1[j].classList.add('PT_KB_keyClicked');
                }
                else {
                    btns_1[j].classList.remove('PT_KB_keyClicked');
                }
        });
    //alt
    let btns_2 = wrapp.querySelectorAll('#PT_KB_keyID_6, #PT_KB_keyID_8');
    for (let i = 0; i < btns_2.length; i++)
        btns_2[i].addEventListener('click', function (e) {
            e.preventDefault();
            PT_KBf.specialBtn['alt'] = !PT_KBf.specialBtn['alt'];
            let altBl = PT_KBf.specialBtn['alt'];
            PT_KBf.alphInserter(PT_KBcon.language, ((altBl) ? 2 : 0));

            for (let j = 0; j < btns_2.length; j++)
                if (PT_KBf.specialBtn['alt']) {
                    btns_2[j].classList.add('PT_KB_keyClicked');
                }
                else {
                    btns_2[j].classList.remove('PT_KB_keyClicked');
                }
        });

}

//wyswietla/ chowa klawiature
PT_KBf.displayKeyboard = function () {
    let isDisplayed = (document.querySelector('#PT_KB_wrapper').style.display !== 'block') ? false : true;
    document.querySelector('#PT_KB_wrapper').style.display = ((isDisplayed) ? 'none' : 'block');
}

// sprawdza który input został ostatnio aktywowany
PT_KBf.focusListener = function () {

    let inputs;
    if (document.querySelectorAll('input').length > 0)
        inputs = document.querySelectorAll('input');
    if (document.querySelectorAll('textarea').length > 0)
        inputs += document.querySelectorAll('textarea');

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('focus', function PT_KB_inpurClickEv(e) {
            PT_KBf.lastFocused = inputs[i];
        });
    }

}
//ładowanie do KB daneo algabatu i/lub znaków specjalnych
PT_KBf.alphInserter = function (alph, mode) {

    PT_KBf.specialBtn['mode'] = mode;

    let kbBtns = document.querySelectorAll('.PT_KB_keyEdit');

    for (let i = 0; i < alph.length; i++) {
        if (mode == 0 || mode == 2) {
            if (PT_KBf.specialBtn['capsLock'] || PT_KBf.specialBtn['shift'])
                kbBtns[i].innerHTML = PT_KBalp.alpPL[i][mode].toUpperCase();
            else
                kbBtns[i].innerHTML = PT_KBalp.alpPL[i][mode];
        }
        if (mode == 1) {
            if (PT_KBalp.alpPL[i][mode] === '')
                kbBtns[i].innerHTML = PT_KBalp.alpPL[i][0].toUpperCase();
            else
                kbBtns[i].innerHTML = PT_KBalp.alpPL[i][1];
        }
    }

}

PT_KBf.keyboardCreateBody = function (wrapp) {//generuj w bardziej cywilizowany sposób

    wrapp.innerHTML = '<div id="PT_KB_header">                <div id="PT_KB_closeBtn" onclick="PT_KBf.displayKeyboard()"><img src="'+PT_KBcon.imgPath+'PT_KB_closeImg.png">                </div>                <div class="PT_EOF"></div>            </div><div class="PT_KB_keyLine"><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">`</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">1</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">2</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">3</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">4</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">5</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">6</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">7</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">8</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">9</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">0</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">-</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">=</p></div><div class="PT_KB_key PT_KB_key_Funct" id="PT_KB_keyID_0">    <img src="'+PT_KBcon.imgPath+'PT_KB_backspace.png"></div><div class="PT_EOF"></div>                </div>                <div class="PT_KB_keyLine"><div class="PT_KB_key PT_KB_key_Alphabet" id="PT_KB_keyID_1">    <p class="PT_KB_keyEdit">q</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">w</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">e</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">r</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">t</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">y</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">u</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">i</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">o</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">p</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">[</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">]</p></div><div class="PT_KB_key PT_KB_key_Alphabet PT_KB_key_Funct" id="PT_KB_keyID_2">    <p class="PT_KB_keyEdit">\</p></div><div class="PT_EOF"></div>                </div>                <div class="PT_KB_keyLine"><div class="PT_KB_key PT_KB_key_Funct" id="PT_KB_keyID_3">    <img src="'+PT_KBcon.imgPath+'PT_KB_capsLock.png"></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">a</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">s</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">d</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">f</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">g</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">h</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">j</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">k</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">l</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">;</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">\'</p></div><div class="PT_EOF"></div>                </div>                <div class="PT_KB_keyLine"><div class="PT_KB_key PT_KB_key_Funct" id="PT_KB_keyID_4">    <p>Shift</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">z</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">x</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">c</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">v</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">b</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">n</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">m</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">,</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">.</p></div><div class="PT_KB_key PT_KB_key_Alphabet">    <p class="PT_KB_keyEdit">/</p></div><div class="PT_KB_key PT_KB_key_Funct" id="PT_KB_keyID_5">    <p>Shift</p></div><div class="PT_EOF"></div>                </div>                <div class="PT_KB_keyLine"><div class="PT_KB_key PT_KB_key_Funct" id="PT_KB_keyID_6">    <p>Alt</p></div><div class="PT_KB_key PPT_KB_key_Funct" id="PT_KB_keyID_7">    <p></p></div><div class="PT_KB_key PT_KB_key_Funct" id="PT_KB_keyID_8">    <p>Alt</p></div><div class="PT_EOF"></div>                </div>';

}