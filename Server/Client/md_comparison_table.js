function ComparisonTable()
{ 
	this.fadeColor = "#777";
	this.normalColor = "#000"

	this.fadeOpacity = "0.7";
	this.normalOpacity = "1.0"

}

ComparisonTable.method("onDataLoaded", function(claferXML, instancesXML){
    this.instanceProcessor = new InstanceProcessor(instancesXML);
    this.processor = new ClaferProcessor(claferXML);
    this.abstractClaferOutput = "";    
    this.toggled = false;
    this.content = this.getHtmlCode();
});

ComparisonTable.method("onRendered", function()
{
    $('#toggle_link').html("Distinct");
    $('#toggle_link').click(this.toggleDistinct.bind(this));
    
    this.addHovering();
});

ComparisonTable.method("getContent", function()
{
    return this.content;
});

/* Supplementary Methods */

ComparisonTable.method("collector", function(clafer, spaceCount)
{
	var unit = new Object();
	unit.claferId = clafer.claferId;
	unit.displayId = clafer.displayId;

	unit.displayWithMargins = unit.displayId;
	
	for (var i = 0; i < spaceCount * 3; i++)
		unit.displayWithMargins = "&nbsp;" + unit.displayWithMargins;

	abstractClaferOutput.push(unit);
});

ComparisonTable.method("traverse", function(clafer, level)
{
	this.collector (clafer, level);
	for (var i = 0; i < clafer.subclafers.length; i++)
	{
		this.traverse(clafer.subclafers[i], level + 1);
	}
});

ComparisonTable.method("isNumeric", function(input)
{
    return (input - 0) == input && input.length > 0;
});

ComparisonTable.method("mapValue", function(sVal)
{
	var result = new Object();
	result.tdStyle = "";
	result.html = sVal;
	
	if (sVal == "yes")
	{
		result.html = '<img class="tick" src="/Client/images/tick.png"/>';
		result.tdStyle = 'tick';
	}
	
	if (sVal == "-")
	{
		result.html = '-';
		result.tdStyle = 'no';
	}

	if (this.isNumeric(sVal))
	{
		result.tdStyle = 'numeric';
		result.html = '<span class="number">' + sVal + '</span>'
	}
		
	return result;
});

// The Main Content Generator

ComparisonTable.method("getHtmlCode", function()
{
	var instanceCount = this.instanceProcessor.getInstanceCount();
	var instanceSuperClafer = this.instanceProcessor.getInstanceSuperClafer();
//	alert(instanceSuperClafer);
	var abstractClaferTree = this.processor.getAbstractClaferTree("/module/declaration/uniqueid", instanceSuperClafer);

	
//	alert(abstractClaferTree.subclafers[0].subclafers.length);
	
//	alert(instanceSuperClafer);

	
	var parent = null;
	var current = abstractClaferTree;
	abstractClaferOutput = new Array();
	
	this.traverse(current, 0);
	output = abstractClaferOutput;
	
	var table = $('<table width="100%" cellspacing="0" cellspadding="0"></table>').addClass('foo');
	
	for (var i = 0; i < output.length; i++)
	{
		if (i == 0)
			tagName = "th"; // to make headers
		else
			tagName = "td";
			
		var row = $('<tr id="r' + i +'"></tr>').addClass('bar');//
		
		var td = $('<' + tagName + '></' + tagName + '>').addClass('td_abstract');
		td.html(output[i].displayWithMargins);
        
        if (i == 0)
        {
            td.append('&nbsp;<button id="toggle_link">Toggle</button>');
        }
        
		row.append(td);
		
		table.append(row);
		
		for (var j = 1; j <= instanceCount; j++)
		{
			var td = $('<' + tagName + ' id="' + tagName + i + "_" + j + '"></' + tagName + '>').addClass('td_instance');
			
			if (i == 0)
				td.html("P" + j);
			else
			{
				sVal = this.instanceProcessor.getFeatureValue(j, output[i].claferId, false);
				mappedValue = this.mapValue(sVal);
				td.html(mappedValue.html);
				td.addClass(mappedValue.tdStyle);
			}
				
			row.append(td);
		}
		
//		alert("ok");
	}

	return table;	

});

ComparisonTable.method("toggleRow", function(row, isOn)
{
    if (!isOn)
    {
        $(row).fadeTo('slow', 0.3);    
    }
    else
    {
        $(row).fadeTo('slow', 1);
    }
});

ComparisonTable.method("toggleDistinct", function()
{
    this.toggled = !this.toggled;
    if (!this.toggled)
    {
        var table = $("#comparison table");
        $("#toggle_link").html("Distinct");
        
        var rows = table.find("tr");
        for (var i = 0; i < rows.length; i++)
        {
            this.toggleRow(rows[i], true);
        }
    }
    else
    {
        $("#toggle_link").html("Normal");

        var table = $("#comparison table");
        
        var row = table.find("#r1");
        var i = 1;
        while (row.length != 0)
        {
            var instanceTds = row.find(".td_instance");

            var allAreTheSame = true;
            var last = "";

            for (var j = 0; j < instanceTds.length; j++)
            {

                if ($(instanceTds[j]).hasClass("tick"))
                {
                    if (last == "" || last == "tick")
                        last = "tick";
                    else allAreTheSame = false;
                }   
                else if ($(instanceTds[j]).hasClass("no"))
                {
                    if (last == "" || last == "no")
                        last = "no";
                    else allAreTheSame = false;
                }
                else allAreTheSame = false;
            }
            
            if (allAreTheSame)
            {
                this.toggleRow(row, false);
            }
            
            i++;
            row = table.find("#r" + i);
        }
    }
    
    return true;
});


ComparisonTable.method("addHovering", function()
{	
	$("#comparison table tr").not(':first').hover(
	  function () {
		$('#comparison table tr:gt(0)').css("color", this.fadeColor);
		$('#comparison table tr:gt(0) img').css("opacity", this.fadeOpacity);
		
		$(this).css("color", this.normalColor);
		$(this).find("img").css("opacity", this.normalOpacity);

		$(this).css("background", "#ffffcc");
	  }, 
	  function () {
		$('#comparison table tr:gt(0)').css("color", this.normalColor);
		$('#comparison table tr:gt(0) img').css("opacity", this.normalOpacity);
		$(this).css("background", "");
	  }
	);
});

ComparisonTable.method("getInitContent", function()
{
	return '<div id="comparison"></div>';	   
});