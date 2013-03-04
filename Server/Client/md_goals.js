function Goals(host)
{ 
    this.id = "mdGoals";
    this.title = "Objectives";
    
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
            $('#' + this.goals[i].label + 'max').keyup(function(){
                that.filterByGoals($(this).attr("id").substring(0, $(this).attr("id").length - 3));
            });  
            $('#' + this.goals[i].label + 'min').keyup(function(){
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
        //optimization direction
		var row = $('<tr></tr>').addClass('bar');
		td = $('<td id="operation_' + this.goals[i].operation + '" name="' + this.goals[i].label + '"></td>').addClass('td_operation');
		td.html(this.goals[i].operation);
		row.append(td);
		
        //goal title/draggable
		td = $('<td></td>').addClass('td_argument');
		var span = $('<a href="#" draggable="true" id="' + this.goals[i].arg + '" class="' + this.goals[i].label + '"></a>');
        span.html(this.goals[i].label);
		td.append(span);
        row.append(td);

        //range input
        td = $('<td></td>').addClass('td_argument');
        //(2nd input added to keep form from submitting on hitting enter)
        var input = $('<input type="text" class="text_input" id="' + this.goals[i].label + 'min" placeholder="min" style="width: 40px">..<input type="text" class="text_input" id="' + this.goals[i].label + 'max" placeholder="max" style="width: 40px">');
		td.append(input);
        row.append(td);

        //place row
		$(table).append(row);

        this.ranges.push({
            goal: this.goals[i].label,
            min: 0,
            max: 10000000
        });
	}
    
    return $('<div id="goals"></div>').append(table);
});

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
        this.ranges[x].min = 0;
    if (jQuery.isNumeric( max ))
        this.ranges[x].max = max;
    else
        this.ranges[x].max = 10000000;

    this.host.findModule("mdComparisonTable").filterContent();
});

Goals.method("getInitContent", function()
{
	return '';  
});


