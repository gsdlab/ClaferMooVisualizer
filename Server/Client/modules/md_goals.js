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
//    alert(data.claferXML);
    this.processor = new ClaferProcessor(data.claferXML);
    this.goals = this.processor.getGoals();
    this.ranges = [];
});

Goals.method("drag", function(ev)
{
    var data = ev.target.id + "|" + ev.target.className;
	ev.dataTransfer.setData("Text", data);
});


Goals.method("onRendered", function()
{
    if (this.goals && this.goals.length > 0)
    {
        var sid = "#goals a[draggable=true]";
        var dragElements = $(sid);
        
        for (var i = 0; i < dragElements.length; i++)
        {
            $(sid)[i].ondragstart = this.drag.bind(this);
            
            //add handler for range box 
            var that = this;
            $('#' + this.goals[i].arg + 'max').keyup(function(){
                that.filterByGoals($(this).attr("id").substring(0, $(this).attr("id").length - 3));
            });  
            $('#' + this.goals[i].arg + 'min').keyup(function(){
                that.filterByGoals($(this).attr("id").substring(0, $(this).attr("id").length - 3));
            });
        }
                     
    }
});

Goals.method("getContent", function()
{
	var td;
	
	var table = $('<table width="100%"></table>').addClass('goals');
	
	for (var i = 0; i < this.goals.length; i++)
	{
        var filteredTitle = this.goals[i].label.replaceAll(".", "-");
        //optimization direction
		var row = $('<tr></tr>').addClass('bar');
		td = $('<td id="operation_' + this.goals[i].operation + '" name="' + filteredTitle + '"></td>').addClass('td_operation');
		td.html(this.goals[i].operation);
		row.append(td);
		
        //goal title/draggable
		td = $('<td></td>').addClass('td_argument');
		var span = $('<a href="#" draggable="true" id="' + this.goals[i].arg + '" class="' + filteredTitle + '"></a>');
        span.html(this.goals[i].label);
		td.append(span);
        row.append(td);

        //range input
        td = $('<td></td>').addClass('td_argument');
        //(2nd input added to keep form from submitting on hitting enter)
        var input = $('<input type="text" class="text_input" id="' + this.goals[i].arg + 'min" placeholder="min" style="width: 40px">..<input type="text" class="text_input" id="' + this.goals[i].arg + 'max" placeholder="max" style="width: 40px">');
		td.append(input);
        row.append(td);

        //place row
		$(table).append(row);

        this.ranges.push({
            goal: this.goals[i].arg,
            //placeholder values
            min: -10000000,
            max: 10000000
        });
	}
    
    return $('<div id="goals"></div>').append(table);
});

//get ranges to set landing zone else get minimum/maximum values for the ranges. After that filter
Goals.method("filterByGoals", function(input)
{
    for (var x = 0; x<=this.ranges.length; x++){
        if (input == this.ranges[x].goal){
            break;
        } else if (x == this.ranges.length){
            return;
        }
    }  

    var min = $("#" + input + "min").val();
    var max = $("#" + input + "max").val();
    if (jQuery.isNumeric( min ))
        this.ranges[x].min = min;
    else
        this.ranges[x].min = parseInt($("#" + input + "min").attr("placeholder"));
    
    if (jQuery.isNumeric( max ))
        this.ranges[x].max = max;
    else
        this.ranges[x].max = parseInt($("#" + input + "max").attr("placeholder"));

    this.settings.onFilterByGoals(this, this.ranges[x].goal, this.ranges[x].min, this.ranges[x].max);
});


Goals.method("calculateRanges", function()
{
    for (var x = 0; x < this.ranges.length; x++)
    {
        this.ranges[x].min = parseInt($("#" + this.ranges[x].goal + "min").attr("placeholder"));
        this.ranges[x].max = parseInt($("#" + this.ranges[x].goal + "max").attr("placeholder"));
    }  
});

Goals.method("getInitContent", function()
{
	return '';  
});


