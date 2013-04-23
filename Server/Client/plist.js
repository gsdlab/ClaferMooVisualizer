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

function ListVisualizer () 
{
}

// The Main Content Generator

ListVisualizer.prototype.getHTML = function(data, title) 
{
	var table = $('<table width="100%" cellspacing="0" cellspadding="0"></table>').addClass('foo');    

	var tagName = "th";

    var row = $('<tr id="r' + "0" +'"></tr>').addClass('bar'); //
	var td = $('<' + tagName + '></' + tagName + '>').addClass('td_abstract');
    $(td).html(title);

    row.append(td);				
    table.append(row);
    
	tagName = "td";
    
    for (var i = 0; i < data.length; i++)
	{
			
		var row = $('<tr id="r' + (i + 1) +'"></tr>').addClass('bar'); //
		var td = $('<' + tagName + '></' + tagName + '>').addClass('td_abstract');
		td.html(data[i].replaceAll(' ', '&nbsp;&nbsp;'));
        
		row.append(td);				
        table.append(row);
	}

	return table;

}

