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

// Adding buttons for comparison table
// Distinct button for greying out non-distinct features
    var td = $('#comparison .table_title')[0];
    $(td).append('&nbsp;<button id="toggle_link">Toggle</button>');

    $('#toggle_link').html("Distinct");
    $('#toggle_link').click(this.toggleDistinct.bind(this)).css("cursor", "pointer");;

// Reset button for reseting filters

    $(td).append('&nbsp;<button id="filter_reset">Toggle</button>');

    $('#filter_reset').html("Reset");
    $('#filter_reset').click(this.resetFilters.bind(this)).css("cursor", "pointer");

// Clone headers into new div
    $("#comparison").prepend('<div id="tHeadContainer" ><table id="tHead" width="100%" cellspacing="0" cellspadding="0"></table></div>');
    $("#tHead").append($("#comparison #r0"));

// make headers positioning always on top
    $('#mdComparisonTable .window-content').scroll(function(){
        $("#comparison #tHeadContainer").css("position", "relative");
        $("#comparison #tHeadContainer").css("top", $('#mdComparisonTable .window-content').scrollTop());
    })

// Clone body into new div
    $("#comparison").append('<div id="tBodyContainer" ></div>');
    $("#tBodyContainer").append($("#comparison #tBody"));



// fix formatting for new headers
    var i;
    for(i=1; i<$("#tHead #r0").children().length; i++){
        $("#tHead #th0_" + i).width($("#tBody #td0_" + i).width());
    }
    $("#tHead .td_abstract").width("40%");
    $("#tBody .td_abstract").width("40%");




// Add mouseover effects to table
    this.addHovering();

// Add tristate checkboxes for filtering features
    i = 1;
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
// left in in case we want to switch checkboxes to refresh the distinct rows.
//            if (this.hasClass("wanted") || this.hasClass("unwanted"))
//                if (that.toggled)
//                    toggleRow($("#r" + i), true);
//            else
//                if (that.toggled)
//                    toggleRow($("#r" + i), false); //will not work because i is wrong. 
                                                     //commented out because not currently necessary
        }).css("cursor", "pointer");
            
        i++;
        row = $("#r" + i);
    }

// Selection of instances for analysis from top row of table
    var length = $("#r0").find(".td_instance").length;
    console.log(length);
    for(i=1; i<=length; i++){
        $("#th0_" + i).click(function(){
            var pid = "P" + $(this).attr('id').substring(4)
            var locationInArray = $.inArray(pid, host.selector.selection)
            if (locationInArray == -1)
                host.selector.onSelected(pid);
            else
                host.selector.onDeselected(pid);
        }).css("cursor", "pointer");
    }

});

/* unfilters table then hides columns that don't pass 
   the filters*/
ComparisonTable.method("filterContent", function(){
    this.unFilter();

    console.log("filter called");

// Get graph bubble html locations
    var i = 1;
    var graph_data = $("#chart g:contains('P1')")[2];
    var circle_pairs = [];
    for (i=0; i<$(graph_data).children().length;i+=2){
        circle_pairs.push({ circle: $(graph_data).children()[i], text_data: $(graph_data).children()[i+1], ident: ""});
    }

    for (i=0; i<circle_pairs.length; i++){
        circle_pairs[i].ident = $(circle_pairs[i].text_data).text().replace(/[A-Za-z]/g, "");
    }

// sort bubbles by PID
    circle_pairs.sort(function(a,b){
        return a.ident - b.ident;
    });

// loop to go through each element
    i=0;
    row = $("#mdComparisonTable #r" + i);
    row_length = row.find(".td_instance").length;
    while (row.length != 0){
        if (!row.find(".numeric").length){
            filter = $("#mdComparisonTable #r" + i + "box").attr("Class"); //pull filter type from checkbox
            for (var x = 1; x <= row_length; x++){
                if (filter == "maybe") //filter nothing for this row
                    break;
                else if (filter == "wanted" && $("#mdComparisonTable #td" + (i-1) + "_" + x).hasClass("no")) { //filter out column and bubble
                    //hide table header (row 0)
                    $("#mdComparisonTable #th0_" + x).hide();
                    this.hidden.push("#mdComparisonTable #th0_" + x);
                    //hide graph bubble
                    $(circle_pairs[x-1].circle).hide();
                    $(circle_pairs[x-1].text_data).hide();
                    this.hidden.push(circle_pairs[x-1].text_data);
                    this.hidden.push(circle_pairs[x-1].circle);
                    //hide whole column
                    var y = 1;
                    var row_with_removal = $("#mdComparisonTable #r" + y);
                    while (row_with_removal.length != 0){
                        $("#mdComparisonTable #td"+ (y-1) +"_" + x).hide();
                        this.hidden.push("#mdComparisonTable #td"+ (y-1) +"_" + x);
                        y++;
                        row_with_removal = $("#mdComparisonTable #r" + y);
                    }
                } else if (filter == "unwanted" && $("#mdComparisonTable #td" + (i-1) + "_" + x).hasClass("tick")) { //filter out column and bubble
                    //hide table header (row 0)
                    $("#mdComparisonTable #th0_" + x).hide();
                    this.hidden.push("#mdComparisonTable #th0_" + x);
                    //hide graph bubble
                    $(circle_pairs[x-1].circle).hide();
                    $(circle_pairs[x-1].text_data).hide();
                    this.hidden.push(circle_pairs[x-1].text_data);
                    this.hidden.push(circle_pairs[x-1].circle);
                    //hide whole column
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


//unhides everything in the hidden stack (all things that have been filtered out)
ComparisonTable.method("unFilter", function(){
    while(this.hidden.length){
        $(this.hidden.pop()).show();
    }
});

/*Reset function that turns all checkboxes to maybe
  then unfilters content.*/

ComparisonTable.method("resetFilters", function(){

    //reset all checkboxes to maybe
    var i = 1;
    row = $("#r" + i);
    while (row.length != 0){
        if (!(row.find(".numeric").length)){
            current = document.getElementById("r" + i + "box");
            if (current){
                current.src = "images/checkbox_empty.bmp";
                current.className = "maybe";
            }
        }
        i++;
        row = $("#r" + i);
    }
    //unfilter
    this.unFilter();

    //if currently set to distinct mode, refresh distinct rows
    if (this.toggled){
        this.toggleDistinct(); //one to turn off distinct
        this.toggleDistinct(); //one to reapply it
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
                if ($(instanceTds[j]).css("display") == "none"){ //case for filtered out elements that are hidden
                    //do nothing
                }
                else if ($(instanceTds[j]).hasClass("tick"))
                {
                    if (last == "" || last == "tick")
                        last = "tick";
                    else {allAreTheSame = false; break;}
                }   
                else if ($(instanceTds[j]).hasClass("no"))
                {
                    if (last == "" || last == "no")
                        last = "no";
                    else {allAreTheSame = false; break;}
                }
                else {allAreTheSame = false; break;}
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

    $("#comparison #r0 .td_instance").hover(
      function () {
        $(this).css("background", "#ffffcc");
      }, 
      function () {
        $(this).css("background", "");
      }
    );

});

//makes instance red on graph, for actual selection function see onSelected(pid) in selector.js
ComparisonTable.method("makePointsSelected", function (pid){;
    $("#mdComparisonTable #th0_" + pid.substring(1)).css("color", "red");
});

//makes instance red on graph, for actual deselection function see onDeselected(pid) in selector.js
ComparisonTable.method("makePointsDeselected", function (pid){
    $("#mdComparisonTable #th0_" + pid.substring(1)).css("color", "black");
});

ComparisonTable.method("getInitContent", function()
{
	return '';	   
});