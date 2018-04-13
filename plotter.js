var pointInfo = document.getElementById("pointInfo");

var width = 700,
    height = 580;

var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

var g = svg.append('g');

var albersProjection = d3.geoAlbers()
    .scale(75000)
    .rotate([74.0060, 0])
    .center([0, 40.7128])
    .translate([width/2, height/2]);

var geoPath = d3.geoPath()
    .projection(albersProjection);

g.selectAll('path')
    .data(boroughs_json.features)
    .enter()
    .append('path')
    .attr('fill', '#2bf')
    .attr('stroke', '#000')
    .attr('d', geoPath);


svg.selectAll("circle")
    .data(points.features).enter()
    .append("circle")
    .attr("cx", (d) => albersProjection(d.geometry.coordinates)[0])
    .attr("cy", (d) => albersProjection(d.geometry.coordinates)[1])
    .attr("r", (d) => Math.min(d.properties.num_calls/10, 10) + "px")
    .attr("fill", "red")
    .on('click', function(d){
	console.log(d.properties.num_calls + " calls were made in complaint at " + albersProjection(d.geometry.coordinates)[0] + " , " + albersProjection(d.geometry.coordinates) [1] );
	document.getElementById("pointInfo").innerHTML = "There were " + d.properties.num_calls + " noise complaint calls made at latitude " + d.geometry.coordinates[0] + " and longitude " + d.geometry.coordinates[1] + "";
    });

console.log(albersProjection);


//Nothing past here works yet
/*
var reSize = function(albersProjection, geoPath, g) {
    console.log(g);
    albersProjection = d3.geoAlbers()
	.scale(74000)
	.rotate([74.0060, 0])
	.center([0, 40.7128])
	.translate([width/2, height/2]);
    
    geoPath = d3.geoPath()
	.projection(albersProjection);

    g.selectAll('path')
	.data(boroughs_json.features)
	.enter()
	.append('path')
	.attr('fill', '#2bf')
	.attr('stroke', '#000')
	.attr('d', geoPath);
	
}

var zoomMap = function(){
    console.log("scale");
    reSize(albersProjection, geoPath, g);
}


var zoomer = document.getElementById("zoom");
//console.log(zoomer);
zoomer.addEventListener("click", zoomMap );


*/
