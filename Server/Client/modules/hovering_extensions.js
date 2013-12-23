

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

//sets a shape to be rendered as a highlight
FeatureQualityMatrix.method("highlight", function(obj){
    $(obj).attr("filter", "url(#blur)");
    $(obj).attr("stroke-width", "6");
    $(obj).attr("stroke", "yellow");
    return obj;
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
