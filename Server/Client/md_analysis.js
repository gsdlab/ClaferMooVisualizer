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
    return '<div id="analysis"><div id="common" class="comparison"></div><br/><div id="unique" class="comparison"></div></div>';
});

Analysis.method("getInitContent", function()
{
	return '';  
});

Analysis.method("onSelectionChanged", function(list){
    
    var data = this.host.findModule("mdComparisonTable").dataTable;    
    data = data.subsetByProducts(list);
    
    if (data.products.length <= 1)
    {
        $("#analysis #common").html("No Data");
        $("#analysis #unique").html("No Data");    
    }

    var allFeatures = data.toSetOfFeatures();

    var commonData = data.getCommon(); // ALL COMMON DATA
    var commonFeatures = commonData.toSetOfFeatures();
    commonData.title = "Commonalities";
    
    var differentFeatures = allFeatures.difference(commonFeatures);
    var differentData = data.subsetByFeatures(differentFeatures.toArray()); // ALL DIFFERENT DATA
    differentData.title = "Differences";
    
    if (commonFeatures.length > 0)
    {    
        $("#analysis #common").html(new TableVisualizer().getHTML(commonData));
    }
    else
        $("#analysis #common").html("No Data");

        
    if (differentFeatures.length > 0)
    {    
        $("#analysis #unique").html(new TableVisualizer().getHTML(differentData));
    }
    else
        $("#analysis #unique").html("No Data");
        
});
