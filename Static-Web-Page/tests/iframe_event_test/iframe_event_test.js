"use strict";
function fix_iframe_2() {
    var f1 = document.getElementById("if1");
    if (f1.contentDocument == null) {
        setTimeout(fix_iframe_2, 0);
        return;
    }
    if (f1.contentDocument.body == null) {
        setTimeout(fix_iframe_2, 0);
        return;
    }
    // @ts-ignorex
    if (f1.contentDocument.body.fixed == undefined) {
        f1.contentDocument.body.addEventListener('mousemove', mouse_move_iframe);
        f1.contentDocument.body.style.margin = "0px";
        // @ts-ignorex
        f1.contentDocument.body.fixed = true;
        return;
    }
    else {
        setTimeout(fix_iframe_2, 0);
    }
}
function init() {
    var f1 = document.getElementById("if1");
    // @ts-ignorex
    f1.contentDocument.body.fixed = true;
    f1.src = "iframe_embedded_event_test.html";
    setTimeout(fix_iframe_2, 0);
    window.document.body.addEventListener('mousemove', mouse_move);
}
function mouse_move(e) {
    console.log("mouse_move!!! mouse y = " + e.clientY + ' x = ' + e.clientX);
}
function mouse_move_iframe(e) {
    console.log("mouse_move_iframe!!! mouse y = " + e.clientY + ' x = ' + e.clientX);
}
window.onload = init;
//# sourceMappingURL=iframe_event_test.js.map