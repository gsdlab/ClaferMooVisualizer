/*
Copyright (C) 2012, 2013 Neil Redman, Alexander Murashkin <http://gsd.uwaterloo.ca>

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
function VariantComparer(host, settings)
{ 
    this.id = "mdVariantComparer";
    this.settings = settings;
    this.title = this.settings.title;

    this.width = this.settings.layout.width;
    this.height = this.settings.layout.height;
    this.posx = this.settings.layout.posx;
    this.posy = this.settings.layout.posy;

    this.host = host;
    
    this.dataTable = null;
    this.host.loaded();
}

VariantComparer.method("onDataLoaded", function(data){
    this.instanceProcessor = new InstanceProcessor(data.instancesXML);
    this.Processor = new ClaferProcessor(data.claferXML);
});

VariantComparer.method("onRendered", function()
{
});

VariantComparer.method("getContent", function()
{
    var content = '<div id="VariantComparer">';
    
    content += '<div id="completeness"></div><br/>';
    content += '<div id="common" class="comparison"></div><br/><div id="unique" class="comparison"></div>';
    
    content += '</div>';
    
    return content;
});

VariantComparer.method("getInitContent", function()
{
	return '';  
});

//rebuilds the table with the new selection data
VariantComparer.method("onSelectionChanged", function(list, originalTable, permaHidden){
    //pulls data from the comparison table
    var originalData = originalTable;
    var newlist = [];
    for (var i = 0; i < list.length; i++){
        newlist.push(parsePID(list[i]));
    }   

    for (var i = 0; i < newlist.length; i++){
        newlist[i] = newlist[i];
    }

    data = originalData.subsetByProducts(newlist);
    
    if (data.products.length <= 1)
    {
        $("#VariantComparer #common").html("No Data");
        $("#VariantComparer #unique").html("No Data");    
    }

    var allFeatures = data.features;

    var commonData = data.getCommon(true); // ALL COMMON DATA
    var commonFeatures = commonData.features;
    
    var differentFeatures = allFeatures.diff(commonFeatures);
    var differentData = data.subsetByFeatures(differentFeatures); // ALL DIFFERENT DATA
    differentData.title = "Differences";

    
    // get the products that are missing to make up the complete set.
    var missingProducts = originalData.getMissingProductsInCommonData(data.getCommon(false), newlist);

    if (missingProducts)
    {
        while (i < missingProducts.length)
        {
            if (permaHidden.hasOwnProperty(getPID(missingProducts[i])))
                missingProducts.splice(i, 1);
            else
                i++;
        }
    }

    var clearButton = '<button id="clearVariantComparer">Clear</button> ';
    var label = clearButton;
    var context = this;

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
            label += '[Complete]';
        }
    }
    else
        label += "Please select more products for VariantComparer";

    var saveButton = ' <input type="button" id="saveSelected" value="Save Selected" disabled="disabled">' + '<form id="SaveForm" action="/saveinstances" method="post" enctype="multipart/form-data">' + '<input type="hidden" name="data" id="saveData" value="">' + '</form>';
    label += saveButton;

    $("#VariantComparer #completeness").html(label);

// add function to addMissing button
    if($("#addMissing")){
        $("#addMissing").click(function(){
            var i;
            for (i = 0; i<missingProducts.length; i++){
                context.settings.onSelected(context, getPID(missingProducts[i].replace(/[\u2B22\u25CF\u25A0]/g, "")));
            }
        }).css("cursor", "pointer");
    }

// add function for clear button
    $("#clearVariantComparer").click(function(){
        var selected = context.settings.getSelection(context);
        while (selected.length > 0){
            context.settings.onDeselected(context, selected[selected.length-1]);
            selected.pop();
        };
    }).css("cursor", "pointer");
    
// add function for save button
    $('#saveSelected').click(this.saveSelected.bind(this)).css("cursor", "pointer");

    if (context.settings.getSelection(context).length > 0)
        $("#saveSelected").removeAttr("disabled");
    else
        $("#saveSelected").attr("disabled", "disabled");

//    commonData.products[0] = label;
    
    if (commonFeatures.length > 0)
    {            
        $("#VariantComparer #common").html(new TableVisualizer().getHTML(commonData));
    }
    else
        $("#VariantComparer #common").html("No Data");

        
    if (differentFeatures.length > 0)
    {    
        $("#VariantComparer #unique").html(new TableVisualizer().getHTML(differentData));
    }
    else
        $("#VariantComparer #unique").html("No Data");

// Adds all the shapes to the table headers
//    this.addShapes();

// add buttons to remove products
    var i;
    var differentProducts = $("#unique #r0").find(".td_instance");
    for (i=0; i<$(differentProducts).length; i++){
        $(differentProducts[i]).prepend('<image id="rem' + $(differentProducts[i]).find(".svghead :last-child").text() + '" src="commons/Client/images/remove.png" alt="remove">')
        var buttonId = "#rem" + $(differentProducts[i]).find(".svghead :last-child").text()
        $(buttonId).click(function(){
//            console.log(getPID(String($(this).attr("id").substring(3))));
            context.onDeselected(context, getPID(String($(this).attr("id").substring(3))));
        });
        $(buttonId).css("float", "left");
        $(buttonId).css("vertical-align", "middle");
        $(buttonId).css("cursor", "pointer");
        $(differentProducts[i]).append('<span style="visibility: hidden;">--</span>')
        
        $(buttonId).hover(
        function () {
            $(this).attr("src", "commons/Client/images/removeMouseOver.png");
        }, 
        function () {
            $(this).attr("src", "commons/Client/images/remove.png");
        });      
    }

//    alert(missingProducts);
//    this.addHover();
    
});

/*
//adds Shapes to the table headers
VariantComparer.method("addShapes", function(){
    Arow = $("#VariantComparer #unique #r0 .td_instance");
    for (var i=0; i<Arow.length; i++){
        if ($(Arow[i]).find(".svghead").length == 0)
            var text = $(Arow[i]).text()
        else 
            var text  = $($(Arow[i]).find(".svghead text")[0]).text(); 
        var correspondingCell = $("#comparison #th0_" + text);
        $(Arow[i]).html('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svghead" height="22px" width="22px"><text text-anchor="middle" x="11px" y="16px" stroke="#ffffff" stroke-width="3px">' + text + '</text><text text-anchor="middle" x="11px" y="16px">' + text + '</text></svg>')
        $(correspondingCell).find("circle").clone().prependTo($(Arow[i]).find(".svghead"));
        $(correspondingCell).find("rect").clone().prependTo($(Arow[i]).find(".svghead"));
        $(correspondingCell).find("polygon").clone().prependTo($(Arow[i]).find(".svghead"));
    }
});
*/
//saves all selected instances and downloads them to client
VariantComparer.method("saveSelected", function(){
    var selection = this.settings.getSelection(this);
    var instances = this.settings.getPreviousData(this).Unparsed;
    var parser = new InstanceParser(instances);
    var data = "";
    for (var i=0; i < selection.length; i++){
        data += parser.getInstanceData(selection[i]);
    }
    $("#saveData").val(data);
    $("#SaveForm").submit();
});

/*
//adds hover effects and hottracking to table headers. Essentially the same as comparison table addHover function
VariantComparer.method("addHover", function(){
    that = this;
    this.interval = null;
    this.timeout = null;
    $("#unique #r0 .td_instance").hover( 
        function () {
        $(this).css("background", "#ffffcc");
        var instance = $(this).find(".svghead :last-child").text();

        //get crosshairs 
        var hairs = that.host.findModule("mdFeatureQualityMatrix").getCrosshairs($("#" + getPID(instance) + "c").attr("cx"), $("#" + getPID(instance) + "c").attr("cy"));
        $("#" + getPID(instance) + "c").before(hairs);
        $("#CHX").attr("class", instance + "HL");
        $("#CHY").attr("class", instance + "HL");

        var highlight = $("#" + getPID(instance) + "c").clone();
        highlight = that.host.findModule("mdFeatureQualityMatrix").highlight(highlight);
        $(highlight).removeAttr("id");
        $(highlight).attr("class", instance + "HL");
        //add highlight element behind circle
        $("#" + getPID(instance) + "c").before(highlight);

        var highlight = $("#" + getPID(instance) + "r").clone();
        highlight = that.host.findModule("mdFeatureQualityMatrix").highlight(highlight);
        $(highlight).removeAttr("id");
        $(highlight).attr("class", instance + "HL");
        //add highlight element behind circle
        $("#" + getPID(instance) + "r").before(highlight);

        var highlight = $("#" + getPID(instance) + "h").clone();
        highlight = that.host.findModule("mdFeatureQualityMatrix").highlight(highlight);
        $(highlight).removeAttr("id");
        $(highlight).attr("class", instance + "HL");
        //add highlight element behind circle
        $("#" + getPID(instance) + "h").before(highlight);

        var myBool = true;
        that.timeout = setTimeout(function(){
            that.interval = setInterval(function(){
                if (myBool){
                    $("." + instance + "HL").hide(500);
                    myBool = false;
                } else {
                    $("." + instance + "HL").show(500);
                    myBool = true;
                }
            }, 500);
        }, 1500);
    }, 

    function () {
        $(this).css("background", "");
        var instance = $(this).find(".svghead :last-child").text();
        $("." + instance + "HL").remove();
        clearInterval(that.interval);
        clearTimeout(that.timeout);
    });
});
*/