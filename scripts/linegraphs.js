queue()
  .defer(d3.json, "dataNL.json")
  .defer(d3.json, "dataNW.json")
  .defer(d3.json, "dataNLPension.json")
  .await(drawLinegraphs);

// Change with dropdownmenu
d3.select('#inds')
  .on("change", function () {
    selectValue = d3.select('select').property('value')
    if (selectValue === "Norwayfund") {
      d3.select("svg#container1").selectAll("rect").remove();
      d3.select("svg#container1").selectAll("text").remove();
      d3.select("svg#container1").selectAll("g").remove();
      d3.select("svg#container1").selectAll("path.line").remove();
      drawChart("svg#container1", "CompositionFundNL.csv", "Netherlands");
      queue()
  		.defer(d3.json, "dataNL.json")
  		.defer(d3.json, "dataNW.json")
  		.await(drawLinegraphs);
    }
    else if (selectValue === "Pensionfunds") {
      d3.select("svg#container1").selectAll("rect").remove();
      d3.select("svg#container1").selectAll("text").remove();
      d3.select("svg#container1").selectAll("g").remove();
      d3.select("svg#container1").selectAll("path.line").remove();
      drawChart("svg#container1", "CompositionFundNLPension.csv", "Netherlands");
      queue()
      	.defer(d3.json, "dataNLPension.json")
  		.defer(d3.json, "dataNW.json")
  		.await(drawLinegraphs);
    }
})

function drawLinegraphs(error, dataNL, dataNW) {
	if (error) throw error;

	var svg1 = d3.select("svg#container1"),
      margin = {top: 30, right: 70, bottom: 30, left: 50},
      width = +svg1.attr("width") - margin.left - margin.right,
      height = +svg1.attr("height") - margin.top - margin.bottom;

	var svg2 = d3.select("svg#container2"),
      margin = {top: 30, right: 70, bottom: 30, left: 50},
      width = +svg2.attr("width") - margin.left - margin.right,
      height = +svg2.attr("height") - margin.top - margin.bottom;

    var svg3 = d3.select("svg#container3");

	var parseTime = d3.timeParse("%Y")
      bisectDate = d3.bisector(function(d) { return d.Year; }).left;

  	var x = d3.scaleTime().range([0, width]);
  	var y = d3.scaleLinear().range([height, 0]);

  	var line = d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d.Marketvalue); });

  	var g1 = svg1.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var g2 = svg2.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Draw line NL
	dataNL.forEach(function(d) {
	d.Year = parseTime(d.Year);
	d.Marketvalue = +d.Marketvalue;
	});

	x.domain(d3.extent(dataNL, function(d) { return d.Year; }));
	y.domain([0,1000]);

	g1.append("g")
	  .attr("class", "axis axis--x")
	  .attr("transform", "translate(0," + height + ")")


	g1.append("g")
	  .attr("class", "axis axis--y")

	.append("text")
	  .attr("class", "axis-title")
	  .attr("transform", "rotate(-90)")
	  .attr("y", 6)
	  .attr("dy", ".71em")
	  .style("text-anchor", "end")
	  .attr("fill", "#5D6971")

	g1.append("path")
	  .datum(dataNL)
	  .attr("class", "line")
	  .attr("d", line);

	var focus1 = g1.append("g")
	  .attr("class", "focus")
	  .style("display", "none");

	focus1.append("line")
	  .attr("class", "x-hover-line hover-line")
	  .attr("y1", 0)
	  .attr("y2", height);

	focus1.append("line")
	  .attr("class", "y-hover-line hover-line")
	  .attr("x1", width + margin.right)
	  .attr("x2", width + margin.right);

	focus1.append("circle")
	  .attr("r", 7.5);

	focus1.append("text")
	  .attr("x", 15)
		.attr("dy", ".31em");

	svg1.append("rect")
	  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	  .attr("class", "overlay")
	  .attr("width", width)
	  .attr("height", height)
		  .on("mouseover", function() { 
		  	focus1.style("display", null); 
		  	focus2.style("display", null); 
		  	tooltip1.style("visibility", "visible"); 
		  	tooltip2.style("visibility", "visible"); 
		  })
		  .on("mouseout", function() { 
		  	focus1.style("display", "none"); 
		  	focus2.style("display", "none"); 
		  	tooltip1.style("visibility", "visible"); 
		  	tooltip2.style("visibility", "visible");
		  })
		  .on("mousemove", mousemove);

	// Draw line Norway
	dataNW.forEach(function(d) {
	d.Year = parseTime(d.Year);
	d.Marketvalue = +d.Marketvalue;
	});

	x.domain(d3.extent(dataNW, function(d) { return d.Year; }));
	y.domain([0,1000]);

	g2.append("g")
	  .attr("class", "axis axis--x")
	  .attr("transform", "translate(0," + height + ")")


	g2.append("g")
	  .attr("class", "axis axis--y")

	.append("text")
	  .attr("class", "axis-title")
	  .attr("transform", "rotate(-90)")
	  .attr("y", 6)
	  .attr("dy", ".71em")
	  .style("text-anchor", "end")
	  .attr("fill", "#5D6971")

	g2.append("path")
	  .datum(dataNW)
	  .attr("class", "line")
	  .attr("d", line);

	var focus2 = g2.append("g")
	  .attr("class", "focus")
	  .style("display", "none");

	focus2.append("line")
	  .attr("class", "x-hover-line hover-line")
	  .attr("y1", 0)
	  .attr("y2", height);

	focus2.append("line")
	  .attr("class", "y-hover-line hover-line")
	  .attr("x1", width+margin.right)
	  .attr("x2", width+margin.right);

	focus2.append("circle")
	  .attr("r", 7.5);

	focus2.append("text")
	  .attr("x", 30)
	  .attr("dy", ".31em");

	svg2.append("rect")
	  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	  .attr("class", "overlay")
	  .attr("width", width)
	  .attr("height", height)
		  .on("mouseover", function() { 
		  	focus2.style("display", null);
		  	focus1.style("display", null); 
		  	tooltip2.style("visibility", "visible"); 
		  	tooltip1.style("visibility", "visible"); 
		  })
		  .on("mouseout", function() { 
		  	focus2.style("display", "none");
		  	focus1.style("display", null); 
		  	tooltip2.style("visibility", "visible"); 
		  	tooltip1.style("visibility", "visible");
		  })
		  .on("mousemove", mousemove);

  	var tooltip1 = d3.select("div.chartstart")

	  .style("position", "relative")
	  .style("text-anchor", "left")
	  .style("z-index", "100")
	  .style("visibility", "hidden");

	tooltip1.append("text1")
	  .attr("x", 10)
	  .attr("dy", ".31em");

	var tooltip2 = d3.select("div.chartstart2")

	  .style("position", "relative")
	  .style("text-anchor", "left")
	  .style("z-index", "100")
	  .style("visibility", "hidden");

	tooltip2.append("text2")
	  .attr("x", 10)
	  .attr("dy", ".31em");


	// Create function for mousemove
	function mousemove() {
	var x0 = x.invert(d3.mouse(this)[0]),
	    i = bisectDate(dataNL, x0, 1),
	    d0 = dataNL[i - 1],
	    d1 = dataNL[i],
	    d = x0 - d0.Year > d1.Year - x0 ? d1 : d0;
		d2 = dataNW[d.Year.getYear() - 69];
	focus1.attr("transform", "translate(" + x(d.Year) + "," + y(d.Marketvalue) + ")");
	focus1.select("text").text(function() { return d.Marketvalue; });
	focus1.select(".x-hover-line").attr("y2", height - y(d.Marketvalue));
	focus1.select(".y-hover-line").attr("x2", width + width);
	focus2.attr("transform", "translate(" + x(d2.Year) + "," + y(d2.Marketvalue) + ")");
	focus2.select("text").text(function() { return d2.Marketvalue; });
	focus2.select(".x-hover-line").attr("y2", height - y(d2.Marketvalue));
	focus2.select(".y-hover-line").attr("x2", width + width);
	//tooltip1.attr("transform", "translate(" + x(d.Year) + "," + y(d.Marketvalue) + ")");
	tooltip1.select("text1").text(function() { return d.Marketvalue + ".000.000";  });
	//tooltip2.attr("transform", "translate(" + x(d2.Year) + "," + y(d2.Marketvalue) + ")");
	tooltip2.select("text2").text(function() { return d2.Marketvalue + ".000.000"; });

	}
}




