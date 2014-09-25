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
function InstanceFilter (host, data){
    this.host = host;
    this.clear();
}

InstanceFilter.method("clear", function(){
    this.data = null;
    this.qualityRanges = {};
    this.triggeredDecisions = {};
    this.filteredValues = {};
});

InstanceFilter.method("onDataLoaded", function(data){
    this.clear();
    this.data = data;
    this.computeQualityRanges();
});

InstanceFilter.method("computeQualityRanges", function(){
    
    this.qualityRanges = {};

    for(var objective in this.data.objectives)
    {
        this.qualityRanges[objective] = {"min" : this.data.objectives[objective].minValue, "max" : this.data.objectives[objective].maxValue};        
    }

});

InstanceFilter.method("isNegativeValue", function(v){
    return (v == "-" || v == "none");
});

InstanceFilter.method("filterAllInstances", function(){

    this.instanceMatch = this.data.instanceCount;
    for (var i = 0; i < this.data.instanceCount; i++)
    {
        var found = false;
        for (var fid = 0; fid < this.data.fields.length; fid++)
        {
            var f = this.data.fields[fid];
            if (this.qualityRanges[f.path]) // if the field is in our range set
            {
                if (this.qualityRanges[f.path].min > this.data.matrix[i][f.path] || this.qualityRanges[f.path].max < this.data.matrix[i][f.path])
                {
                    found = true;
                    this.data.matrix[i]["_hidden"] = true;
                    this.instanceMatch = this.instanceMatch - 1;
                    break;
                }
            }
            else if (this.triggeredDecisions[f.path] !== null && this.triggeredDecisions[f.path] !== undefined) // else, if a decision on it is made
            {
                if (
                    (this.triggeredDecisions[f.path] === true && this.isNegativeValue(this.data.matrix[i][f.path]))
                    ||
                    (this.triggeredDecisions[f.path] === false && !this.isNegativeValue(this.data.matrix[i][f.path]))
                )
                {
                    found = true;
                    this.data.matrix[i]["_hidden"] = true;
                    this.instanceMatch = this.instanceMatch - 1;
                    break;
                }
            } else if (this.filteredValues[f.path] !== null && this.filteredValues[f.path] !== undefined && this.filteredValues[f.path] !== ""){

                    var query = this.filteredValues[f.path].split(';'), 
                        isFound = false; // if any concurrence is found;

                    for (var qid = 0; qid < query.length; qid++) {
                       isFound = isFound || (this.data.matrix[i][f.path].search(query[qid].trim()) !== -1);                   
                };
                

                if(!isFound){
                   found = true;
                   this.data.matrix[i]["_hidden"] = true;
                   this.instanceMatch = this.instanceMatch - 1; 
                }

                
                

                break;
            }


        }
        if (!found)
        {
            this.data.matrix[i]["_hidden"] = false;            
        }
    }

});

InstanceFilter.method("filterByFeature", function(caller, f, value)
{
    if (value == 0)
        this.triggeredDecisions[f] = null;
    else
        this.triggeredDecisions[f] = (value > 0) ? true : false;

    this.filterAllInstances();
    this.notify();
});

InstanceFilter.method("filterByValue", function(caller, field, value)
{
    this.filteredValues[field] = value;

    this.filterAllInstances();
    this.notify();
});

InstanceFilter.method("notify", function()
{
    this.data._qualityRanges = this.qualityRanges;
    this.data._triggeredDecisions = this.triggeredDecisions;
    this.data.instanceMatch = this.instanceMatch;

    this.host.findModule("mdGoals").onFiltered(this.data);
    this.host.findModule("mdGraph").onFiltered(this.data);
    this.host.findModule("mdParallelCoordinates").onFiltered(this.data);
    this.host.findModule("mdFeatureQualityMatrix").onFiltered(this.data);
});

InstanceFilter.method("filterByQuality", function(caller, dim, start, end)
{
    this.qualityRanges[dim].min = +start;
    this.qualityRanges[dim].max = +end;

    this.filterAllInstances();
    this.notify();
});


