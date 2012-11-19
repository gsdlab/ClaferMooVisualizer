function Goals(host)
{ 
    this.id = "mdGoals";
    this.title = "Goals";
    
    this.width = 500;
    this.height = 85;
    this.posx = 0;
    this.posy = 70;
    
    this.host = host;
    this.goals = null;
}

Goals.method("onDataLoaded", function(data){
    this.processor = new ClaferProcessor(data.claferXML);
    this.goals = this.processor.getGoals();
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
        }        
    }
});

Goals.method("getContent", function()
{
	var td;
	
	var table = $('<table width="100%"></table>').addClass('goals');
	
	for (var i = 0; i < this.goals.length; i++)
	{
		var row = $('<tr></tr>').addClass('bar');
		td = $('<td id="operation_' + this.goals[i].operation + '"></td>').addClass('td_operation');
		td.html(this.goals[i].operation);
		row.append(td);
		
		td = $('<td></td>').addClass('td_argument');
		var span = $('<a href="#" draggable="true" id="' + this.goals[i].arg + '" class="' + this.goals[i].label + '"></a>');
        span.html(this.goals[i].label);
		td.append(span);
		row.append(td);
		$(table).append(row);
	}
    
    return $('<div id="goals"></div>').append(table);
});

Goals.method("getInitContent", function()
{
	return '';  
});
