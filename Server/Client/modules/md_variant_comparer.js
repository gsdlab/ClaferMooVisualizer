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
    this.colWidth = "200";
    
    this.dataTable = null;
    this.unparsedInstances = null;
    this.host.loaded();
}

VariantComparer.method("onDataLoaded", function(data){
    this.unparsedInstances = data.unparsedInstances;
    this.data = data;
});

VariantComparer.method("onRendered", function()
{

});

VariantComparer.method("getContent", function()
{
//    var content = '<div id="VariantComparer">';
    
//    content += '<div id="completeness"></div><br/>';
    content = '<div id="common" class="comparison">Select variants for comparison</div><br/>';
    content += '<div id="diff" class="comparison"></div>';
    
//    content += '</div>';
    
    return content;
});

VariantComparer.method("getInitContent", function()
{
	return '';  
});

//rebuilds the table with the new selection data
VariantComparer.method("onSelectionChanged", function(list, permaHidden){
    //pulls data from the comparison table
    var ids = [];
    for (var i = 0; i < list.length; i++){
        ids.push(+parsePID(list[i]));
    }   

    var selectedData = this.data.subsetByInstanceIds(ids);

    if (selectedData.instanceCount <= 1)
    {
        $("#mdVariantComparer #common").html("Select more than one variant for comparison");
        $("#mdVariantComparer #diff").html("Select more than one variant for comparison");    
        return;
    }

//    var allFeatures = data.features;

/*    
    // get the products that are missing to make up the complete set.
    var missingProducts = originalData.getMissingProductsInCommonData(data.getCommon(false), newlist);

    var i = 0;
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
                var addButton = '<button id="addMissing">Include</button>';
                label += "" + addButton + " variants [" + missingProducts.toString() + "]";
            }
            else
            {
                var addButton = '<button id="addMissing">Include</button>';
                label += "" + addButton + " " + missingProducts.length + " more variants";
            }
            
        }
        else
        {
            label += '[No include suggestions]';
        }
    }
    else
        label += "[No include suggestions]";

    var saveButton = ' <input type="button" id="saveSelected" value="Save Selected" disabled="disabled">' + '<form id="SaveForm" action="/saveinstances" method="post" enctype="multipart/form-data">' + '<input type="hidden" name="data" id="saveData" value=""/>' + '<input type="hidden" name="windowKey" value="' + this.host.key + '"/>' + '</form>';
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
*/
//    commonData.products[0] = label;
    
    $("#mdVariantComparer #common").html("");
    $("#mdVariantComparer #diff").html("");    
    var dataSets = selectedData.getCommonAndDifferent();
    console.log(dataSets);

    this.commonVisualizer = new TableVisualizer("common", {
        sorting: true,
        collapsing: true
    }, {
    });

    this.diffVisualizer = new TableVisualizer("diff", {
        sorting: true,
        buttonsForRemoval: true,
        collapsing: true
    }, {

    });

    this.commonVisualizer.refresh(dataSets["common"]);
    this.diffVisualizer.refresh(dataSets["diff"]);

//    this.settings.onHTMLChanged(this);

/*
// add buttons to remove products
    var i;
    var differentProducts = $("#unique #r0").find(".td_instance");
    for (i=0; i<$(differentProducts).length; i++){
        $(differentProducts[i]).prepend('<image id="rem' + $(differentProducts[i]).find(".svghead :last-child").text() + '" src="commons/Client/images/remove.png" alt="remove">')
        var buttonId = "#rem" + $(differentProducts[i]).find(".svghead :last-child").text()
        $(buttonId).click(function(){
//            console.log(getPID(String($(this).attr("id").substring(3))));
            context.settings.onDeselected(context, getPID(String($(this).attr("id").substring(3))));
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
*/
//  adding tooltips

    $("#mdVariantComparer [title]").tipsy({delayIn: 2000, delayOut: 500, fade: true, gravity: 'e', html: true});

});

//saves all selected instances and downloads them to client
VariantComparer.method("saveSelected", function(){
    var selection = this.settings.getSelection(this);
    var instances = this.unparsedInstances;
    var parser = new InstanceConverter(instances);
    var data = "";
    for (var i=0; i < selection.length; i++){
        data += parser.getInstanceData(parsePID(selection[i])) + "\n";
    }
    $("#saveData").val(data);
    $("#SaveForm").submit();
});

