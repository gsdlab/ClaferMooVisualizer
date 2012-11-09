function Analysis(host)
{ 
    this.id = "mdAnalysis";
    this.title = "Analysis";
    
    this.width = 500;
    this.height = 365;
    this.posx = 0;
    this.posy = 140;
    
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
    var content = '<div id="analysis">';
    
    content += '<div id="completeness"></div><br/>';
    content += '<div id="common" class="comparison"></div><br/><div id="unique" class="comparison"></div>';
    
    content += '</div>';
    
    return content;
});

Analysis.method("getInitContent", function()
{
	return '';  
});

Analysis.method("onSelectionChanged", function(list){
    
    var originalData = this.host.findModule("mdComparisonTable").dataTable;    
    data = originalData.subsetByProducts(list);
    
    if (data.products.length <= 1)
    {
        $("#analysis #common").html("No Data");
        $("#analysis #unique").html("No Data");    
    }

    var allFeatures = data.toSetOfFeatures();

    var commonData = data.getCommon(true); // ALL COMMON DATA
    var commonFeatures = commonData.toSetOfFeatures();
    
    var differentFeatures = allFeatures.difference(commonFeatures);
    var differentData = data.subsetByFeatures(differentFeatures.toArray()); // ALL DIFFERENT DATA
    differentData.title = "Differences";

    
    // get the products that are missing to make up the complete set.
    var missingProducts = originalData.getMissingProductsInCommonData(data.getCommon(false), list);
  
  
    var label = "[Complete] - The set is a complete concept";
    
    if (commonFeatures.length > 0)
    {    
        if (missingProducts.length > 0)
        {
            if (missingProducts.length <= 10) // reasonable to add products to make the set complete
            {
                label = "[Not Complete], add [" + missingProducts.toString() + "]";
            }
            else
            {
                label = "[Not Complete], should add more than 10 products...";
            }
            
        }
    }
    else
        label = "Please select more products for analysis";

    $("#analysis #completeness").html(label);
    
//    commonData.products[0] = label;
    
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

//    alert(missingProducts);
        
});
