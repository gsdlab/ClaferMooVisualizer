/*
Copyright (C) 2012 Neil Redman <http://gsd.uwaterloo.ca>

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

function InstanceParser(instances)
{
	this.instances = instances;
}

//function that can change an instance given by claferIG to match the output of ClaferMoo
InstanceParser.method("convertFromClaferIGOutputToClaferMoo", function(oldAbstractXML){
	var instances = this.instances;
	//remove $x
	var myregex = /\x24[0-9]{1,}[ ]/g;
	instances = instances.replace(myregex, " ");

	//convert double spacing to tab
	instances = instances.replaceAll("  ", " ");

	//make numbers the same
	myregex = /[c][0-9]{1,}[_][^\n <>]{1,}/g;
	var allFinds = instances.match(myregex);
	var uniqueFinds = [];
	for (var i=0; i<allFinds.length; i++){
		if ($.inArray(allFinds[i], uniqueFinds) === -1){
			uniqueFinds.push(allFinds[i]);
		}
	}

	var allOldFinds = oldAbstractXML.match(myregex);
	var uniqueOldFinds = [];
	for (var i=0; i<allOldFinds.length; i++){
		if ($.inArray(allOldFinds[i], uniqueOldFinds) === -1){
			uniqueOldFinds.push(allOldFinds[i]);
		}
	}

	for (var i=0; i<uniqueFinds.length; i++){
		current = uniqueFinds[i].replace(/[c][0-9]{1,}[_]/, "");
		for (var y=0; y<uniqueOldFinds.length; y++){
			if (uniqueOldFinds[y].replace(/[c][0-9]{1,}[_]/, "") == current){
				instances = instances.replaceAll(uniqueFinds[i], uniqueOldFinds[y]);
			}
		}
	}

	return instances;
});

//returns the data for a single instance
InstanceParser.method("getInstanceData", function(pid){
	var instances = this.instances;
	var lines = instances.match(/^.*([\n\r]+|$)/gm);
	var supertype = lines[1].replace(/[c][0-9]{1,}[_]/, "");
	var myregex = new RegExp("[c][0-9]{1,}[_]" + supertype , "g"); 
	var data = lines[1] + instances.split(myregex)[pid.substring(1)];
	data = data.replace(" ", "  ");
	return data;
});