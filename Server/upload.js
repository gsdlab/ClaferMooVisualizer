var http = require("http");
var url = require("url");
var multipart = require("./multipart/lib/multipart.js");
var sys = require("sys");
var fs = require("fs");
var path = require('path');


var tool_path = "ClaferMoo/spl_datagenerator/";
var python_file_name = "IntegratedFeatureModelOptimizer.py";
var python = "python";

var port = 8080;

var useCache = false;
var cacheFileName = "cache.txt";

var server = http.createServer(function(req, res) {
    // Simple path-based request dispatcher
    switch (url.parse(req.url).pathname) {
        case '/':
            display_page(req, res);
            break;
        case '/upload':

			if (useCache)
			{
				sys.debug("Cache to be returned...");
				res.writeHead(200, { "Content-Type": "text/html" });
				var contents = fs.readFileSync(cacheFileName);
				res.end(contents);
			}
			else upload_file(req, res);

            break;
        default:
            getPath(req, res);
            break;
    }
});

// Server would listen on port 8000
server.listen(port);

/*
 * Display upload form
 */
function display_page(req, res) {
    res.sendHeader(200, {"Content-Type": "text/html"});
	var contents = fs.readFileSync("./Client/app.html");
    res.write(contents);
    res.close();
}

/*
 * Create multipart parser to parse given request
 */
function parse_multipart(req) {
    var parser = multipart.parser();

    // Make parser use parsed request headers
    parser.headers = req.headers;

    // Add listeners to request, transfering data to parser

    req.addListener("data", function(chunk) {
        parser.write(chunk);
    });

    req.addListener("end", function() {
        parser.close();
    });

    return parser;
}

/*
 * Handle file upload
 */
 
function basename(str)
{
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
   base = base.replace(":", "");
//    if(base.lastIndexOf(".") != -1)       
//       base = base.substring(0, base.lastIndexOf("."));
   return base;
}
 
function upload_file(req, res) {
    // Request body is binary
    req.setBodyEncoding("binary");

    // Handle request as multipart
    var stream = parse_multipart(req);

    var fileName = null;
    var fileStream = null;

    // Set handler for a request part received
    stream.onPartBegin = function(part) {
        sys.debug("Started part, name = " + part.name + ", filename = " + part.filename);

		try
		{		
			// Construct file name
			fileName = __dirname + "/" + "uploads/" + basename(stream.part.filename);

			// FOR WINDOWS ONLY:	
			fileName = fileName.replace("/cygdrive/c/", "C:/");

			sys.debug(fileName);
			
			// Construct stream used to write to file
			
			fileStream = fs.createWriteStream(fileName);

			if (fileStream == null)
			{
				sys.debug("Failed to open file: " + fileName);
				return;
			}
		}
		catch (e)
		{
			sys.debug("Failed to open file");
			return;				
		}
		
		if (fileStream != null)
		{		
			// Add error handler
			fileStream.addListener("error", function(err) {
				sys.debug("Got error while writing to file '" + fileName + "': ", err);
			});

			// Add drain (all queued data written) handler to resume receiving request data
			fileStream.addListener("drain", function() {
				req.resume();
			});
		}

    };

    // Set handler for a request part body chunk received
    stream.onData = function(chunk) {
        // Pause receiving request data (until current chunk is written)
        req.pause();

        // Write chunk to file
        // Note that it is important to write in binary mode
        // Otherwise UTF-8 characters are interpreted
        sys.debug("Writing chunk");
        fileStream.write(chunk, "binary");
    };

    // Set handler for request completed
    stream.onEnd = function() {
        // As this is after request completed, all writes should have been queued by now
        // So following callback will be executed after all the data is written out
        if (fileStream == null)
		{
			res.writeHead(200, { "Content-Type": "text/html" });
			res.end("Error: no file submitted, no cache present.");
			return;
		}
		
		fileStream.addListener("drain", function() {
            // Close file stream
//            fileStream.end();
			fileStream.close(function(){
            // Handle request completion, as all chunks were already written
				upload_complete(res, fileName);
			});
        });
    };
}

function escapeHtml(unsafe) {
  return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

function changeFileExt(name, ext, newExt)
{
	var ending = name.toLowerCase().substring(name.length - 4);
	if (ending == ext.toLowerCase())
		return name.substring(0, name.length - 4) + newExt;

	return name;
}

function upload_complete(res, fileName) {
    sys.debug("Request complete");
	
	res.writeHead(200, { "Content-Type": "text/html" });

	var file_name = fileName;
	
	// FOR WINDOWS ONLY:	
	file_name = file_name.replace("/cygdrive/c/", "C:/");

	var util  = require('util'),
		spawn = require('child_process').spawn,
		tool  = spawn(python, [tool_path + python_file_name, file_name]);
	
	var error_result = "";
	var data_result = "";
	
	tool.stdout.on('data', function (data) 
	{	
	  data_result += data;
	});

	tool.stderr.on('data', function (data) {
	  error_result += data;
	});

	tool.on('exit', function (code) 
	{
		var result = "";
		
		if (code === 0) 
		{
			result = "Return code = " + code + "\n" + data_result + "=====";
			var xml = fs.readFileSync(changeFileExt(file_name, '.cfr', '_desugared.xml'));
//			result += xml;
			result += xml.toString();
			
			result = escapeHtml(result);
			var xml = fs.writeFileSync(cacheFileName, result);
		}
		else 
		{
			result = 'Error, return code: ' + code + '\n' + error_result;
		}
	  
	  
		res.end(result);
	  	  
	});
		
//  res.write("Hello world\n");
  
}

/*
 * Handles page not found error
 */
function show_404(req, res) {
    res.sendHeader(404, {"Content-Type": "text/html"});
    res.write("Not found!");
    res.end();
}

var extToMimes = {
	'js': 'text/javascript',
	'css': 'text/css',
	'gif': 'image/gif',
	'png': 'image/png'
}

function getMimeByExt(filename) 
{
	var ext = filename.split('.').pop();

	if (extToMimes.hasOwnProperty(ext)) {
		return extToMimes[ext];
	}
	return "text/html";
}

function getPath(req, res) {
	try
	{
		var contentType = getMimeByExt(url.parse(req.url).pathname);
		res.sendHeader(200, { "Content-Type": contentType });

		sys.debug(url.parse(req.url).pathname);
		contents = fs.readFileSync("." + url.parse(req.url).pathname);
		res.write(contents);
		res.end();
	}
	catch(e)
	{
		show_404(req, res);
	}
}