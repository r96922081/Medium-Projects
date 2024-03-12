import * as generated_defs from "../../my_modules/generated_defs.js";
var timer_interval = 10000;
function change_landscape() {
    function get_random_int(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    var landscape_img = document.getElementById("landscape_img");
    if (landscape_img == null)
        return;
    landscape_img.src = generated_defs.landscapes[get_random_int(generated_defs.landscapes.length)];
    setTimeout(change_landscape, timer_interval);
}
function me_on_load_function() {
    change_landscape();
}
window.onload = me_on_load_function;
//# sourceMappingURL=welcome.js.map