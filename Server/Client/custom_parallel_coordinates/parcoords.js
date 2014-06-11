// modified from http://bl.ocks.org/mbostock/raw/7586334/


CustomParCoords.method("resize", function(width, height, margins)
{
    var context = this;
    this.m = margins;
    this.w = width - margins[1] - margins[3];
    this.h = height - margins[0] - margins[2];

    this.x.rangePoints([0, context.w], 0.6);

    if (!this.root)
        this.root = d3.select(context.nodeId).append("svg");

    this.root
      .attr("width", context.w + context.m[1] + context.m[3])
      .attr("height", context.h + context.m[0] + context.m[2]);

    if (!this.svg)
        this.svg = this.root.append("g");

    this.svg.attr("transform", "translate(" + context.m[3] + "," + context.m[0] + ")");

});

CustomParCoords.method("refresh", function (data, args, labels)
{
    var context = this;
    this.data = data;
    this.labels = labels;

    this.backupData = null;

    if (context.brushes)
    {
        context.backupData = {};
        context.backupData.actives = context.dimensions.filter(function(p) { return !context.y[p].brush.empty(); }),
        context.backupData.extents = context.backupData.actives.map(function(p) { return context.y[p].brush.extent(); });
    }

    // Extract the list of dimensions and create a scale for each.
    context.x.domain(
        context.dimensions = args.filter(
          function(d) 
          {
            return d != "name" && (context.y[d] = d3.scale.linear()
              .domain(d3.extent(data, function(p) { return +p[d]; }))
              .range([context.h, 0]));
          })
    );

    // Add grey background lines for context.

    if (!context.background)
    {
      context.background = context.svg.append("g")
          .attr("class", "background")
        .selectAll("path")
          .data(data)
        .enter().append("path");      
    }

    context.background.attr("d", path);

    // Add blue foreground lines for focus.
    if (!context.foreground)
    {
      context.foreground = context.svg.append("g")
          .attr("class", "foreground")
        .selectAll("path")
          .data(data)
        .enter().append("path")
          .attr("id", function(d){return "P" + d.id;})
    }

    context.foreground.transition().attr("d", path);

  // Add a group element for each dimension.
    context.svg.selectAll(".dimension")
      .data(context.dimensions)
    .enter().append("g")
      .attr("class", "dimension")
      .call(d3.behavior.drag()
        .on("dragstart", function(d) {
          context.dragging[d] = this.__origin__ = context.x(d);
          context.background.attr("visibility", "hidden");
        })
        .on("drag", function(d) {
          context.dragging[d] = Math.min(context.w, Math.max(0, this.__origin__ += d3.event.dx));
          context.foreground.attr("d", path);
          context.dimensions.sort(function(a, b) { return position(a) - position(b); });
          context.x.domain(context.dimensions);
          context.g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
        })
        .on("dragend", function(d) {
          delete this.__origin__;
          delete context.dragging[d];
          transition(d3.select(this)).attr("transform", "translate(" + context.x(d) + ")");
          transition(context.foreground)
              .attr("d", path);
          context.background
              .attr("d", path)
              .transition()
              .delay(500)
              .duration(0)
              .attr("visibility", null);
        }));

  context.g = context.svg.selectAll(".dimension");

  context.g.transition().attr("transform", function(d) { return "translate(" + context.x(d) + ")"; });

  // Add axes and titles.
  var axis = d3.svg.axis().orient("left").tickFormat(d3.format("d"));

  if (context.axes)
  {
      context.svg.selectAll(".axis").remove();
      context.axes = null;
  }

  context.axes = context.g.append("g")
    .attr("class", "axis")
    .each(function(d) { d3.select(this).call(axis.scale(context.y[d])); });

  if (context.texts)
  {
      context.svg.selectAll(".label").remove();
      context.texts = null;
  }

  context.texts = context.axes
    .append("text")
    .attr("text-anchor", "middle")
    .attr("class", "label")      
    .attr("y", -9)
    .text(String)

  context.svg.selectAll(".label").each(function(el){
    var text = d3.select(this).text();
    d3.select(this).text(context.labels[text]);
  });

  // Add and store a brush for each axis.
  
  if (context.brushes)
  {
      context.g.selectAll(".brush").remove();
      context.brushes = null;    
  }

  context.brushes = 
    context.g.append("g")
        .attr("class", "brush")
        .each(function(d) {
              d3.select(this).attr("id", "brush-" + d); 
              d3.select(this).call(
              context.y[d].brush = d3.svg.brush().y(context.y[d]).on("brushstart", brushstart).on("brush", brush).on("brushend", brushend)
            ); 
        });

  context.brushes
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);

  if (context.backupData)
  {
      context.backupData.actives.every(function(p, i) 
      {
          context.setRange(p, context.backupData.extents[i][0], context.backupData.extents[i][1]);
          return true;
      });
  }

//  context.brushes.each(function(d){ context.y[d].brush.y(context.y[d]); }); 


/* MOUSE OVER BEHAVIOR */

  // Rebind the axis data to simplify mouseover.
  context.svg.select(".axis").selectAll("text:not(.title)")
      .attr("class", "label")
      .data(data, function(d) { return d.name || d; });

  if (!context.projection)
  {
    context.projection = context.svg.selectAll(".foreground path")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("click", mouseclick);
  }

  context.filter();
/* // MOUSE OVER BEHAVIOR ends */

  function position(d) {
    var v = context.dragging[d];
    return v == null ? context.x(d) : v;
  }

  function transition(g) {
    return g.transition().duration(500);
  }

  // Returns the path for a given data point.
  function path(d) {
    return d3.svg.line()(context.dimensions.map(function(p) { return [position(p), context.y[p](d[p])]; }));
  }

  // When brushing, don’t trigger axis dragging.
  function brushstart() {
    d3.event.sourceEvent.stopPropagation();
  }

  // Handles a brush event, toggling the display of foreground lines.
  function brush() {
//      context.filter();
  }

  function brushend() {
        var dim = $(this).attr("id").substring("brush-".length);
        var extent = context.y[dim].brush.extent();

        if (extent[0] == extent[1]) // actually means brush removal
        {
            extent[0] = context.y[dim].domain()[0]; // set the highest ranges
            extent[1] = context.y[dim].domain()[1]; // set the highest ranges
        }

        context.onBrushEnd(dim, extent[0], extent[1]); // call the callback
  }


  function mouseover(d) {
//      context.makeActive(d.id);
      if (context.chartListeners.onMouseOver)
          context.chartListeners.onMouseOver(d.id);
  }

  function mouseout(d) {
//      context.makeInactive();
      if (context.chartListeners.onMouseOut)
          context.chartListeners.onMouseOut(d.id);
  }

  function mouseclick(d) {
      if (!d3.select("#P" + d.id).classed("selected"))
      {
          context.makeSelected(d.id);
          if (context.chartListeners.onSelected)
              context.chartListeners.onSelected(d.id);          
      }
      else
      {
          context.makeDeselected(d.id);
          if (context.chartListeners.onDeselected)
              context.chartListeners.onDeselected(d.id);          
      }
  }

});


function isRound(n) {
   return (n * 2) % 1 === 0;
}

function roundToClosestRound(n){
    var x = n * 2;
    var choice1 = Math.ceil(x);
    var choice2 = Math.floor(x);

    var dist1 = Math.abs(choice1 - x);
    var dist2 = Math.abs(choice2 - x);

    if (dist1 <= dist2)
        return choice1 / 2;

    return choice2 / 2;
}


function CustomParCoords(nodeId, chartListeners)
{
    var context = this;
    this.chartListeners = chartListeners;

    this.nodeId = nodeId;
    this.x = d3.scale.ordinal();
    this.y = {};
    this.dragging = {};
}

CustomParCoords.method("filter", function(){
/*
    var context = this;
    var actives = this.dimensions.filter(function(p) { return !context.y[p].brush.empty(); }),
        extents = actives.map(function(p) { return context.y[p].brush.extent(); });


    // snap the brush first
    actives.every(function(p, i) 
      {
          var start = extents[i][0];
          var end = extents[i][1];

          var newStart = start;
          var newEnd = end;

          if (!isRound(newStart))
            newStart = roundToClosestRound(newStart);

          if (!isRound(newEnd))
            newEnd = roundToClosestRound(newEnd);

          if (newStart != start || newEnd != end)
          {              
              context.setRange(p, newStart, newEnd);
          }

          return true;
      });

    // show/hide instances    
    this.foreground.style("display", function(d) {
      return actives.every(function(p, i) 
      {
          return extents[i][0] <= d[p] && d[p] <= extents[i][1];
      }) ? null : "none";
    });
*/

    console.log("=============");
    console.log(this.data);
    this.foreground.style("display", function(d) {
      return (d["_hidden"] === true ? "none" : null);
    });
});

CustomParCoords.method("onBrushEnd", function(p, start, end)
{
    if (this.chartListeners.onRangeFilter)
        this.chartListeners.onRangeFilter(p, start, end);

});

CustomParCoords.method("makeActive", function(id)
{
    this.svg.classed("active", true);
    this.projection.classed("inactive", function(p) { return p.id !== id; });
    this.projection.classed("active", function(p) { return p.id === id; });
    this.projection.filter(function(p) { return p.id === id; }).each(moveToFront);

    function moveToFront() {
      this.parentNode.appendChild(this);
    }      

});

CustomParCoords.method("makeInactive", function()
{
    this.svg.classed("active", false);
    this.projection.classed("inactive", false);
    this.projection.classed("active", false);
});

CustomParCoords.method("makeSelected", function(id)
{
    d3.select("#P" + id).classed("selected", true);
//    this.selected[id] = true;
//    var context = this;
//    this.projection.classed("selected", function(p) { return context.selected[p.id]; });
});

CustomParCoords.method("makeDeselected", function(id)
{
    d3.select("#P" + id).classed("selected", false);
//    this.selected[id] = false;
//    var context = this;
//    this.projection.classed("selected", function(p) { return context.selected[p.id]; });

});

CustomParCoords.method("setRange", function(dim, start, end)
{
    var newExtent = new Array();
    newExtent.push(start);
    newExtent.push(end);

    if (start == end)
    {
        newExtent[0] = parseFloat(start) - 0.5;
        newExtent[1] = parseFloat(start) + 0.5;
    }

    d3.select("#brush-" + dim).call(this.y[dim].brush.extent(newExtent));

    if (this.y[dim].domain()[0] == start && this.y[dim].domain()[1] == end)
    {
      d3.select("#brush-" + dim).transition().duration(250).call(this.y[dim].brush.clear());
    }
});
