function drawLinegraph(container, container2, data) {

  var svg = d3.select(container),
      margin = {top: 30, right: 20, bottom: 30, left: 50},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var svg2 = d3.select(container2)

  var parseTime = d3.timeParse("%Y")
      bisectDate = d3.bisector(function(d) { return d.Year; }).left;

  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  var line = d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.Marketvalue); });

  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json(data, function(error, data) {
      if (error) throw error;

      data.forEach(function(d) {
        d.Year = parseTime(d.Year);
        d.Marketvalue = +d.Marketvalue;
      });

      x.domain(d3.extent(data, function(d) { return d.Year; }));
      y.domain([0,1000]);

      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")


      g.append("g")
          .attr("class", "axis axis--y")

        .append("text")
          .attr("class", "axis-title")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .attr("fill", "#5D6971")

      g.append("path")
          .datum(data)
          .attr("class", "line")
          .attr("d", line);

      var focus = g.append("g")
          .attr("class", "focus")
          .style("display", "none");

      focus.append("line")
          .attr("class", "x-hover-line hover-line")
          .attr("y1", 0)
          .attr("y2", height);

      focus.append("line")
          .attr("class", "y-hover-line hover-line")
          .attr("x1", width)
          .attr("x2", width);

      focus.append("circle")
          .attr("r", 7.5);

      focus.append("text")
          .attr("x", 15)
        	.attr("dy", ".31em");

      svg.append("rect")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height)
          .on("mouseover", function() { focus.style("display", null); })
          .on("mouseout", function() { focus.style("display", "none"); })
          .on("mousemove", mousemove);

      svg2.append("rect2")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height)
          .on("mouseover", function() { focus.style("display", null); })
          .on("mouseout", function() { focus.style("display", "none"); })
          .on("mousemove", mousemove);

      function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.Year > d1.Year - x0 ? d1 : d0;
        focus.attr("transform", "translate(" + x(d.Year) + "," + y(d.Marketvalue) + ")");
        focus.select("text").text(function() { return d.Marketvalue; });
        focus.select(".x-hover-line").attr("y2", height - y(d.Marketvalue));
        focus.select(".y-hover-line").attr("x2", width + width);
      }


  });

}

drawLinegraph("svg#container1", "svg#container2", "dataNL.json")
drawLinegraph("svg#container2", "svg#container1", "dataNW.json")


d3.select('#inds')
      .on("change", function () {
        d3.select("g", "focus")
          .remove()
      })
      


