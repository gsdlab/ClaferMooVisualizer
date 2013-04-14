function Input(host)
{ 
    this.id = "mdInput";
    this.title = "Input";

    this.width = 500;
    this.height = 30;
    this.posx = 0;
    this.posy = 0;

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
    that = this; 

    $("#optimize").click(this.OptimizeCall.bind(this));
    $("#addInstances").click(this.addInstancesCall.bind(this));
    $("#myform [type='file']").change(this.inputChange.bind(this));

    $("#optimize").attr("disabled", "disabled");
    $("#addInstances").attr("disabled", "disabled");
 
    var options = new Object();
    options.beforeSubmit = this.beginQuery.bind(this);
    options.success = this.showResponse.bind(this);
    options.error = this.handleError.bind(this);


    $('#myform').ajaxForm(options); 
	$('#myform').submit();
});
 
Input.method("beginQuery", function(formData, jqForm, options) {
    	var that = this;
//    	this.timeout = setTimeout(function(){that.handleTimeout();}, 65000);   
	$("#load_area #myform").hide();
	$("#load_area").append('<div id="preloader"><img id="preloader_img" src="/images/preloader.gif" alt="Loading..."/><span>Loading and processing...</span></div>');	
    return true; 
});

// post-submit callback 
Input.method("endQuery", function()  { 
	$("#preloader").remove();
	$("#load_area #myform").show();
	
	return true;
});

// pre-submit callback 
Input.method("showRequest", function(formData, jqForm, options) {
    var queryString = $.param(formData); 
    return true; 
});
 
// post-submit callback 
Input.method("showResponse", function(responseText, statusText, xhr, $form)  { 
//	clearTimeout(this.timeout); 
	this.processToolResult(responseText);   
	this.endQuery();
});

Input.method("handleError", function(responseText, statusText, xhr, $form)  { 
//	clearTimeout(this.timeout);
	var er = document.getElementById("error_overlay");
	er.style.visibility = "visible";	
	document.getElementById("error_report").innerHTML = ('<input id="close_error" type="image" src="images/no.png" alt="close" style="position: relative; left: -325px; top: 0px; width: 20px; height: 20px;"><p>' + xhr + '<br>' + responseText.responseText.replace("\n", "<br>") + "</p>");
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

		var parser = new InstanceParser(result);
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
	return '<div id="load_area"><form id="myform" action="' + this.serverAction + '" method="post" enctype="multipart/form-data">' + '<input type="file" size="15" name="claferFile">' + '<input type="hidden" name="claferFileURL" value="' + window.location + '">' + '<input id="optimize" type="submit" value="Optimize">'+ '<input id="addInstances" type="submit" value="Add Instances">' + '</form></div>';  
});
