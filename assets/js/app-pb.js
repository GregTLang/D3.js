// Set up parameters: SVG, height, width, margin
var svgWidth = 960;
var svgHeight = 500;
​
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
  };
  
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
  
// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
​
// Append an SVG group that will contain the data. Use transform to make it fit in canvas.
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);
​
// Import the data. Read in the CSV file
d3.csv("/assets/data/data.csv")
  .then(function(data) {
    // if (error) throw error;
    console.log('data:', data);
​
    // Parse the data and cast as numbers
    data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
    });
​
    // Create scale functions
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.poverty)])
      .range([0, width]);
​
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.obesity)])
      .range([height, 0]);
​
    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
​
    // Append axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
​
    chartGroup.append("g")
      .call(leftAxis);
​
    // Create circles for scatter plot
    var circlesGroup = chartGroup.selectAll("circle")
      .data(data)
      .enter()
​
    circlesGroup.append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.obesity))
      .attr("r", "15")
      .attr("fill", "blue")
      .attr("opacity", ".5")
​
    // Append text to circles
    circlesGroup.append("text")
      .attr("dx", d => xLinearScale(d.poverty) - 12)
      .attr("dy", d => yLinearScale(d.obesity) + 5)
      .attr("class", "axisText")
      .text(d => (d.abbr));
});