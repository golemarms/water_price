// const h = require("./helper.js");
let volume_m3 = 0;

function elem(id) {
    return document.getElementById(id);
};

function update_equation() {
    let vol = exports.m3_breakdown(volume_m3, round=true);
    let prices = exports.water_price;
    document.querySelector("#first_40_sgd_component").innerHTML = volume_m3 ? `$${prices.first_40} ✖ ${vol.first_40} m<sup>3</sup>` : "";
    document.querySelector("#sgd_equation_plus").innerHTML = vol.beyond_40 ? "+" : "";
    document.querySelector("#beyond_40_sgd_component").innerHTML = vol.beyond_40 ? `$${prices.beyond_40} ✖ ${vol.beyond_40} m<sup>3</sup>` : "";
    document.querySelector("#sgd_sum").innerHTML = volume_m3 ? ` = $${exports.m3_to_sgd(volume_m3)}` : "";
}

window.onload = () => {
    document.querySelector("#volume_m3_input")
            .addEventListener("input", e => {
                    volume_m3 = parseFloat(e.target.value);
                    elem("sgd_input").value = exports.m3_to_sgd(volume_m3);
                    update_equation();
                });

    document.querySelector("#sgd_input")
            .addEventListener("input", e => {
                    volume_m3 = exports.sgd_to_m3(parseFloat(e.target.value));
                    elem("volume_m3_input").value = volume_m3;
                    update_equation();
                });
}
