// Dimensions of sunburst.
var width = 750;
var height = 600;
var radius = Math.min(width, height) / 2;

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
var b = {
  w: 125, h: 20, s: 3, t: 10
};
var available=[];

var colors = {
  "Photosynthesis": "green",
  "Cellular respiration": "red",
  "Carbohydrate metabolism": "silver",
  "Amino acid metabolism": "#6ab975",
  "Lipid metabolism": "yellow",
  "Nucleotide metabolism": "blue",
  "Coenzyme metabolism": "brown",
  "Polyamine metabolism'": "gray",
  "Secondary metabolism": "violet",
  "Redox homeostasis": "DeepPink",
  "Reactive oxygen metabolism":"pink",
  
  "Phytohormones": "Olive",
  "Chromatin assembly and remodeling": "Gold",
  "Cell cycle": "#de783b",
  "DNA damage response": "#6ab975",
  
  "RNA biosynthesis": "orange",
  
  "RNA processing": "MediumBlue",  //16
  "Protein biosynthesis": "magenta", //17
  "Protein modification": "GreenYellow", //18
  "Protein degradation": "IndianRed", //19
  "Cytoskeleton": "LawnGreen", //20
  
  "Cell wall": "Bisque", //21
  "Membrane vesicle trafficking": "#bbbbbb",
  "Protein translocation": "#bbbbbb", //23
  "Solute transport": "#5687d1",  //24
  "Nutrient uptake": "cyan", //25
  "Environmental stimuli response": "skyblue", //26
  
  "Multi-process regulatory mechanisms": "#6ab975",  //27
  
  "not assigned": "black"  //35
  
};

var colortrack=colors;
// Mapping of step names to colors.


function colorMapMan(datapoint, depth, startrad){
	dp=datapoint;
	//console.log("------DP:");
	//console.log(dp);
	//console.log("enter");
	while ((dp.parent) && (dp.parent.data.name != "root")) {
		dp=dp.parent;
	}
	if (depth==0) {return "white";}
	
	var dhsl=d3.hsl(colors[dp.data.name]);
	//dhsl.s-=0.3;
	if (dhsl.s<0 ) (dhsl.s=0);
	if (dhsl.l >0.9) { dhsl.l=0.9;}
	
	
	//dhsl+="";
	if (depth==1) {
		colors[dp.data.name]		
		return(dhsl);
	}
	//console.log("this:"+datapoint.data.name);

	//console.log("DHSL "+dhsl);
	//return("green");
	//console.log("DA"+depth+"A	"+angle);
	dhsl.s=(1+1/7-depth/7);
	//console.log("HHHHHHHHHHDHSLL K:"+dhsl.l);
	//console.log("Parentxo"+dp.x0+" "+dp.x1);
	
    //console.log("A;"+ startrad);
    dhsl.l+= (startrad-dp.x0)/(dp.x1-dp.x0) * (0.9- dhsl.l);
	//if (dhsl.l >0.9) { dhsl.l=0.9;}
	//if (dhsl.s >1) { dhsl.s=1;}
	//console.log("HHHHHHHHHHDHSLL afterL:"+dhsl.l);
	//console.log(dhsl.l);
	dhsl+="";
	//console.trace();
	//console.log(h,s,v);
	//s=1; v=1;
	//console.log("DHSL"+dhsl);
	colortrack[datapoint.data.name]=dhsl;
	return( dhsl);
	
}



// Total size of all segments; we set this later, after loading the data.
var totalSize = 0; 

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var partition = d3.partition()
    .size([2 * Math.PI, radius * radius]);

var arc = d3.arc()
    .startAngle(function(d) { return d.x0; })
    .endAngle(function(d) { return d.x1; })
    .innerRadius(function(d) { return Math.sqrt(d.y0); })
    .outerRadius(function(d) { return Math.sqrt(d.y1); });

// Use d3.text and d3.csvParseRows so that we do not need to have a header
// row, and can receive the csv as an array of arrays.
d3.text("test", function(text) {
  var csv = d3.tsvParseRows(text);
  var json = buildHierarchy(csv);
  createVisualization(json);
});

// Main function to draw and set up the visualization, once we have the data.
function createVisualization(json) {

  // Basic setup of page elements.
  initializeBreadcrumbTrail();
  drawLegend();
  d3.select("#togglelegend").on("click", toggleLegend);

  // Bounding circle underneath the sunburst, to make it easier to detect
  // when the mouse leaves the parent g.
  vis.append("svg:circle")
      .attr("r", radius)
      .style("opacity", 0);

  // Turn the data into a d3 hierarchy and calculate the sums.
  var root = d3.hierarchy(json)
      .sum(function(d) { return d.size; })
      .sort(function(a, b) { return b.value - a.value; });
  
  // For efficiency, filter nodes to keep only those large enough to see.
  var nodes = partition(root).descendants()
      .filter(function(d) {
          return (d.x1 - d.x0 > 0.005); // 0.005 radians = 0.29 degrees
      });

  var path = vis.data([json]).selectAll("path")
      .data(nodes)
      .enter().append("svg:path")
      .attr("display", function(d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
	  .attr("id",function(d){
		  return d.data.name;
	  })
      .style("fill", function(d) { 
			//console.log(hsv2rgb(d.x0+(d.x1-d.x0)/2,1-d.depth/7,0.8));
			//console.log(d);
			//console.log("MAPMAN:"+d.depth+"C:"+colorMapMan(d.data,d.depth,d.x0+(d.x1-d.x0)/2));
			if (d.x1-d.x0>0.6) {if(d.data.name!="root"){ available.push(d.data.name);}}
			return colorMapMan(d,d.depth,d.x0); })
		//	return hsv2rgb(d.x0+(d.x1-d.x0)/2,1-d.depth/7,0.8); }) // return colors[d.data.name]; })
      .style("opacity", 1)
      .on("mouseover", mouseover);

  // Add the mouseleave handler to the bounding circle.
  d3.select("#container").on("mouseleave", mouseleave);
	
    
  // Get total size of the tree = value of root node from partition.
  totalSize = path.datum().value;
 
	
	

	
	vis.selectAll(".zz")
	.data(available)
   .enter().append("text")
	.attr("dy","12")
	.style("font-size","8px")
	.attr("class", "monthText")
   .append("textPath")
	.attr("xlink:href",function(d){console.log(d); return "#"+d;})
	.attr("startOffset", "1%")
	.text(function(d){return d;});	
	
 };

// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseover(d) {

  var percentage = (100 * d.value / totalSize).toPrecision(3);
  //console.log(d);
  var percentageString = percentage + "%" ;
  if (percentage < 0.1) {
    percentageString = "< 0.1%";
  }

 

  d3.select("#explanation")
      .style("visibility", "");

  var sequenceArray = d.ancestors().reverse();
  sequenceArray.shift(); // remove root node from the array
  updateBreadcrumbs(sequenceArray, percentageString);

  percentageString+=" "+d.data.name;
   d3.select("#percentage")
      .text(percentageString);
  
  // Fade all the segments.
  d3.selectAll("path")
      .style("opacity", 0.3);

  // Then highlight only those that are an ancestor of the current segment.
  vis.selectAll("path")
      .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
              })
      .style("opacity", 1);
}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {

  // Hide the breadcrumb trail
  d3.select("#trail")
      .style("visibility", "hidden");

  // Deactivate all segments during transition.
  d3.selectAll("path").on("mouseover", null);

  // Transition each segment to full opacity and then reactivate it.
  d3.selectAll("path")
      .transition()
      .duration(1000)
      .style("opacity", 1)
      .on("end", function() {
              d3.select(this).on("mouseover", mouseover);
            });

  d3.select("#explanation")
      .style("visibility", "hidden");
}

function initializeBreadcrumbTrail() {
  // Add the svg area.
  var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", width)
      .attr("height", 50)
      .attr("id", "trail");
  // Add the label at the end, for the percentage.
  trail.append("svg:text")
    .attr("id", "endlabel")
    .style("fill", "#000");
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
  var points = [];
  points.push("0,0");
  points.push(b.w + ",0");
  points.push(b.w + b.t + "," + (b.h / 2));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    points.push(b.t + "," + (b.h / 2));
  }
  return points.join(" ");
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray, percentageString) {

  // Data join; key function combines name and depth (= position in sequence).
  var trail = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) { return d.data.name + d.depth; });

  // Remove exiting nodes.
  trail.exit().remove();

  // Add breadcrumb and label for entering nodes.
  var entering = trail.enter().append("svg:g");

  entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) { return colortrack[d.data.name]; });

  entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
	  .attr("font-size","7px")
      .text(function(d) { return d.data.name; });

  // Merge enter and update selections; set position for all nodes.
  entering.merge(trail).attr("transform", function(d, i) {
    return "translate(" + i * (b.w + b.s) + ", 0)";
  });

  // Now move and update the percentage at the end.
  d3.select("#trail").select("#endlabel")
      .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(percentageString);

  // Make the breadcrumb trail visible, if it's hidden.
  d3.select("#trail")
      .style("visibility", "");

}

/*Legend is hard coded back to colors as per source*/
/**TODO make legend listen to entries **/
function drawLegend() {

  // Dimensions of legend item: width, height, spacing, radius of rounded rect.
  var li = {
    w: 225, h: 30, s: 3, r: 3
  };

  var legend = d3.select("#legend").append("svg:svg")
      .attr("width", li.w)
      .attr("height", d3.keys(colors).length * (li.h + li.s));

  var g = legend.selectAll("g")
      .data(d3.entries(colors))
      .enter().append("svg:g")
      .attr("transform", function(d, i) {
              return "translate(0," + i * (li.h + li.s) + ")";
           });

  g.append("svg:rect")
      .attr("rx", li.r)
      .attr("ry", li.r)
      .attr("width", li.w)
      .attr("height", li.h)
      .style("fill", function(d) { return d.value; });

  g.append("svg:text")
      .attr("x", li.w / 2)
      .attr("y", li.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.key; });
}

function toggleLegend() {
  var legend = d3.select("#legend");
  if (legend.style("visibility") == "hidden") {
    legend.style("visibility", "");
  } else {
    legend.style("visibility", "hidden");
  }
}

// Take a 2-column CSV and transform it into a hierarchical structure suitable
// for a partition layout. The first column is a sequence of step names, from
// root to leaf, separated by hyphens. The second column is a count of how 
// often that sequence occurred.
function buildHierarchy(csv) {
  var root = {"name": "root", "children": []};
  for (var i = 0; i < csv.length; i++) {
    var sequence = csv[i][0];
    var size = +csv[i][1];
    if (isNaN(size)) { // e.g. if this is a header row
      continue;
    }
    var parts = sequence.split(".");
    var currentNode = root;
	//console.log(sequence);
    for (var j = 0; j < parts.length; j++) {
      var children = currentNode["children"];
      var nodeName = parts[j];
      var childNode;
      if (j + 1 < parts.length) {
   // Not yet at the end of the sequence; move down the tree.
 	var foundChild = false;
 	for (var k = 0; k < children.length; k++) {
 	  if (children[k]["name"] == nodeName) {
 	    childNode = children[k];
 	    foundChild = true;
 	    break;
 	  }
 	}
  // If we don't already have a child node for this branch, create it.
 	if (!foundChild) {
 	  childNode = {"name": nodeName, "children": []};
 	  children.push(childNode);
 	}
 	currentNode = childNode;
      } else {
 	// Reached the end of the sequence; create a leaf node.
 	childNode = {"name": nodeName, "size": size};
 	children.push(childNode);
      }
    }
  }
  return root;
};