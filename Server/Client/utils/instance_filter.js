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
//filtering functions for table and graph
function InstanceFilter (host){
    this.host = host
    this.hidden = [];
    this.permaHidden = {};
//    this.originalPoints = host.storage.originalPoints;
    this.closedFeatures = [];
}

InstanceFilter.method("argsToArray", function(argString){
    return argString.split("-");
});

//Clears then reapplies all active filters
InstanceFilter.method("filterContent", function(){

//    console.log("filter");
    this.unFilter();

// loop to go through each element
    this.host.findModule("mdGraph").addIds();
    var goalsModule = this.host.findModule("mdGoals");
    var x;
    i=0;
    row = $("#mdFeatureQualityMatrix #r" + i);
    row_length = row.find(".td_instance").length;
    while (row.length != 0)
    {
        //filtering by features
        if (!row.find(".numeric").length){
            var filter = $(row).attr("FilterStatus"); //pull filter type from the row attribute
            for (var x = 1; x <= row_length; x++){
                var cell = $("#mdFeatureQualityMatrix #td" + (i-1) + "_" + x); // potentially optimize this

                if (filter == "none") //filter nothing for this row
                    break;
                else if (filter == "require" && $(cell).hasClass("no")) { //filter out column and bubble
                    this.hideInstance(x);
                } else if (filter == "exclude" && $(cell).hasClass("tick")) { //filter out column and bubble
                    this.hideInstance(x);
                }
            }
        }

        //filtering by goals is done separately, because typically there are more quality attributes than goals

        //increment row
        i++;
        row = $("#mdFeatureQualityMatrix #r" + i);
    }

    // filtering by goals

    var matrixModule = this.host.findModule("mdFeatureQualityMatrix");

    for (var i = 0; i < goalsModule.ranges.length; i++)
    {
        var filter = goalsModule.ranges[i];
        for (x=1; x<= row_length; x++)
        {
            var value = matrixModule.instanceProcessor.getFeatureValue(x, this.argsToArray(filter.goal), "int");
            var min = parseInt(filter.min);
            var max = parseInt(filter.max);
            if (min > value || max < value)
                this.hideInstance(x);
        }
    }

    //close features
    for(i=0; i<this.closedFeatures.length; i++){
        this.closeFeature(this.closedFeatures[i]);
    }

    //filtering by permaHidden

    for (var instance in this.permaHidden){
        if (this.permaHidden.hasOwnProperty(instance))
            this.hideInstance(instance.substring(1));
    }

    //fire the scroll handler to align table
    $('#mdFeatureQualityMatrix .window-content').scroll();
//    this.host.findModule("mdParallelCoordinates").chart.filter();
    this.host.findModule("mdFeatureQualityMatrix").resize();

});

//hides an instance on both the table and the graph
InstanceFilter.method("hideInstance", function(x){

// Get graph bubble html locations
    var circle_pairs = [];
    for (var i=1; i<=$("#chart circle").length; i++){
        circle_pairs.push({circle: $("#" + getPID(i) + "c"), text_data: $("#" + getPID(i) + "t"), ident: i});
    }

    //hide table header (row 0)
//    $("#mdFeatureQualityMatrix #th0_" + x).hide();
//    this.hidden.push("#mdFeatureQualityMatrix #th0_" + x);

    //hide graph bubble
    $(circle_pairs[x-1].circle).hide();
    $(circle_pairs[x-1].text_data).hide();
    this.hidden.push(circle_pairs[x-1].text_data);
    this.hidden.push(circle_pairs[x-1].circle);
    //hide whole column
/*
    var y = 1;
    var row_with_removal = $("#mdFeatureQualityMatrix #r" + y);
    while (row_with_removal.length != 0){
        $("#mdFeatureQualityMatrix #td"+ (y-1) +"_" + x).hide();
        this.hidden.push("#mdFeatureQualityMatrix #td"+ (y-1) +"_" + x);
        y++;
        row_with_removal = $("#mdFeatureQualityMatrix #r" + y);
    }
*/
    var rows = $("#mdFeatureQualityMatrix tr");

    for (var i=0; i < rows.length;i++){
        $($(rows[i]).children()[x]).hide();
        this.hidden.push($($(rows[i]).children()[x]));
    }

});

//unhides everything in the hidden stack (all things that have been filtered out) (note! does not include permahidden elements)
InstanceFilter.method("unFilter", function(){
	var circle_pairs = [];
    for (var i=1; i<=$("#chart circle").length; i++){
        circle_pairs.push({circle: $("#" + getPID(i) + "c"), text_data: $("#" + getPID(i) + "t"), ident: i});
    }
    while(this.hidden.length){
        $(this.hidden.pop()).show();
    }
    for (i = this.host.storage.evolutionController.existingInstancesCount; i<circle_pairs.length;i++){
    	$(circle_pairs[i].circle).hide();
    }
});


InstanceFilter.method("onFilteredByRange", function(caller, dim, start, end)
{
//    console.log("onFilteredByRange");
    var goalsModule = this.host.findModule("mdGoals");
    var parCoordsModule = this.host.findModule("mdParallelCoordinates");

    for (var x = 0; x < goalsModule.ranges.length; x++)
    {
        if (dim == goalsModule.ranges[x].goal)
        {
            goalsModule.ranges[x].min = start;
            goalsModule.ranges[x].max = end;


            if (start == parseInt($("#" + dim + "min").attr("placeholder")))
                $("#" + dim + "min").val("");
            else
                $("#" + dim + "min").val(start);

            if (end == parseInt($("#" + dim + "max").attr("placeholder")))
                $("#" + dim + "max").val("");
            else
                $("#" + dim + "max").val(end);

            this.host.findModule("mdParallelCoordinates").chart.setRange(dim, start, end);

            break;

        }
    }

    this.filterContent();
    if (caller != parCoordsModule)
    {
        parCoordsModule.chart.filter();
    }

});


