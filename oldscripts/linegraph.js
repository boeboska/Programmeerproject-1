function drawLinegraph(container, container2, data) {

  var svg = d3.select(container),
      margin = {top: 30, right: 70, bottom: 30, left: 50},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  // Append title
  svg.append("text")
      .attr("x", (10))             
      .attr("y", 20)
      .attr("text-anchor", "left")  
      .style("font-size", "16px")  
      .text("Aardgasreserves Nederland");

  var parseTime = d3.timeParse("%Y")
      bisectDate = d3.bisector(function(d) { return d.Year; }).left;

  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  var line = d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.Marketvalue); });

  var g3 = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json(data, function(error, data) {
      if (error) throw error;

      data.forEach(function(d) {
        d.Year = parseTime(d.Year);
        d.Marketvalue = +d.Marketvalue;
      });

      x.domain(d3.extent(data, function(d) { return d.Year; }));
      y.domain([0,1000]);

      g3.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")


      g3.append("g")
          .attr("class", "axis axis--y")

        .append("text")
          .attr("class", "axis-title")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .attr("fill", "#5D6971")

      g3.append("path")
          .datum(data)
          .attr("class", "line")
          .attr("d", line);

      var tip = g3.append("g")
          .attr("class", "tip")
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

      // if first iteratin of function
      // tip2 = tip;

      // if (container === "svg#container1") {
      //   console.log('hallo')
      //   tip2 = tip;
      // }

      svg.append("rect")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height)
          .on("mouseover", function() { tip.style("display", null); })
          .on("mouseout", function() { tip.style("display", "none"); })
          .on("mousemove", mousemove);

      // svg2.append("rect")
      //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      //     .attr("class", "overlay")
      //     .attr("width", width)
      //     .attr("height", height)
      //     .on("mouseover", function() { tip.style("display", null); })
      //     .on("mouseout", function() { tip.style("display", "none"); })
      //     .on("mousemove", mousemove);

      function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.Year > d1.Year - x0 ? d1 : d0;
        tip.attr("transform", "translate(" + x(d.Year) + "," + y(d.Marketvalue) + ")");
        tip.select("text").text(function() { return d.Marketvalue; });
        tip.select(".x-hover-line").attr("y2", height - y(d.Marketvalue));
        tip.select(".y-hover-line").attr("x2", width + width);

        // tip2.attr("transform", "translate(" + x(d.Year) + "," + y(d.Marketvalue) + ")");
        // tip2.select("text").text(function() { return d.Marketvalue; });
        // tip2.select(".x-hover-line").attr("y2", height - y(d.Marketvalue));
        // tip2.select(".y-hover-line").attr("x2", width + width);
      }
  });
}

drawLinegraph("svg#container1", "svg#container2", "dataNL.json")
drawLinegraph("svg#container2", "svg#container1", "dataNW.json")



d3.select('#inds')
      .on("change", function () {
        selectValue = d3.select('select').property('value')
        if (selectValue === "Norwayfund") {
          d3.select("svg#container1").selectAll("rect").remove();
          d3.select("svg#container1").select("g").remove();
          d3.select("svg#container1").select("path.line").remove();
          drawChart("svg#container1", "CompositionFundNL.csv", "Netherlands");
          drawLinegraph("svg#container1", "svg#container2", "dataNL.json");
        }
        else if (selectValue === "Pensionfunds") {
          d3.select("svg#container1").selectAll("rect").remove();
          d3.select("svg#container1").select("g").remove();
          d3.select("svg#container1").select("path.line").remove();
          drawChart("svg#container1", "CompositionFundNLPension.csv", "Netherlands");
          drawLinegraph("svg#container1", "svg#container2", "dataNLPension.json");
        }
      })

      


