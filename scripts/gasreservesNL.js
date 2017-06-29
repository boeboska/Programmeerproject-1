var svg5 = d3.select("svg#container5"),
    margin = {up: 20, right: 20, bottom: 30, left: 40},
    width = +svg5.attr("width") - margin.left - margin.right,
    height = +svg5.attr("height") - margin.up - margin.bottom;

// Append title
svg5.append("text")
    .attr("x", (20))             
    .attr("y", 12)
    .attr("text-anchor", "left")  
    .style("font-size", "16px")  
    .text("Aardgasreserves Nederland");

var parseTime = d3.timeParse("%Y")
    bisectDate = d3.bisector(function(d) { return d.year; }).left;

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var line5 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.value); });

var g5 = svg5.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.up + ")");

d3.json("GasreservesNL.json", function(error, data5) {
    if (error) throw error;

    data5.forEach(function(d) {
      d.year = parseTime(d.year);
      d.value = +d.value;
    });

    x.domain(d3.extent(data5, function(d) { return d.year; }));
    y.domain([d3.min(data5, function(d) { return d.value; }) / 1.005, d3.max(data5, function(d) { return d.value; }) * 1.005]);

    g5.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g5.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return parseInt(d / 1000) + "k"; }))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "#5D6971")
        .text("In miljoenen euro's");

    g5.append("path")
        .datum(data5)
        .attr("class", "line")
        .attr("d", line5);

    var tip = g5.append("g")
        .attr("class", "focus")
        .style("display", "none");

    tip.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    tip.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", width)
        .attr("x2", width);

    tip.append("circle")
        .attr("r", 7.5);

    tip.append("text")
        .attr("x", 15)
      	.attr("dy", ".31em");

    svg5.append("rect")
        .attr("transform", "translate(" + margin.left + "," + margin.up + ")")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { tip.style("display", null); })
        .on("mouseout", function() { tip.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
      var x0 = x.invert(d3.mouse(this)[0]),
          i = x0.getYear() - 88,
          // i = bisectDate(data5, x0, 1),
          d0 = data5[i - 1],
          d1 = data5[i],

          d = x0 - d0.year > d1.year - x0 ? d1 : d0;
          console.log(x0.getYear() - 88, i);
      tip.attr("transform", "translate(" + x(d.year) + "," + y(d.value) + ")");
      tip.select("text").text(function() { return d.value; });
      tip.select(".x-hover-line").attr("y2", height - y(d.value));
      tip.select(".y-hover-line").attr("x2", width + width);
    }
});
