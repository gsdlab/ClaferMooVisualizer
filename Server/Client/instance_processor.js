// Instance Processor is used to work with sets of configurations presented as XML

function InstanceProcessor (sourceXML) {
    this.source = (new XMLHelper()).stringToXML(sourceXML);
    this.xmlHelper = new XMLHelper();
}

// returns the number of instances in the set
InstanceProcessor.method("getInstanceCount", function() 
{
	var elements = this.source.getElementsByTagName("instance");
	if (elements == null)
		return 0;
		
	return elements.length;
});

// returns the base abstract clafer of all instances (they should have the same base abstract clafer)

InstanceProcessor.method("getInstanceSuperClafer", function() 
{
	try
	{
		var rootClafer = this.xmlHelper.queryXML(this.source, "/instances/instance/clafer/super[1]")[0].firstChild.nodeValue;
	}
	catch(e)
	{
		alert("Could not get a super clafer of the instance root");
		return "";
	}
	
	return rootClafer;
});


// returns feature value of featureName feature of an instance number instanceIndex
// forceNumeric forces to return an integer

InstanceProcessor.method("getFeatureValue", function(instanceIndex, featureName, forceNumeric) 
{
	try
	{
        var clafers = this.xmlHelper.queryXML(this.source, 'instances/instance[' + instanceIndex + ']' + '//clafer[@id="' + featureName + '"]');
		if (clafers.length == 1)
		{	
			var result;
			if (forceNumeric)
				result = 1;
			else
				result = "yes";			
		
			for (var i = 0; i < clafers[0].childNodes.length; i++)
			{
				var current = clafers[0].childNodes[i];

				if (current.tagName == "value")
				{
					if (current.firstChild)
					{
						result = current.firstChild.nodeValue;
						if (forceNumeric)
							result = parseInt(result);
					}
					
					break;
				}
			}
			
			return result;
		}
		else
        {
			if (forceNumeric)
				return 0;
			else
				return "-";			
        }
	}
	catch(e)
	{
		alert("Error while checking the feature specified by: '" + instanceIndex + " " + featureName + "'");
		return "";
	}
		
});

/* Old function -- returns shape of instance --could be useful later so left in
InstanceProcessor.method("getInstanceShape", function(id, goals, originalPoints){
    if (id>originalPoints){
	    var values={};
    	for (var i=0; i<goals.length; i++){
    	    values[goals[i].arg] = this.getFeatureValue(id, goals[i].arg, true);
    	}
    	for (i=1; i<=originalPoints; i++){
    	    var isOptimal = true;
    	    for (j=0; j<goals.length; j++){
    	        var check =  this.getFeatureValue(i, goals[j].arg, true);
    	        if (check != values[goals[j].arg]){
    	            isOptimal = false;
    	            break;
    	        }
        	}
        	if (isOptimal)
        	    return "\u2B22";//returns hexagon
    	}
    	return "\u25A0";//returns square
    } else
    	return "\u25CF";//returns circle
});
*/

//returns the id of the first identical point that is a circle.
InstanceProcessor.method("getIdenticalID", function(id, goals, originalPoints){
   	if (id>originalPoints){
    	var values={};
   		for (var i=0; i<goals.length; i++){
   		   	values[goals[i].arg] = this.getFeatureValue(id, goals[i].arg, true);
   		}
	   	for (i=1; i<=originalPoints; i++){
   		    var isOptimal = true;
   	    	for (j=0; j<goals.length; j++){
   	        	var check =  this.getFeatureValue(i, goals[j].arg, true);
   	        	if (check != values[goals[j].arg]){
   	        	   	isOptimal = false;
   	        	    break;
   	        	}
       		}
       		if (isOptimal)
       		    return i;
   		}
   		return 0;
   	}
});