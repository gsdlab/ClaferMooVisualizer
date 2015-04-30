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

function getConfiguration() 
{
	var modules = [];
    var rightMargin = 25;
    modules.push({"name": "Input", "configuration": 
    	{
    		"layout": {
    			"width": (window.parent.innerWidth-rightMargin) * 0.38,
    			"height": 210,
    			"posx": 0,
    			"posy": 0
    		},

    		"title": "Input Clafer Model and Options",
    		"optimization_backend": true, 
            "input_default_cache": false,
            "input_default_optimizer_scope": true,            
            "input_default_optimizer_maxint": true,            
            "input_default_flags": "",
            "file_extensions": [
                {
                    "ext": ".cfr", 
                    "flag": "normal", 
                    "button_file_caption": "Optimize",
                    "button_example_caption": "Optimize",
                    "button_editor_caption": "Optimize",

                    "button_file_tooltip": "Optimize the selected file",
                    "button_example_tooltip": "Optimize the selected example",
                    "button_editor_tooltip": "Optimize the model specified in the editor"
                },
                {
                    "ext": ".cfr",
                    "flag": "no-optimize", 
                    "button_file_caption": "Upload",
                    "button_example_caption": "Upload",
                    "button_editor_caption": "Upload",

                    "button_file_tooltip": "Upload the selected file",
                    "button_example_tooltip": "Upload the selected example",
                    "button_editor_tooltip": "Upload the model specified in the editor"
                },                
                {
                    "ext": ".data", 
                    "button_file_caption": "Add Instances",
                    "button_example_caption": "Add Instances",
                    "button_editor_caption": "Add Instances",

                    "button_file_tooltip": "Add instances to already computed Pareto front",
                    "button_example_tooltip": "Add instances to already computed Pareto front",
                    "button_editor_tooltip": "Add instances to already computed Pareto front"
                }
            ],


            "onError": function(module, statusText, response, xhr)
            {
                return onError(module, statusText, response, xhr);
            },
    		"onBeginQuery": function(module){
                module.host.storage.claferXML = null; // we must erase old temporary data
                module.host.storage.claferJSON = null; // we must erase old temporary data
    			return true;
    		},

    		"onFileSent": function(module){
		        module.host.print("ClaferMooVisualizer> Processing the submitted model. Compiling...\n");
    		},

    		"onPoll" : function(module, responseObject){
		        if (responseObject.args)
		        {
		            module.host.print("ClaferMooVisualizer> clafer " + responseObject.args + "\n");
		        }

                if (responseObject.ig_args)
                {
                    module.host.print("ClaferMooVisualizer> " + responseObject.ig_args + "\n");
                }

		        if (responseObject.compiler_message)
		        {
		        	module.host.print("Compiler> " + responseObject.message + "\n");
		        	module.host.print(responseObject.compiler_message + "\n");    
		    	}

                

                if (responseObject.compiler_claferXML)
                {
                    module.host.print("Compiler> " + "Model's XML got successfully" + "\n");
                    module.host.storage.claferXML = responseObject.compiler_claferXML;
                }



                if (responseObject.compiler_claferJSON)
                {
                    module.host.print("Compiler> " + "Model's JSON got successfully" + "\n");
                    module.host.storage.claferJSON = responseObject.compiler_claferJSON;
                }

    		},
    		"onCompleted" : function(module, responseObject){    					        
		        if (responseObject.model != "")
		        {
		            module.editor.getSession().setValue(responseObject.model);
		        }

                if (responseObject.optimize || responseObject.optimizer_instances_only)
                {

                    if (!responseObject.optimizer_message)
                    {
                        return false;
                    }

    		        var data = preprocessMOOResult(responseObject, module.host);
                    if (!data)
                        return false;


                    module.host.print("ClaferMooVisualizer> " + responseObject.optimizer_message + "\n");

                    module.host.print("ClaferMooVisualizer> Updating the views... ");
                    module.host.storage.selector.clearSelection();
                    module.host.storage.instanceFilter.onDataLoaded(data);

    		        var goalsModule = module.host.findModule("mdGoals");
    		        var graphModule = module.host.findModule("mdGraph");
    		        var matrixModule = module.host.findModule("mdFeatureQualityMatrix");
                    var comparerModule = module.host.findModule("mdVariantComparer");
                    var spiderChartModule = module.host.findModule("mdSpiderChart");
                    var parallelCoordinatesChartModule = module.host.findModule("mdParallelCoordinates");

    				goalsModule.onDataLoaded(data);
                    graphModule.onDataLoaded(data);
                    matrixModule.onDataLoaded(data);
//                    setTimeout(function()
//                    {
                    comparerModule.onDataLoaded(data);
                    spiderChartModule.onDataLoaded(data);
                    parallelCoordinatesChartModule.onDataLoaded(data);

                    $.updateWindowContent(goalsModule.id, goalsModule.getContent());
                    $.updateWindowContent(graphModule.id, graphModule.getContent());
                    $.updateWindowContent(matrixModule.id, matrixModule.getContent());
                    $.updateWindowContent(comparerModule.id, comparerModule.getContent());
                    $.updateWindowContent(spiderChartModule.id, spiderChartModule.getContent());
                    $.updateWindowContent(parallelCoordinatesChartModule.id, parallelCoordinatesChartModule.getContent());

                    goalsModule.onRendered();
                    graphModule.onRendered();
                    matrixModule.onRendered();
                    comparerModule.onRendered();
                    parallelCoordinatesChartModule.onRendered();
                    spiderChartModule.onRendered();

                    module.host.print("ClaferMooVisualizer> done!\n");

//                    }, 1000);
                }
                else
                { 
                    var data = new Object();
                    data.error = false;
                    data.output = responseObject.message;
                    data.instancesXML = "";
                    data.claferXML = module.host.storage.claferXML;
                    data.claferJSON = module.host.storage.claferJSON;
                    data.unparsedInstances = ""; 

                    var instanceProcessor = new InstanceProcessor(data.instancesXML);
                    module.host.storage.evolutionController.existingInstancesCount = instanceProcessor.getInstanceCount();
                    module.host.storage.evolutionController.existingData = data;

                    module.host.print("ClaferMooVisualizer> " + "Model has been uploaded." + "\n");
                    module.host.print("ClaferMooVisualizer> " + "Now add instances by uploading .data files." + "\n");
                }

		        return true;  
    		}    		
    	}
	});

    modules.push({"name": "Goals", "configuration": 
        {
            "title": "Objectives and Quality Ranges",

            "layout": {

                "width": (window.parent.innerWidth - 20) * 0.33,
                "height": 90,
                "posx": (window.parent.innerWidth-rightMargin) * 0.67,
                "posy": 0
            },

            "onRangeFiltered" : function(module, dim, start, end)
            {
//                console.log("parCoords > onFilteredByRange");
                module.host.storage.instanceFilter.filterByQuality(module, dim, start, end);
            }

        }});


    modules.push({"name": "SpiderChart", "configuration": 
        {
            "title": "Spider Chart",

            "layout": {
                "width": (window.parent.innerWidth - 20) * 0.33,
                "height": 225,
                "posx": (window.parent.innerWidth-rightMargin) * 0.67,
                "posy": 120
            },
            "onMouseOver": function(module, pid)
            {
                module.host.storage.highlighter.onMouseOver(pid);               
            },
            "onMouseOut": function(module, pid)
            {
                module.host.storage.highlighter.onMouseOut(pid);               
            }

        }});

    modules.push({"name": "VariantComparer", "configuration": 
    	{
    		"layout": {

                "width": (window.parent.innerWidth-rightMargin) * 0.33,
                "height": window.parent.innerHeight - 470,
                "posx": (window.parent.innerWidth-rightMargin) * 0.67,
                "posy": 382
    		},

	    	"title": "Variant Comparer",
	    	"allow_downloading": true,

            "onSelected": function(module, pid)
            {
                module.host.storage.selector.onSelected(pid);               
            },
            "onDeselected": function(module, pid)
            {
                module.host.storage.selector.onDeselected(pid);             
            },
            "getSelection" : function(module)
            {
                return module.host.storage.selector.selection;              
            },
//            "onHTMLChanged": function (module){
//                module.host.storage.evolutionController.assignProperShapesToVariantComparer();
//            },
            "onMouseOver": function(module, pid)
            {
                module.host.storage.highlighter.onMouseOver(pid);               
            },
            "onMouseOut": function(module, pid)
            {
                module.host.storage.highlighter.onMouseOut(pid);               
            }            

    	}});

    modules.push({"name": "Output", "configuration": 
    	{
	    	"title": "Output",

            "layout": {
                "width": (window.parent.innerWidth-rightMargin) * 0.38,
                "height": 100,
                "posx": 0,
                "posy": 245
            }

    	}});

    modules.push({"name": "Graph", "configuration": 
        {
            "title": "Bubble Front Graph",

            "layout": {
                "width": (window.parent.innerWidth - 20) * 0.29,
                "height": 345,
                "posx": (window.parent.innerWidth-rightMargin) * 0.38,
                "posy": 0
            },

            "onDrop" : function(module)
            {
            },

            "onSelected": function(module, pid)
            {
                module.host.storage.selector.onSelected(pid);               
            },
            "onDeselected": function(module, pid)
            {
                module.host.storage.selector.onDeselected(pid);             
            },
            "onMouseOver" : function(module, pid)
            {
                module.host.storage.highlighter.onMouseOver(pid);                               
            },            
            "onMouseOut" : function(module, pid)
            {
                module.host.storage.highlighter.onMouseOut(pid);               
            }
        }});

    modules.push({"name": "ParallelCoordinates", "configuration": 
        {
            "title": "Parallel Coordinates Chart",

            "layout": {
                "width": (window.parent.innerWidth-rightMargin) * 0.67,
                "height": window.parent.innerHeight - 470,
                "posx": 0,
                "posy": 382
            },

            "onSelected": function(module, pid)
            {
                module.host.storage.selector.onSelected(pid);               
            },
            "onDeselected": function(module, pid)
            {
                module.host.storage.selector.onDeselected(pid);             
            },
            "onMouseOver" : function(module, pid)
            {
                module.host.storage.highlighter.onMouseOver(pid);                               
            },            
            "onMouseOut" : function(module, pid)
            {
                module.host.storage.highlighter.onMouseOut(pid);               
            },            
            "onRangeFiltered" : function(module, dim, start, end)
            {
//                console.log("parCoords > onFilteredByRange");
                module.host.storage.instanceFilter.filterByQuality(module, dim, start, end);
            }
        }});

    modules.push({"name": "FeatureQualityMatrix", "configuration": 
    	{
	    	"title": "Feature and Quality Matrix",

    		"layout": {
			    "width": window.parent.innerWidth-rightMargin,
			    "height": 500,
			    "posx": 0,
			    "posy": window.parent.innerHeight - 40 - 50 + 40
    		},

    		"buttonsForRemoval": false,
            "instancesSelectable": true,
            "useInstanceName": false,

    		"onSelected": function(module, pid)
    		{
				module.host.storage.selector.onSelected(pid);    			
    		},
    		"onDeselected": function(module, pid)
    		{
				module.host.storage.selector.onDeselected(pid);    			
    		},
    		"getSelection" : function(module)
    		{
				return module.host.storage.selector.selection;    			
    		},    		
    		"onReset": function(module)
    		{
//                module.host.storage.instanceFilter.filterContent();
    		},
    		"onFeatureExpanded": function(module, feature)
    		{
    		},
    		"onFeatureCollapsed": function(module, feature)
    		{
    		},    		
    		"onFeatureCheckedStateChange": function(module, feature, require)
    		{
                module.host.storage.instanceFilter.filterByFeature(module, feature, require);                
    		},
    		"onInstanceRemove" : function(module, num)
    		{
    		},
            "onMouseOver": function(module, pid)
            {
                module.host.storage.highlighter.onMouseOver(pid);               
            },
            "onMouseOut": function(module, pid)
            {
                module.host.storage.highlighter.onMouseOut(pid);               
            },
            "onFilterChanged": function(module, path, value)
            {
                module.host.storage.instanceFilter.filterByValue(module, path, value);                
            }
    	}});

    var settings = {
    	"onInitialize": function(host)
	    {
 			host.storage.selector = new Selector(host);
            host.storage.instanceFilter = new InstanceFilter(host);
            host.storage.evolutionController = new EvolutionController(host);
            host.storage.highlighter = new Highlighter(host);
	    },
    	"onLoaded": function(host)
	    {
	    	$("#myform").submit();
	    }	    
	};

    return {"modules": modules, "settings": settings};
}



function onError(module, statusText, response, xhr) 
{
    var currentDate = new Date();
    var errorRecord = {};

    if (statusText == "compile_error")
        errorRecord = {
            "caption": "Compilation Error", 
            "body": "Please check whether Clafer Compiler is available, and the model is syntactically correct."
        };
    else if (statusText == "timeout")
        errorRecord = {
            "caption": "Request Timeout", 
            "body": "Please check whether the server is available. You may want to reload the browser page."
        };
    else if (statusText == "malformed_output")
        errorRecord = {
            "caption": "Malformed output received from the optimizer", 
            "body": "Please check whether you are using the correct version of the chosen optimizer. Also, an unhandled exception is possible.  Please verify your input file: check syntax and integer ranges."
        };
    else if (statusText == "malformed_instance")
        errorRecord = {
            "caption": "Malformed instance data received from the optimizer", 
            "body": "An unhandled exception may have occured during the optimizer execution. Please verify your input file: check syntax and integer ranges."
        };
    else if (statusText == "empty_instances")
        errorRecord = {
            "caption": "No instances returned", 
            "body": "Could not get any instance. Possible reasons:\n1) No instances found at all: the model is not satisfiable within the given scopes and integer ranges.\n2) An unhandled exception occured in the chosen backend.\nPlease verify your input model, increase scopes and integer ranges"
        };
    else if (statusText == "empty_instance_file")
        errorRecord = {
            "caption": "No instances found in the file", 
            "body": "No instances found in the specified file. Please verify its format and check instance data"
        };
    else if (statusText == "optimize_first")
        errorRecord = {
            "caption": "Load the model first", 
            "body": "You can add instances only after you loaded the model or ran optimization. Please provide a Clafer model first, and then add instances"
        };
      else if (response && response.responseText == "process_not_found")
        errorRecord = {
            "caption": "Session not found", 
            "body": "Looks like your session has been closed due to inactivity. Just recompile your model to start a new session."
        };
    else if (statusText == "error" && response.responseText == "")
        errorRecord = {
            "caption": "Request Error", 
            "body": "Please check whether the server is available. Try to recompile the model or to reload the browser page."
        };
    else
        errorRecord = {
            "caption": xhr, 
            "body": response.responseText
        };

    errorRecord.datetime = currentDate.today() + " @ " + currentDate.timeNow();
    errorRecord.contact = "If the error persists, please contact Alexandr Murashkin (http://gsd.uwaterloo.ca/amurashk) or Michal Antkiewicz (http://gsd.uwaterloo.ca/mantkiew)";

    module.host.print("ClaferMooVisualizer> " + errorRecord.caption + ": " + errorRecord.datetime + "\n" + errorRecord.body + "\n");
    module.host.errorWindow(errorRecord);

    return true;
}