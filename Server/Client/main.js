var processor = null;
var instanceProcessor = null;

var serverAction = "/upload";
var mdComparisonTable;
var mdGoals;
var mdGraph;

google.load("visualization", "1", {packages:["corechart"]});

$(document).ready(function()
{
//	$("#chart").hide();

    mdComparisonTable = new ComparisonTable();
    mdGoals = new Goals();
    mdGraph = new Graph(null);
    
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
    content: '<table width="100%" height="100%" cellspacing="15"><tr height="1em" style="height:1em;"><th width="50%">ClaferMoo:</th><th width="25%">Abstract Clafers:</th><th width="25%">Instances:</th></tr><td><div class="parent"><textarea id="output" class="child" style="height:100%; overflow:scroll; width:100%"></textarea></div></td><td><div class="parent"><textarea class="child" id="abstractXMLOutput" style="height:100%; overflow:scroll; width:100%;"></textarea></div></td><td><div class="parent"><textarea id="instancesXMLOutput" class="child" style="height:100%; overflow:scroll; width:100%;"></textarea></div></td></tr></table>',
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

		
$(':file').change(function(){
//    var file = this.files[0];
//    name = file.name;
//    size = file.size;
//    type = file.type;
    //your validation
});

//    $(':button').click(getFile);

//	getFile();


    var options = { 
        beforeSubmit:  beginQuery,  // pre-submit callback 
        success:       showResponse // post-submit callback 
        
        //timeout:   3000 
    }; 
 
    // bind form using 'ajaxForm' 
    $('#myform').ajaxForm(options); 
	$('#myform').submit();
});

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

function StringtoXML(text){
	if (window.ActiveXObject){
                  var doc=new ActiveXObject('Microsoft.XMLDOM');
                  doc.async='false';
                  doc.loadXML(text);
                } else {
                  var parser=new DOMParser();
                  var doc=parser.parseFromString(text,'text/xml');
	}
	return doc;
}

 RegExp.quote = function(str) {
     return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
 };

 String.prototype.replaceAll = function (replaceThis, withThis) {
	return this.split(replaceThis).join(withThis);
//   var re = new RegExp(RegExp.quote(replaceThis),"g"); 
//   return this.replace(re, withThis);
}

function convertHtmlTags(input) {
  var in_tag=false;
  var in_var=false;
  var output = new String("");

//  var input = s.toString();
//  sys.debug(input.charAt(0) + input.charAt(1));
  var length = input.length;
  
//  alert(length);
  
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
//			alert(
		}
		output += ch;
      }
    }

// sys.debug(output);	
//	alert(output);
  return output;
}



function processToolResult(result)
{
	if (!result) return;
	
//	alert(result);
	
	ar = result.split("=====");
	if (ar.length != 3)
	{
		$('#output').html("Error: " + result);		
//		alert("Error, not all parts present in query result");
		return;
	}
	
	misc = ar[0];
	instancesXMLText = (new InstanceConverter(ar[1])).convertFromClaferMooOutputToXML();
	abstractXMLText = ar[2];

	$('#output').html(misc);	
	
	instancesXMLText = instancesXMLText.replaceAll('<?xml version="1.0"?>', '');
	
//	alert(abstractXMLText.length);

	abstractXMLText = abstractXMLText.replaceAll("&quot;", "\"");
	abstractXMLText = abstractXMLText.replaceAll("&gt;", ">");
	abstractXMLText = abstractXMLText.replaceAll("&lt;", "<");
	abstractXMLText = abstractXMLText.replaceAll("&amp;", "&");

//	alert(abstractXMLText.length);
	
	abstractXMLText = convertHtmlTags(abstractXMLText);
	

	
	// clean namespaces
	abstractXMLText = abstractXMLText.replaceAll('<?xml version="1.0"?>', '');
	abstractXMLText = abstractXMLText.replaceAll(' xmlns="http://clafer.org/ir" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:cl="http://clafer.org/ir" xsi:schemalocation="http://clafer.org/ir https://github.com/gsdlab/clafer/blob/master/src/ClaferIR.xsd"', '');
	abstractXMLText = abstractXMLText.replaceAll('cl:', '');
	abstractXMLText = abstractXMLText.replaceAll('xsi:', '');

	$('#abstractXMLOutput').val(abstractXMLText);
	$('#instancesXMLOutput').val(instancesXMLText);
	
	var abstractXMLDocument = StringtoXML(abstractXMLText);
	var instancesXMLDocument = StringtoXML(instancesXMLText);

    mdComparisonTable.onDataLoaded(abstractXMLDocument, instancesXMLDocument);
    mdGoals.onDataLoaded(abstractXMLDocument, instancesXMLDocument);
	mdGraph.onDataLoaded(abstractXMLDocument, instancesXMLDocument)
    
	processor = new ClaferProcessor(abstractXMLDocument);
	instanceProcessor = new InstanceProcessor(instancesXMLDocument);
	onDataPreProcessed();
	
}

function onDataPreProcessed()
{

    $('#comparison').empty();
    $('#comparison').append(mdComparisonTable.getContent());            

    mdComparisonTable.onRendered();    
        
	$('#goals').empty();
	$('#goals').show();
	$('#goals').append(mdGoals.getContent());

    mdGoals.onRendered();    

    
//    $('#wGraph').setContent();
    
    mdGraph.onRendered();
    
//	var instanceCount = instanceProcessor.getInstanceCount();
	

}
