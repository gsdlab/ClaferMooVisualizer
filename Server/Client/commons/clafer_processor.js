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
function ClaferProcessor (sourceXML) {
    this.source = (new XMLHelper()).stringToXML(sourceXML);
    this.xmlHelper = new XMLHelper();
}

//returns claferid without the cXX_ extension
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


ClaferProcessor.method("getEffectivelyMandatoryFeatures", function(tree){
	var list = [];
	for (var i = 0; i<tree.subclafers.length; i++){
		list = list.concat(this.recursiveEMcheck(tree.subclafers[i]));
	}
	return list;
});

ClaferProcessor.method("recursiveEMcheck", function(root){
	var list = []
	if (this.getIfMandatory(root.claferId) == ""){
		list.push(root.displayId);
		for (var i = 0; i<root.subclafers.length; i++){
			list = list.concat(this.recursiveEMcheck(root.subclafers[i]));
		}
	}
	return list;
});

ClaferProcessor.method("getFeaturesWithChildren", function(tree){
	var list = [];
	if(tree.subclafers!=null){
		for (var i = 0; i<tree.subclafers.length; i++){
			list = list.concat(this.recursiveHasChildrenCheck(tree.subclafers[i]));
		}
		return list;
	} else 
		return [];
});

ClaferProcessor.method("recursiveHasChildrenCheck", function(root){
	var list = []
	if (root.subclafers.length > 0){
		list.push(root.displayId);
		for (var i = 0; i<root.subclafers.length; i++){
			list = list.concat(this.recursiveHasChildrenCheck(root.subclafers[i]));
		}
	}
	return list;
});