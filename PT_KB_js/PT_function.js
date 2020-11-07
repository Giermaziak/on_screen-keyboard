var PT = {}// make makeDragable for pos: absolute in relative

PT.makeDragable = function (obj, by = null, bordersCollision = true, axis = null, callback = null) {//for relative
    //1desc: obj - jaki obiekt, 1by - za jaki obiekt(bedacy dzieckiem $obj), 
    //1borderColision(false|true) - kolizja z patentem, 1axis(null(x,y), false(y), true(x)) 
    //1callback

    if (by === null)
        by = obj;

    by.addEventListener('mousedown', function (e) {
        e.preventDefault();

        let rectKeyboard = e.target.parentElement.getBoundingClientRect();
        let currPoint = {
            'y': rectKeyboard.top,
            'x': rectKeyboard.left,
            'width': rectKeyboard.width,
            'height': rectKeyboard.height
        }

        let clickPoint = {
            'x': e.clientX,
            'y': e.clientY
        }

        window.addEventListener('mousemove', function makeDragable_mosueMove(e) {
            e.preventDefault();

            if (e.buttons === 0) {
                window.removeEventListener('mousemove', makeDragable_mosueMove);
                return 0;
            }

            let x = e.clientX - clickPoint['x'] + currPoint['x'];
            let y = e.clientY - clickPoint['y'] + currPoint['y'];

            if (bordersCollision) {
                x = (x < 0 || x + currPoint['width'] > PT.getDocumentWidth()) ? ((x < 0) ? 0 : PT.getDocumentWidth() - currPoint['width']) : x;
                y = (y < 0 || y + currPoint['height'] > window.innerHeight) ? ((y < 0) ? 0 : window.innerHeight - currPoint['height']) : y;
            }

            if (axis === null) {
                obj.style.left = x + 'px';
                obj.style.top = y + 'px';
            } else
                if (axis)
                    obj.style.left = x + 'px';
                else
                    obj.style.top = y + 'px';
        });

        window.addEventListener('mouseup', function makeDragable_mosueUp(e) {
            if (typeof callback == "function")
                callback();
            window.removeEventListener('mouseup', makeDragable_mosueUp);
        });
    });
}

PT.getDocumentWidth = function () {//zwraca szerokość dokumentu
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

PT.getDocumentHeight = function () {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

PT.caretPosition = function (input, selRage = false) {//zwraza pozycje kursowa lub zaznaczony zakres
    let start = input.selectionStart,
        end = input.selectionEnd;
       
    if (!selRage) {
        if (start >= 0)
            return start;
    }
    else {
        if (start >= 0)
            return arr = {
                'cursorPosition': start,
                'cursorEnd': end,
                'range': end - start
            }
    }
}