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

function Console(host)
{ 
    this.id = "mdConsole";
    this.title = "Output and Compatibility";
    
    this.width = 1000;
    this.height = 130;
    this.posx = 0;
    this.posy = 545;

    this.host = host;
    this.claferXML = "";
    this.instancesXML = "";
    this.output = "";
}

Console.method("onDataLoaded", function(data){
    this.claferXML = data.claferXML;
    this.instancesXML = data.instancesXML;
    this.output = data.output;
});

/*
* we have deprecated this method
*

Console.method("onError", function(result)
{
    $('#output').html(result);
});
*/

Console.method("onRendered", function()
{
	$('#abstractXMLOutput').val(this.claferXML);
	$('#instancesXMLOutput').val(this.instancesXML);
    $('#output').html(this.output);
});

Console.method("getContent", function()
{
    return '<table width="100%" height="100%" cellspacing="15"><tr height="1em" style="height:1em;"><th width="50%">ClaferMoo:</th><th width="25%">Abstract Clafers:</th><th width="25%">Instances:</th></tr><td><div class="parent"><textarea id="output" class="child" style="height:100%; overflow:scroll; width:100%"></textarea></div></td><td><div class="parent"><textarea class="child" id="abstractXMLOutput" style="height:100%; overflow:scroll; width:100%;"></textarea></div></td><td><div class="parent"><textarea id="instancesXMLOutput" class="child" style="height:100%; overflow:scroll; width:100%;"></textarea></div></td></tr></table>';
});

Console.method("getInitContent", function()
{
	return this.getContent();
});