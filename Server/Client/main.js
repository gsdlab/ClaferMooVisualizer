//var mdComparisonTable;
//var mdGoals;
//var mdGraph;
//var mdConsole;
//var mdInput;

var host;

google.load("visualization", "1", {packages:["corechart"]});


$(document).ready(function()
{
    
    var modules = Array();
    
    modules.push("Goals");
    modules.push("Graph");
    modules.push("Console");
    modules.push("Input");
//    modules.push("UseCases");
    modules.push("Analysis");
    modules.push("ComparisonTable");
    
    host = new Host(modules);
});

function Host(modules)
{
    this.selector = new Selector(this);
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
        
        var x = $.newWindow({
            id: this.modules[i].id,
            title: this.modules[i].title,
            width: this.modules[i].width,
            height: this.modules[i].height,
            posx: this.modules[i].posx,
            posy: this.modules[i].posy,
            content: '',
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

        if (this.modules[i].onInitRendered)
            this.modules[i].onInitRendered();        

        var helpButton = this.getHelpButton(this.modules[i].title);
        $("#" + this.modules[i].id + " .window-titleBar").append(helpButton);   
    }
    
    var displayHelp=getCookie("startHelp")
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
    if (data.error == true)
    {
        for (var i = 0; i < this.modules.length; i++)
        {
            if (this.modules[i].onError)
                this.modules[i].onError(data.output);
        }
        
        return;
    }

    this.selector.clearSelection();

    for (var i = 0; i < this.modules.length; i++)
    {
        if (this.modules[i].onDataLoaded)
            this.modules[i].onDataLoaded(data);
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
    
});

Host.method("getHelp", function(moduleName){
    this.helpGetter.getHelp(moduleName);
});

Host.method("getHelpButton", function(moduleName){
    return this.helpGetter.getHelpButton(moduleName);
});
