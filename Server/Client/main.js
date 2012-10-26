var serverAction = "/upload";

var mdComparisonTable;
var mdGoals;
var mdGraph;
var mdConsole;

google.load("visualization", "1", {packages:["corechart"]});


$(document).ready(function()
{
    mdComparisonTable = new ComparisonTable();
    mdGoals = new Goals();
    mdGraph = new Graph(null);
    mdConsole = new Console(null);

    
$.newWindow({
    id: "wGraph",
    title: "Pareto Front Graph",
    width: 500,
    height: 470,
    posx: 500,
    posy: 0,
    content: '',
    onDragBegin : null,
    onDragEnd : null,
    onResizeBegin : null,
    onResizeEnd : null, //mdGraph.graphResize
    onAjaxContentLoaded : null,
    statusBar: true,
    minimizeButton: true,
    maximizeButton: true,
    closeButton: true,
    draggable: true,
    resizeable: true
});

$.newWindow({
    id: "wGoals",
    title: "Multiobjective Optimization Goals",
    width: 500,
    height: 60,
    posx: 0,
    posy: 70,
    content: '',
    onDragBegin : null,
    onDragEnd : null,
    onResizeBegin : null,
    onResizeEnd : null,
    onAjaxContentLoaded : null,
    statusBar: true,
    minimizeButton: true,
    maximizeButton: true,
    closeButton: true,
    draggable: true,
    resizeable: true
});				

$.newWindow({
    id: "wComparison",
    title: "Side-by-Side Comparison Table",
    width: 500,
    height: 300,
    posx: 0,
    posy: 170,
    content: '',
    onDragBegin : null,
    onDragEnd : null,
    onResizeBegin : null,
    onResizeEnd : null,
    onAjaxContentLoaded : null,
    statusBar: true,
    minimizeButton: true,
    maximizeButton: true,
    closeButton: true,
    draggable: true,
    resizeable: true
});		

$.newWindow({
    id: "wTextOutput",
    title: "Tool Outputs and Compatibility",
    width: 1000,
    height: 130,
    posx: 0,
    posy: 510,
    content: '',
    onDragBegin : null,
    onDragEnd : null,
    onResizeBegin : null,
    onResizeEnd : null,
    onAjaxContentLoaded : null,
    statusBar: true,
    minimizeButton: true,
    maximizeButton: true,
    closeButton: true,
    draggable: true,
    resizeable: true
});
/*
var st = "";
st = st + "As a product line engineer:<ol>";
st = st + "<li>How do I view all N optimal product configurations?</li>";
st = st + "<li>How do I see differences among all N products?</li>";
st = st + "<li>How do I choose only K products out of N cutting off the products with less significant, in my opinion, features?</li>";
st = st + "<li>How do I see the correlation between two metrics (e.g. energy significantly influences performance)?</li>";
st = st + "<li>How can I group together the products with similar features?</li></ol>";


$.newWindow({
    id: "wUseCase",
    title: "User Stories",
    width: 1000,
    height: 130,
    posx: 0,
    posy: 510,
    content: st,
    onDragBegin : null,
    onDragEnd : null,
    onResizeBegin : null,
    onResizeEnd : null,
    onAjaxContentLoaded : null,
    statusBar: true,
    minimizeButton: true,
    maximizeButton: true,
    closeButton: true,
    draggable: true,
    resizeable: true
});        
*/
$.newWindow({
    id: "wSource",
    title: "Clafer File",
    width: 500,
    height: 30,
    posx: 0,
    posy: 0,
    content: '<div id="load_area"><form id="myform" action="' + serverAction + '" method="post" enctype="multipart/form-data">' + '<input type="file" name="upload-file">'+ '<input type="submit" value="Upload">'+'</form></div>',
    onDragBegin : null,
    onDragEnd : null,
    onResizeBegin : null,
    onResizeEnd : null,
    onAjaxContentLoaded : null,
    statusBar: true,
    minimizeButton: true,
    maximizeButton: true,
    closeButton: true,
    draggable: true,
    resizeable: true
});

$.updateWindowContent("wGraph", mdGraph.getInitContent());
$.updateWindowContent("wComparison", mdComparisonTable.getInitContent());
$.updateWindowContent("wGoals", mdGoals.getInitContent());
$.updateWindowContent("wTextOutput", mdConsole.getInitContent());

    var options = { 
        beforeSubmit: beginQuery,  // pre-submit callback 
        success: showResponse // post-submit callback 
        //timeout:   3000 
    }; 
 
    $('#myform').ajaxForm(options); 
	$('#myform').submit();

});

function drag(ev)
{
    var data = ev.target.id + "|" + ev.target.className;
	ev.dataTransfer.setData("Text", data);
}

function beginQuery(formData, jqForm, options) { 
	$("#load_area #myform").hide();
	$("#load_area").append('<div id="preloader"><img id="preloader_img" src="/Client/images/preloader.gif" alt="Loading..."/><span>Loading and processing...</span></div>');	
    return true; 
} 
 
// post-submit callback 
function endQuery()  { 
	$("#preloader").remove();
	$("#load_area #myform").show();
	
	return true;
} 

// pre-submit callback 
function showRequest(formData, jqForm, options) { 
    
    var queryString = $.param(formData); 
    return true; 
} 
 
// post-submit callback 
function showResponse(responseText, statusText, xhr, $form)  { 
    processToolResult(responseText);
    
	endQuery();
} 

 RegExp.quote = function(str) {
     return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
 };

 String.prototype.replaceAll = function (replaceThis, withThis) {
	return this.split(replaceThis).join(withThis);
}

function convertHtmlTags(input) {
  var in_tag=false;
  var in_var=false;
  var output = new String("");

  var length = input.length;
  
  for (var i=0; i< length; i++) 
    {
      ch = input.charAt(i);
	  
      if (in_tag) 
	  {
		if (in_var) 
		{
			if (ch == '"') 
			{
				in_var = false;
			}
			
			output += ch;
		}
		else 
		{
			if (ch == '"') 
			{
				in_var = true;
			}
			else if (ch == '>') 
			{
				in_tag = false;
			}
			
			output += ch.toLowerCase();
		}
      }
      else 
	  {
		if (ch == '<') 
		{
			in_tag = true;
		}
		output += ch;
      }
    }

  return output;
}

function updateData(data)
{
    mdComparisonTable.onDataLoaded(data);
    mdGoals.onDataLoaded(data);
	mdGraph.onDataLoaded(data);
	mdConsole.onDataLoaded(data);    
}

function processToolResult(result)
{
	if (!result) return;
	
	ar = result.split("=====");
	if (ar.length != 3)
	{
		$('#output').html("Error: " + result);		
		return;
	}
	
	var instancesXMLText = (new InstanceConverter(ar[1])).convertFromClaferMooOutputToXML();
	var abstractXMLText = ar[2];

	instancesXMLText = instancesXMLText.replaceAll('<?xml version="1.0"?>', '');
	
	abstractXMLText = abstractXMLText.replaceAll("&quot;", "\"");
	abstractXMLText = abstractXMLText.replaceAll("&gt;", ">");
	abstractXMLText = abstractXMLText.replaceAll("&lt;", "<");
	abstractXMLText = abstractXMLText.replaceAll("&amp;", "&");
	
	abstractXMLText = convertHtmlTags(abstractXMLText);
	
	
	// clean namespaces
	abstractXMLText = abstractXMLText.replaceAll('<?xml version="1.0"?>', '');
	abstractXMLText = abstractXMLText.replaceAll(' xmlns="http://clafer.org/ir" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:cl="http://clafer.org/ir" xsi:schemalocation="http://clafer.org/ir https://github.com/gsdlab/clafer/blob/master/src/ClaferIR.xsd"', '');
	abstractXMLText = abstractXMLText.replaceAll('cl:', '');
	abstractXMLText = abstractXMLText.replaceAll('xsi:', '');

    var data = new Object();
    data.output = ar[0];
    data.instancesXML = instancesXMLText;
    data.claferXML = abstractXMLText;

    updateData(data);
    
    $('#comparison').empty();
    $('#comparison').append(mdComparisonTable.getContent());            

    mdComparisonTable.onRendered();    
        
	$('#goals').empty();
	$('#goals').show();
	$('#goals').append(mdGoals.getContent());

    mdGoals.onRendered();    

    
//    $('#wGraph').setContent();
    
    mdGraph.onRendered();
    mdConsole.onRendered();    
    

}
