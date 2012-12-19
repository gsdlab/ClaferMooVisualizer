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
    var options = new Object();
    options.beforeSubmit = this.beginQuery.bind(this);
    options.success = this.showResponse.bind(this);
 
    $('#myform').ajaxForm(options); 
	$('#myform').submit();
});

Input.method("beginQuery", function(formData, jqForm, options) { 
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
    this.processToolResult(responseText);    
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

Input.method("processToolResult", function(result)
{
	if (!result) return;
	
	var ar = result.split("=====");
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

    this.host.updateData(data);
});

Input.method("getInitContent", function()
{
	return '<div id="load_area"><form id="myform" action="' + this.serverAction + '" method="post" enctype="multipart/form-data">' + '<input type="file" name="claferFile">'+ '<input type="submit" value="Upload">'+'</form></div>';  
});
