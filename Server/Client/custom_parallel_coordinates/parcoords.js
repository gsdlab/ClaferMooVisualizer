// taken from http://bl.ocks.org/mbostock/raw/7586334/

function CustomParCoords(nodeId, data, labels, margins, width, height, chartListeners)
{
    var context = this;
    this.selected = [];
    for (var i = 0; i < data.length; i++)
        this.selected.push(false);

    this.chartListeners = chartListeners;
    this.m = margins,
    this.w = width - margins[1] - margins[3],
    this.h = height - margins[0] - margins[2];

    this.x = d3.scale.ordinal().rangePoints([0, context.w], 0.6),
    this.y = {},
    this.dragging = {};

    this.data = data;
    this.labels = labels;

    var line = d3.svg.line(),
        axis = d3.svg.axis().orient("left");

    this.svg = d3.select(nodeId).append("svg")
      .attr("width", context.w + context.m[1] + context.m[3])
      .attr("height", context.h + context.m[0] + context.m[2])
      .append("g")
      .attr("transform", "translate(" + context.m[3] + "," + context.m[0] + ")");

    // Extract the list of dimensions and create a scale for each.
    this.x.domain(
        context.dimensions = d3.keys(this.data[0]).filter(
          function(d) 
          {
            return d != "name" && (context.y[d] = d3.scale.linear()
              .domain(d3.extent(data, function(p) { return +p[d]; }))
              .range([context.h, 0]));
          })
    );

    // Add grey background lines for context.
    context.background = context.svg.append("g")
        .attr("class", "background")
      .selectAll("path")
        .data(data)
      .enter().append("path")
        .attr("d", path);

    // Add blue foreground lines for focus.
    context.foreground = context.svg.append("g")
        .attr("class", "foreground")
      .selectAll("path")
        .data(data)
      .enter().append("path")
        .attr("d", path);

  // Add a group element for each dimension.
    context.g = context.svg.selectAll(".dimension")
      .data(context.dimensions)
    .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", function(d) { return "translate(" + context.x(d) + ")"; })
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
      .each(function(d) {
            d3.select(this).attr("id", "brush-" + d); 
            d3.select(this).call(
            context.y[d].brush = d3.svg.brush().y(context.y[d]).on("brushstart", brushstart).on("brush", brush).on("brushend", brushend)
          ); 
      })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);

/* MOUSE OVER BEHAVIOR */

  // Rebind the axis data to simplify mouseover.
  context.svg.select(".axis").selectAll("text:not(.title)")
      .attr("class", "label")
      .data(data, function(d) { return d.name || d; });


  context.projection = context.svg.selectAll(".foreground path")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("click", mouseclick);

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
      if (!context.selected[d.id])
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
    return line(context.dimensions.map(function(p) { return [position(p), context.y[p](d[p])]; }));
  }

  // When brushing, don’t trigger axis dragging.
  function brushstart() {
    d3.event.sourceEvent.stopPropagation();
  }

  // Handles a brush event, toggling the display of foreground lines.
  function brush() {
      context.filter();
  }

  function brushend() {
    var actives = context.dimensions.filter(function(p) { return !context.y[p].brush.empty(); }),
        extents = actives.map(function(p) { return context.y[p].brush.extent(); });

        actives.every(function(p, i) 
        {
            context.onBrushEnd(p, extents[i][0], extents[i][1]);
            return true;
        });

  }
}

  function isInt(n) {
     return n % 1 === 0;
  }

CustomParCoords.method("filter", function(){
    var context = this;
    var actives = this.dimensions.filter(function(p) { return !context.y[p].brush.empty(); }),
        extents = actives.map(function(p) { return context.y[p].brush.extent(); });
    
    this.foreground.style("display", function(d) {
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

          if (newStart != start || newEnd != end)
          {              
              context.setRange(p, newStart, newEnd);
          }

          return newStart <= d[p] && d[p] <= newEnd;
      }) ? null : "none";
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
    this.selected[id] = true;
    var context = this;
    this.projection.classed("selected", function(p) { return context.selected[p.id]; });
});

CustomParCoords.method("makeDeselected", function(id)
{
    this.selected[id] = false;
    var context = this;
    this.projection.classed("selected", function(p) { return context.selected[p.id]; });

});

CustomParCoords.method("setRange", function(dim, start, end)
{
    console.log("setRange");
    var newExtent = new Array();
    newExtent.push(start);
    newExtent.push(end);
    d3.select("#brush-" + dim).call(this.y[dim].brush.extent(newExtent));

    if (this.y[dim].domain()[0] == start && this.y[dim].domain()[1] == end)
    {
      d3.select("#brush-" + dim).call(this.y[dim].brush.clear());
    }
});
