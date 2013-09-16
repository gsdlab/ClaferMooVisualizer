/*
Copyright (C) 2012, 2013 Alexander Murashkin, Neil Redman <http://gsd.uwaterloo.ca>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
function Input(host)
{ 
    this.id = "mdInput";
    this.title = "Input";

    this.width = 500;
    this.height = 30;
    this.posx = 0;
    this.posy = 0;
    
    this.requestTimeout = 60000;
    this.pollingDelay = 3000;    
    this.pollingTimeoutObject = null;
    this.toCancel = false;
    
    this.host = host;
    this.serverAction = "/upload";
}

Input.method("onDataLoaded", function(data){
    this.processor = new ClaferProcessor(data.claferXML);
    this.goals = this.processor.getGoals();
});

Input.method("onInitRendered", function()
{
    this.optimizeFlag = 1;
    this.addInstancesFlag = 1;
    this.previousData = "";
    this.toCancel = false;

    $("#optimize").click(this.OptimizeCall.bind(this));
    $("#addInstances").click(this.addInstancesCall.bind(this));
    $("#myform [type='file']").change(this.inputChange.bind(this));

    $("#optimize").attr("disabled", "disabled");
    $("#addInstances").attr("disabled", "disabled");
 
    var options = new Object();
    options.beforeSubmit = this.beginQuery.bind(this);
    options.success = this.fileSent.bind(this);
    options.error = this.handleError.bind(this);
    options.timeout = this.requestTimeout;

    $('#myform').ajaxForm(options); 
	$('#myform').submit();
});

/*
 * Cancel request
 */

Input.method("cancelCall", function() 
{
    $("#cancel").hide();
    $("#status_label").html("Cancelling...");
    this.toCancel = true;
});
 
/*
 * Shows uploader and hides the form
*/
Input.method("beginQuery", function(formData, jqForm, options) {
//    	this.timeout = setTimeout(function(){that.handleTimeout();}, 65000);   
	$("#load_area #myform").hide();
	$("#load_area").append('<div id="preloader"><img id="preloader_img" src="/images/preloader.gif" alt="Loading..."/><span id="status_label">Loading and processing...</span><button id="cancel">Cancel</button></div>');	
    $("#cancel").click(this.cancelCall.bind(this));
    return true; 
});

// post-submit callback 
Input.method("endQuery", function()  { 
	$("#preloader").remove();
	$("#load_area #myform").show();
	
	return true;
});

/* Not used. We don't need it anymore
// pre-submit callback 
Input.method("showRequest", function(formData, jqForm, options) {
    var queryString = $.param(formData); 
    return true; 
});
*/

Input.method("onPoll", function(response)
{
    if (response === "Working")
    {
        this.pollingTimeoutObject = setTimeout(this.poll.bind(this), this.pollingDelay);
    }
    else if (response === "Cancelled")
    {
        this.endQuery();
    }
    else
    {
        this.processToolResult(response);
        this.endQuery();
    }
});        

Input.method("poll", function()
{
    var options = new Object();
    options.url = "/poll";
    options.type = "post";
    if (!this.toCancel)
        options.data = {windowKey: this.host.key, command: "ping"};
    else
        options.data = {windowKey: this.host.key, command: "cancel"};
    
    options.success = this.onPoll.bind(this);
    options.error = this.handleError.bind(this);
    
    $.ajax(options);
});

Input.method("fileSent", function(responseText, statusText, xhr, $form)  { 
    this.toCancel = false;
    if (responseText.indexOf("no clafer file submitted") == -1)
        this.pollingTimeoutObject = setTimeout(this.poll.bind(this), this.pollingDelay);
    else
        this.endQuery();
});

// post-submit callback 
//Input.method("requestComplete", function(responseText, statusText, xhr, $form)  { 
//	clearTimeout(this.timeout); 
//	this.processToolResult(responseText);   
//	this.endQuery();
//});

Input.method("handleError", function(responseText, statusText, xhr)  { 
//	clearTimeout(this.timeout);
	var er = document.getElementById("error_overlay");
	er.style.visibility = "visible";	
	document.getElementById("error_report").innerHTML = ('<input id="close_error" type="image" src="images/no.png" alt="close" style="position: relative; left: -325px; top: 0px; width: 20px; height: 20px;"><p>' + xhr + '<br>' + responseText.replace("\n", "<br>") + "</p>");
	document.getElementById("close_error").onclick = function(){ 
		document.getElementById("error_overlay").style.visibility = "hidden";
	};
	this.endQuery();
    
});

Input.method("handleTimeout", function(responseText, statusText, xhr, $form)  { 
//	clearTimeout(this.timeout);
	var er = document.getElementById("error_overlay");
	er.style.visibility = "visible";	
	document.getElementById("error_report").innerHTML = ('<input id="close_error" type="image" src="images/no.png" alt="close" style="position: relative; left: -325px; top: 0px; width: 20px; height: 20px;"><p> Error: <br> The request timed out. </p>');
	document.getElementById("close_error").onclick = function(){ 
		document.getElementById("error_overlay").style.visibility = "hidden";
	};
	this.endQuery();     
});

Input.method("convertHtmlTags", function(input) {
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
});

Input.method("OptimizeCall", function(){
   	this.optimizeFlag = 1;
   	this.addInstancesFlag = 0;
   	this.previousData = "";
   	host.findModule("mdComparisonTable").permaHidden = {};
});

Input.method("addInstancesCall", function(){
   	this.optimizeFlag = 0;
   	this.addInstancesFlag = 1;
});

Input.method("inputChange", function(){
	var filename = $("#myform [type='file']").val()
	if (filename.substring(filename.length-4) == ".cfr"){
		$("#optimize").removeAttr("disabled")
		$("#addInstances").attr("disabled", "disabled");
	} else if (filename.substring(filename.length-5) == ".data"){
		$("#optimize").attr("disabled", "disabled");
		$("#addInstances").removeAttr("disabled")
	}
});

Input.method("processToolResult", function(result)
{

	if (!result) return;	
	var ar = [];

	if (this.optimizeFlag){
		ar = result.split("=====");
		this.optimizeFlag = 0;
    	this.addInstancesFlag = 0;
    	if (ar.length != 3)
		{
        	var data = new Object();
   	    	data.error = true;
    		data.output = result;
       		data.instancesXML = null;
       		data.claferXML = null;
       		this.host.updateData(data);
       		return;
   		}
    } else if (this.addInstancesFlag) {
		ar = this.previousData.Unparsed;
		this.optimizeFlag = 0;
    	this.addInstancesFlag = 0;
		if (ar == null || ar.length != 3)
		{
        	var data = new Object();
   	    	data.error = true;
    		data.output = result;
       		data.instancesXML = null;
       		data.claferXML = null;
       		this.host.updateData(data);
       		return;
   		}

		var parser = new InstanceConverter(result)
		ar[1] += parser.convertFromClaferIGOutputToClaferMoo(this.previousData.abstractXML);
	}

//	console.log(ar[1]);
//	var parsedInstances = (new InstanceParser(ar[1]))

	var instancesXMLText = (new InstanceConverter(ar[1])).convertFromClaferMooOutputToXML();
	var abstractXMLText = ar[2];

	instancesXMLText = instancesXMLText.replaceAll('<?xml version="1.0"?>', '');
	
	abstractXMLText = abstractXMLText.replaceAll("&quot;", "\"");
	abstractXMLText = abstractXMLText.replaceAll("&gt;", ">");
	abstractXMLText = abstractXMLText.replaceAll("&lt;", "<");
	abstractXMLText = abstractXMLText.replaceAll("&amp;", "&");
	
	abstractXMLText = this.convertHtmlTags(abstractXMLText);
	
	
	// clean namespaces
	abstractXMLText = abstractXMLText.replaceAll('<?xml version="1.0"?>', '');
	abstractXMLText = abstractXMLText.replaceAll(' xmlns="http://clafer.org/ir" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:cl="http://clafer.org/ir" xsi:schemalocation="http://clafer.org/ir https://github.com/gsdlab/clafer/blob/master/src/ClaferIR.xsd"', '');
	abstractXMLText = abstractXMLText.replaceAll('cl:', '');
	abstractXMLText = abstractXMLText.replaceAll('xsi:', '');

    var data = new Object();
    data.error = false;
    data.output = ar[0];
    data.instancesXML = instancesXMLText;
    data.claferXML = abstractXMLText;
    if (this.previousData == ""){
    	var lines = ar[1].match(/^.*([\n\r]+|$)/gm);
    	lines = ar[1].split(lines[1]);
    	this.originalPoints = lines.length - 1;
    }
    data.originalPoints = this.originalPoints;
    console.log(data);
    this.previousData = { Unparsed: ar, abstractXML: data.claferXML };
    this.host.updateData(data);
});
Input.method("getInitContent", function()
{
	return '<div id="load_area"><form id="myform" action="' + this.serverAction + '" method="post" enctype="multipart/form-data">' + '<input type="file" size="15" name="claferFile">' + '<input type="hidden" name="claferFileURL" value="' + window.location + '">' + '<input id="optimize" type="submit" value="Optimize">'+
    '<input type="hidden" id="windowKey" name="windowKey" value="' + this.host.key + '">' +
    '<input id="addInstances" type="submit" value="Add Instances">' + '</form></div>';  
});