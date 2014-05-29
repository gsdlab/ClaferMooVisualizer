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
try
{
    google.load("visualization", "1",{'packages':['corechart']});
}
catch(e)
{
    alert("Could not find Google Visualization package. Please check Internet connection");
}

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
                    "button_file_caption": "Optimize",
                    "button_example_caption": "Optimize",
                    "button_editor_caption": "Optimize",

                    "button_file_tooltip": "Optimize the selected file",
                    "button_example_tooltip": "Optimize the selected example",
                    "button_editor_tooltip": "Optimize the model specified in the editor"
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

    		"onError": function(module, statusText, response, xhr){
			    var caption = "";
//                console.log(statusText);
//                console.log(response);

			    if (statusText == "compile_error")
			        caption = "<b>Compile Error.</b><br>Please check whether Clafer Compiler is available, and the model is correct.";
			    else if (statusText == "timeout")
			        caption = "<b>Request Timeout.</b><br>Please check whether the server is available.";
			    else if (statusText == "malformed_output")
			        caption = "<b>Malformed output received from the optimizer.</b><br>Please check whether you are using the correct version of the chosen optimizer. Also, an unhandled exception is possible.  Please verify your input file: check syntax and integer ranges.";        
			    else if (statusText == "malformed_instance")
			        caption = "<b>Malformed instance data received from the optimizer.</b><br>An unhandled exception may have occured during the optimizer execution. Please verify your input file: check syntax and integer ranges.";        
			    else if (statusText == "empty_instances")
			        caption = "<b>No instances returned.</b> Possible reasons:<br><ul><li>No instances found at all: the model is not satisfiable within the given scopes and integer range</li><li>An unhandled exception occured in the chosen backend</li></ul>Please verify your input model, increase scopes and integer ranges.";        
			    else if (statusText == "empty_argument")
			        caption = "<b>Empty argument given to processToolResult.</b><br>Please report this error.";        
			    else if (statusText == "empty_instance_file")
			        caption = "<b>No instances found in the specified file.";        
			    else if (statusText == "optimize_first")
			        caption = "<b>You have to run optimization first, and only then add instances.";        
			    else if (statusText == "error" && response.responseText == "")
			        caption = "<b>Request Error.</b><br>Please check whether the server is available.";        
			    else
			        caption = '<b>' + xhr + '</b><br>' + response.responseText.replaceAll("\\n", "<br>").replaceAll("\\t", "&nbsp;&nbsp;").replaceAll("\\r", "").replaceAll("\\\"", "\"");

		        module.host.print("ClaferMooVisualizer> Error occured\n");

			    return caption;

    		},
    		"onBeginQuery": function(module){
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

    		},
    		"onCompleted" : function(module, responseObject){    					        
		        if (responseObject.model != "")
		        {
		            module.editor.getSession().setValue(responseObject.model);
		        }

                if (!responseObject.optimizer_message)
                {
                    return false;
                }

		        var data = preprocessMOOResult(responseObject, module.host);
                if (!data)
                    return false;

                module.host.storage.selector.clearSelection();

		        var goalsModule = module.host.findModule("mdGoals");
		        var graphModule = module.host.findModule("mdGraph");
		        var matrixModule = module.host.findModule("mdFeatureQualityMatrix");
                var comparerModule = module.host.findModule("mdVariantComparer");
                var spiderChartModule = module.host.findModule("mdSpiderChart");
                var parallelCoordinatesChartModule = module.host.findModule("mdParallelCoordinates");

				goalsModule.onDataLoaded(data);
				data.goals = goalsModule.goals;
                graphModule.onDataLoaded(data);
				matrixModule.onDataLoaded(data);
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

                module.host.storage.evolutionController.assignProperShapesToMatrix();

				matrixModule.onRendered();
                comparerModule.onRendered();
                parallelCoordinatesChartModule.onRendered();

                matrixModule.addHovering();

                goalsModule.calculateRanges();

                module.host.storage.instanceFilter.filterContent();               
                spiderChartModule.onRendered();

		        module.host.print("ClaferMooVisualizer> " + responseObject.optimizer_message + "\n");
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

            "onFilterByGoals": function(module, dim, start, end)
            {
                module.host.storage.instanceFilter.onFilteredByRange(module, dim, start, end);
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
            "onHTMLChanged": function (module){
                module.host.storage.evolutionController.assignProperShapesToVariantComparer();
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
//                module.host.storage.instanceFilter.filterContent(); 
            },
            "onBubbleClick": function(module, pid){
                if (module.host.storage.selector.isSelected(pid))
                {
                    module.host.storage.selector.onDeselected(pid);
                }
                else
                {
                    module.host.storage.selector.onSelected(pid);
                }                
            },
            "getExistingInstancesCount" : function(module){
                return module.host.storage.evolutionController.existingInstancesCount;
            },
            "onDrawComplete" : function(module){
                module.host.storage.evolutionController.assignProperShapesToGraph();
                module.host.storage.selector.ReselectGraphPoints();
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
                module.host.storage.instanceFilter.onFilteredByRange(module, dim, start, end);
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
                module.host.storage.instanceFilter.filterContent();
    		},
    		"onFeatureExpanded": function(module, feature)
    		{
    		},
    		"onFeatureCollapsed": function(module, feature)
    		{
    		},    		
    		"onFeatureCheckedStateChange": function(module, feature, require)
    		{
                module.host.storage.instanceFilter.filterContent();                
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