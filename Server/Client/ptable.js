/*
Copyright (C) 2012 Alexander Murashkin, Neil Redman <http://gsd.uwaterloo.ca>

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

function TableVisualizer () 
{
//	this.data = data;
}

TableVisualizer.method("mapValue", function(sVal, isEM)
{
	var result = new Object();
	result.tdStyle = "";
	result.html = sVal;
	
	if (sVal == "yes")
	{
		result.html = '<img class="tick" src="/images/tick.png"/>';
		result.tdStyle = 'tick';
	}

	if (isEM)
	{
		result.html = ''
		result.tdStyle = 'EffectMan';
	}
	
	if (sVal == "-")
	{
		result.html = '<img class="no" src="/images/no.png"/>';
		result.tdStyle = 'no';
	}

	if (isNumeric(sVal))
	{
		result.tdStyle = 'numeric';
		result.html = '<span class="number">' + sVal + '</span>'
	}
		
	return result;
});

// The Main Content Generator

TableVisualizer.prototype.getHTML = function(data) 
{
	var instanceCount = data.products.length;    
	var table = $('<table  id="tBody" width="100%" cellspacing="0" cellspadding="0"></table>').addClass('foo');

    // first row - headers
    var row = $('<tr id="r' + 0 +'"></tr>').addClass('bar');//
	var tagName = "th"; // to make headers
	var td = $('<' + tagName + '></' + tagName + '>').addClass('td_abstract').addClass('table_title');
	td.html(data.title);
	row.append(td);
    
    for (var j = 0; j < instanceCount; j++)
    {
        var td = $('<' + tagName + ' id="' + tagName + "0" + "_" + (j + 1) + '"></' + tagName + '>').addClass('td_instance');
        td.html(data.products[j]);
		row.append(td);
    }
		
    table.append(row);
    
    // next rows
	
	tagName = "td";
    
    for (var i = 0; i < data.features.length; i++)
	{
			
		var row = $('<tr id="r' + (i + 1) +'"></tr>').addClass('bar');//
		
		var td = $('<' + tagName + '></' + tagName + '>').addClass('td_abstract');
		td.html(data.features[i].replaceAll(' ', '&nbsp;&nbsp;'));
        
		row.append(td);
				
		for (var j = 0; j < instanceCount; j++)
		{
			var td = $('<' + tagName + ' id="' + tagName + i + "_" + (j + 1) + '"></' + tagName + '>').addClass('td_instance');
			
            mappedValue = this.mapValue(data.matrix[i][j], data.EMcontext[i+1]);
            td.html(mappedValue.html);
            td.addClass(mappedValue.tdStyle);

			row.append(td);
		}

        table.append(row);
	}
	return table;

}

