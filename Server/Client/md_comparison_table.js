function ComparisonTable(host)
{ 
    this.id = "mdComparisonTable";
    this.title = "Pareto Front Table";

    this.width = 1000;
    this.height = 130;
    this.posx = 0;
    this.posy = 545;
    
    this.host = host;

	this.fadeColor = "#777";
	this.normalColor = "#000"

	this.fadeOpacity = "0.7";
	this.normalOpacity = "1.0"

//    this.dataTable.matrix = null;
//    this.dataTable.
    
}

ComparisonTable.method("onDataLoaded", function(data){
    this.instanceProcessor = new InstanceProcessor(data.instancesXML);
    this.processor = new ClaferProcessor(data.claferXML);
    this.abstractClaferOutput = "";    
    this.toggled = false;
    
    this.dataTable = this.getDataTable();    
    this.content = $('<div id="comparison" class="comparison"></div>').append(new TableVisualizer().getHTML(this.dataTable));
    this.hidden = [];
});

ComparisonTable.method("onRendered", function()
{
    var td = $('#comparison .table_title')[0];
    $(td).append('&nbsp;<button id="toggle_link">Toggle</button>');

    $('#toggle_link').html("Distinct");
    $('#toggle_link').click(this.toggleDistinct.bind(this));

    this.addHovering();

    var i = 1;
    row = $("#r" + i);
    var that = this;
    while (row.length != 0){
        if (!row.find(".numeric").length)
            $("#r" + i + " .td_abstract").prepend('<image id="r' + i + 'box" src="images/checkbox_empty.bmp" class="maybe">');
        $("#r" + i + "box").click(function(){
            if (this.className == "maybe"){
                this.src = "images/checkbox_ticked.bmp";
                this.className = "wanted";
                that.filterContent();
            } else if (this.className == "wanted"){
                this.src = "images/checkbox_x.bmp";
                this.className = "unwanted";
                that.filterContent();
            } else {
                this.src = "images/checkbox_empty.bmp";
                this.className = "maybe";
                that.filterContent();
            }
        });
        i++;
        row = $("#r" + i);
    }

});

ComparisonTable.method("filterContent", function(){
    this.unFilter();

    console.log("filter called");
    var i = 1;
    
    var graph_data = $("#chart g:contains('P1')")[2];
    var circle_pairs = [];
    for (i=0; i<graph_data.children.length;i+=2){
        circle_pairs.push({ circle: graph_data.children[i], text_data: graph_data.children[i+1], ident: ""});
    }

    for (i=0; i<circle_pairs.length; i++){
        circle_pairs[i].ident = $(circle_pairs[i].text_data).text().replace(/[A-Za-z]/g, "");
    }

    circle_pairs.sort(function(a,b){
        return a.ident - b.ident;
    });

    for (i=0; i<circle_pairs.length; i++){
        console.log(circle_pairs[i].ident);
    }

    i=0;
    row = $("#mdComparisonTable #r" + i);
    row_length = row.find(".td_instance").length;
    while (row.length != 0){
        if (!row.find(".numeric").length){
            filter = $("#mdComparisonTable #r" + i + "box").attr("Class");
            for (var x = 1; x <= row_length; x++){
                if (filter == "maybe")
                    break;
                else if (filter == "wanted" && $("#mdComparisonTable #td" + (i-1) + "_" + x).hasClass("no")) {
                    $("#mdComparisonTable #th0_" + x).hide();
                    this.hidden.push("#mdComparisonTable #th0_" + x);
                    $(circle_pairs[x-1].circle).hide();
                    $(circle_pairs[x-1].text_data).hide();
                    this.hidden.push(circle_pairs[x-1].circle);
                    this.hidden.push(circle_pairs[x-1].text_data);
                    var y = 1;
                    var row_with_removal = $("#mdComparisonTable #r" + y);
                    while (row_with_removal.length != 0){
                        $("#mdComparisonTable #td"+ (y-1) +"_" + x).hide();
                        this.hidden.push("#mdComparisonTable #td"+ (y-1) +"_" + x);
                        y++;
                        row_with_removal = $("#mdComparisonTable #r" + y);
                    }
                } else if (filter == "unwanted" && $("#mdComparisonTable #td" + (i-1) + "_" + x).hasClass("tick")) {
                    $("#mdComparisonTable #th0_" + x).hide();
                    this.hidden.push("#mdComparisonTable #th0_" + x);
                    $(circle_pairs[x-1].circle).hide();
                    $(circle_pairs[x-1].text_data).hide();
                    this.hidden.push(circle_pairs[x-1].circle);
                    this.hidden.push(circle_pairs[x-1].text_data);
                    var y = 1;
                    var row_with_removal = $("#mdComparisonTable #r" + y);
                    while (row_with_removal.length != 0){
                        $("#mdComparisonTable #td"+ (y-1) +"_" + x).hide();
                        this.hidden.push("#mdComparisonTable #td"+ (y-1) +"_" + x);
                        y++;
                        row_with_removal = $("#mdComparisonTable #r" + y);
                    }
                }
            }
        }
        i++;
        row = $("#mdComparisonTable #r" + i);
    }
});

ComparisonTable.method("unFilter", function(){
    while(this.hidden.length){
        $(this.hidden.pop()).show();
    }
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
	
	for (var i = 0; i < spaceCount; i++)
		unit.displayWithMargins = " " + unit.displayWithMargins;

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

ComparisonTable.method("getDataTable", function()
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
	

    var result = new DataTable();
    result.title = output[0].displayWithMargins;
    
    for (var j = 1; j <= instanceCount; j++)
    {
        result.products.push("P" + j);
    }
	
	for (var i = 0; i < output.length; i++)
	{
        var currentMatrixRow = new Array();
        var currentContextRow = new Array();

        if (i > 0) // do not push the parent clafer
            result.features.push(output[i].displayWithMargins);
            
        currentContextRow.push(output[i].displayWithMargins);
        
        denyAddContextRow = false;
        
		for (var j = 1; j <= instanceCount; j++)
		{
			if (i == 0)
            {
				currentContextRow.push("P" + j);
            }
			else
			{
				sVal = this.instanceProcessor.getFeatureValue(j, output[i].claferId, false);
				currentMatrixRow.push(sVal);
                if (sVal == "yes")
                    currentContextRow.push("X");
                else if (sVal == "-")
                    currentContextRow.push("");
                else
                    denyAddContextRow = true;
			}
		}
		
        if (i > 0)
            result.matrix.push(currentMatrixRow);
            
        if (!denyAddContextRow)
            result.formalContext.push(currentContextRow);
	}

	return result;

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
	return '';	   
});