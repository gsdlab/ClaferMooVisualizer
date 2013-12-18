
function preprocessMOOResult(result, host)
{
	var instances = result.optimizer_instances;
	var abstractXMLText = result.optimizer_claferXML;

	// todo: error handling

	var instancesXMLText = (new InstanceConverter(instances)).convertFromClaferMooOutputToXML();

	instancesXMLText = instancesXMLText.replaceAll('<?xml version="1.0"?>', '');

    if (instancesXMLText.length == 0 || instancesXMLText == "<instances></instances>")
    {
        this.handleError(null, "empty_instances", null);
        return;
    }

    if (instancesXMLText.indexOf("<instance></instance>") >= 0)
	{
        this.handleError(null, "malformed_instance", null);
        return;
    }

    
//	abstractXMLText = abstractXMLText.replaceAll("&quot;", "\"");
//	abstractXMLText = abstractXMLText.replaceAll("&gt;", ">");
//	abstractXMLText = abstractXMLText.replaceAll("&lt;", "<");
//	abstractXMLText = abstractXMLText.replaceAll("&amp;", "&");
	
	abstractXMLText = convertHtmlTags(abstractXMLText);
		
	// clean namespaces
	abstractXMLText = abstractXMLText.replaceAll('<?xml version="1.0"?>', '');
	abstractXMLText = abstractXMLText.replaceAll(' xmlns="http://clafer.org/ir" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:cl="http://clafer.org/ir" xsi:schemalocation="http://clafer.org/ir https://github.com/gsdlab/clafer/blob/master/src/ClaferIR.xsd"', '');
	abstractXMLText = abstractXMLText.replaceAll('cl:', '');
	abstractXMLText = abstractXMLText.replaceAll('xsi:', '');

    var data = new Object();
    data.error = false;
    data.output = result.message;
    data.instancesXML = instancesXMLText;
    data.claferXML = abstractXMLText;	

    if (!host.storage.previousData){
    	var lines = result.optimizer_instances.match(/^.*([\n\r]+|$)/gm);
    	lines = result.optimizer_instances.split(lines[1]);
    	host.storage.originalPoints = lines.length - 1;
    }
    data.originalPoints = this.originalPoints;
    host.storage.previousData = { Unparsed: instances, abstractXML: data.claferXML };

    return data;
}

function convertHtmlTags (input) {
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
