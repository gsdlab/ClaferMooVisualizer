var processor = null;

var PFVisualizer = new ParetoFrontVisualizer("chart");
var serverAction = "/upload";

$(document).ready(function() {
	$("#chart").hide();

	    $.newWindow({
            id: "wGraph",
            title: "Graph",
            width: 500,
            height: 470,
            posx: 500,
            posy: 0,
            content: '<table width="95%" height="95%"><tr height="90%"><td id="dropPointY" class="axis_drop" ondrop="drop(event)" ondragover="allowDrop(event)">&nbsp;&nbsp;</td><td id="chart" style="display:none; width:100%; height:100%"></td></tr><tr><td colspan="2" id="dropPointX" class="axis_drop" ondrop="drop(event)" ondragover="allowDrop(event)">&nbsp;</td></tr></table>',
            onDragBegin : null,
            onDragEnd : null,
            onResizeBegin : null,
            onResizeEnd : graphResize,
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
            title: "Goals",
            width: 500,
            height: 60,
            posx: 0,
            posy: 70,
            content: '<div id="goals"></div>',
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
            title: "Side-by-Side Comparison",
            width: 500,
            height: 300,
            posx: 0,
            posy: 170,
            content: '<div id="comparison"></div>',
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
            title: "Outputs",
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

        $.newWindow({
            id: "wSource",
            title: "Choose a Clafer File:",
            width: 500,
            height: 30,
            posx: 0,
            posy: 0,
            content: '<form id="myForm" action="' + serverAction + '" method="post" enctype="multipart/form-data">' + '<input type="file" name="upload-file">'+ '<input type="submit" value="Upload">'+'</form>',
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
//        target:        '#output',   // target element(s) to be updated with server response 
        beforeSubmit:  showRequest,  // pre-submit callback 
        success:       showResponse  // post-submit callback 
//        dataType: "json"
		// other available options: 
//        url:       "upload.php",         // override for form's 'action' attribute 
//        type:      "POST"        // 'get' or 'post', override for form's 'method' attribute 
        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
        //clearForm: true        // clear all form fields after successful submit 
        //resetForm: true        // reset the form after successful submit 
 
        // $.ajax options can be used here too, for example: 
        //timeout:   3000 
    }; 
 
    // bind form using 'ajaxForm' 
    $('#myForm').ajaxForm(options); 
	$('#myForm').submit();
});

function graphResize(e)
{
	redrawParetoFront();
//	e.handled = true;
	return true;
}

function allowDrop(ev)
{
	ev.preventDefault();
}

function drag(ev)
{
	ev.dataTransfer.setData("Text", ev.target.id + "|" + ev.target.className);
}

function drop(ev)
{
	ev.preventDefault();

	var data = ev.dataTransfer.getData("Text");
	
	var parts = data.split("|");
	
	if (parts.length < 2)
		return;
	
	var arg = parts[0];
	var label = parts[1];

	assignToAxis(ev.target.id, arg, label, true);
	redrawParetoFront();
}

function assignValue(id, value)
{
	if ($(id).length == 0)
		$('body').append('<input type="hidden" id="' + id + '" value=""/>');
	
	$('#' + id).val(value);
	
}

function redrawParetoFront()
{
	var arg1 = $("#dropPointXAxisConfig_arg").val();
	var label1 = $("#dropPointXAxisConfig_label").val();

	var arg2 = $("#dropPointYAxisConfig_arg").val();
	var label2 = $("#dropPointYAxisConfig_label").val();
	
	PFVisualizer.draw(processor, [arg1, arg2], [label1, label2]);
}

function assignToAxis(axis, arg, label)
{
	assignValue(axis + "AxisConfig_arg", arg);
	assignValue(axis + "AxisConfig_label", label);
}

function showGoals(goals)
{
	var td;
	
	var table = $('<table width="100%"></table>').addClass('goals');
	
	for (var i = 0; i < goals.length; i++)
	{
		var row = $('<tr></tr>').addClass('bar');
		td = $('<td id="operation_' + goals[i].operation + '"></td>').addClass('td_operation');
		td.html(goals[i].operation);
		row.append(td);
		
		td = $('<td></td>').addClass('td_argument');
		var span = $('<a href="#" draggable="true" ondragstart="drag(event)" id="' + goals[i].arg + '" class="' + goals[i].label + '"></a>');
		span.html(goals[i].label);
		td.append(span);
		row.append(td);
		$(table).append(row);
	}

	$('#goals').empty();
	$('#goals').show();
	$('#goals').append(table);
}

// pre-submit callback 
function showRequest(formData, jqForm, options) { 
    // formData is an array; here we use $.param to convert it to a string to display it 
    // but the form plugin does this for you automatically when it submits the data 
    var queryString = $.param(formData); 
 
    // jqForm is a jQuery object encapsulating the form element.  To access the 
    // DOM element for the form do this: 
    // var formElement = jqForm[0]; 
 
//    alert('About to submit: \n\n' + queryString); 
 
    // here we could return false to prevent the form from being submitted; 
    // returning anything other than false will allow the form submit to continue 
    return true; 
} 
 
// post-submit callback 
function showResponse(responseText, statusText, xhr, $form)  { 
//	alert(xhr.responseType);
	processToolResult(responseText);

    // for normal html responses, the first argument to the success callback 
    // is the XMLHttpRequest object's responseText property 
 
    // if the ajaxForm method was passed an Options Object with the dataType 
    // property set to 'xml' then the first argument to the success callback 
    // is the XMLHttpRequest object's responseXML property 
 
    // if the ajaxForm method was passed an Options Object with the dataType 
    // property set to 'json' then the first argument to the success callback 
    // is the json data object returned by the server 
 
//    alert('status: ' + statusText + '\n\nresponseText: \n' + responseText + 
//        '\n\nThe output div should have already been updated with the responseText.'); 
} 
/*
function getFile()
{
    var formData = new FormData($('form')[0]);
	alert("OK");

    $.ajax({
        url: 'upload.php',  //server script to process data
        type: 'POST',
        xhr: function() {  // custom xhr
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // check if upload property exists
                myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // for handling the progress of the upload
            }
            return myXhr;
        },
        //Ajax events
//        beforeSend: beforeSendHandler,
        success: completeHandler,
        error: errorHandler,
        // Form data
        data: formData,
        //Options to tell JQuery not to process data or worry about content-type
        cache: false,
        contentType: false,
        processData: false
    });
}
*/
function errorHandler(data)
{
	alert(data);
}

function completeHandler(data)
{
//	alert(data);
	$('progress').attr({value:0});	
	processToolResult(data);
}

function progressHandlingFunction(e){
    if(e.lengthComputable){
        $('progress').attr({value:e.loaded,max:e.total});
    }
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
};
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
	instancesXMLText = (new InstanceProcessor(ar[1])).convertFromClaferMooOutputToXML();
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
	
	processor = new XMLProcessor(abstractXMLDocument, instancesXMLDocument);
	onDataPreProcessed();
	
}


function onDataPreProcessed()
{
	processor.ack();
	var goals = processor.getGoals();
	var instanceCount = processor.getInstanceCount();
	getComparisonHtml();
	
	showGoals(goals);
	
	if (goals.length > 2)
	{
		$("#chart").show();
		assignToAxis("dropPointX", goals[0].arg, goals[0].label);
		assignToAxis("dropPointY", goals[1].arg, goals[1].label);
		redrawParetoFront();
	}
	else
		$("#chart").hide();
}

var abstractClaferOutput;

function collector(clafer, spaceCount)
{
	var unit = new Object();
	unit.claferId = clafer.claferId;
	unit.displayId = clafer.displayId;

	unit.displayWithMargins = unit.displayId;
	
	for (var i = 0; i < spaceCount * 3; i++)
		unit.displayWithMargins = "&nbsp;" + unit.displayWithMargins;

	abstractClaferOutput.push(unit);
}

function traverse(clafer, level)
{
	collector (clafer, level);
	for (var i = 0; i < clafer.subclafers.length; i++)
	{
		traverse(clafer.subclafers[i], level + 1);
	}
}

function getComparisonHtml()
{
	var instanceCount = processor.getInstanceCount();
	var instanceSuperClafer = processor.getInstanceSuperClafer();
//	alert(instanceSuperClafer);
	var abstractClaferTree = processor.getAbstractClaferTree("/module/declaration/uniqueid", instanceSuperClafer);

	
//	alert(abstractClaferTree.subclafers[0].subclafers.length);
	
//	alert(instanceSuperClafer);

	
	var parent = null;
	var current = abstractClaferTree;
	abstractClaferOutput = new Array();
	
	traverse(current, 0);
	output = abstractClaferOutput;
	
	var table = $('<table width="100%"></table>').addClass('foo');
	
	for (var i = 0; i < output.length; i++)
	{
		if (i == 0)
			tagName = "th"; // to make headers
		else
			tagName = "td";
			
		var row = $('<tr id="r' + i +'"></tr>').addClass('bar');//
		
		var td = $('<' + tagName + '></' + tagName + '>').addClass('td_abstract');
		td.html(output[i].displayWithMargins);
		row.append(td);
		
		table.append(row);
		
		for (var j = 1; j <= instanceCount; j++)
		{
			var td = $('<' + tagName + ' id="' + tagName + i + "_" + j + '"></' + tagName + '>').addClass('td_instance');
			
			if (i == 0)
				td.html("Prod#" + j);
			else
				td.html(processor.getFeatureValue(j, output[i].claferId, false));
				
			row.append(td);
		}
		
//		alert("ok");
	}

	$('#comparison').empty();
	$('#comparison').append(table);	
	

}