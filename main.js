import * as h from "./helper.js"
let volume_m3 = 0;

function elem(id) {
    return document.getElementById(id);
};

function update_equation() {
    let vol = h.m3_breakdown(volume_m3, true);
    let prices = h.water_price;
    document.querySelector("#first_40_sgd_component").innerHTML = volume_m3 ? `$${prices.first_40} ✖ ${vol.first_40.toLocaleString()} m<sup>3</sup>` : "";
    document.querySelector("#sgd_equation_plus").innerHTML = vol.beyond_40 ? "+" : "";
    document.querySelector("#beyond_40_sgd_component").innerHTML = vol.beyond_40 ? `$${prices.beyond_40} ✖ ${vol.beyond_40.toLocaleString()} m<sup>3</sup>` : "";
    document.querySelector("#sgd_sum").innerHTML = volume_m3 ? ` = $${h.m3_to_sgd(volume_m3, true).toLocaleString()}` : "";
}

window.onload = () => {
    document.querySelector("#volume_m3_input")
            .addEventListener("input", e => {
                    volume_m3 = parseFloat(e.target.value);
                    elem("sgd_input").value = h.m3_to_sgd(volume_m3, true);
                    update_equation();
                });

    document.querySelector("#sgd_input")
            .addEventListener("input", e => {
                    volume_m3 = h.sgd_to_m3(parseFloat(e.target.value));
                    elem("volume_m3_input").value = h.my_round(volume_m3);
                    update_equation();
                });
}
