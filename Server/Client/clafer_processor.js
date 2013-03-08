function ClaferProcessor (sourceXML) {
    this.source = (new XMLHelper()).stringToXML(sourceXML);
    this.xmlHelper = new XMLHelper();
}

ClaferProcessor.method("claferFilter", function(s)
{
	return s.replace(/c[^_]*_/g, "")
});

ClaferProcessor.method("operationFilter", function(s)
{
	var result = "";
	
	if (s == "max")
		result = "max" + " ";
		
	else if (s == "min")
		result = "min" + " ";
	else
		result = s;
		
	return result;
});

ClaferProcessor.method("buildExp", function(exp)
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
				renderedArgs[argCount++] = this.buildExp(expressions[0]);
		}
		else if (current.tagName == "operation")
		{
			operation = this.operationFilter(current.childNodes[0].nodeValue);
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
	
});

ClaferProcessor.method("getGoals", function() 
{
	var xpGoals = this.xmlHelper.queryXML(this.source, "/module/declaration[@type='IGoal']/parentexp/exp");
	var result = new Array();

	for (var i = 0; i < xpGoals.length; i++) 
	{
		var builtExp = this.buildExp(xpGoals[i]);
		
		var parts = builtExp.split(" ");
		var operation = parts[0];
		var rest = builtExp.replace(/[^ ]* /, "").replace(".ref", "");
		rest = rest.replace(/[^.]*\./, "");
		
		var goal = new Object();
		goal.operation = operation;
		goal.arg = rest;
		goal.label = this.claferFilter(rest);
		
//		alert("|" + rest + "|");
		
		result[i] = goal;
	}
	
	return result;
});


ClaferProcessor.method("getAbstractClaferSubTree", function(root)
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
			var nextSubtree = this.getAbstractClaferSubTree(current);
			if (nextSubtree != null)
				result.subclafers[subLength++] = nextSubtree; 
		}
	}
	
	if (result.claferId != null)
		return result;
	
	return null;
});

ClaferProcessor.method("getAbstractClaferTree", function(xpathToIdSiblings, id) 
{
	try
	{
		var clafers = this.xmlHelper.queryXML(this.source, xpathToIdSiblings); // IE8 cannot handle the entire path (with checking text value)
		
		for (var i = 0; i < clafers.length; i++)
		{
			if (clafers[i].childNodes[0].nodeValue == id) // attention! might be not strict equality
			{
				var root = clafers[i].parentNode; // declaration
				root = this.getAbstractClaferSubTree(root);
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
		
});

ClaferProcessor.method("getIfMandatory", function(claferID){
	var min = this.xmlHelper.queryXML(this.source, "//declaration[@type='IClafer'][uniqueid='" + claferID + "']/card/min[intliteral=1]");
	if (min.length != 0)
		return "";
	else 
		return "<b>?</b>";

});
