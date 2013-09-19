/*
Copyright (C) 2012, 2013 Alexander Murashkin, Neil Redman <http://gsd.uwaterloo.ca>

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
var http = require("http");
var url = require("url");
var sys = require("sys");
var fs = require("fs");
var path = require('path');
var express = require('express');
var config = require('./config.json');

var tool_path = __dirname + "/ClaferMoo/spl_datagenerator/";
var python_file_name = "IntegratedFeatureModelOptimizer.py";
var pythonPath = config.pythonPath;


var port = config.port;

var server = express();

var timeout = config.timeout;

//support for sessions - used for url uploads
server.use(express.cookieParser('asasdhf89adfhj0dfjask'));
var store = new express.session.MemoryStore;
server.use(express.session({secret: 'supersecretstring', store: store}));

server.use(express.static(__dirname + '/Client'));
server.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/uploads' }));

var URLs = [];
var processes = [];

server.get('/', function(req, res) {
//uploads now and runs once app.html is fully loaded
//works because client currently sends one empty post upon completion of loading
	if (req.query.claferFileURL) {
		var sessionURL = new Object
		sessionURL.session = req.sessionID;
		sessionURL.url = req.query.claferFileURL;
		URLs.push(sessionURL);
		console.log(req.sessionID);
	}
    res.sendfile("Client/app.html");
});

/*
 * Handle Clientside save requests
 */
server.post('/', function(req, res, next) {
	console.log("returning instances.cfr.data file");
   	res.writeHead(200, { "Content-Type": "text/html",
   						 "Content-Disposition": "attachment; filename=Instances.cfr.data"});
	res.end(req.body.data);
});

/*
 * Handle Polling
 * The client will poll the server to get the latest updates or the final result
 * Polling is implemented to solve the browser timeout problem.
 * Moreover, this helps to control the execution of ClaferMoo: to stop, or to get intermediate results.
 * An alternative way might be to create a web socket
 */

server.post('/poll', function(req, res, next)
{
    for (var i = 0; i < processes.length; i++)
    {
        if (processes[i].windowKey == req.body.windowKey)
        {
            if (req.body.command == "ping") // normal ping
            {                
                if (processes[i].completed) // the execution is completed
                {
                    
                    if (processes[i].code == 0)
                    {
                        res.writeHead(200, { "Content-Type": "text/html"});
                    }
                    else
                    {
                        res.writeHead(400, { "Content-Type": "text/html"});
                    }

                    res.end(processes[i].result);
                    processes.splice(i, 1);
                    return;
                }	
                else // still working
                {
                    res.writeHead(200, { "Content-Type": "text/html"});
                    res.end("Working");
                    return;
                }
            }
            else // if it is cancel
            {
                killProcessTree(processes[i]);
                processes.splice(i, 1);
                res.writeHead(200, { "Content-Type": "text/html"});
                res.end("Cancelled");
                return;                
            }
        }
    }
    
    res.writeHead(404, { "Content-Type": "text/html"});
    res.end("Error: the requested process is not found.")    
});

/*
 * TODO: create a Cancel request
 */

/*
 * Handle file upload
 */
server.post('/upload', function(req, res, next) {
	console.log("---------------------------");
	console.log("/Upload request initiated.");

	//check if client has either a file directly uploaded or a url location of a file
   	if (req.files.claferFile === undefined){
   			for (var x=0; x <= URLs.length; x++){
   				if (x === URLs.length){
                	console.log("No Clafer file submitted. Returning...");
		    		res.writeHead(200, { "Content-Type": "text/html"});
					res.end("no clafer file submitted");
   					return;
   				} else if (URLs[x].session === req.sessionID && ("claferFileURL=" + URLs[x].url) === url.parse(req.body.claferFileURL).query){
   					var i = 0;
   					var uploadedFilePath = req.sessionID;
   					uploadedFilePath = uploadedFilePath.replace(/[\/\\]/g, "");
   					uploadedFilePath = __dirname + "/uploads/" + uploadedFilePath;
   					while(fs.existsSync(uploadedFilePath + i.toString() + ".cfr")){
   						i = i+1;
   					}
   					uploadedFilePath = uploadedFilePath + i.toString() + ".cfr";
					console.log('Downloading file at "' + URLs[x].url + '"...');
					var file = fs.createWriteStream(uploadedFilePath);
					http.get(URLs[x].url, function(res){
						res.on('data', function (data) {
							file.write(data);
						}).on('end', function(){
							file.end();
							console.log("File downloaded to ./uploads");
						});
					});
					URLs.splice(x,1);
					break;
   				}
   			}		
	} else {
		var uploadedFilePath = req.files.claferFile.path;
        if (!fs.existsSync(uploadedFilePath))
        {
            console.log("No Clafer file submitted. Returning...");
            res.writeHead(200, { "Content-Type": "text/html"});
            res.end("no clafer file submitted");
            return;
        }
        var pre_content = fs.readFileSync(uploadedFilePath);
        if (pre_content.length == 0)
        {
            console.log("No Clafer file submitted. Returning...");
            res.writeHead(200, { "Content-Type": "text/html"});
            res.end("no clafer file submitted");
            return;
        }        
	}

//make temp folder for files and move file there
	var i = 0;
	while(fs.existsSync("./uploads/" + i + "tempfolder/")){
		i++;
	}
	console.log("Uploaded file: " + uploadedFilePath);
	var pathTokens = "." + uploadedFilePath.split("Server")[1];
	console.log("Partial path: " + pathTokens);
	
    pathTokensLinux = pathTokens.split("/");
    pathTokensWindows = pathTokens.split("\\");
    
    if (pathTokensWindows.length > pathTokensLinux.length)
        pathTokens = pathTokensWindows;
    else    
        pathTokens = pathTokensLinux;
	
	console.log('Path tokens: "' + pathTokens.join('; ') + '"');
    var oldPath = uploadedFilePath
	uploadedFilePath = __dirname + "/" + pathTokens[1] + "/" + i + "tempfolder/"; // this slash will work anyways
	fs.mkdir(uploadedFilePath, function (err){
		if (err) throw err;
		var dlDir = uploadedFilePath;
		uploadedFilePath += pathTokens[2];
		fs.rename(oldPath, uploadedFilePath, function (err){
			if (err) throw err;
			var file_contents;
			console.log("Proceeding with " + uploadedFilePath);
            
		    // read the contents of the uploaded file
			fs.readFile(uploadedFilePath, function (err, data) {

				if(data)
		    		file_contents = data.toString();
		    	else
                {
		    		res.writeHead(500, { "Content-Type": "text/html"});
					res.end("No data has been read");
					cleanupOldFiles(uploadedFilePath, dlDir);
					return;
		    	}

                var d = new Date();
                var process = { windowKey: req.body.windowKey, tool: null, folder: dlDir, path: uploadedFilePath, lastUsed: d, completed: false, code: 0, killed:false};

				if (uploadedFilePath.substring(uploadedFilePath.length - 5) == ".data")
                {
                    console.log("Instances have been submitted, returning them...");                
                    process.result = file_contents;
                    process.code = 0;
                    process.completed = true;
                    processes.push(process);                    
					cleanupOldFiles(uploadedFilePath, dlDir);
                    res.writeHead(200, { "Content-Type": "text/html"});
                    res.end("OK"); // just means the file has been sent sucessfully and started to processing
                    return;
				}
				console.log("Processing file with ClaferMoo...");

                try
                {
                    var util  = require('util');
                    var spawn = require('child_process').spawn;
                    var tool  = spawn(pythonPath, [tool_path + python_file_name, uploadedFilePath, "--preservenames"], { cwd: dlDir, env: process.env});
                    process.tool = tool;
                    processes.push(process);                    
                }                
                catch(err)
                {
                    console.log("Error while creating a process: " + err);
                    // TODO: handle this error properly
                }

				process.timeoutObject = setTimeout(function(){
					console.log("Request timed out.");
                    process.result = 'Error: Serverside Timeout. Please consider increasing the "timeout" value in the "config.json" file. Currently it equals ' + config.timeout + ' millisecond(s).';
                    process.code = 9003;
                    process.completed = true;
                    killProcessTree(process);
				}, timeout);
                
                var error_result = "";
				var data_result = "";

				tool.stdout.on('data', function (data){	
                    data_result += data;
				});

				tool.stderr.on('data', function (data) {
                    error_result += data;
				});
                
                tool.on('message', function(err) {
                    console.log("Message: " + err);
                });

                tool.on('disconnect', function(err) {
                    console.log("Disconnect: " + err);
                });
                
                tool.on('error', function(err) {
                    console.log("Error handler for process: " + err);
                    if (typeof err === "object") 
                    {
                        if (err.message && err.message == "spawn ENOENT") 
                        {
                            console.log("Could not create a process.");
                        }
                    } 
                    else 
                    {
                        console.log('Spawn error: unknown error');
                    }                

                    process.result = "Error: Could not run ClaferMoo. Likely, Python or ClaferMoo have not been found. Please check whether Python is available from the command line, as well as whether ClaferMoo has been properly installed.";
                    process.code = 9000;
                    process.completed = true;
                    if (process.timeoutObject)
                        clearTimeout(process.timeoutObject);
                });

				tool.on('exit', function (code) 
				{
					var result = "";
                    console.log("Process OnExit handler...");
                    
                    if (process.killed) // has been terminated
                    {
                        console.log("Finished cancellation");
                        code = 9001; // just a non-zero value 
                        cleanupOldFiles(uploadedFilePath, dlDir); 
                        if (process.timeoutObject)
                            clearTimeout(process.timeoutObject);

                        return;
                    }

                    console.log("Preparing to send the result...");
                    
					if(error_result.indexOf('Exception in thread "main"') > -1){
						code = 1;
					}
					if (code === 0) 
					{				
						result = "Return code = " + code + "\n" + data_result + "=====";
						var xml = fs.readFileSync(changeFileExt(uploadedFilePath, '.cfr', '.xml'));
						result += xml.toString();
						result = escapeHtml(result);
					}
					else 
					{
						result = 'Error, return code: ' + code + '\n' + error_result;
						console.log(data_result);
					}
					
                    process.result = result;
                    process.code = code;
                    process.completed = true;
                    console.log("The result has been sent.");                    
                    
                    if (process.timeoutObject)
                        clearTimeout(process.timeoutObject);
                        
                    cleanupOldFiles(uploadedFilePath, dlDir); 
                    // we clean old files here, since the result is stored in the result variable
				});

                res.writeHead(200, { "Content-Type": "text/html"});
                res.end("OK"); // just means the file has been sent sucessfully and started to processing
				
			});
		});
	});
});

function finishCleanup(dir, results){
	if (fs.existsSync(dir)){
		fs.rmdir(dir, function (err) {
  			if (err) throw err;
 			console.log("Successfully deleted " + dir + " along with contents:\n" + results);
		});
	}
}
 
function cleanupOldFiles(path, dir) {
                    
    console.log("Cleaning temporary files...");                    
	//cleanup old files
	fs.readdir(dir, function(err, files){
		if (err) throw err;
		var results = "";
		var numFiles = files.length;
		console.log("#Files = " + numFiles);
		if (!numFiles){
			return finishCleanup(dir, results);
		} else {
			files.forEach(function(file){
				deleteOld(dir + "/" + file);
				results += file + "\n";
			});	
			finishCleanup(dir, results);
		}
	});


//done cleanup
}

function deleteOld(path){
	if (fs.existsSync(path)){
		fs.unlinkSync(path, function (err) { // added Sync to make sure all files are properly removed until the removal of the directory
			if (err) throw err;
		});
	}
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

function killProcessTree(process)
{
    var spawn = require('child_process').spawn;
    console.log("Killing the process tree with Parent PID = " + process.tool.pid);
    
    process.killed = true;
    
    if (process.tool)
    {
    
        // first, try a Windows command
        var killer_win  = spawn("taskkill", ["/F", "/T", "/PID", process.tool.pid]);
        
        killer_win.on('error', function (err){	// if error occurs, then we are on Linux
            var killer_linux = spawn("pkill", ["-TERM", "-P", process.tool.pid]);                   

            killer_linux.on('error', function(err){
                console.log("Cannot terminate processes.");
            });
        });                
    }
                
}


/*
 * Catch all. error reporting for unknown routes
 */
server.use(function(req, res, next){
  res.send(404, "Sorry can't find that!");
});

var dependency_count = 4; // the number of tools to be checked before the Visualizer starts
console.log('======================================');
console.log('| ClaferMoo Visualizer (v.0.3.4)     |');
console.log('======================================');
var spawn = require('child_process').spawn;
console.log('Checking dependencies...');

var clafer_compiler  = spawn("clafer", ["-V"]);
var clafer_compiler_version = "";
clafer_compiler.on('error', function (err){
    console.log('ERROR: Cannot find Clafer Compiler (clafer). Please check whether it is installed and accessible.');
});
clafer_compiler.stdout.on('data', function (data){	
    clafer_compiler_version += data;
});
clafer_compiler.on('exit', function (code){	
    console.log(clafer_compiler_version.trim());
    if (code == 0) dependency_ok();
});

var python  = spawn("python", ["-V"]);
var python_version = "";
python.on('error', function (err){
    console.log('ERROR: Cannot find Python (python). Please check whether it is installed and accessible.');
});
python.stdout.on('data', function (data){	
    python_version += data;
});
python.stderr.on('data', function (data){	
    python_version += data;
});
python.on('exit', function (code){	
    console.log(python_version.trim());
    if (code == 0) dependency_ok();
});

var java  = spawn("java", ["-version"]);
var java_version = "";
java.on('error', function (err){
    console.log('ERROR: Cannot find Java (java). Please check whether it is installed and accessible.');
});
java.stdout.on('data', function (data){	
    java_version += data;
});
java.stderr.on('data', function (data){	
    java_version += data;
});
java.on('exit', function (code){	
    console.log(java_version.trim());
    if (code == 0) dependency_ok();
});

var claferMoo  = spawn(pythonPath, [tool_path + python_file_name, "--version"]);
var claferMoo_version = "";
/* 'error' would mean that there is no python, which has been checked already */
claferMoo.on('error', function (err){
    console.log('ERROR: Cannot run ClaferMoo (' + tool_path + python_file_name + '). Please check whether it is installed and accessible.');
});
claferMoo.stdout.on('data', function (data){	
    claferMoo_version += data;
});
claferMoo.stderr.on('data', function (data){	
    claferMoo_version += data;
});
claferMoo.on('exit', function (code){	
    if (code != 0)
        console.log('ERROR: Cannot run ClaferMoo (' + tool_path + python_file_name + '). Please check whether it is installed and accessible.');
    
    console.log(claferMoo_version.trim());
    if (code == 0) dependency_ok();
});

var node_version = process.version + ", " + JSON.stringify(process.versions);
console.log("Node.JS: " + node_version);

function dependency_ok()
{
    dependency_count--;
    if (dependency_count == 0)
    {
        server.listen(port);
        console.log('Dependencies found successfully. Please review their versions manually');        
        console.log('======================================');
        console.log('Ready. Listening on port ' + port);        
    }
}