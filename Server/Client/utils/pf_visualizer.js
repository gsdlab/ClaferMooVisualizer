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

function ParetoFrontVisualizer(nodeId, data, labels, m, w, h, chartListeners) 
{
    var tLimitMin = 8; // bubbles cannot be smaller than this
    var tLimitMax = 16; // bubbles cannot be bigger  than this

    this.data = data;
    
var margin = m,
    width = w - margin[1] - margin[3],
    height = h - margin[0] - margin[2];

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

this.svg = d3.select("#" + nodeId).append("svg")
    .attr("width", width + margin[1] + margin[3])
    .attr("height", height + margin[0] + margin[2])
  .append("g")
    .attr("transform", "translate(" + margin[1] + "," + margin[0] + ")");

  var keys = d3.keys(data[0]);
  console.log("Keys:");
  console.log(keys);

  var hasThird = keys[3] ? true : false;
  var hasForth = keys[4] ? true : false;

  // Coerce the strings to numbers.
  data.forEach(function(d) {
    d.id= +d[keys[0]]; 
    d.x = +d[keys[1]];
    d.y = +d[keys[2]];
    if (hasThird)
    {
        d.z = +d[keys[3]];
    }
    else
    {
        d.z = 1;        
    }
    if (hasForth)
    {
        d.t = +d[keys[4]];
    }
    else
    {
        d.t = 1;        
    }
  });

  // Compute the scales’ domains.
  x.domain(d3.extent(data, function(d) { return d.x; }));
  y.domain(d3.extent(data, function(d) { return d.y; }));

  // Add the x-axis.
  var xAxis = this.svg.append("g")
      .attr("class", "bubble-front-graph-x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.format("d")));

  // Add the y-axis.
  var yAxis = this.svg.append("g")
      .attr("class", "bubble-front-graph-y axis")
      .call(d3.svg.axis().scale(y).orient("left").tickFormat(d3.format("d")));

    var zMin = d3.min(data, function(d) { return d.z;} );
    var zMax = d3.max(data, function(d) { return d.z;} );

    var tMin = d3.min(data, function(d) { return d.t;} );
    var tMax = d3.max(data, function(d) { return d.t;} );

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

  col_inner_scale = d3.scale.linear() 
    .domain([zMin, zMax]).range([0, 1]); 
  col_outer_scale = d3.scale.linear() 
    .domain([0, 0.5, 1]) 
    .interpolate(d3.interpolateRgb) 
    .range(["red", "yellow", "green"]); 

  size_scale = d3.scale.linear() 
    .domain([tMin, tMax]).range([tLimitMin, tLimitMax]); 


  // Add the points!

this.g = this.svg.append("g").attr("id", "foreground").selectAll().data(data).enter()
    .append("g").attr("class", "bubble").attr("id", function (d) {return "V" + d.id; });

    this.g.append("circle")
      .attr("class", "shape")
      .attr("fill", function(d) { return col_outer_scale(col_inner_scale(d.z)); })
      .attr("r", function(d) { return size_scale(d.t); })
//      .attr("d", d3.svg.symbol().type("triangle-up"))
      .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    this.g.append("text")
        .attr("class", "label")
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
          .attr("text-anchor", "middle")
          .attr("y", 3)
        .text(function(d) { return d.id;});


/*
	
    data.addColumn({type:'string', label: 'PID'}); 
    data.addColumn({type:'number', label: labels[0], role:'domain'}); 
    data.addColumn({type:'number', label: labels[1], role:'data'});  
    
    if (hasThird)
        data.addColumn({type:'number', label: labels[2], role:'data'});
	
    if (hasForth)
        data.addColumn({type:'number', label: labels[3], role:'data'});

    var rows = new Array();
    
    var maxX = 0;
    var minX = 10000000000;
    
    var maxY = 0;
    var minY = 10000000000;

    var maxZ = 0;
    var minZ = 10000000000;

    var maxT = 0;
    var minT = 10000000000;
    
    var minTSize = 12;
    var maxTSize;
  
    if (hasForth)
    {
        maxTSize = sizeTLimit;
    }
    else 
    {
        maxTSize = minTSize;
        maxT = 0;
        minT = 0;
    }

	for (var i = 1; i <= instanceCount; i++)
	{
        var first;
        var second;
        
        if (instanceCounterId == 0) // if the first dimension represents an instance ID
            first = i;
        else 
        {
//            alert(this.argsToArray(args[0]));
            first = processor.getFeatureValue(i, this.argsToArray(args[0]), 'int'); // get only numeric
        }
            
        if (instanceCounterId == 1) // if the second dimension represents an instance ID
            second = i;
        else 
            second = processor.getFeatureValue(i, this.argsToArray(args[1]), 'int'); // get only numeric
		
		point = new Array();
		point.push(getPID(i));
		point.push(first);
		point.push(second);
        
        var delta = 1;
        
        if (first < minX)
            minX = first - delta;

        if (first >= maxX)
            maxX = first + delta;
        
        if (second < minY)
            minY = second - delta;

        if (second >= maxY)
            maxY = second + delta;
            
            
        if (hasThird)
        {
            var third = processor.getFeatureValue(i, this.argsToArray(args[2]), 'int'); // get only numeric
            point.push(third);
        }

        if (hasForth)
        {
            var forth = processor.getFeatureValue(i, this.argsToArray(args[3]), 'int'); // get only numeric
            
            if (forth < minT)
                minT = forth;
            
            if (forth >= maxT)
                maxT = forth;

//            alert(forth);
            point.push(forth);
        }

        
		rows.push(point);
	}

    if (hasForth){
        $("#MaxCircleLegend").text(maxT);
        $("#MinCircleLegend").text(minT);
        $("#svgcontT").show();
    } else {
        $("#svgcontT").hide();
    }

    //update goals placeholders
    var numgoals = cprocessor.getGoals();
    for (var y = 0; y < numgoals.length; y++){
        var maxG = 0;
        var minG = 10000000000;
        for (var i = 1; i <= instanceCount; i++){
            var test = processor.getFeatureValue(i, this.argsToArray(numgoals[y].arg), 'int');
            if (test < minG)
                minG = test;
            
            if (test >= maxG)
                maxG = test;
        }
        this.showGoal(numgoals[y].arg, minG, maxG);
    }
        

    if (minY > 0)
        minY = 0;
        
    if (minX > 0)
        minX = 0;
        
    if (maxX > maxY)
        maxY = maxX;
    
    var chartWidth;
    var chartHeight;
    
    if (hasThird)
    {
        colorAxisLegendPosition = "top";
        chartTop = 26;
        chartHeight = "88%";
        chartWidth = "88%";
    }
    else 
    {
        colorAxisLegendPosition = "none";
        chartTop = 10;
        chartHeight = "91%";
        chartWidth = "91%";
    }

    if ($('[name~="' + labels[2] + '"]').attr("id") == "operation_min"){
        var colorList = ['green', 'yellow', 'red'];
    } else {
        var colorList = ['red', 'yellow', 'green'];
    }
    
    data.addRows(rows);          

	var options = {
//	  theme: 'maximized', 
	  title: '',
      chartArea: {left:"30", top:chartTop, width: chartWidth, height: chartHeight},
      titleTextStyle: {color: "black", fontName: "Arial", fontSize: 10},
	  hAxis: {maxValue: maxX, minValue: minX},
	  vAxis: {maxValue: maxY, minValue: minY},
      axisTitlesPosition: 'in',
	  sizeAxis: {maxValue: maxT, maxSize: maxTSize, minValue: minT, minSize: minTSize},
      
//	  hAxis: {title: labels[0], viewWindowMode: "pretty"},
//	  vAxis: {title: labels[1], viewWindowMode: "pretty"},
	  animation: {duration:3000},
      colorAxis: {legend : {position : colorAxisLegendPosition}, colors: colorList},
      
      bubble: {textStyle: {fontSize: 12}, stroke: "black"},
//      sizeAxis: {maxSize: 12, minSize: 12},
      legend: 'bottom'
    };

	this.chart = new google.visualization.BubbleChart(document.getElementById(this.element));

    var context = this;

    google.visualization.events.addListener(this.chart, 'select', this.myClickHandler.bind(this)); 
    google.visualization.events.addListener(this.chart, 'onmouseover', function(data){

        $("#comparison #th0_" + (data.row+1)).css("background", "#ffffcc");
        var tomodify = $("#analysis #unique th").has("text:contains('" + (data.row+1) +"')");
        var text = String((data.row+1)) + String((data.row+1)) + "--";
        tomodify.each(function(){
            var thistext = $(this).text();
            if (thistext == text)
                $(this).css("background", "#ffffcc");
        });

        var originalPoints = context.hostModule.getExistingInstancesCount();
        $("#chart circle").each(function(){
            if (data.row >= originalPoints){
                if ($(this).attr("id") == null){
                    $(this).hide();
                }
            }
        });
        $($("#chart g:contains('" + getPID(data.row+1) + "') text")[0]).text("Variant " + (data.row+1));
    }); 
    google.visualization.events.addListener(this.chart, 'onmouseout', function(data){

        $("#comparison #th0_" + (data.row+1)).css("background", "");
        var tomodify = $("#analysis #unique th").has("text:contains('" + (data.row+1) +"')");
        var text = String((data.row+1)) + String((data.row+1)) + "--";
        tomodify.each(function(){
            var thistext = $(this).text();
            if (thistext == text)
                $(this).css("background", "");
        });



        $("#chart circle").each(function(){
            if ($(this).attr("id") == null){
                $(this).attr("id", getPID(data.row + 1) + "c");
            }
        });

        var originalPoints = context.hostModule.getExistingInstancesCount();
        for (var i = 1; i <= ($("#chart circle").length); i++){
            if (i > originalPoints){
                $("#" + getPID(i) + "c").hide();
            }
        }
    }); 



//    this.host.chart = this.chart;  
	this.chart.draw(data, options);
*/
}

ParetoFrontVisualizer.method("myClickHandler", function()
{
    /*
    var selection = this.chart.getSelection();  
//    alert(this);
    this.chart.setSelection(null);
    var originalPoints = this.hostModule.getExistingInstancesCount();
    var id = -1;
 
  for (var y = 0; y < selection.length; y++){
        $("#chart circle").each(function(){

            if (selection[y].row >= originalPoints){
                if ($(this).attr("id") == null){
                    $(this).hide()
                }
            }
        });
  }
  
  for (var i = 0; i < selection.length; i++) 
  {
    var item = selection[i];
    if (item.row != null) 
    {
        id = item.row;
    }
    
    if (id == -1)
        return;
       
    var pid = getPID(id + 1);
       
    this.hostModule.settings.onBubbleClick(this.hostModule, pid);
  }
  $($("#chart g:contains('" + getPID(selection[0].row+1) + "') text")[0]).text("Variant " + (selection[0].row+1));
    */
});


ParetoFrontVisualizer.method("setRange", function(dim, min, max) 
{
    for (var i = 0; i < this.ranges.length; i++)
    {
        if (this.ranges[i].dim == dim)
        {
            this.ranges[i].min = +min;   
            this.ranges[i].max = +max;   
        }
    }

    console.log(this.ranges);
});

ParetoFrontVisualizer.method("filter", function(){

    var context = this;
    // show/hide instances

    var foreground = this.svg.select("#foreground").selectAll("g.bubble");

    foreground.classed("hidden", function(d){
        // adding a hidden class, if the data value is outside at least one (some) range
        return context.ranges.some(function(p, i) 
          {
              return p.min > d[p.dim] || d[p.dim] > p.max;
          });

    });
});
