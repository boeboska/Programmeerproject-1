var svg1 = d3.select("svg#container3"),
    margin = {top: 30, right: 70, bottom: 30, left: 50},
    width = +svg1.attr("width") - margin.left - margin.right,
    height = +svg1.attr("height") - margin.top - margin.bottom;

// Append title
svg1.append("text")
    .attr("x", (10))             
    .attr("y", 20)
    .attr("text-anchor", "left")  
    .style("font-size", "16px")  
    .text("Netherlands: Natural Gas Reserves");

var parseTime = d3.timeParse("%Y")
    bisectDate = d3.bisector(function(d) { return d.year; }).left;

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.value); });

var g1 = svg1.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data.json", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
      d.year = parseTime(d.year);
      d.value = +d.value;
    });

    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([d3.min(data, function(d) { return d.value; }) / 1.005, d3.max(data, function(d) { return d.value; }) * 1.005]);

    g1.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g1.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return parseInt(d); }))
      .append("text")
        .attr("class", "axis-title")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "#5D6971")
        .text("Billion m3");

    g1.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
});
