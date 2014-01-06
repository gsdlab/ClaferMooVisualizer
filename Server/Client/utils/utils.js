
function preprocessMOOResult(result, host)
{
	var instances = result.optimizer_instances;
	var abstractXMLText = result.optimizer_claferXML;

	if (!result.optimizer_instances_only) // the user submitted a clafer file to optimize
	{
        host.storage.evolutionController.existingData = null; // free the existing data
        host.storage.instanceFilter.permaHidden = {}; // reset the hidden instances
        host.storage.selector.clearSelection(); // reset the selection

    	if (!result.optimizer_instances)
		  {
          host.findModule("mdInput").handleError(null, "malformed_output", null);
       		return false;
   		}
    } 
    else  // the user submitted instances file
    {
        if (host.storage.evolutionController.existingData)
        {
            instances = host.storage.evolutionController.existingData.unparsedInstances;

            if (!result.optimizer_instances)            
            {
                host.findModule("mdInput").handleError(null, "empty_instance_file", null);
                return false;
            }
            
            var parser = new InstanceConverter(result.optimizer_instances);
            instances += parser.convertFromClaferIGOutputToClaferMoo(host.storage.evolutionController.existingData.claferXML);            
            abstractXMLText = host.storage.evolutionController.existingData.claferXML;
        }
        else
		    {
            host.findModule("mdInput").handleError(null, "optimize_first", null);
       	    return false;
   		}
	}

	var instancesXMLText = (new InstanceConverter(instances)).convertFromClaferMooOutputToXML();

	instancesXMLText = instancesXMLText.replaceAll('<?xml version="1.0"?>', '');

    if (instancesXMLText.length == 0 || instancesXMLText == "<instances></instances>")
    {
        host.findModule("mdInput").handleError(null, "empty_instances", null);
        return false;
    }

    if (instancesXMLText.indexOf("<instance></instance>") >= 0)
	{
        host.findModule("mdInput").handleError(null, "malformed_instance", null);
        return false;
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
    data.unparsedInstances = instances;	

    /* counting the number of lines */
    if (!host.storage.evolutionController.existingData){
        var lines = data.unparsedInstances.match(/^.*([\n\r]+|$)/gm);
        lines = data.unparsedInstances.split(lines[1]);
        host.storage.evolutionController.existingInstancesCount = lines.length - 1;
    }

    host.storage.evolutionController.existingData = data;

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
