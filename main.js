import * as h from "./helper.js"
let volume_m3 = 0;
let density_data = h.density_data;
let width = 200;
let height = 50;
let margin = ({top: 10, right: 0, bottom: 10, left: 0});

function elem(id) {
    return document.getElementById(id);
};

function update(new_cons) {
    update_histogram(new_cons);
    update_morethan(new_cons);
    update_equation(new_cons);
}

document.querySelector("#volume_m3_input")
        .addEventListener("input", e => {
                volume_m3 = parseFloat(e.target.value);
                elem("sgd_input").value = h.m3_to_sgd(volume_m3, true);
                update(volume_m3);
            });

document.querySelector("#sgd_input")
        .addEventListener("input", e => {
                volume_m3 = h.sgd_to_m3(parseFloat(e.target.value));
                elem("volume_m3_input").value = h.my_round(volume_m3);
                update(volume_m3);
            });

function set_html_and_tooltip(query_selector, html, tooltip_message="") {
    let elem = document.querySelector(query_selector)
    elem.innerHTML = html;
    if (tooltip_message) {
        elem.setAttribute("data-tooltip", tooltip_message);
        elem.setAttribute("data-position", "center bottom");
    }
    else elem.removeAttribute("data-tooltip");
}

function update_equation(new_cons) {
    let vol = h.m3_breakdown(new_cons, true);
    let prices = h.water_price;
    let cost_breakdown = h.m3_cost_breakdown(new_cons, true);
    set_html_and_tooltip("#first_40_sgd_component",
                         new_cons ? `$${prices.first_40} ✖ ${vol.first_40.toLocaleString()} m<sup>3</sup>` : "",
                         new_cons ? `Cost of first <b>${vol.first_40}</b> m<sup>3</sup> : <b>$${cost_breakdown.first_40}</b>` : "");
    set_html_and_tooltip("#sgd_equation_plus", vol.beyond_40 ? "+" : "");
    set_html_and_tooltip("#beyond_40_sgd_component",
                         vol.beyond_40 ? `$${prices.beyond_40} ✖ ${vol.beyond_40.toLocaleString()} m<sup>3</sup>` : "",
                         vol.beyond_40 ? `Cost of next <b>${vol.beyond_40}</b> m<sup>3</sup> : <b>$${cost_breakdown.beyond_40}</b>`: "");
    set_html_and_tooltip("#sgd_sum", 
                         new_cons ? ` = $${h.m3_to_sgd(new_cons, true).toLocaleString()}` : "",
                         new_cons ? "Total cost" : "")
                         
}

var tooltip = new Tooltip({
    theme: "light", // Selects one of the pre-defined tooltip styles - light or dark.
    distance: 5,    // Specifies the distance in pixels from trigger to tooltip.
    delay: 0        // Specifies how long the tooltip remains visible (in ms) after the mouse leaves the trigger.
});

let y_scale = d3.scaleLinear()
                .domain([0, d3.max(density_data, d => d.pdf)])
                .range([height - margin.bottom, margin.top])

let x_scale = d3.scaleBand()
            .domain(density_data.map(d => d.group))
            .range([margin.left, width - margin.right])
            .padding(0.1)
            .round(true)

let x_scale_linear = vol => Math.min(d3.scaleLinear()
            .domain([0, d3.max(density_data, d => d.group)])
            .range([margin.left, width - margin.right])(vol) ,
            width - margin.right
            )

let lookup_pct = consumption => {
                let groups_exceeded = density_data.filter(d => consumption > d.group);
                return groups_exceeded.length > 0 ? groups_exceeded.slice(-1)[0].cdf : 0
                }


function update_histogram(new_cons) { 
    let svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
    let which_color = group_consumption => group_consumption > new_cons ? "grey" : "steelblue"
    let density_data_color = density_data.map(o => ({...o, color:which_color(o.group)}))
           
    svg.append("g")
      .selectAll("rect")
      .data(density_data_color)
      .join("rect")
      .attr("x", d => x_scale(d.group))
      .attr("y", d => y_scale(d.pdf))
      .attr("height", d => y_scale(0)-y_scale(d.pdf))
      .attr("width", x_scale.bandwidth())
      .attr("fill", d => d.color)
    
    // svg.append("g")
    //    .append("text")
    //    .attr("text-anchor", new_cons < 60 ? "start" : "end")
    //    .append("tspan")
    //    .html(`More than ${Math.round(lookup_pct(new_cons) * 100)}%  of SG households`)
    //    .attr("x", x_scale_linear(new_cons))
    //    .attr("y", 40)
    
    let div_node = d3.select("#histogram_div")
    div_node.html("")
    if (new_cons) div_node.append(() => svg.node())        
}

let color_morethan = d3.scaleSequential()
                       .domain([100, 0])
                       .interpolator(d3.interpolateRdYlGn)

function update_morethan(new_cons) {
    let pct = lookup_pct(new_cons) * 100
    let style = `color: ${color_morethan(pct)}; text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;`
    document.querySelector("#morethan").innerHTML = new_cons ? `More than <span style="${style}"> ${Math.round(pct)}% </span> of SG households` : "";
}