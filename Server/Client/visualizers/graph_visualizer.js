/*
Copyright (C) 2012 - 2014 Alexander Murashkin, Neil Redman <http://gsd.uwaterloo.ca>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
ParetoFrontVisualizer.method("getValue", function(d, dim)
{
    var context = this;

    if (dim == "x")
        return d[context.keys[0]];
    if (dim == "y")
        return d[context.keys[1]];
    if (dim == "id")
        return d["id"];
    if (dim == "z")
        return context.hasThird ? d[context.keys[2]] : 1;
    if (dim == "t")
        return context.hasForth ? d[context.keys[3]] : 1;
});

ParetoFrontVisualizer.method("refresh", function(data, args)
{
  this.data = data;
  var context = this;

  context.keys = args;

  context.hasThird = context.keys[2] ? true : false;
  context.hasForth = context.keys[3] ? true : false;

  //if(!context.isZoomed) { // If event is not zoom => define axis
    // Compute the scales’ domains.

    context.x.domain(d3.extent(data, function(d) { return parseFloat(context.getValue(d, "x")); }));
    context.y.domain(d3.extent(data, function(d) { return parseFloat(context.getValue(d, "y")); }));

    this.d3xAxis = d3.svg.axis().scale(context.x).orient("bottom").tickFormat(d3.format("d"));
    this.d3yAxis = d3.svg.axis().scale(context.y).orient("left").tickFormat(d3.format("d"));



 // }
  

  context.xAxis.attr("transform", "translate(0," + context.height + ")")
      .call(this.d3xAxis);

  context.yAxis.call(this.d3yAxis);

  var zMin = d3.min(data, function(d) { return parseFloat(context.getValue(d, "z"));} );
  var zMax = d3.max(data, function(d) { return parseFloat(context.getValue(d, "z"));} );

  var tMin = d3.min(data, function(d) { return parseFloat(context.getValue(d, "t"));} );
  var tMax = d3.max(data, function(d) { return parseFloat(context.getValue(d, "t"));} );


  if (zMin == zMax) // in order not to make the domain to be one value
  {
      zMax = 1;
      zMin = 0;
  }

  if (tMin == tMax) // in order not to make the domain to be one value
  {
      tMax = 1;
      tMin = 0;
  }

  context.col_inner_scale = context.col_inner_scale.domain([zMin, zMax]);
  context.size_scale = context.size_scale.domain([tMin, tMax]);
  
  //  if (d3.select("#foreground").empty())
  //    context.foreground = context.container.append("g").attr("id", "foreground");

  /* Enter selection */

  var cat = context.foreground.selectAll("g.bubble").data(data, function(d){return d.id;});

  context.g = cat.enter()
    .append("g").attr("class", "bubble").attr("id", function (d) {return "V" + d.id; }).on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("click", mouseclick);

  context.g.append("circle")
      .attr("class", "shape");

  context.g.append("text")
        .attr("class", "label")
          .attr("text-anchor", "middle")
          .attr("y", 3)
        .text(function(d) { return context.getValue(d, "id");});

  /* Exit selection */

  //  cat.exit()
  //    .remove();

  
    /* Update selection */

  context.svg.selectAll(".bubble").transition()
      .attr("transform", function(d) { 
                return "translate(" + context.x(context.getValue(d, "x")) + "," + context.y(context.getValue(d, "y")) + ")"; }) // Set bubbles position
      .select("circle")
        .attr("fill", function(d) { return context.col_outer_scale(context.col_inner_scale(context.getValue(d, "z"))); }) // Set bubbles color
        .attr("r", function(d) { return context.size_scale(context.getValue(d, "t")); })// Set bubbles radius
        .each("end", function(){context.zoom.event(context.svg)}); 



  if (context.hasThird){
      $("#MaxZLegend").text(zMax);
      $("#MinZLegend").text(zMin);
      $("#svgcontZ").show();
  } else {
      $("#svgcontZ").hide();
  }

  if (context.hasForth){
      $("#MaxTLegend").text(tMax);
      $("#MaxTCircle").attr("r", this.tLimitMax);
      $("#MinTLegend").text(tMin);
      $("#MinTCircle").attr("r", this.tLimitMin);
      $("#svgcontT").show();
  } else {
      $("#svgcontT").hide();
  }

  context.filter();

  function mouseover(d) {
      if (context.chartListeners.onMouseOver)
          context.chartListeners.onMouseOver(d.id);
  }

  function mouseout(d) {
      if (context.chartListeners.onMouseOut)
          context.chartListeners.onMouseOut(d.id);
  }

  function mouseclick(d) {
      if (!d3.select("#V" + d.id).classed("selected"))
      {
          context.select(d.id);
          if (context.chartListeners.onSelected)
              context.chartListeners.onSelected(d.id);          
      }
      else
      {
          context.unselect(d.id);
          if (context.chartListeners.onDeselected)
              context.chartListeners.onDeselected(d.id);          
      }
  }

});

ParetoFrontVisualizer.method("resize", function (w, h, m)
{
    var context = this;
    this.margin = m;
    this.width = w - m[1] - m[3],
    this.height = h - m[0] - m[2];

   

    if (!this.x){
      this.x = d3.scale.linear();
    }

    this.x.range([0, context.width]);

    if (!this.y){
      this.y = d3.scale.linear();
    }

    this.y.range([context.height, 0]);

    var sizeData = [{"width": context.width, "height": context.height, "margin": context.margin}];

    /* updating a canvas */

    context.svg.data(sizeData)
        .attr("width", function(d){return d.width + d.margin[1] + d.margin[3]; })
        .attr("height", function(d){return d.height + d.margin[0] + d.margin[2]; });

    if (d3.select("#foreground").empty())
    {
        context.foreground = context.svg.append("g").attr("id", "foreground");
    }

    context.foreground.attr("transform", function(d){ return "translate(" + d.margin[1] + "," + d.margin[0] + ")"});

    // Add the x-axis.

    if (!context.xAxis)
      context.xAxis = context.foreground.append("g")
        .attr("class", "bubble-front-graph-x axis");

    // Add the y-axis.
    if (!context.yAxis)
      context.yAxis = context.foreground.append("g")
      .attr("class", "bubble-front-graph-y axis");

    // ZOOM


      context.zoom = d3.behavior.zoom();

      context.zoom.x(context.x)
          .y(context.y)
          //.scaleExtent([1, 10]) TODO: scale range on window resize
          .on("zoom", context.onZoom);

      if(!context.onZoom){
        context.onZoom = function() {

          //context.isZoomed = true;
          context.xAxis.call(context.d3xAxis);
          context.yAxis.call(context.d3yAxis);
         
          context.svg.selectAll(".bubble")
            .attr("transform", function(d) { 
              return "translate(" + context.x(context.getValue(d, "x")) + "," + context.y(context.getValue(d, "y")) + ")"; 
            });
          //context.isZoomed = false;

          

        }
      }

      context.svg.call(context.zoom);

    // END ZOOM


        
        

});

function ParetoFrontVisualizer(nodeId, chartListeners) 
{
    this.tLimitMin = 8; // bubbles cannot be smaller than this
    this.tLimitMax = 16; // bubbles cannot be bigger  than this

    this.nodeId = nodeId;
    var context = this;
    context.chartListeners = chartListeners;

    this.x = null;
    this.y = null;

   /* appending a "canvas" */

    var root = d3.select("#" + context.nodeId);
    context.svg = root.append("svg");


    /*
      this.ranges = new Array();
      this.ranges.push({"dim": keys[1], "min": x.domain()[0], "max": x.domain()[1]});
      this.ranges.push({"dim": keys[2], "min": y.domain()[0], "max": y.domain()[1]});

      if (hasThird) 
          this.ranges.push({"dim": keys[3], "min": zMin, "max": zMax});

      if (hasForth) 
          this.ranges.push({"dim": keys[4], "min": tMin, "max": tMax});

      for (var i = 5; i < keys.length; i++)
      {
          this.ranges.push({"dim": keys[i], "min": Number.NEGATIVE_INFINITY, "max": Number.POSITIVE_INFINITY });
      }

      console.log(this.ranges);

      if (zMin == zMax) // in order not to make the domain to be one value
      {
          zMax = 1;
          zMin = 0;
      }

      if (tMin == tMax) // in order not to make the domain to be one value
      {
          tMax = 1;
          tMin = 0;
      }

      if (hasThird){
          $("#MaxZLegend").text(zMax);
          $("#MinZLegend").text(zMin);
          $("#svgcontZ").show();
      } else {
          $("#svgcontZ").hide();
      }

      if (hasForth){
          $("#MaxTLegend").text(tMax);
          $("#MaxTCircle").attr("r", tLimitMax);
          $("#MinTLegend").text(tMin);
          $("#MinTCircle").attr("r", tLimitMin);
          $("#svgcontT").show();
      } else {
          $("#svgcontT").hide();
      }
    */
    this.col_inner_scale = d3.scale.linear() 
      .range([0, 1]); 

    this.col_outer_scale = d3.scale.linear() 
      .domain([0, 0.5, 1]) 
      .interpolate(d3.interpolateRgb) 
      .range(["red", "yellow", "green"]); 
  
    this.size_scale = d3.scale.linear() 
      .range([this.tLimitMin, this.tLimitMax]); 

    //  this.resize(width, height, margin);
    //  this.refresh(data);

    /* Test functions */
    /*
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    context.i = 100;

    function addRandom(){
        var newObj = {};
        newObj.id = 200;
        newObj[context.keys[0]] = context.i++;
        newObj[context.keys[1]] = getRandomInt(0, 100);
        newObj[context.keys[2]] = getRandomInt(0, 100);
        newObj[context.keys[3]] = getRandomInt(0, 100);
        newObj[context.keys[4]] = getRandomInt(0, 100);

        context.data.push(newObj);
        context.refresh(context.data);          
        setTimeout(addRandom, 2000);
    }

    setTimeout(addRandom, 2000);
    */
}

ParetoFrontVisualizer.method("filter", function(){

    var context = this;
    // show/hide instances

    var foreground = this.svg.select("#foreground").selectAll("g.bubble");

    foreground.classed("hidden", function(d){
        // adding a hidden class, if the data value is outside at least one (some) range
        return (d["_hidden"] === true);
    });
});


ParetoFrontVisualizer.method("select", function(i)
{
    d3.select("#V" + i).classed("selected", true);    
});

//formats object as not selected
ParetoFrontVisualizer.method("unselect", function(i)
{
    d3.select("#V" + i).classed("selected", false);    
});
