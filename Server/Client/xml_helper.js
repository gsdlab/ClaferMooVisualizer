/*
Copyright (C) 2012 Alexander Murashkin <http://gsd.uwaterloo.ca>

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

XMLHelper.method("stringToXML", function(text)
{
    if (window.ActiveXObject)
    {
        var doc=new ActiveXObject('Microsoft.XMLDOM');
        doc.async='false';
        doc.loadXML(text);
    } 
    else 
    {
        var parser=new DOMParser();
        var doc=parser.parseFromString(text,'text/xml');
	}
    
	return doc;

});