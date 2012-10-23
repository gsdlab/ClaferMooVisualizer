function ParetoFrontVisualizer (element) 
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

        var chart = new google.visualization.ScatterChart(document.getElementById(element));
 //       chart.draw(data, options);
	}
}

ParetoFrontVisualizer.prototype.draw = function(processor, args, labels) 
{
	if (args.length != 2 || args.length != labels.length)
	{
		alert("Should have exatly 2 values in each argument");
		return;
	}
	
	var instanceCount = processor.getInstanceCount();
	var data = new Array();
	data.push(labels);
	
	for (var i = 1; i <= instanceCount; i++)
	{
		var first = processor.getFeatureValue(i, args[0], true); // get only numeric
		var second = processor.getFeatureValue(i, args[1], true); // get only numeric
		
		point = new Array();
		point.push(first);
		point.push(second);
		
		data.push(point);
	}

	var options = {
	  title: 'Pareto Front',
	  hAxis: {title: labels[0], minValue: 0, maxValue: 15},
	  vAxis: {title: labels[1], minValue: 0, maxValue: 15},
	  animation: {duration:3000},
	  legend: 'none'
	};

//	alert(data);
	var chart = new google.visualization.ScatterChart(document.getElementById(this.element));
	chart.draw(google.visualization.arrayToDataTable(data), options);
	
}
