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

