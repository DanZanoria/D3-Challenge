// @TODO: YOUR CODE HERE!


// Disclaimer:
// Most of the code is pulled straight from Class Activity D3 - Day 3 - Activity 12
// I will be using it as the basis this homework
// The earlier git push will have more of that unmodified code. But towards the very the code should look different to fit the criteria.
// If there is only 1 chart that and no clickable that means I couldnt figure out how to make the multiple charts work, and going by the suggestions made by the ones helping me on slackbot

// Most of this code is attributed Class Actity D3 - Day3  Lesson 9

// Create the canvas
var svgWidth = 960;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");
console.log(svg)

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import Data

d3.csv("assets/data/data.csv").then(function (povertydata) {


// Grab the data
povertydata.forEach(function(zdata) {
  zdata.poverty = +zdata.poverty;
  zdata.healthcare = +zdata.healthcare;
});


// // Initial Params
// var chosenXAxis = "poverty";

// Create a  scale function

var xLinearScale = d3.scaleLinear()
.domain([20, d3.max(povertydata, z=> z.poverty) * .5
]) 
.range([0, width]);
console.log(xLinearScale)

var yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(povertydata, z => z.healthcare)])
  .range([height, 0])


// Create axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Step 4: Append Axis to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

  // Step 5: Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(povertydata)
    .enter()
    .append("circle")
    .attr("cx", z => xLinearScale(z.poverty))
    .attr("cy", z => yLinearScale(z.healthcare))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

// This bottom portion was suggested to look into the code. To put the labels in the chart by the guys in slackbot. If i dont like it i will comment it out.
// https://stackoverflow.com/questions/55988709/how-can-i-add-labels-inside-the-points-in-a-scatterplot

var circleLabels = chartGroup.selectAll(null).data(povertydata).enter().append("text");
circleLabels
  .attr("x", function(z) {
    return xLinearScale(z.poverty);
  })
  .attr("y", function(z) {
    return yLinearScale(z.healthcare);
  })
  .text(function(z) {
    return z.abbr;
  });


  // Step 6: Initialize tool tip
  // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([100, -70])
      .html(function(z) {
        return (`${z.state}<br> Poverty Rate: ${z.poverty}<br>Healthcare: ${z.healthcare}`);
      });
  
  // Step 7: Create tooltip in the chart
  // ==============================
    chartGroup.call(toolTip);

// Step 8: Create event listeners to display and hide the tooltip
  // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
     // Create axes labels
     chartGroup.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left + 40)
     .attr("x", 0 - (height / 2))
     .attr("dy", "1em")
     .attr("class", "axisText")
     .text("Amount Of Healthcare");

   chartGroup.append("text")
     .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
     .attr("class", "axisText")
     .text("Poverty Rate");
 }).catch(function(error) {
   console.log(error);



});