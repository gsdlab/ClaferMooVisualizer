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

function ClaferModel(host)
{ 
    this.id = "mdClaferModel";
    this.title = "Clafer Source Model";
    
    this.width = 500;
    this.height = 58;
    this.posx = 500;
    this.posy = 0;
    this.iframeType = true;
    this.ajaxUrl = "/htmlwrapper";
    
    this.host = host;
    this.goals = null;
    this.model = "";
}

ClaferModel.method("onDataLoaded", function(data){
});

ClaferModel.method("onRendered", function()
{
});

ClaferModel.method("onDocLoad", function(){
    if (this.model != "")
    {
        var iframe = $("#model")[0];

        if (iframe.contentWindow)
            iframe.contentWindow.document.write(this.model);
        else
            iframe.document.write(this.model);
    }
});

ClaferModel.method("onInitRendered", function()
{
    $("#model")[0].onload = this.onDocLoad.bind(this);
});

