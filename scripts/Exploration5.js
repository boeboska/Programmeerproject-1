// Set the margins
var margin = {top: 60, right: 100, bottom: 20, left: 80},
  width = 850 - margin.left - margin.right,
  height = 380 - margin.top - margin.bottom;

// Parse the month variable
var formatYear = d3.timeFormat("%Y");
var parseYear = d3.timeParse("%Y");

// Set the ranges
var xyear = d3.scaleTime().domain([parseYear("2018"), parseYear("2056")]).range([0, width]);
var ygas = d3.scaleLinear().range([height, 0]);


// Define the line
var valueLine = d3.line()
    .x(function(d) { return xyear(d.year); })
    .y(function(d) { return ygas(+d.Waarde); })

// Create the svg canvas in the "graph" div
var svg = d3.select("#graph")
        .append("svg")
        .style("width", width + margin.left + margin.right + "px")
        .style("height", height + margin.top + margin.bottom + "px")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "svg");

// Append title
svg.append("text")
      .attr("x", (10))             
      .attr("y", 5)
      .attr("text-anchor", "left")  
      .style("font-size", "16px")  
      .text("Vermogensfonds in voor de Nederlandse aardgasbaten vanaf 2018");

// Import the CSV data
d3.csv("/data/Fund2018.csv", function(error, data) {
  if (error) throw error;
  
   // Format the data
  data.forEach(function(d) {
      d.year = parseYear(d.year);
      d.Waarde = +d.Waarde;
      d.Fruit = d.Fruit;
      d.Code = d.Code;
  });

  var nest = d3.nest()
	  .key(function(d){
	    return d.Fruit;
	  })
	  .key(function(d){
	  	return d.Code;
	  })
	  .entries(data)

  // Scale the range of the data
  xyear.domain(d3.extent(data, function(d) { return d.year; }));
  ygas.domain([0, d3.max(data, function(d) { return d.Waarde +10; })]);
  
  // Set up the x axis
  var xyearaxis = svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .attr("class", "x axis")
       .call(d3.axisBottom(xyear)
          .ticks(13)
          .tickSizeInner(25)
          .tickSize(4, 4)
          .tickFormat(d3.timeFormat("%Y"))
          .tickSizeInner(0)
          .tickPadding(10));

  // Add the Y Axis
   var ygasaxis = svg.append("g")
       .attr("class", "y axis")
       .call(d3.axisLeft(ygas)
          .ticks(10)
          .tickSizeInner(0)
          .tickPadding(6)
          .tickSize(0, 0));
  
  // Add a label to the y axis
  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("ygas", 0 - 200)
        .attr("xyear", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("In miljarden euro's")
        .attr("class", "y axis label");

  // Create a dropdown
    var fruitMenu = d3.select("#oilDropdown")

    fruitMenu
		.append("select")
		.selectAll("option")
        .data(nest)
        .enter()
        .append("option")
        .attr("value", function(d){
            return d.key;
        })
        .text(function(d){
            return d.key;
        })


 
 	// Function to create the initial graph
 	var initialGraph = function(fruit){

 		// Filter the data to include only fruit of interest
 		var selectGroup = nest.filter(function(d){
                return d.key == fruit;
              })

    console.log(selectGroup);
    console.log(xyear(parseYear("2020")))

	    var selectGroups = svg.selectAll(".fruitGroups")
		    .data(selectGroup, function(d){
		      return d ? d.key : this.key;
		    })
		    .enter()
		    .append("g")
		    .attr("class", "fruitGroups")

colors = ["#d0743c", "#ff8c00"]

		var initialPath = selectGroups.selectAll(".line")
			.data(function(d) { return d.values; })
			.enter()
			.append("path")

		initialPath
			.attr("d", function(d){
				return valueLine(d.values)
			})
			.attr("class", "line")
      .style("stroke", function(d) {
        return colors[d.key - 1]
      })

 	}

 	// Create initial graph
 	initialGraph("Olieprijs 51 dollar per vat")


 	// Update the data
 	var updateGraph = function(fruit){

 		// Filter the data to include only fruit of interest
 		var selectGroup = nest.filter(function(d){
                return d.key == fruit;
              })

    console.log(selectGroup);
    console.log(xyear(parseYear("2020")))

 		// Select all of the grouped elements and update the data
	    var selectGroups = svg.selectAll(".fruitGroups")
		    .data(selectGroup)

		    // Select all the lines and transition to new positions
            selectGroups.selectAll("path.line")
               .data(function(d){
                  return (d.values);
                })
                .transition()
                  .duration(1000)
                  .attr("d", function(d){
                    return valueLine(d.values)
                  })
 	}


 	// Run update function when dropdown selection changes
 	fruitMenu.on('change', function(){

 		// Find which fruit was selected from the dropdown
 		var selectedFruit = d3.select(this)
            .select("select")
            .property("value")

        // Run update function with the selected fruit
        updateGraph(selectedFruit)
    });


  
})