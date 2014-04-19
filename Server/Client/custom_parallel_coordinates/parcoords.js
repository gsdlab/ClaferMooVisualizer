// taken from http://bl.ocks.org/mbostock/raw/7586334/

function CustomParCoords(nodeId, data, labels, margins, width, height)
{
    var context = this;

    this.m = margins,
    this.w = width - margins[1] - margins[3],
    this.h = height - margins[0] - margins[2];

    this.x = d3.scale.ordinal().rangePoints([0, context.w], 1),
    this.y = {},
    this.dragging = {};

    this.data = data;
    this.labels = labels;

    var line = d3.svg.line(),
        axis = d3.svg.axis().orient("left"),
        background,
        foreground;

    this.svg = d3.select(nodeId).append("svg")
      .attr("width", context.w + context.m[1] + context.m[3])
      .attr("height", context.h + context.m[0] + context.m[2])
      .append("g")
      .attr("transform", "translate(" + context.m[3] + "," + context.m[0] + ")");

    // Extract the list of dimensions and create a scale for each.
    this.x.domain(
        dimensions = d3.keys(this.data[0]).filter(
          function(d) 
          {
            return d != "name" && (context.y[d] = d3.scale.linear()
              .domain(d3.extent(data, function(p) { return +p[d]; }))
              .range([context.h, 0]));
          })
    );

    // Add grey background lines for context.
    background = context.svg.append("g")
        .attr("class", "background")
      .selectAll("path")
        .data(data)
      .enter().append("path")
        .attr("d", path);

    // Add blue foreground lines for focus.
    foreground = context.svg.append("g")
        .attr("class", "foreground")
      .selectAll("path")
        .data(data)
      .enter().append("path")
        .attr("d", path);

  // Add a group element for each dimension.
    context.g = context.svg.selectAll(".dimension")
      .data(dimensions)
    .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", function(d) { return "translate(" + context.x(d) + ")"; })
      .call(d3.behavior.drag()
        .on("dragstart", function(d) {
          context.dragging[d] = this.__origin__ = context.x(d);
          background.attr("visibility", "hidden");
        })
        .on("drag", function(d) {
          context.dragging[d] = Math.min(context.w, Math.max(0, this.__origin__ += d3.event.dx));
          foreground.attr("d", path);
          dimensions.sort(function(a, b) { return position(a) - position(b); });
          context.x.domain(dimensions);
          context.g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
        })
        .on("dragend", function(d) {
          delete this.__origin__;
          delete context.dragging[d];
          transition(d3.select(this)).attr("transform", "translate(" + context.x(d) + ")");
          transition(foreground)
              .attr("d", path);
          background
              .attr("d", path)
              .transition()
              .delay(500)
              .duration(0)
              .attr("visibility", null);
        }));

  // Add an axis and title.

  context.g.append("g")
      .attr("class", "axis")
      .each(function(d) { d3.select(this).call(axis.scale(context.y[d])); })
    .append("text")
      .attr("text-anchor", "middle")
      .attr("class", "label")      
      .attr("y", -9)
      .text(String);

  context.svg.selectAll(".label").each(function(el){
    var text = d3.select(this).text();
    d3.select(this).text(context.labels[text]);
  });

  // Add and store a brush for each axis.
  context.g.append("g")
      .attr("class", "brush")
      .each(function(d) { d3.select(this).call(context.y[d].brush = d3.svg.brush().y(context.y[d]).on("brushstart", brushstart).on("brush", brush).on("brushend", brushend)); })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);

/* MOUSE OVER BEHAVIOR */

  // Rebind the axis data to simplify mouseover.
  context.svg.select(".axis").selectAll("text:not(.title)")
      .attr("class", "label")
      .data(data, function(d) { return d.name || d; });


  context.projection = context.svg.selectAll(".axis text,.background path,.foreground path")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

  function mouseover(d) {
    context.svg.classed("active", true);
    context.projection.classed("inactive", function(p) { return p !== d; });
    context.projection.classed("active", function(p) { return p === d; });
    context.projection.filter(function(p) { return p === d; }).each(moveToFront);
  }

  function mouseout(d) {
    context.svg.classed("active", false);
    context.projection.classed("inactive", false);
    context.projection.classed("active", false);
  }

  function moveToFront() {
    this.parentNode.appendChild(this);
  }      

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
    return line(dimensions.map(function(p) { return [position(p), context.y[p](d[p])]; }));
  }

  // When brushing, don’t trigger axis dragging.
  function brushstart() {
    d3.event.sourceEvent.stopPropagation();
  }

  function isInt(n) {
     return n % 1 === 0;
  }

  // Handles a brush event, toggling the display of foreground lines.
  function brush() {
      var ctx1 = this;
    var actives = dimensions.filter(function(p) { return !context.y[p].brush.empty(); }),
        extents = actives.map(function(p) { return context.y[p].brush.extent(); });
    
    foreground.style("display", function(d) {
      return actives.every(function(p, i) 
      {
          var start = extents[i][0];
          var end = extents[i][1];

          var newStart = start;
          var newEnd = end;

          if (!isInt(newStart))
            newStart = Math.floor(start);

          if (!isInt(newEnd))
            newEnd = Math.floor(end);

          newExtent = new Array();
          newExtent.push(newStart);
          newExtent.push(newEnd);

//          alert(context.g);

          if (newStart != start || newEnd != end)
          {
              d3.select(ctx1).call(context.y[p].brush.extent(newExtent));
          }

          return newStart <= d[p] && d[p] <= newEnd;
      }) ? null : "none";
    });

  }

  function brushend() {
    var actives = dimensions.filter(function(p) { return !context.y[p].brush.empty(); }),
        extents = actives.map(function(p) { return context.y[p].brush.extent(); });
    
        actives.every(function(p, i) 
        {
            context.onBrushEnd(p, extents[i][0], extents[i][1]);
        });

  }
}

CustomParCoords.method("onBrushEnd", function(p, start, end)
{
    alert(p + ":" + start + ".." + end);

});