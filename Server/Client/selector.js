function Selector(host)
{
    this.host = host;
    this.selection = new Array(); // just to show the property
    this.clearSelection();
}

Selector.method("onSelected", function(pid){
    this.selection.push(pid);
    this.host.selectionChanged(this.selection);
});

Selector.method("onDeselected", function(pid)
{
    var selectedIndex = this.isSelected(pid);
    if (selectedIndex == false)
        return;
     
    this.selection[selectedIndex - 1] = null;
    
    this.selection = this.selection.filter(function(e){return e}); // remove empty elements
    
    this.host.selectionChanged(this.selection);
});

Selector.method("isSelected", function(pid){
    for (var i = 0; i < this.selection.length; i++)
    {
        if (this.selection[i] == pid)
            return i + 1; // position
    }
    
    return false;
});

Selector.method("clearSelection", function()
{
    this.selection = new Array();
});

Selector.method("asString", function(){
    return this.selection.join(",");
});

