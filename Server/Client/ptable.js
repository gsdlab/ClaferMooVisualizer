function TableVisualizer () 
{
//	this.data = data;
}

TableVisualizer.method("isNumeric", function(input)
{
    return (input - 0) == input && input.length > 0;
});

TableVisualizer.method("mapValue", function(sVal)
{
	var result = new Object();
	result.tdStyle = "";
	result.html = sVal;
	
	if (sVal == "yes")
	{
		result.html = '<img class="tick" src="/Client/images/tick.png"/>';
		result.tdStyle = 'tick';
	}
	
	if (sVal == "-")
	{
		result.html = '-';
		result.tdStyle = 'no';
	}

	if (this.isNumeric(sVal))
	{
		result.tdStyle = 'numeric';
		result.html = '<span class="number">' + sVal + '</span>'
	}
		
	return result;
});

// The Main Content Generator

TableVisualizer.prototype.getHTML = function(data) 
{
    data = data.subset(["P1", "P3", "P28"]);

	var instanceCount = data.products.length;    
	var table = $('<table width="100%" cellspacing="0" cellspadding="0"></table>').addClass('foo');

    // first row - headers
    
    var row = $('<tr id="r' + 0 +'"></tr>').addClass('bar');//
	var tagName = "th"; // to make headers
	var td = $('<' + tagName + '></' + tagName + '>').addClass('td_abstract');
	td.html(data.title);
    td.append('&nbsp;<button id="toggle_link">Toggle</button>');
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
			
            mappedValue = this.mapValue(data.matrix[i][j]);
            td.html(mappedValue.html);
            td.addClass(mappedValue.tdStyle);

			row.append(td);
		}

        table.append(row);
	}

	return $('<div id="comparison"></div>').append(table);

}

