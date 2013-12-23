try
{
    google.load("visualization", "1",{'packages':['corechart']});
}
catch(e)
{
    alert("Could not find Google Visualization package. Please check the internet connection");
}

function getConfiguration() 
{
	var modules = [];
    modules.push({"name": "Input", "configuration": 
    	{
    		"layout": {
    			"width": (window.parent.innerWidth-20) * 0.38,
    			"height": 180,
    			"posx": 0,
    			"posy": 0
    		},

    		"title": "Input Clafer Model and Options",
    		"optimization_backend": true, 
            "input_default_cache": "checked",
            "input_default_flags": "",
            "file_extensions": [
                {
                    "ext": ".cfr", 
                    "button_file_caption": "Optimize",
                    "button_example_caption": "Optimize",
                    "button_editor_caption": "Optimize",

                    "button_file_tooltip": "Optimize tooltip",
                    "button_example_tooltip": "Optimize tooltip",
                    "button_editor_tooltip": "Optimize tooltip"
                },
                {
                    "ext": ".data", 
                    "button_file_caption": "Add Instances",
                    "button_example_caption": "Add Instances",
                    "button_editor_caption": "Add Instances",

                    "button_file_tooltip": "Add Instances tooltip",
                    "button_example_tooltip": "Add Instances tooltip",
                    "button_editor_tooltip": "Add Instances tooltip"
                }
            ],

    		"onError": function(module, statusText, response, xhr){
			    var caption = "";
			    if (statusText == "compile_error")
			        caption = "<b>Compile Error.</b><br>Please check whether Clafer Compiler is available, and the model is correct.";
			    else if (statusText == "timeout")
			        caption = "<b>Request Timeout.</b><br>Please check whether the server is available.";
			//    else if (statusText == "malformed_output")
			//        caption = "<b>Malformed output received from ClaferMoo.</b><br>Please check whether you are using the correct version of ClaferMoo. Also, an unhandled exception is possible.  Please verify your input file: check syntax and integer ranges.";        
			//    else if (statusText == "malformed_instance")
			//        caption = "<b>Malformed instance data received from ClaferMoo.</b><br>An unhandled exception may have occured during ClaferMoo execution. Please verify your input file: check syntax and integer ranges.";        
			//    else if (statusText == "empty_instances")
			//        caption = "<b>No instances returned.</b>Possible reasons:<br><ul><li>No optimal instances, all variants are non-optimal.</li><li>An unhandled exception occured during ClaferMoo execution. Please verify your input file: check syntax and integer ranges.</li></ul>.";        
			//    else if (statusText == "empty_argument")
			//        caption = "<b>Empty argument given to processToolResult.</b><br>Please report this error.";        
			//    else if (statusText == "empty_instance_file")
			//        caption = "<b>No instances found in the specified file.";        
			//    else if (statusText == "optimize_first")
			//        caption = "<b>You have to run optimization first, and only then add instances.";        
			    else if (statusText == "error" && response.responseText == "")
			        caption = "<b>Request Error.</b><br>Please check whether the server is available.";        
			    else
			        caption = '<b>' + xhr + '</b><br>' + response.responseText.replace("\n", "<br>");

		        module.host.print("ClaferIDE> Error occured\n");

			    return caption;

    		},
    		"onBeginQuery": function(module){
    			return true;
    		},

    		"onFileSent": function(module){
		        module.host.print("ClaferIDE> Processing the submitted model. Compiling...\n");
    		},

    		"onPoll" : function(module, responseObject){
		        if (responseObject.args)
		        {
		            module.host.print("ClaferIDE> clafer " + responseObject.args + "\n");
		        }
//		        if (responseObject.compiled_formats)
//		        {
//		            module.host.findModule("mdCompiledFormats").setResult(responseObject.compiled_formats);
//		        }

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

		        var goalsModule = module.host.findModule("mdGoals");
		        var graphModule = module.host.findModule("mdGraph");
		        var matrixModule = module.host.findModule("mdFeatureQualityMatrix");
                var comparerModule = module.host.findModule("mdVariantComparer");

				goalsModule.onDataLoaded(data);
				data.goals = goalsModule.goals;
                graphModule.onDataLoaded(data);
				matrixModule.onDataLoaded(data);
                comparerModule.onDataLoaded(data);

				$.updateWindowContent(goalsModule.id, goalsModule.getContent());
                $.updateWindowContent(graphModule.id, graphModule.getContent());
				$.updateWindowContent(matrixModule.id, matrixModule.getContent());
                $.updateWindowContent(comparerModule.id, comparerModule.getContent());

				goalsModule.onRendered();
                graphModule.onRendered();

                module.host.storage.evolutionController.assignProperShapesToMatrix();

				matrixModule.onRendered();
                comparerModule.onRendered();

                matrixModule.addHovering();

                module.host.storage.instanceFilter.filterContent();               

		        module.host.print("Optimizer> " + responseObject.optimizer_message + "\n");
		        return true;  
    		}    		
    	}
	});

    modules.push({"name": "Goals", "configuration": 
        {
            "title": "Objectives and Quality Ranges",

            "layout": {
                "width": (window.parent.innerWidth-20) * 0.38,
                "height": 70,
                "posx": 0,
                "posy": 215
            },

            "onFilterByGoals": function(module)
            {
                module.host.storage.instanceFilter.filterContent();                
            }

        }});

    modules.push({"name": "VariantComparer", "configuration": 
    	{
    		"layout": {
                "width": (window.parent.innerWidth-20) * 0.38,
                "height": window.parent.innerHeight - 40 - 50 - 355,
                "posx": 0,
                "posy": 320
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
            }

    	}});

    modules.push({"name": "Output", "configuration": 
    	{
	    	"title": "Output",

    		"layout": {
                "width": (window.parent.innerWidth-20) * 0.38,
                "height": (160),
			    "posx": 0,
			    "posy": window.parent.innerHeight - 40 - 50
    		}

    	}});

    modules.push({"name": "FeatureQualityMatrix", "configuration": 
    	{
	    	"title": "Feature and Quality Matrix",

    		"layout": {
			    "width": window.parent.innerWidth-20,
			    "height": 500,
			    "posx": 0,
			    "posy": window.parent.innerHeight - 40 - 50 + 40
    		},

    		"buttonsForRemoval": false,

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
    		}
    	}});

    modules.push({"name": "Graph", "configuration": 
    	{
	    	"title": "Bubble Front Graph",

    		"layout": {
			    "width": (window.parent.innerWidth - 20) * 0.62,
			    "height": window.parent.innerHeight - 40 - 50,
			    "posx": (window.parent.innerWidth-20) * 0.38,
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
            "onDrawComplete" : function(module){
                module.host.storage.evolutionController.assignProperShapesToGraph();
                module.host.storage.selector.ReselectGraphPoints();
            }
    	}});

    var settings = {
    	"onInitialize": function(host)
	    {
 			host.storage.selector = new Selector(host);
            host.storage.instanceFilter = new InstanceFilter(host);
            host.storage.evolutionController = new EvolutionController(host);
	    },
    	"onLoaded": function(host)
	    {
            $.minimizeWindow("mdOutput");
	    	$("#myform").submit();
	    }	    
	};

    return {"modules": modules, "settings": settings};
}