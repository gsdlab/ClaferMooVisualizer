/*
Copyright (C) 2012 Neil Redman, Alexander Murashkin <http://gsd.uwaterloo.ca>

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

/* instance processing class */

function InstanceConverter(source)
{
	this.instances = source;
}

// Converts ClaferMoo output (list of instances with unique clafer names represented as a structural text)
// from the source to XML
// returns: XML in plain text format

InstanceConverter.method("convertFromClaferMooOutputToXML", function(){
	myRegExp = /\b([^:= ]*)[ ]*\:?[ ]*([^:=]*)[ ]*\=?[ ]*([^ ]*)\b/;
	var result = "";
	list = this.instances.split("\n");
	
	result = '<?xml version="1.0"?><instances><instance>';
	var temp = "";
	var oldpos = -1;
	var pos = 0;
	var empty = true;
	
	for (var i = 0; i < list.length; i++)
	{
		var s = list[i];

		if (s == "")
			continue;
	
		empty = false;
	
		myMatch = myRegExp.exec(s);
		if (myMatch == null)
			continue;
			
		pos = myMatch.index;
		
		var indent = 0;
		
		if (oldpos != -1)
		{		
			if (pos > oldpos) // nesting level increases, only by one!!!
			{
				result += "";
			}
			
			if (pos < oldpos)
			{
				for (var j = 0; j < (oldpos - pos + 1); j++)
				{
					result += "</subclafers></clafer>";
				}
			}
			
			if (pos == oldpos) // clearly NO children
			{
				result += "</subclafers></clafer>";
			}
				
			if (pos == 0) // new instance begins
			{
				result += "</instance><instance>";
			}
			
			oldpos = pos;
		}
		else oldpos = 0;
		
		clafer = myMatch[1];
//		if (clafer == "c7_connectivity") alert("yes!");
			
		super_clafer = myMatch[2];
		value = myMatch[3];
		result += '<clafer id="' + clafer + '"><super>' + super_clafer + '</super><value>' + value + '</value><subclafers>';

	}
	
	if (empty)
	{
		return "";
	}
	
	if (0 < oldpos)
	{
		for (var j = 0; j < (oldpos + 1); j++)
		{
			result += "</subclafers></clafer>";
		}
	}	
	
	result += "</instance></instances>"
	
	return result;
});
