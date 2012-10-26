// solves generic XML interaction tasks

function XMLHelper()
{
    
}


// Queries the given XML with path - XPATH. 
// Returns nodes

XMLHelper.method("queryXML", function(xml, path)
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
});