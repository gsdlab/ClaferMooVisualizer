function XMLProcessor (abstractXML, instancesXML) {
    this.aXML = abstractXML;
    this.iXML = instancesXML;
}

function queryXML(xml, path)
{
	// code for IE
	if (window.ActiveXObject)
	{
//		alert("hi");
		xml.setProperty("SelectionLanguage", "XPath");
		var nodes = xml.selectNodes(path);
		return nodes;
	}
	// code for Mozilla, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument)
	{
		var temp_result = xml.evaluate(path, xml, null,	XPathResult.ANY_TYPE, null);
		//var nodes=xml.evaluate(path, xml);
		//var nodes=xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
		
		var aNode = temp_result.iterateNext();

		var nodes = new Array();
		var i = 0;
		while (aNode)
		{
//			document.write(aNode + "<br>");
			nodes[i++] = aNode;
			aNode = temp_result.iterateNext();
		}

		return nodes;
	}
}

XMLProcessor.prototype.ack = function() 
{
//	alert("XX");
}

function claferFilter(s)
{
	return s.replace(/c[^_]*_/g, "")
}

function operationFilter(s)
{
	var result = "";
	
	if (s == "max")
		result = "max" + " ";
		
	else if (s == "min")
		result = "min" + " ";
	else
		result = s;
		
	return result;
}

function buildExp(exp)
{
	var argCount = 0;
	var operation = "";
	
	var renderedArgs = new Array();
	
	for (var i = 0; i < exp.childNodes.length; i++)
	{
		var current = exp.childNodes[i];
		if (current.tagName == "argument")
		{			
			var expressions = current.getElementsByTagName("exp");
			if (expressions.length != 0)
				renderedArgs[argCount++] = buildExp(expressions[0]);
		}
		else if (current.tagName == "operation")
		{
			operation = operationFilter(current.childNodes[0].nodeValue);
		}
		else if (current.tagName == "id")
		{
			return current.childNodes[0].nodeValue;
		}
	}
	
	if (argCount == 1)
		return operation + renderedArgs[0];
	else
		return renderedArgs.join(operation);
	
//	alert(argCount);
//	alert(operation);
	
//	alert(argumentNodes.length);
//		var operation = operationNode.nodeValue;
//		alert(operation);
	
//	if (argumentNodes.length == 1) // unary
//	{
//	}
}

XMLProcessor.prototype.getGoals = function() 
{
//	var xpGoals = queryXML(this.aXML, '/module/declaration[@type="igoal"]/parentexp/exp/argument/exp/argument[last()]/exp/id');
//	var xpIsMax = queryXML(this.aXML, '/module/declaration[@type="igoal"]/parentexp/exp/argument/exp/argument[last()]/exp/id');

	var xpGoals = queryXML(this.aXML, "/module/declaration[@type='IGoal']/parentexp/exp");
	var result = new Array();

	for (var i = 0; i < xpGoals.length; i++) 
	{
		var builtExp = buildExp(xpGoals[i]);
		
		var parts = builtExp.split(" ");
		var operation = parts[0];
		var rest = builtExp.replace(/[^ ]* /, "");
		rest = rest.replace(/[^.]*\./, "");
		
		var goal = new Object();
		goal.operation = operation;
		goal.arg = rest;
		goal.label = claferFilter(rest);
		
//		alert("|" + rest + "|");
		
		result[i] = goal;
	}
	
	return result;
};

XMLProcessor.prototype.getInstanceCount = function() 
{
	var elements = this.iXML.getElementsByTagName("instance");
	if (elements == null)
		return 0;
		
	return elements.length;
};


XMLProcessor.prototype.getInstanceSuperClafer = function() 
{
	try
	{
		var rootClafer = queryXML(this.iXML, "/instances/instance/clafer/super[1]")[0].firstChild.nodeValue;
	}
	catch(e)
	{
		alert("Could not get a super clafer of the instance root");
		return "";
	}
	
	return rootClafer;
};

function findSubtree(root)
{
	var subLength = 0;
	var result = new Object();
	result.subclafers = new Array();
	result.claferId = null;
	result.displayId = null;
	
	for (var j = 0; j < root.childNodes.length; j++)
	{
		var current = root.childNodes[j];
		if (current.tagName == "super")
			result.claferSuper = current.firstChild.nodeValue;
		else if (current.tagName == "value")
			result.claferValue = current.firstChild.nodeValue;
		else if (current.tagName == "uniqueid")
			result.claferId = current.firstChild.nodeValue;
		else if (current.tagName == "id")
			result.displayId = current.firstChild.nodeValue;
		else if (current.tagName == "declaration")
		{
			var nextSubtree = findSubtree(current);
			if (nextSubtree != null)
				result.subclafers[subLength++] = nextSubtree; 
		}
	}
	
	if (result.claferId != null)
		return result;
	
	return null;
}

XMLProcessor.prototype.getAbstractClaferTree = function(xpathToIdSiblings, id) 
{
	try
	{
		var clafers = queryXML(this.aXML, xpathToIdSiblings); // IE8 cannot handle the entire path (with checking text value)
		
		for (var i = 0; i < clafers.length; i++)
		{
			if (clafers[i].childNodes[0].nodeValue == id) // attention! might be not strict equality
			{
				var root = clafers[i].parentNode; // declaration
				root = findSubtree(root);
				return root;
			}
		}
		
		alert("Not found a super clafer specified by the xpath: '" + xpathToIdSiblings + "' " + id);
	}
	catch(e)
	{
		alert("Could not get a super clafer specified by the xpath: '" + xpathToIdSiblings + "' " + id);
		return "";
	}
		
};

XMLProcessor.prototype.getFeatureValue = function(instanceIndex, featureName, forceNumeric) 
{
	try
	{
//        if (featureName == "c160_total_energy")
//            featureName = "c215_total_energy";

        var clafers = queryXML(this.iXML, 'instances/instance[' + instanceIndex + ']' + '//clafer[@id="' + featureName + '"]');
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
//            alert(featureName);
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
		
};

 

