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

function EvolutionController(host)
{
    this.host = host;
    this.existingInstancesCount = 0;
    this.existingData = null;
}

// Make instances squares or octagons
EvolutionController.method("assignProperShapesToGraph", function(){
    var originalPoints = this.existingInstancesCount;
// Get graph bubble html locations
    originalCirclePairs = [];
    for (var i=1; i<=originalPoints; i++){
        originalCirclePairs.push({circle: $("#" + getPID(i) + "c"), text_data: $("#" + getPID(i) + "t"), ident: i});
    }

    var circle_pairs = [];
    for (var i=(originalPoints + 1); i<=$("#chart circle").length; i++){
        circle_pairs.push({circle: $("#" + getPID(i) + "c"), text_data: $("#" + getPID(i) + "t"), ident: i});
    }
    //hide table header (row 0)
    while (circle_pairs.length != 0){
        circlePair = circle_pairs.pop();
        var r = $(circlePair.circle).attr("r");
        var xpos = $(circlePair.circle).attr("cx");
        var ypos = $(circlePair.circle).attr("cy");
        var fill = $(circlePair.circle).attr("fill");
        var id = getPID($(circlePair.circle).attr("id").replace(/[A-Za-z]/g, "")) + "r"
        var NS="http://www.w3.org/2000/svg";
        var IdenticalId = this.getIdenticalID($(circlePair.circle).attr("id").replace(/[A-Za-z]/g, ""), originalPoints) - 1;
        if (IdenticalId != -1){
            var shape = this.getSVGOctagon(xpos, ypos, r);
            var newID = getPID($(circlePair.circle).attr("id").replace(/[A-Za-z]/g, "")) + "h";
            shape.setAttributeNS(null, "id", newID);
            $(originalCirclePairs[IdenticalId].circle).hide();
            $(originalCirclePairs[IdenticalId].text_data).hide();

            host.storage.instanceFilter.permaHidden[getPID((IdenticalId+1))] = true;                   
        } else {
            var shape = this.getSVGSquare(xpos, ypos, r)
            shape.setAttributeNS(null, "id", getPID($(circlePair.circle).attr("id").replace(/[A-Za-z]/g, "")) + "r");
        }
        shape.setAttributeNS(null, "stroke","#000000");
        shape.setAttributeNS(null, "stroke-width","1");
        shape.setAttributeNS(null, "fill-opacity","0.8");
        shape.style.fill=fill;
        $(circlePair.text_data).prepend(shape);
        $(circlePair.circle).hide();
    }
});


//return an svg octagon of 2r diameter centered at (x,y)
EvolutionController.method("getSVGOctagon", function(x, y, r){
    var NS="http://www.w3.org/2000/svg";
    var oct= document.createElementNS(NS,"polygon");
    oct.setAttributeNS(null, "class", "octagon");    
    x = Number(x);
    y = Number(y);
    r = Number(r);
    var xcoords = [x-(r/3), x+(r/3), x+r, x-r]
    var ycoords = [y-(r/3), y+(r/3), y+r, y-r];
    var points = (xcoords[0])+","+(ycoords[3])+" ";
    points += (xcoords[1])+","+(ycoords[3]) + " ";
    points += (xcoords[2])+","+(ycoords[0]) + " ";
    points += (xcoords[2])+","+(ycoords[1]) + " ";
    points += (xcoords[1])+","+(ycoords[2]) + " ";
    points += (xcoords[0])+","+(ycoords[2]) + " ";
    points += (xcoords[3])+","+(ycoords[1]) + " ";
    points += (xcoords[3])+","+(ycoords[0]);
    oct.setAttributeNS(null, "points", points);
    return oct;
});

//returns an svg square of width 2r centered at (x,y)
EvolutionController.method("getSVGSquare", function(cx, cy, r){
    var NS="http://www.w3.org/2000/svg";
    var rect= document.createElementNS(NS,"rect");
    rect.setAttributeNS(null, "class", "square");    
    rect.setAttributeNS(null, "height",r*2);
    rect.setAttributeNS(null, "width",r*2);
    rect.setAttributeNS(null, "x",cx-r);
    rect.setAttributeNS(null, "y",cy-r);
    return rect;
});


//returns the id of the first identical point that is a circle.
EvolutionController.method("getIdenticalID", function(id, upperBound){
    var goals = this.host.findModule("mdGoals").goals;
    if (id>upperBound){
        var values={};
        for (var i=0; i<goals.length; i++){
            values[goals[i].arg] = this.host.findModule("mdGraph").instanceProcessor.getFeatureValue(id, goals[i].arg, true);
        }
        for (i=1; i<=upperBound; i++){
            var isOptimal = true;
            for (j=0; j<goals.length; j++){
                var check =  this.host.findModule("mdGraph").instanceProcessor.getFeatureValue(i, goals[j].arg, true);
                if (check != values[goals[j].arg]){
                    isOptimal = false;
                    break;
                }
            }
            if (isOptimal)
                return i;
        }
        return 0;
    }
});

//adds proper shapes and svg fields to the headers in the comparison table
EvolutionController.method("assignProperShapesToMatrix", function(){
    var that = this;
    $("#comparison #r0 .td_instance").each(function(){
        //remove and previously added shapes
        $(this).find("circle").remove();
        $(this).find("rect").remove();
        $(this).find("polygon").remove();

        if ($(this).find(".svghead").length == 0)
            var text = $(this).text();
        else 
            var text  = $($(this).find(".svghead text")[0]).text(); 

// This will get any hidden circles and then put the new shape on top
//clone corresponding circle, modify for table, and prepend.
        $(this).html('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svghead" height="22px" width="22px"><text text-anchor="middle" x="11px" y="16px" stroke="#ffffff" stroke-width="3px">' + text + '</text><text text-anchor="middle" x="11px" y="16px">' + text + '</text></svg>');

        if ($("#" + getPID(text) + "c").length == 1)
        {
            $("#" + getPID(text) + "c").clone();
            var thisCircle = $("#" + getPID(text) + "c").clone();
            $(thisCircle).removeAttr("id");
            //if it's ever needed to swich back to colored versions remove this line
            $(thisCircle).css("fill", "white");
            $(thisCircle).attr("cx", "11px");
            $(thisCircle).attr("cy", "11px");
            $(thisCircle).attr("r", "10px");
            $(thisCircle).prependTo($(this).find(".svghead"));
        }

//clone corresponding square (if it exists), modify for table, and prepend over the hidden circle
        if ($("#" + getPID(text) + "r").length == 1){
            $("#" + getPID(text) + "r").clone().prependTo($(this).find(".svghead"));
            var thisRect = $(this).find("rect");
            $(thisRect).removeAttr("id");
            //if it's ever needed to swich back to colored versions remove vv this vv line
            $(thisRect).css("fill", "white");
            $(thisRect).attr("x", "1px");
            $(thisRect).attr("y", "1px");
            $(thisRect).attr("width", "20px");
            $(thisRect).attr("height", "20px");
//If hexagon exists, get a new one (note that this one is from scratch) modify for table, and prepend over the hidden circle
//made from scratch because the points of the hexagon are not relative to center like the others
        } else if ($("#" + getPID(text) + "h").length == 1){
            var fill = $("#" + getPID(text) + "h").css("fill");
                var thisOct = that.getSVGOctagon(10, 11, 10);
            //if it's ever needed to swich back to colored versions change "white" to fill
            $(thisOct).css("fill", "white");
            $(thisOct).attr("stroke-width", "1");
            $(thisOct).attr("stroke", "#000000");
            $(thisOct).prependTo($(this).find(".svghead"));
        } 

    });
});

//adds Shapes to the table headers
EvolutionController.method("assignProperShapesToVariantComparer", function(){
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
