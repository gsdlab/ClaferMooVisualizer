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

function Selector(host)
{
    this.host = host;
    this.selection = new Array(); // just to show the property
    this.clearSelection();
}

Selector.method("onSelected", function(pid){
    this.selection.push(pid);
    this.host.findModule("mdGraph").makePointsSelected(pid);
    var matrix = this.host.findModule("mdFeatureQualityMatrix");
    matrix.makePointsSelected(pid);

    this.host.findModule("mdVariantComparer").onSelectionChanged(this.selection, matrix.dataTable, matrix.permahidden);
    this.host.findModule("mdVariantComparer").addHovering();
});

Selector.method("onDeselected", function(pid)
{
    var selectedIndex = this.isSelected(pid);
    if (selectedIndex == false)
        return;
     
    this.selection[selectedIndex - 1] = null;
    
    this.selection = this.selection.filter(function(e){return e}); // remove empty elements

    this.host.findModule("mdGraph").makePointsDeselected(pid);           // update graph and comparison table

    var matrix = this.host.findModule("mdFeatureQualityMatrix");
    matrix.makePointsDeselected(pid);

    $("." + pid.substring(1) + "HL").remove();

    this.host.findModule("mdVariantComparer").onSelectionChanged(this.selection, matrix.dataTable, matrix.permahidden);
    this.host.findModule("mdVariantComparer").addHovering();
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
