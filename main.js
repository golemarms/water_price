import * as h from "./helper.js"
let volume_m3 = 0;

function elem(id) {
    return document.getElementById(id);
};

function set_html_and_tooltip(query_selector, html, tooltip_message="") {
    let elem = document.querySelector(query_selector)
    elem.innerHTML = html;
    if (tooltip_message) {
        elem.setAttribute("data-tooltip", tooltip_message);
        elem.setAttribute("data-position", "center bottom");
    }
    else elem.removeAttribute("data-tooltip");
}

function update_equation() {
    let vol = h.m3_breakdown(volume_m3, true);
    let prices = h.water_price;
    let cost_breakdown = h.m3_cost_breakdown(volume_m3, true);
    set_html_and_tooltip("#first_40_sgd_component",
                         volume_m3 ? `$${prices.first_40} ✖ ${vol.first_40.toLocaleString()} m<sup>3</sup>` : "",
                         volume_m3 ? `Cost of first <b>${vol.first_40}</b> m<sup>3</sup> : <b>$${cost_breakdown.first_40}</b>` : "");
    set_html_and_tooltip("#sgd_equation_plus", vol.beyond_40 ? "+" : "");
    set_html_and_tooltip("#beyond_40_sgd_component",
                         vol.beyond_40 ? `$${prices.beyond_40} ✖ ${vol.beyond_40.toLocaleString()} m<sup>3</sup>` : "",
                         vol.beyond_40 ? `Cost of next <b>${vol.beyond_40}</b> m<sup>3</sup> : <b>$${cost_breakdown.beyond_40}</b>`: "");
    set_html_and_tooltip("#sgd_sum", 
                         volume_m3 ? ` = $${h.m3_to_sgd(volume_m3, true).toLocaleString()}` : "",
                         volume_m3 ? "Total cost" : "")
                         
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

var tooltip = new Tooltip({
    theme: "light", // Selects one of the pre-defined tooltip styles - light or dark.
    distance: 5,    // Specifies the distance in pixels from trigger to tooltip.
    delay: 0        // Specifies how long the tooltip remains visible (in ms) after the mouse leaves the trigger.
});
