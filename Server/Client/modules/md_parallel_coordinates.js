/*
Copyright (C) 2012, 2013 Neil Redman, Alexander Murashkin <http://gsd.uwaterloo.ca>

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

function ParallelCoordinates(host, settings)
{
    this.id = "mdParallelCoordinates";

    this.settings = settings;
    this.title = this.settings.title;

    this.width = this.settings.layout.width;
    this.height = this.settings.layout.height;
    this.posx = this.settings.layout.posx;
    this.posy = this.settings.layout.posy;

    this.host = host;

    this.instanceProcessor = null;
    this.selection = new Array();
    this.host.loaded();
}

ParallelCoordinates.method("onDataLoaded", function(data){
    this.clearSelection();
    this.instanceProcessor = new InstanceProcessor(data.instancesXML);
    this.claferProcessor = new ClaferProcessor(data.claferXML);
    this.goals = data.goals;
});

ParallelCoordinates.method("resize", function() // not attached to the window anymore, so need to call the method
{
    this.redrawChart();
    return true;
});

ParallelCoordinates.method("onRendered", function()
{
    this.redrawChart();
});

ParallelCoordinates.method("clearSelection", function()
{
    this.selection = [];
    this.redrawChart();
});

ParallelCoordinates.method("argsToArray", function(argString){
    return argString.split("-");
});

ParallelCoordinates.method("redrawChart", function()
{
    var e = $('#mdSpiderChart div.window-content')[0];

    var sw = document.defaultView.getComputedStyle(e,null).getPropertyValue("width");
    var sh = document.defaultView.getComputedStyle(e,null).getPropertyValue("height");

    var w = parseInt(sw);
    var h = parseInt(sh);

    var blue_to_brown = d3.scale.linear()
      .domain([9, 50])
      .range(["steelblue", "brown"])
      .interpolate(d3.interpolateLab);

    var color = function(d) { return blue_to_brown(d['economy (mpg)']); };

    var parcoords = d3.parcoords()("#pcChart")
      .color(color)
      .alpha(0.4);

    // load csv file and create the chart
    d3.csv('/Client/parallel_coordinates/sample.csv', function(data) {
      parcoords
        .data(data)
        .render()
        .brushable();
/*
          .interactive()  // command line mode

          var explore_count = 0;
          var exploring = {};
          var explore_start = false;
          pc1.svg
            .selectAll(".dimension")
            .style("cursor", "pointer")
            .on("click", function(d) {
              exploring[d] = d in exploring ? false : true;
              event.preventDefault();
              if (exploring[d]) d3.timer(explore(d,explore_count));
            });

          function explore(dimension,count) {
            if (!explore_start) {
              explore_start = true;
              d3.timer(pc1.brush);
            }
            var speed = (Math.round(Math.random()) ? 1 : -1) * (Math.random()+0.5);
            return function(t) {
              if (!exploring[dimension]) return true;
              var domain = pc1.yscale[dimension].domain();
              var width = (domain[1] - domain[0])/4;

              var center = width*1.5*(1+Math.sin(speed*t/1200)) + domain[0];

              pc1.yscale[dimension].brush.extent([
                d3.max([center-width*0.01, domain[0]-width/400]),  
                d3.min([center+width*1.01, domain[1]+width/100])  
              ])(pc1.g()
                  .filter(function(d) {
                    return d == dimension;
                  })
              );
            };
          };        
*/
/*
      // create data table, row hover highlighting
      var grid = d3.divgrid();
      d3.select("#grid")
        .datum(data.slice(0,10))
        .call(grid)
        .selectAll(".row")
        .on({
          "mouseover": function(d) { parcoords.highlight([d]) },
          "mouseout": parcoords.unhighlight
        });

      // update data table on brush event
      parcoords.on("brush", function(d) {
        d3.select("#grid")
          .datum(d.slice(0,10))
          .call(grid)
          .selectAll(".row")
          .on({
            "mouseover": function(d) { parcoords.highlight([d]) },
 s           "mouseout": parcoords.unhighlight
          });
      });
*/
    });

});

//rebuilds the table with the new selection data
ParallelCoordinates.method("onSelectionChanged", function(newSelection){
    //pulls data from the comparison table
    this.selection = newSelection;

    this.redrawChart();
});


//gets containers and placeholders
ParallelCoordinates.method("getContent", function()
{
    var content = '<div id="pcChart" class="parcoords" style="width:100%;height:100%"></div>';
	return content;	
});

ParallelCoordinates.method("getInitContent", function()
{
	return this.getContent();
});

ParallelCoordinates.method("onInitRendered", function()
{

});

