// const h = require("./helper.js");
let volume_m3 = 0;

function elem(id) {
    return document.getElementById(id);
};

window.onload = () => {
    document.querySelector("#volume_m3_input")
            .addEventListener("input", e => {
                    volume_m3 = parseFloat(e.target.value);
                    elem("sgd_input").value = exports.m3_to_sgd(volume_m3);
                });

    document.querySelector("#sgd_input")
            .addEventListener("input", e => {
                    volume_m3 = exports.sgd_to_m3(parseFloat(e.target.value));
                    elem("volume_m3_input").value = volume_m3; 
                })
};
