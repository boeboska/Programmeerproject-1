function updateLegend(newData) {

    // bind data
    var appending = canvas.selectAll('rect')
       .data(newData);

    // add new elements
    appending.enter().append('rect');

    // update existing elements
    appending.transition()
        .duration(0)
        .attr("width",function (d) {return d.y; });

    // remove old elements
    appending.exit().remove();

}



d3.select('#inds')
			.on("change", function () {
				d3.select("svg#container1")
					.remove();

			}


