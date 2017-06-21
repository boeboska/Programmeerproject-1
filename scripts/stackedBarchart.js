function drawChart(container, barchartdata, country) {

  // Create svg
  var svg = d3.select(container),
    margin = {top: 40, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g2 = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Append title
  svg.append("text")
        .attr("x", (10))             
        .attr("y", 20)
        .attr("text-anchor", "left")  
        .style("font-size", "16px")  
        .text(country);

  // Prep the tooltip bits, initial display is hidden
  var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");
      
  tooltip.append("rect")
    .attr("width", 60)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5);

  tooltip.append("text")
    .attr("x", 30)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");

  // Create x, y and z scale
  var x = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.05)
      .align(0.1);

  var y = d3.scaleLinear()
      .rangeRound([height, 0]);

  var z = d3.scaleOrdinal()
      .range(["#d0743c", "#ff8c00"]);

  // Load data barchart
  d3.csv(barchartdata, function(d, i, columns) {
    for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;
  }, function(error, data) {
    if (error) throw error;

    var keys = data.columns.slice(1);

    x.domain(data.map(function(d) { return d.Jaar; }));
    y.domain([0, 1000]).nice();
    z.domain(keys);

  // Add bars
    g2.append("g")
      .selectAll("g")
      .data(d3.stack().keys(keys)(data))
      .enter().append("g")
        .attr("fill", function(d) { return z(d.key); })
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("class", function(d) { return (d.data.Jaar); })
        .attr("x", function(d) { return x(d.data.Jaar); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth())
      .on("mouseover", function() { tooltip.style("display", null); })
      .on("mouseout", function() { tooltip.style("display", "none"); })
      .on("mousemove", function(d) {
        var xPosition = d3.mouse(this)[0] - 5;
        var yPosition = d3.mouse(this)[1] - 5;
        tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        tooltip.select("text").text(d[1]-d[0]);
      });

// wat moet ik doen? functie maken die allebei de rechthoeken met class jaar selecteert en
// daar de tooltip aanvast maakt.

  // Add x-axis
    g2.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
            .tickValues(x.domain().filter(function(d,i){return !(i%5)})));

  // Add y-axis
    g2.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(10, "r"))
      .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("In EUR billions");

  // Add legend
    var legend = g2.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });
  });
}

drawChart("svg#container2", "CompositionFundNorway.csv", "Norway")
drawChart("svg#container1", "AardgasbatenNL.csv", "Netherlands")





