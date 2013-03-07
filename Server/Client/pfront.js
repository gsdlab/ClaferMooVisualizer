function ParetoFrontVisualizer (element) 
{
	this.element = element;
//    google.setOnLoadCallback(loadCallback);
//        function loadCallback() 
//        {
//        }
}

ParetoFrontVisualizer.prototype.draw = function(processor, args, labels) 
{
	if ((args.length < 2) || args.length != labels.length)
	{
		alert("Should have exactly 2 values in each argument");
		return;
	}
	
    var hasThird = (args.length >= 3); // has third dimension
    var hasForth = (args.length >= 4); // has forth dimension

    var sizeTLimit = 20; // bubbles cannot be bigger than this
    
//    alert(args[3]);
    
	var instanceCount = processor.getInstanceCount();
	
    var data = new google.visualization.DataTable();
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

		var first = processor.getFeatureValue(i, args[0], true); // get only numeric
		var second = processor.getFeatureValue(i, args[1], true); // get only numeric
		
		point = new Array();
		point.push("V" + i);
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

        if (hasForth)
        {
            var forth = processor.getFeatureValue(i, args[3], true); // get only numeric
            
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
    for (var y = 0; y < args.length; y++){
        var maxG = 0;
        var minG = 10000000000;
        for (var i = 1; i <= instanceCount; i++){
            var test = processor.getFeatureValue(i, args[y], true);
            if (test < minG)
                minG = test;
            
            if (test >= maxG)
                maxG = test;
        }
        this.showGoal(labels[y], minG, maxG);
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

    google.visualization.events.addListener(this.chart, 'select', this.myClickHandler); 
    google.visualization.events.addListener(this.chart, 'onmouseover', function(data){

        $("#comparison #th0_" + (data.row+1)).css("background", "#ffffcc");
        var tomodify = $("#analysis #unique th").has("text:contains('" + (data.row+1) +"')");
        var text = String((data.row+1)) + String((data.row+1)) + "--";
        tomodify.each(function(){
            var thistext = $(this).text();
            if (thistext == text)
                $(this).css("background", "#ffffcc");
        });

        var originalPoints = this.host.findModule("mdInput").originalPoints;
        $("#chart circle").each(function(){
            if (data.row >= originalPoints){
                if ($(this).attr("id") == null){
                    $(this).hide();
                }
            }
        });
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
                $(this).attr("id", "V" + (data.row + 1) + "c");
            }
        });

        var originalPoints = this.host.findModule("mdInput").originalPoints;
        for (var i = 1; i <= ($("#chart circle").length); i++){
            if (i > originalPoints){
                $("#V" + i + "c").hide();
            }
        }
    }); 
    host.chart = this.chart;
    
	this.chart.draw(data, options);

}

ParetoFrontVisualizer.prototype.myClickHandler = function()
{
//    alert(this);
  var selection = host.chart.getSelection();
  host.chart.setSelection(null);
  var originalPoints = this.host.findModule("mdInput").originalPoints;
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
       
    var pid = "V" + (id + 1);
       
    if (host.selector.isSelected(pid))
    {
        host.selector.onDeselected(pid);
    }
    else
    {
        host.selector.onSelected(pid);
    }
  }
}

ParetoFrontVisualizer.prototype.showGoal = function(goal, min, max){
    $("#"+goal+"min").attr("placeholder", min);
    $("#"+goal+"max").attr("placeholder", max);
}




