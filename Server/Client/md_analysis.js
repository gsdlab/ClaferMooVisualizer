function Analysis(host)
{ 
    this.id = "mdAnalysis";
    this.title = "Analysis";
    
    this.width = 500;
    this.height = 310;
    this.posx = 0;
    this.posy = 195;
    
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
    var permaHidden = this.host.findModule("mdComparisonTable").permaHidden;

    if (missingProducts){
        for (var i = 0; i < missingProducts.length; i++){
            if (permaHidden.hasOwnProperty(missingProducts[i]))
                missingProducts.splice(i, 1);
        }
    }

    var clearButton = '<button id="clearAnalysis">Clear</button> ';
    var label = clearButton;
    
    if (commonFeatures.length > 0)
    {    
        if (missingProducts.length > 0)
        {
            if (missingProducts.length <= 10) // reasonable to add products to make the set complete
            {
                var addButton = '<button id="addMissing">add</button>';
                label += "[Not Complete], " + addButton + " [" + missingProducts.toString() + "]";
            }
            else
            {
                var addButton = '<button id="addMissing">add</button>';
                label += "[Not Complete], should " + addButton + " more than 10 products...";
            }
            
        }
        else
        {
            label += '[Complete] - The set is a complete concept';
        }
    }
    else
        label += "Please select more products for analysis";

    var saveButton = '<form id="SaveForm" action="/" method="post" enctype="multipart/form-data">' + '<input type="button" id="saveSelected" value="Save Selected">' + '<input type="hidden" name="data" id="saveData" value="">' + '</form>';
    label += saveButton;

    $("#analysis #completeness").html(label);

// add function to addMissing button
    if($("#addMissing")){
        $("#addMissing").click(function(){
            var i;
            for (i = 0; i<missingProducts.length; i++){
                host.selector.onSelected(missingProducts[i]);
            }
        }).css("cursor", "pointer");
    }

// add function for clear button
    $("#clearAnalysis").click(function(){
        var selected = host.selector.selection;
        while (selected.length > 0){
            host.selector.onDeselected(selected[selected.length-1]);
            selected.pop();
        };
    }).css("cursor", "pointer");
    
// add function for save button
    $('#saveSelected').click(this.saveSelected.bind(this)).css("cursor", "pointer");

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

// add buttons to remove products
    var i;
    var differentProducts = $("#unique #r0").find(".td_instance");
    for (i=0; i<$(differentProducts).length; i++){
        $(differentProducts[i]).prepend('<image id="rem' + $(differentProducts[i]).text() + '" src="images/remove.png" alt="remove">')
        var buttonId = "#rem" + $(differentProducts[i]).text()
        $(buttonId).click(function(){
            console.log($(this).attr("id").substring(3))
            host.selector.onDeselected($(this).attr("id").substring(3));
        });
        $(buttonId).css("float", "left");
        $(buttonId).css("vertical-align", "middle");
        $(buttonId).css("cursor", "pointer");
        $(differentProducts[i]).append('<span style="visibility: hidden;">--</span>')
        
        $(buttonId).hover(
        function () {
            $(this).attr("src", "images/removeMouseOver.png");
        }, 
        function () {
            $(this).attr("src", "images/remove.png");
        });      
    }

//    alert(missingProducts);

        
});


Analysis.method("saveSelected", function(){
    var selection = this.host.selector.selection;
    var instances = this.host.findModule('mdInput').previousData.Unparsed[1];
    var parser = new InstanceParser(instances);
    var data = "";
    for (var i=0; i < selection.length; i++){
        data += parser.getInstanceData(selection[i]);
    }
    $("#saveData").val(data);
    $("#SaveForm").submit();
});