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
    this.permaHidden = {};
    $("#mdComparisonTable .window-titleBar-content").text(this.dataTable.title);
    this.currentRow = 1;

});

ComparisonTable.method("onRendered", function()
{

// Add search bar 
    var td = $('#comparison .table_title')[0];
    $(td).html('<form name="searchForm" style="width: 110px"><input type="text" id="search" class="text_input" placeholder="search" style="width: 100px"><input type="text" style="display:none"></form> ');
    $(td).addClass("TableSearch");

// Adding buttons for comparison table
// Distinct button for greying out non-distinct features
    td = $('#comparison .TableSearch')[0];
    $(td).append('<button id="toggle_link">Toggle</button>');

    $('#toggle_link').html("Distinct");
    $('#toggle_link').click(this.toggleDistinct.bind(this)).css("cursor", "pointer");

// Reset button for reseting filters

    $(td).append('&nbsp;<button id="filter_reset">Toggle</button>');

    $('#filter_reset').html("Reset");
    $('#filter_reset').click(this.resetFilters.bind(this)).css("cursor", "pointer");

// Move headers into new div
    $("#comparison").prepend('<div id="tHeadContainer"><table id="tHead" width="100%" cellspacing="0" cellspadding="0"></table></div>');
    $("#tHead").append($("#comparison #r0"));

// make headers positioning always on top of window
    $('#mdComparisonTable .window-content').scroll(function(){
            $("#comparison #tHeadContainer").css("position", "relative");
            $("#comparison #tHeadContainer").css("top", $('#mdComparisonTable .window-content').scrollTop());
            this.currentRow = 1;
    });

// Move body into new div
    $("#comparison").append('<div id="tBodyContainer" ></div>');
    $("#tBodyContainer").append($("#comparison #tBody"));



// fix formatting for new headers
// shrink table to obtain minimum widths
    $("#tBodyContainer").css("width", "10%")
    $("#tHeadContainer").css("width", "10%")

// obtain minimum widths
    var i;

    $("#tHead .td_abstract").width("40%");
    $("#tBody .td_abstract").width("40%");

    i = 0;
    var row = $("#r" + i);
    var minWidth = 0;
    while ($(row).children().length != 0){
        for (var x = 1; x<=$(row).children().length; x++){
            var current = $(row).children()[x];
            if ($(current).width() > minWidth)
                minWidth = $(current).width();
        }
        i++;
        row = $("#r" + i);
    }

    var minAbstractWidth = $("#tBody .td_abstract").width();
//    console.log(minWidth);

// Set new widths and minimum widths (important to do both for cross browser functionality)
    for(i=1; i<$("#tHead #r0").children().length; i++){
        $("#tHead #th0_" + i).width(minWidth);
        $("#tBody #td0_" + i).width(minWidth);
        $("#tHead #th0_" + i).css("min-width", minWidth);
        $("#tBody #td0_" + i).css("min-width", minWidth);
        var x = 1;
        row = $("#r" + x);
        while ($(row).children().length != 0){
            $("#tBody #td" + x + "_" + i).width(minWidth);
            $("#tBody #td" + x + "_" + i).css("min-width", minWidth);
            x++;
            row = $("#r" + x);
        }
    }

    $("#tHead .td_abstract").width(minAbstractWidth);
    $("#tBody .td_abstract").width(minAbstractWidth);
    $("#tHead .td_abstract").css("min-width", minAbstractWidth);
    $("#tBody .td_abstract").css("min-width", minAbstractWidth);

// reset table widths to 100%
    $("#tBodyContainer").css("width", "100%")
    $("#tHeadContainer").css("width", "100%")

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
        }).css("cursor", "pointer");
            
        i++;
        row = $("#r" + i);
    }

// Selection of instances for analysis from top row of table
    var length = $("#r0").find(".td_instance").length;
//    console.log(length);
    for(i=1; i<=length; i++){
        $("#th0_" + i).click(function(){
            var pid = "V" + $(this).attr('id').substring(4)
            var locationInArray = $.inArray(pid, host.selector.selection)
            if (locationInArray == -1)
                host.selector.onSelected(pid);
            else
                host.selector.onDeselected(pid);
        }).css("cursor", "pointer");
    }

// add handler to search bar
    that = this;
    $('#search').keyup(function(){
        that.scrollToSearch($(this).val());
    }); 

    this.filterContent();
});

/* unfilters table then hides columns that don't pass 
   the filters*/
ComparisonTable.method("filterContent", function(){
    this.unFilter();



// loop to go through each element
    this.host.findModule("mdGraph").addIds();
    i=0;
    row = $("#mdComparisonTable #r" + i);
    row_length = row.find(".td_instance").length;
    while (row.length != 0){

        //filtering by features
        if (!row.find(".numeric").length){
            var filter = $("#mdComparisonTable #r" + i + "box").attr("Class"); //pull filter type from checkbox
            for (var x = 1; x <= row_length; x++){
                if (filter == "maybe") //filter nothing for this row
                    break;
                else if (filter == "wanted" && $("#mdComparisonTable #td" + (i-1) + "_" + x).hasClass("no")) { //filter out column and bubble
                    this.hideInstance(x);
                } else if (filter == "unwanted" && $("#mdComparisonTable #td" + (i-1) + "_" + x).hasClass("tick")) { //filter out column and bubble
                    this.hideInstance(x);
                }
            }
        }

        //filtering by goals
        else {
            var filter;
            var filterName = $("#mdComparisonTable #r" + i + " .td_abstract").text().replace(/\s+/g, '');
            for (var x = 0; x<=this.host.findModule("mdGoals").ranges.length; x++){;
                if (x == this.host.findModule("mdGoals").ranges.length){
                    break;
                } else if (filterName == this.host.findModule("mdGoals").ranges[x].goal){
                    filter = this.host.findModule("mdGoals").ranges[x];
                }
            }
//            console.log(filter);
//            console.log(this.host.findModule("mdGoals").ranges[x]);
//            console.log(this.host.findModule("mdGoals").ranges);

            for (x=1; x<= row_length; x++){
                var value = $("#mdComparisonTable #td" + (i-1) + "_" + x).text();
                var min = parseInt(filter.min);
                var max = parseInt(filter.max)
                if (min > value || max < value)
                    this.hideInstance(x);
            }
        }

        //increment row
        i++;
        row = $("#mdComparisonTable #r" + i);
    }

    //filtering by permaHidden
    for (var instance in this.permaHidden){
        if (this.permaHidden.hasOwnProperty(instance))
            this.hideInstance(instance.substring(1));
    }

});

ComparisonTable.method("hideInstance", function(x){

// Get graph bubble html locations
    var circle_pairs = [];
    for (var i=1; i<=$("#chart circle").length; i++){
        circle_pairs.push({circle: $("#P" + i + "c"), text_data: $("#P" + i + "t"), ident: i});
    }
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
        result.products.push("V" + j);
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
				currentContextRow.push("V" + j);
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

ComparisonTable.method("scrollToSearch", function (input){
    if (input == ""){
        $('#mdComparisonTable .window-content').scrollTop(0);
    }
    var firstPass = true;
    var iteratedRow = this.currentRow;

    if (input == this.previousInput){
        firstPass = false;
        iteratedRow++;
    }
    this.previousInput = input;

    while(iteratedRow != this.currentRow || firstPass){
        if (iteratedRow >= ($("#tBody tbody").children().length + 1))
            iteratedRow = 0;
        else if ($("#tBody #r" + iteratedRow).text().indexOf(input) !== -1){
            $('#mdComparisonTable .window-content').scrollTop(0);
            $('#mdComparisonTable .window-content').scrollTop($("#tBody #r" + iteratedRow).position().top - 73);
            this.currentRow = iteratedRow;
            return;
        }
        iteratedRow++;
        firstPass = false;
    }
});

ComparisonTable.method("getInitContent", function()
{
	return '';	   
});