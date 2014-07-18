/*
Copyright (C) 2012 - 2014 Alexander Murashkin, Neil Redman <http://gsd.uwaterloo.ca>

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

function Goals(host, settings)
{ 
    this.id = "mdGoals";

    this.settings = settings;
    this.title = this.settings.title;

    this.width = this.settings.layout.width;
    this.height = this.settings.layout.height;
    this.posx = this.settings.layout.posx;
    this.posy = this.settings.layout.posy;
    
    this.host = host;
    this.goals = null;

    this.host.loaded();
}

Goals.method("onDataLoaded", function(data){
    this.goals = data.objectives;
});

Goals.method("drag", function(ev)
{
    var data = ev.target.id + "|" + ev.target.className;
	ev.dataTransfer.setData("Text", data);
});

Goals.method("onChange", function(goal)
{
    var min = $('#' + goal + 'min').val();
    var max = $('#' + goal + 'max').val();

    if (!isNumeric(min))
        min = this.goals[goal].minValue;

    if (!isNumeric(max))
        max = this.goals[goal].maxValue;

    this.settings.onRangeFiltered(this, goal, min, max);
});

Goals.method("onRendered", function()
{
    var context = this;

    var sid = "#goals a[draggable=true]";
    var dragElements = $(sid);
    
    for (var i = 0; i < dragElements.length; i++)
    {
        $(sid)[i].ondragstart = this.drag.bind(this);
        var goal = $($(sid)[i]).attr("id");

        $('#' + goal + 'min').keyup(function()
        {
            var id = $(this).attr("id");
            context.onChange(id.substring(0, id.length - 3));
        });

        $('#' + goal + 'max').keyup(function()
        {
            var id = $(this).attr("id");
            context.onChange(id.substring(0, id.length - 3));
        });
    }                     

    this.updateValues({});
});

Goals.method("updateValues", function(ranges)
{
    for (var goal in this.goals)
    {
        if (!ranges[goal] || ranges[goal].min == this.goals[goal].minValue)
            $('#' + goal + 'min').val("");
        else
            $('#' + goal + 'min').val(ranges[goal].min);

        if (!ranges[goal] || ranges[goal].max == this.goals[goal].maxValue)
            $('#' + goal + 'max').val("");
        else
            $('#' + goal + 'max').val(ranges[goal].max);
    }

});

Goals.method("getContent", function()
{
	var td;
	
	var table = $('<table width="100%"></table>').addClass('goals');
	
	for (var goal in this.goals)
	{
        var filteredTitle = this.goals[goal].label.replaceAll(".", "-");
        //optimization direction
		var row = $('<tr></tr>').addClass('bar');
		td = $('<td id="operation_' + this.goals[goal].operation + '" name="' + filteredTitle + '"></td>').addClass('td_operation');
		td.html(this.goals[goal].operation);
		row.append(td);
		
        //goal title/draggable
		td = $('<td></td>').addClass('td_argument');
		var span = $('<a href="#" draggable="true" id="' + goal + '" class="' + filteredTitle + '"></a>');
        span.html(this.goals[goal].label);
		td.append(span);
        row.append(td);

        //range input
        td = $('<td></td>').addClass('td_argument');
        //(2nd input added to keep form from submitting on hitting enter)
        var inputMin = '<input type="text" class="text_input" id="' + goal + 'min" placeholder="' + this.goals[goal].minValue + '" style="width: 40px" value="">';
        var inputMax = '<input type="text" class="text_input" id="' + goal + 'max" placeholder="' + this.goals[goal].maxValue + '" style="width: 40px" value="">';

		td.append(inputMin + ".." + inputMax);
        row.append(td);

        //place row
		$(table).append(row);
	}
    
    return $('<div id="goals"></div>').append(table);
});

Goals.method("getInitContent", function()
{
	return '';  
});

Goals.method("onFiltered", function(data)
{
    this.updateValues(data._qualityRanges);
});

