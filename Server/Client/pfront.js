function ParetoFrontVisualizer (element) 
{
	this.element = element;
	google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(loadCallback);
        function loadCallback() 
        {
        }
}

ParetoFrontVisualizer.prototype.draw = function(processor, args, labels) 
{
	if ((args.length < 2) || args.length != labels.length)
	{
		alert("Should have exactly 2 values in each argument");
		return;
	}
	
    var hasThird = (args.length == 3); // has third dimension

	var instanceCount = processor.getInstanceCount();
	
    var data = new google.visualization.DataTable();
    data.addColumn({type:'string', label: 'PID'}); 
    data.addColumn({type:'number', label: labels[0], role:'domain'}); 
    data.addColumn({type:'number', label: labels[1], role:'data'});  
    
    if (hasThird)
        data.addColumn({type:'number', label: labels[2], role:'data'});
	
    var rows = new Array();
    
    var maxX = 0;
    var minX = 10000000000;
    
    var maxY = 0;
    var minY = 10000000000;

	for (var i = 1; i <= instanceCount; i++)
	{
		var first = processor.getFeatureValue(i, args[0], true); // get only numeric
		var second = processor.getFeatureValue(i, args[1], true); // get only numeric
		
		point = new Array();
		point.push("" + i);
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
            var third = processor.getFeatureValue(i, args[2], true); // get only numeric
            point.push(third);
        }
        
		rows.push(point);
	}
    
    if (minY > 0)
        minY = 0;
        
    if (minX > 0)
        minX = 0;
        
    if (maxX > maxY)
        maxY = maxX;
    
    if (hasThird)
    {
        colorAxisLegendPosition = "top";
        chartTop = 26;
        chartHeight = "90%";
    }
    else 
    {
        colorAxisLegendPosition = "none";
        chartTop = 10;
        chartHeight = "91%";
    }
    
    data.addRows(rows);          

	var options = {
//	  theme: 'maximized', 
	  title: '',
      chartArea: {left:"20", top:chartTop, width: "100%", height: chartHeight},
      titleTextStyle: {color: "black", fontName: "Arial", fontSize: 12},
	  hAxis: {maxValue: maxX, minValue: minX},
	  vAxis: {maxValue: maxY, minValue: minY},
      axisTitlesPosition: 'in',
//	  hAxis: {title: labels[0], viewWindowMode: "pretty"},
//	  vAxis: {title: labels[1], viewWindowMode: "pretty"},
	  animation: {duration:3000},
      colorAxis: {legend : {position : colorAxisLegendPosition}},
      
      bubble: {textStyle: {fontSize: 12}, stroke: "black"},
      sizeAxis: {maxSize: 12, minSize: 12},
      legend: 'bottom'
    };

//	alert(data);
	this.chart = new google.visualization.BubbleChart(document.getElementById(this.element));

        google.visualization.events.addListener(this.chart, 'select', function(e) {
            //  alert('A table row was selected');
                //alert(this.chart.getSelection);
                try{
            //        alert(e);
            //    alert(this.chart.getSelection);
                var sel = this.getSelection();
                
                alert(sel);
                
                }
                catch(ex)
                {
                    alert(ex);
                }
                
              return true;
            }
        
        );

	this.chart.draw(data, options);
		
	
}

/* SCATTER */

function ParetoFrontVisualizerScatter (element) 
{
	this.element = element;
	google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Age', 'Weight'],
          [ 8,      12],
          [ 4,      5.5],
          [ 11,     14],
          [ 4,      5],
          [ 3,      3.5],
          [ 6.5,    7]
        ]);

        var options = {
          title: 'Age vs. Weight comparison',
          hAxis: {title: 'Age', minValue: -15, maxValue: 15},
          vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
          legend: 'none'
        };

        this.chart = new google.visualization.ScatterChart(document.getElementById(element));

 //       chart.draw(data, options);
	}
}

ParetoFrontVisualizerScatter.prototype.draw = function(processor, args, labels) 
{
	if (args.length != 2 || args.length != labels.length)
	{
		alert("Should have exatly 2 values in each argument");
		return;
	}
	
	var instanceCount = processor.getInstanceCount();
	
    var data = new google.visualization.DataTable();
    data.addColumn({type:'string', label: 'PID'}); 
    data.addColumn({type:'number', label: labels[0], role:'domain'}); 
    data.addColumn({type:'number', label: labels[1], role:'data'});  
    data.addColumn({type:'string', label: 'tooltip', role:'tooltip'});
	
    var rows = new Array();
    
	for (var i = 1; i <= instanceCount; i++)
	{
		var first = processor.getFeatureValue(i, args[0], true); // get only numeric
		var second = processor.getFeatureValue(i, args[1], true); // get only numeric
		
		point = new Array();
		point.push("P" + i);
		point.push(first);
		point.push(second);
//		point.push("Prod#" + i);
		
		rows.push(point);
	}
    
    data.addRows(rows);          

	var options = {
/*	  theme: 'maximized', */
	  title: 'Pareto Front',
	  hAxis: {title: labels[0], minValue: 0, maxValue: 15},
	  vAxis: {title: labels[1], minValue: 0, maxValue: 15},
	  animation: {duration:3000},
      bubble: {textStyle: {fontSize: 11}},      
	  legend: 'none'
	};

//	alert(data);
	this.chart = new google.visualization.BubbleChart(document.getElementById(this.element));
	google.visualization.events.addListener(this.chart, 'select', function(e) {
        //  alert('A table row was selected');
            //alert(this.chart.getSelection);
            try{
        //        alert(e);
        //    alert(this.chart.getSelection);
            var sel = this.getSelection();
            
            alert(sel);
            
            }
            catch(ex)
            {
                alert(ex);
            }
            
          return true;
        }
    
    );

	this.chart.draw(data, options);
		
	
}

