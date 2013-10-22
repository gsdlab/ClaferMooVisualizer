/*
Copyright (C) 2012, 2013 Alexander Murashkin, Neil Redman <http://gsd.uwaterloo.ca>

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
//var mdComparisonTable;
//var mdGoals;
//var mdGraph;
//var mdConsole;
//var mdInput;

var host = null;

google.load("visualization", "1", {packages:["corechart"]});


$(document).ready(function()
{
    var modules = Array();
    
    modules.push("Input");
    modules.push("Goals");
//    modules.push("Console");
//    modules.push("UseCases");
    modules.push("ComparisonTable");
    modules.push("Graph");
    modules.push("Analysis");
    modules.push("ClaferModel");
    
    host = new Host(modules);
});

function Host(modules)
{
    this.key = Math.floor(Math.random()*1000000000).toString(16);
    this.selector = new Selector(this);
    this.instanceCounterArg = "?special_counter?"; 
    this.instanceCounterLabel = "#instance"
    this.modules = new Array();
    this.helpGetter = new helpGetter(this);
    
    for (var i = 0; i < modules.length; i++)
    {
        var MyClass = stringToFunction(modules[i]);        
        var instance = new MyClass(this);
        
        this.modules.push(instance);
    }    

    for (var i = 0; i < this.modules.length; i++)
    {
        var resize = null;
        
        if (this.modules[i].resize)
        {
            resize = this.modules[i].resize;
        }

        var windowType = "normal";
        
        if (this.modules[i].iframeType)
        {
            windowType = "iframe";
        }
        
        var x = $.newWindow({
            id: this.modules[i].id,
            title: this.modules[i].title,
            width: this.modules[i].width,
            height: this.modules[i].height,
            posx: this.modules[i].posx,
            posy: this.modules[i].posy,
            content: '',
            type: windowType,
            onDragBegin : null,
            onDragEnd : null,
            onResizeBegin : null,
            onResizeEnd : resize,
            onAjaxContentLoaded : null,
            statusBar: true,
            minimizeButton: true,
            maximizeButton: true,
            closeButton: false,
            draggable: true,
            resizeable: true
        });    
    
        if (this.modules[i].getInitContent)
            $.updateWindowContent(this.modules[i].id, this.modules[i].getInitContent());

        if (this.modules[i].iframeType)
        {
            $.updateWindowContent(this.modules[i].id, '<iframe id="model" src="' + this.modules[i].ajaxUrl + '" frameborder="0" width="' + this.modules[i].width + '"></iframe>');
        }
            
        if (this.modules[i].onInitRendered)
            this.modules[i].onInitRendered();        

        var helpButton = this.getHelpButton(this.modules[i].title);
        $("#" + this.modules[i].id + " .window-titleBar").append(helpButton);   
    }
    
    var displayHelp=getCookie("startHelpMooViz")
    if(displayHelp==null){
        $("body").prepend(this.helpGetter.getInitial());
        this.helpGetter.setListeners();
    }else{
        $("body").prepend(this.helpGetter.getInitial());
        this.helpGetter.setListeners();
        $("#help").hide();
        $(".fadeOverlay").hide();
    }
//    $.minimizeWindow("mdGoals");
//    $.minimizeWindow("mdComparisonTable");    
}

//returns the module object. useful for modifying or getting data from other modules.
Host.method("findModule", function(id)
{
    for (var i = 0; i < this.modules.length; i++)
    {
        if (this.modules[i].id == id)
            return this.modules[i];
    }
    
    return null;

});

//runs the "onSelectionChanged" function for each module. Called by the selector.
Host.method("selectionChanged", function(data)
{
    for (var i = 0; i < this.modules.length; i++)
    {
        if (this.modules[i].onSelectionChanged)
            this.modules[i].onSelectionChanged(data);
    }
    
});

//runs after data is uploaded from server. Causes all modules to update their data.
Host.method("updateData", function(data)
{
    if (data.error == true) // we do not process errors here anymore
    {
        return;
    }

    this.selector.clearSelection();

    for (var i = 0; i < this.modules.length; i++)
    {
        if (this.modules[i].onDataLoaded)
            this.modules[i].onDataLoaded(data);
    }
    
    if (typeof variable !== 'undefined' && console.log)
    {
        console.log(data.claferXML);
        console.log(data.instancesXML);
        console.log(data.output);
    }
    
    for (var i = 0; i < this.modules.length; i++)
    {
        if (this.modules[i].getContent)
            $.updateWindowContent(this.modules[i].id, this.modules[i].getContent());

        if (this.modules[i].onRendered)
            this.modules[i].onRendered();
            
        if (this.modules[i].resize)
            this.modules[i].resize();
                
    }
    
    $.placeholder.shim(); // fixes the placeholder issue in IE
    
});

Host.method("getHelp", function(moduleName){
    this.helpGetter.getHelp(moduleName);
});

Host.method("getHelpButton", function(moduleName){
    return this.helpGetter.getHelpButton(moduleName);
});
