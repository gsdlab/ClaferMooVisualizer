function Graph(host)
{
    this.id = "mdGraph";
    this.title = "Pareto Front Graph";

    this.width = 500;
    this.height = 505;
    this.posx = 500;
    this.posy = 0;
    
    this.instanceProcessor = null;
    this.axisArray = new Array();
    this.PFVisualizer = new ParetoFrontVisualizer("chart");
    this.host = host;
}

Graph.method("onDataLoaded", function(data){
    this.instanceProcessor = new InstanceProcessor(data.instancesXML);    
});

Graph.method("onRendered", function()
{
    this.goals = this.host.findModule("mdGoals").goals;
    
    var dropPlaces = $(".axis_drop");
    for (var i = 0; i < dropPlaces.length; i++)
    {
        $(".axis_drop")[i].ondrop = this.drop.bind(this);
        $(".axis_drop")[i].ondragover = this.allowDrop.bind(this);
    }

	if (this.goals.length >= 2)
	{
		$("#chart").show();
		this.assignToAxis("dropPointX", this.goals[0].arg, this.goals[0].label);
		this.assignToAxis("dropPointY", this.goals[1].arg, this.goals[1].label);
        
        if (this.goals.length >= 3)
        {
            this.assignToAxis("dropPointZ", this.goals[2].arg, this.goals[2].label);

            if (this.goals.length >= 4)
            {
                this.assignToAxis("dropPointT", this.goals[3].arg, this.goals[3].label);
            }
            else 
                this.assignToAxis("dropPointT", "", "");

        }
        else 
        {
            this.assignToAxis("dropPointZ", "", "");
            this.assignToAxis("dropPointT", "", "");
        }
        
        this.redrawParetoFront();
	}
	else
		$("#chart").hide();

    this.addIds();
});

Graph.method("allowDrop", function(ev)
{
	ev.preventDefault();
});

Graph.method("drop", function(ev)
{
	ev.preventDefault();

	var data = ev.dataTransfer.getData("Text");
	
	var parts = data.split("|");
	
	if (parts.length < 2)
		return;
	
	var arg = parts[0];
	var label = parts[1];

    var id = ev.target.id;
    var node = ev.target;
    
    while (node.parentNode != null && (id == "" || id == "svgcontY"|| id == "svgcontT"))
    {
        node = node.parentNode;
        id = node.id;
    }
    
	this.assignToAxis(id, arg, label, true);
    this.redrawParetoFront();
    host.findModule("mdComparisonTable").filterContent();
});

Graph.method("assignValue", function (id, value)
{
	if ($(id).length == 0)
		$('body').append('<input type="hidden" id="' + id + '" value=""/>');
	
	$('#' + id).val(value);
	
});

Graph.method("redrawParetoFront", function()
{
    if (this.instanceProcessor == null)
        return; // no data, so just resize

	var arg1 = $("#dropPointXAxisConfig_arg").val();
	var label1 = $("#dropPointXAxisConfig_label").val();

	var arg2 = $("#dropPointYAxisConfig_arg").val();
	var label2 = $("#dropPointYAxisConfig_label").val();

	var arg3 = $("#dropPointZAxisConfig_arg").val();
	var label3 = $("#dropPointZAxisConfig_label").val();
    
	var arg4 = $("#dropPointTAxisConfig_arg").val();
	var label4 = $("#dropPointTAxisConfig_label").val();
    
    var sLabel2 = '<g style="z-index: 110; "><text text-anchor="middle" x="15" y="320.5" font-family="Arial" font-size="12" transform="rotate(-90 14.2 320.5)" stroke="none" stroke-width="0" fill="#222222" style="cursor: default;">' + label2 + '</text><image xlink:href="images/verticalAxis.png" alt="yaxis" x="5" y="90" width="12" height="155"></g>';
    sLabel2 = '<div id="svgcontY" style="position:relative; left:0;top:0; z-index:100; width:100%; height:100%;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="z-index:101;" height="450" width="18">' + sLabel2 + '</svg></div>';
    
    var sLabel4 = '<g style="z-index: 110; "><text text-anchor="middle" x="14.2" y="210.5" font-family="Arial" font-size="12" transform="rotate(-90 14.2 210.5)" stroke="none" stroke-width="0" fill="#222222" style="cursor: default;">' + label4;
    sLabel4 = sLabel4 + '</text><circle cx="40" cy="240" r="12" stroke="black" stroke-width="1" fill="#efe6dc" style="cursor: default;"/><circle cx="40" cy="185" r="20" stroke="black" stroke-width="1" fill="#efe6dc" style="cursor: default;"/><text id="MaxCircleLegend" text-anchor="middle" x="40" y="190" font-family="Arial" font-size="12" stroke="none" stroke-width="0" fill="#222222" style="cursor: default;">X1</text><text id="MinCircleLegend" text-anchor="middle" x="40" y="245" font-family="Arial" font-size="12" stroke="none" stroke-width="0" fill="#222222" style="cursor: default;">X2</text></g>';
    sLabel4 = '<div id="svgcontT" style="position:relative; left:0;top:0; z-index:100; width:100%; height:100%;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="z-index:101;" height="350" width="60">' + sLabel4 + '</svg></div>';

    $("#dropPointX").html('<div>' + label1 + '<image src="images/horizontalAxis.png" alt="x-axis"></div>');
    $("#dropPointY").html(sLabel2);
    $("#dropPointZ").html("<div>" + label3 + "</div>");
    $("#dropPointT").html(sLabel4);

    var args = new Array();
    var labels = new Array();
    
    args.push(arg1);
    labels.push(label1);
    
    args.push(arg2);
    labels.push(label2);
    
//    alert(arg3);
    
    if (arg3 && arg3 != "")
    {
        args.push(arg3);
        labels.push(label3);
    }
    
//    alert(arg4);

    if (arg4 && arg4 != "")
    {
        args.push(arg4);
        labels.push(label4);
    }
    
    this.PFVisualizer.draw(this.instanceProcessor, args, labels);
    this.makePointsSelected(this.host.selector.selection);
    this.addIds();
    this.makePointsNew();
});

Graph.method("addIds", function(){
    var i = 1;
    var graph_data = $("#chart g:contains('V1')")[2];
    var circle_pairs = [];
    for (i=0; i<$(graph_data).children().length;i+=2){
        circle_pairs.push({ circle: $(graph_data).children()[i], text_data: $(graph_data).children()[i+1], ident: ""});
    }

    for (i=0; i<circle_pairs.length; i++){
        circle_pairs[i].ident = $(circle_pairs[i].text_data).text().replace(/[A-Za-z]/g, "");
    }

    

    circle_pairs.sort(function(a,b){
        return a.ident - b.ident;
    });


    for(i=0; i<circle_pairs.length; i++){
        $(circle_pairs[i].circle).attr("id", "P" + (i+1) + "c");
        $(circle_pairs[i].text_data).attr("id", "P" + (i+1) + "t");
    }

});

Graph.method("makePointsNew", function(){
    this.addIds();
// Get graph bubble html locations
    var circle_pairs = [];
    for (var i=(this.host.findModule("mdInput").originalPoints + 1); i<=$("#chart circle").length; i++){
        circle_pairs.push({circle: $("#P" + i + "c"), text_data: $("#P" + i + "t"), ident: i});
    }
    //hide table header (row 0)
    i = 0;
    while (circle_pairs.length != 0){
        circlePair = circle_pairs.pop();
        var size = $(circlePair.circle).attr("r");
        var xpos = $(circlePair.circle).attr("cx") - size;
        var ypos = $(circlePair.circle).attr("cy") - size;
        var fill = $(circlePair.circle).attr("fill");
        var id = "#P" + $(circlePair.circle).attr("id").replace(/[A-Za-z]/g, "") + "r"
        var NS="http://www.w3.org/2000/svg";
        var rect= document.createElementNS(NS,"rect");
        rect.width.baseVal.value=size;
        rect.height.baseVal.value=size;
        rect.setAttribute("height",size*2);
        rect.setAttribute("width",size*2);
        rect.setAttribute("x",xpos);
        rect.setAttribute("y",ypos);
        rect.setAttribute("id",id);
        rect.setAttribute("stroke","#000000");
        rect.setAttribute("stroke-width","1");
        rect.setAttribute("fill-opacity","0.8");
        rect.style.fill=fill;
        $(circlePair.text_data).prepend(rect);
        $(circlePair.circle).attr("fill-opacity","0");
        $(circlePair.circle).attr("stroke-width","0");
    }
});

Graph.method("selectObject", function(o)
{
    $(o).attr("fill", "#ff0000");    
});

Graph.method("deselectObject", function(o)
{
    $(o).attr("fill", "#000000");    
});

Graph.method("makePointsSelected", function(points)
{
    var module = this;

    for (var i = 0; i < points.length; i++)
    {
        $('#chart text').each(function()
        {
            if (this.firstChild)
            {
                if (this.firstChild.nodeValue == points[i])
                    module.selectObject(this);
            }
        });
    }
});

Graph.method("makePointsDeselected", function(points)
{
    var module = this;

    for (var i = 0; i < points.length; i++)
    {
        $('#chart text').each(function()
        {
            if (this.firstChild)
            {
                if (this.firstChild.nodeValue == points[i])
                    module.deselectObject(this);// alert(this.firstChild.nodeValue);
            }
        });
    }
});


Graph.method("assignToAxis", function(axis, arg, label)
{
	this.assignValue(axis + "AxisConfig_arg", arg);
	this.assignValue(axis + "AxisConfig_label", label);
});

Graph.method("getContent", function()
{
	var table = $('<table cellspacing="0" cellpadding="0" border="0" id="graph_table"></table>');
	
    var tdZ = $('<td colspan="3" id="dropPointZ" class="axis_drop"></td>');
    var tdY = $('<td id="dropPointY" class="axis_drop"></td>');
    var tdT = $('<td id="dropPointT" class="axis_drop"></td>');
    var tdChart = $('<td id="chart" style="display:none; width: 300px; height: 200px; overflow:hidden"></td>'); // need to keep width here since first time is not rendered good
    var tdX = $('<td colspan="3" id="dropPointX" class="axis_drop"></td>');

    this.axisArray.splice(0, this.axisArray.length); // clear the array
    this.axisArray = new Array();
    this.axisArray.push(tdX);
    this.axisArray.push(tdY);
    this.axisArray.push(tdZ);
    this.axisArray.push(tdT);
    
    for (var i = 0; i < this.axisArray.length; i++)
    {
        this.axisArray[i].html("&nbsp;");
    }
    
    var row1 = $('<tr></tr>').append(tdZ);
    var row2 = $('<tr></tr>').append(tdY).append(tdChart).append(tdT);
    var row3 = $('<tr></tr>').append(tdX);
        
		
    table.append(row1);
    table.append(row2);
    table.append(row3);
		
	return table;	
    
});

Graph.method("getInitContent", function()
{
	return this.getContent();
});

function setDim(el, w, h)
{
//    alert(el);
//    alert(w + "px");
//    alert(h + "px");

//    el.setAttribute('height', w + "px");
//    el.setAttribute('width', h + "px");

      $(el).width(w + "px");
      $(el).height(h + "px");

//    el.style.width = w + "px";
//    el.style.height = h + "px";
    
//    $(el).css("width", w + "px");
//    $(el).css("height", h + "px");
}

Graph.method("resize", function() // not attached to the window anymore, so need to call the method
{

    // need to resize dynamically, since it does not do this automatically

    var e = $('#mdGraph div.window-content')[0];
//    alert(e);
    
    var sw = document.defaultView.getComputedStyle(e,null).getPropertyValue("width");
    var sh = document.defaultView.getComputedStyle(e,null).getPropertyValue("height");

    var w = parseInt(sw);
    var h = parseInt(sh);
    
	var table = $('#graph_table')[0];	
    
    var tdZ = $('#dropPointZ')[0];
    var tdY = $('#dropPointY')[0];
    var tdT = $('#dropPointT')[0];
    
    var tdChart = $('#chart')[0];
    var tdX = $('#dropPointX')[0];    
        
    var unit = 20;
        
//    alert(w);
//    alert(h);
        
//    table.setAttribute('height', w);
//    table.setAttribute('width', h);
//    setDim(table, 0, 0);
    
    setDim(table, w, h);
    setDim(tdZ, w, unit);
    setDim(tdY, unit, h - 2 * unit);
    setDim(tdChart, w - 2 * unit, h - 2 * unit);
    setDim(tdT, unit, h - 2 * unit);
    setDim(tdX, w, unit);
    
//    tdChart.css("width", w - 2 * unit);
//    tdChart.css("height", h - 2 * unit);

    
/*
    var sw = $("#mdGraph").css("width"); // returns the string 400px
    var sh = $("#mdGraph").css("height"); // returns the string 400px

    sw = sw.replace("px", "");
    sh = sh.replace("px", "");
*/    

    $("#graph_table").css("table-layout", "auto"); //A fix for horizontal compression on non-chrome browsers (Jan 11th 2013)
//    alert(w + " " + h);
    
    $("chart").empty(); // clear the old graph
    
    if (host.findModule("mdGraph"))
    {    
        host.findModule("mdGraph").redrawParetoFront();
    }

	return true;
});
