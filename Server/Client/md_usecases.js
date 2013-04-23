/*
Copyright (C) 2012 Alexander Murashkin <http://gsd.uwaterloo.ca>

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

function UseCases(host)
{
    this.id = "mdUseCases";
    this.title = "User Stories";

    this.width = 1000;
    this.height = 130;
    this.posx = 0;
    this.posy = 545;
    
    this.host = host;
}

UseCases.method("onDataLoaded", function(data){
});

UseCases.method("onRendered", function()
{
});

UseCases.method("getContent", function()
{
    var st = "";
st = st + "As a product line engineer:<ol>";
st = st + "<li>How do I view all N optimal product configurations?</li>";
st = st + "<li>How do I see differences among all N products?</li>";
st = st + "<li>How do I choose only K products out of N cutting off the products with less significant, in my opinion, features?</li>";
st = st + "<li>How do I see the correlation between two metrics (e.g. energy significantly influences performance)?</li>";
st = st + "<li>How can I group together the products with similar features?</li></ol>";

    return st;
});

UseCases.method("getInitContent", function()
{
	return this.getContent();
});
