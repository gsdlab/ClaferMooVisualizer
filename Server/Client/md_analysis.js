function Analysis(host)
{ 
    this.id = "mdAnalysis";
    this.title = "Analysis";
    
    this.width = 500;
    this.height = 60;
    this.posx = 0;
    this.posy = 70;
    
    this.host = host;
    this.dataTable = null;
}

Analysis.method("onDataLoaded", function(data){
});

Analysis.method("onRendered", function()
{
});

Analysis.method("getContent", function()
{
    return '<div id="analysis"><div id="intersection"></div>';
});

Analysis.method("getInitContent", function()
{
	return '';  
});

Analysis.method("onSelectionChanged", function(list){
    
    var data = this.host.findModule("mdComparisonTable").dataTable;    
    data = data.subset(list);
    
    var sets = data.toArrayOfSetJS();
    
    if (sets.length == 0)
    {
        $("#analysis").html('No Items')
        return;
    }
    
    var intersectionSet = sets[0];
//    var differencesSet = sets[0];
    
    for (var i = 1; i < sets.length; i++)
    {
        intersectionSet = intersectionSet.intersection(sets[i]);
    }
    
    $("#analysis #intersection").html(intersectionSet + " ");
//    alert(sets);

});
