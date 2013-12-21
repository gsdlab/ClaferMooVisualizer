

//  Adds hot-tracking and highlighting for table and graph
FeatureQualityMatrix.method("addHovering", function()
{   
    var that = this;
    this.interval = null;
    this.timeout = null;
    $("#comparison #tBody tr").hover(
      function () {
        $('#comparison table tr:gt(0)').css("color", this.fadeColor);
        $('#comparison table tr:gt(0) img').css("opacity", this.fadeOpacity);
        
        $(this).css("color", this.normalColor);
        $(this).find("img").css("opacity", this.normalOpacity);

        $(this).css("background", "#ffffcc");
      }, 
      function () {
        $('#comparison table tr:gt(0)').css("color", this.normalColor);
        $('#comparison table tr:gt(0) img').css("opacity", this.normalOpacity);
        $(this).css("background", "");
      }
    );

    $("#comparison #r0 .td_instance").hover(
      function () {
        $(this).css("background", "#ffffcc");
        var instance = $(this).attr("id").substring(4);

        //get crosshairs 
        var hairs = that.getCrosshairs($("#" + getPID(instance) + "c").attr("cx"), $("#" + getPID(instance) + "c").attr("cy"));
        $("#" + getPID(instance) + "c").before(hairs);
        $("#CHX").attr("class", instance + "HL");
        $("#CHY").attr("class", instance + "HL");

        //create circle highlight
        var highlight = $("#" + getPID(instance) + "c").clone();
        highlight = that.highlight(highlight);
        $(highlight).removeAttr("id");
        $(highlight).attr("class", instance + "HL");
        //add highlight element behind circle
        $("#" + getPID(instance) + "c").before(highlight);

        //check and create square highlight if needed (note: if rectangle does not exist this does nothing)
        var highlight = $("#" + getPID(instance) + "r").clone();
        highlight = that.highlight(highlight);
        $(highlight).removeAttr("id");
        $(highlight).attr("class", instance + "HL");
        //add highlight element behind circle
        $("#" + getPID(instance) + "r").before(highlight);

        //check and create octagonal highlight if needed (note: if Octagon does not exist this does nothing)
        var highlight = $("#" + getPID(instance) + "h").clone();
        highlight = that.highlight(highlight);
        $(highlight).removeAttr("id");
        $(highlight).attr("class", instance + "HL");
        //add highlight element behind circle
        $("#" + getPID(instance) + "h").before(highlight);

        //Add strobing of highlights and crosshairs (starts after 1.5 seconds)
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
      //mouseour function removes all highlights/crosshairs and ends all relevant timers
      //note: includes timeout function in case user mouses out before the 1.5 seconds is up
      function () {
        $(this).css("background", "");
        var instance = $(this).attr("id").substring(4);
        $("." + instance + "HL").remove();
        that.interval = clearInterval(that.interval);
        that.timeout = clearTimeout(that.timeout);
      }
    );

});


//adds proper shapes and svg fields to the headers in the comparison table
FeatureQualityMatrix.method("addShapes", function(){
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



//sets a shape to be rendered as a highlight
FeatureQualityMatrix.method("highlight", function(obj){
    $(obj).attr("filter", "url(#blur)");
    $(obj).attr("stroke-width", "6");
    $(obj).attr("stroke", "yellow");
    return obj;
});



//return an svg octagon of 2r diameter centered at (x,y)
FeatureQualityMatrix.method("getSVGOctagon", function(x, y, r){
    var NS="http://www.w3.org/2000/svg";
    var oct= document.createElementNS(NS,"polygon");
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
FeatureQualityMatrix.method("getSVGSquare", function(cx, cy, r){
    var NS="http://www.w3.org/2000/svg";
    var rect= document.createElementNS(NS,"rect");
    rect.setAttributeNS(null, "height",r*2);
    rect.setAttributeNS(null, "width",r*2);
    rect.setAttributeNS(null, "x",cx-r);
    rect.setAttributeNS(null, "y",cy-r);
    return rect;
});


//returns crosshairs for the graph that intersect at coordinates (x,y)
FeatureQualityMatrix.method("getCrosshairs", function(x, y){
    var NS="http://www.w3.org/2000/svg";
    var crossX = document.createElementNS(NS,"line");
    crossX.setAttribute("x1", "0");
    crossX.setAttribute("x2", "1000");
    crossX.setAttribute("y1", y);
    crossX.setAttribute("y2", y);
    crossX.setAttribute("id", "CHX")
    //crossX.setAttribute("filter", "url(#blur)");
    crossX.setAttribute("stroke", "yellow");
    crossX.setAttribute("stroke-width", "2");

    var crossY = document.createElementNS(NS,"line");
    crossY.setAttribute("y1", "0");
    crossY.setAttribute("y2", "1000");
    crossY.setAttribute("x1", x);
    crossY.setAttribute("x2", x);
    crossY.setAttribute("id", "CHY")
    crossY.setAttribute("stroke", "yellow");
    crossY.setAttribute("stroke-width", "2");

    return [crossX, crossY];
});



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


//adds hover effects and hottracking to table headers. Essentially the same as comparison table addHover function
VariantComparer.method("addHovering", function(){
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
