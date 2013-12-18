function getConfiguration() 
{
	var modules = [];
    modules.push({"name": "Input", "configuration": 
    	{
    		"layout": {
    			"width": (window.parent.innerWidth-40) * 0.38,
    			"height": 160,
    			"posx": 0,
    			"posy": 0
    		},

    		"title": "Input Clafer Model and Options",
    		"optimization_backend": true, 
    		"button_file_caption": "Optimize",
    		"button_example_caption": "Optimize",
    		"button_editor_caption": "Optimize",

    		"button_file_tooltip": "Optimize",
    		"button_example_tooltip": "Optimize",
    		"button_editor_tooltip": "Optimize",

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
		        if (responseObject.compiled_formats)
		        {
		            module.host.findModule("mdCompiledFormats").setResult(responseObject.compiled_formats);
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

		        var data = preprocessMOOResult(responseObject, module.host);

		        var goalsModule = module.host.findModule("mdGoals");
		        var matrixModule = module.host.findModule("mdFeatureQualityMatrix");

				goalsModule.onDataLoaded(data);
				matrixModule.onDataLoaded(data);

				$.updateWindowContent(goalsModule.id, goalsModule.getContent());
				$.updateWindowContent(matrixModule.id, matrixModule.getContent());

				goalsModule.onRendered();
				matrixModule.onRendered();

		        module.host.print("Optimizer> " + responseObject.optimizer_message + "\n");
		        return true;  
    		}    		
    	}
	});
    modules.push({"name": "CompiledFormats", "configuration": 
    	{
    		"layout": {
    			"width": (window.parent.innerWidth-40) * (0.24),
    			"height": window.parent.innerHeight - 60 - 245,
    			"posx": (window.parent.innerWidth-40) * 0.38,
    			"posy": 0
    		},

	    	"title": "Compiled Formats",
	    	"allow_downloading": true

    	}});

    modules.push({"name": "Output", "configuration": 
    	{
	    	"title": "Output",

    		"layout": {
			    "width": (window.parent.innerWidth+65) * 0.38,
			    "height": 70,
			    "posx": (window.parent.innerWidth-40) * (1 - 0.38),
			    "posy": 0
    		}

    	}});

    modules.push({"name": "Goals", "configuration": 
    	{
	    	"title": "Objectives and Quality Ranges",

    		"layout": {
			    "width": 500,
			    "height": 70,
			    "posx": 0,
			    "posy": 170
    		},

    		"onFilterByGoals": function(module)
    		{
//    this.host.findModule("mdComparisonTable").filter.filterContent();    			
    		}

    	}});

    modules.push({"name": "FeatureQualityMatrix", "configuration": 
    	{
	    	"title": "Feature and Quality Matrix",

    		"layout": {
			    "width": 500,
			    "height": 300,
			    "posx": 0,
			    "posy": 400
    		},

    		"onFilterByFeatures": function(module)
    		{
//    this.host.findModule("mdComparisonTable").filter.filterContent();    			
    		},

    		"onSelected": function()
    		{
				//    			
    		},

    		"onDeselected": function()
    		{
				//    			
    		}

    	}});

    var settings = {
    	"onInitialize": function(host)
	    {
 			host.storage.selection = new Array();
 			host.storage.previousData = null;
			host.storage.originalPoints = null;
	    },
    	"onLoaded": function(host)
	    {
	    	$("#myform").submit();
	    }	    
	};

    return {"modules": modules, "settings": settings};
}

function preprocessMOOResult(result, host)
{
	var instances = result.optimizer_instances;
	var abstractXMLText = result.optimizer_claferXML;

	// todo: error handling

	var instancesXMLText = (new InstanceConverter(instances)).convertFromClaferMooOutputToXML();

	instancesXMLText = instancesXMLText.replaceAll('<?xml version="1.0"?>', '');

    if (instancesXMLText.length == 0 || instancesXMLText == "<instances></instances>")
    {
        this.handleError(null, "empty_instances", null);
        return;
    }

    if (instancesXMLText.indexOf("<instance></instance>") >= 0)
	{
        this.handleError(null, "malformed_instance", null);
        return;
    }

    
//	abstractXMLText = abstractXMLText.replaceAll("&quot;", "\"");
//	abstractXMLText = abstractXMLText.replaceAll("&gt;", ">");
//	abstractXMLText = abstractXMLText.replaceAll("&lt;", "<");
//	abstractXMLText = abstractXMLText.replaceAll("&amp;", "&");
	
	abstractXMLText = convertHtmlTags(abstractXMLText);
		
	// clean namespaces
	abstractXMLText = abstractXMLText.replaceAll('<?xml version="1.0"?>', '');
	abstractXMLText = abstractXMLText.replaceAll(' xmlns="http://clafer.org/ir" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:cl="http://clafer.org/ir" xsi:schemalocation="http://clafer.org/ir https://github.com/gsdlab/clafer/blob/master/src/ClaferIR.xsd"', '');
	abstractXMLText = abstractXMLText.replaceAll('cl:', '');
	abstractXMLText = abstractXMLText.replaceAll('xsi:', '');

    var data = new Object();
    data.error = false;
    data.output = result.message;
    data.instancesXML = instancesXMLText;
    data.claferXML = abstractXMLText;	

    if (!host.storage.previousData){
    	var lines = result.optimizer_instances.match(/^.*([\n\r]+|$)/gm);
    	lines = result.optimizer_instances.split(lines[1]);
    	host.storage.originalPoints = lines.length - 1;
    }
    data.originalPoints = this.originalPoints;
    host.storage.previousData = { Unparsed: instances, abstractXML: data.claferXML };

    return data;
}

function convertHtmlTags (input) {
  var in_tag=false;
  var in_var=false;
  var output = new String("");

  var length = input.length;
  
  for (var i=0; i< length; i++) 
    {
      ch = input.charAt(i);
	  
      if (in_tag) 
	  {
		if (in_var) 
		{
			if (ch == '"') 
			{
				in_var = false;
			}
			
			output += ch;
		}
		else 
		{
			if (ch == '"') 
			{
				in_var = true;
			}
			else if (ch == '>') 
			{
				in_tag = false;
			}
			
			output += ch.toLowerCase();
		}
      }
      else 
	  {
		if (ch == '<') 
		{
			in_tag = true;
		}
		output += ch;
      }
    }

  return output;
}
