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
var python = config.pythonPath;


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
 * Handle file upload
 */
server.post('/upload', function(req, res, next) {
	console.log("/Upload request initiated.");

	//check if client has either a file directly uploaded or a url location of a file
   	if (req.files.claferFile === undefined){
   			for (var x=0; x <= URLs.length; x++){
   				if (x === URLs.length){
   					res.send("no clafer file submitted");
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
					console.log("downloading file at " + URLs[x].url);
					var file = fs.createWriteStream(uploadedFilePath);
					http.get(URLs[x].url, function(res){
						res.on('data', function (data) {
							file.write(data);
						}).on('end', function(){
							file.end();
							console.log("file downloaded to ./uploads");
						});
					});
					URLs.splice(x,1);
					break;
   				}
   			}		
	} else {
		var uploadedFilePath = req.files.claferFile.path;				
	}

//make temp folder for files and move file there
	var i = 0;
	while(fs.existsSync("./uploads/" + i + "tempfolder/")){
		i++;
	}
	console.log(uploadedFilePath);
	var pathTokens = "." + uploadedFilePath.split("Server")[1];
	console.log(pathTokens);
	
    pathTokensLinux = pathTokens.split("/");
    pathTokensWindows = pathTokens.split("\\");
    
    if (pathTokensWindows.length > pathTokensLinux.length)
        pathTokens = pathTokensWindows;
    else    
        pathTokens = pathTokensLinux;
	
	console.log(pathTokens);
    var oldPath = uploadedFilePath
	uploadedFilePath = __dirname + "/" + pathTokens[1] + "/" + i + "tempfolder/"; // this slash will work anyways
	fs.mkdir(uploadedFilePath, function (err){
		if (err) throw err;
		var dlDir = uploadedFilePath;
		uploadedFilePath += pathTokens[2];
		fs.rename(oldPath, uploadedFilePath, function (err){
			if (err) throw err;
			var file_contents;
			console.log("proceeding with " + uploadedFilePath);
		    // read the contents of the uploaded file
		    //serverTimeout = setTimeout(function(){
		    //	res.send ("Serverside Timeout.");
		    //}, 60000);
			fs.readFile(uploadedFilePath, function (err, data) {

				if(data)
		    		file_contents = data.toString();
		    	else{
					console.log("entered path 1");
		    		res.writeHead(500, { "Content-Type": "text/html"});
					res.end();
		//			cleanupOldFiles(uploadedFilePath, dlDir);
					return;
		    	}

				if (uploadedFilePath.substring(uploadedFilePath.length - 5) == ".data"){
					res.writeHead(200, { "Content-Type": "text/html"});
					console.log("entered path 2");
					res.end(file_contents);
					cleanupOldFiles(uploadedFilePath, dlDir);
					return;
				}
				console.log("processing file with integratedFMO");
                
                try
                {
                    var util  = require('util');
                    var spawn = require('child_process').spawn;
                    var tool  = spawn(python, [tool_path + python_file_name, uploadedFilePath, "--preservenames"], { cwd: dlDir, env: process.env});
                }
                catch(err)
                {
                    console.log("Error while creating a process: " + err);
                }
                
                var error_result = "";
				var data_result = "";
				var timedout = false;
//				var countdown = setTimeout(function(){
//					console.log("request timed out");
//					tool.kill();
//					timedout = true;
//				}, timeout);
				tool.stdout.on('data', function (data) 
				{	
				  data_result += data;
				});

				tool.stderr.on('data', function (data) {
                    error_result += data;
					console.log("entered path 3");
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

                    res.writeHead(400, { "Content-Type": "text/html"});
					res.end("Could not run ClaferMoo. Likely, Python or ClaferMoo have not been found. Please check whether Python is available from the command line, as well as whether ClaferMoo has been properly installed.");                    
                });

				tool.on('exit', function (code) 
				{
//					if (timedout){
//						res.writeHead(500, { "Content-Type": "text/html"});
//						res.end("Request timed out")
//						cleanupOldFiles(uploadedFilePath, dlDir);
//						return;
//					} 
//					clearTimeout(countdown);
					var result = "";
					console.log("Preparing to send result");
					if(error_result.indexOf('Exception in thread "main"') > -1){
						code = 1;
					}
					if (code === 0) 
					{				
						result = "Return code = " + code + "\n" + data_result + "=====";
						var xml = fs.readFileSync(changeFileExt(uploadedFilePath, '.cfr', '_desugared.xml'));
						result += xml.toString();
						
						result = escapeHtml(result);
						
					}
					else 
					{
						result = 'Error, return code: ' + code + '\n' + error_result;
						console.log(data_result);
                        console.log("entered path 5");
					}
					if (code === 0)
						res.writeHead(200, { "Content-Type": "text/html"});
					else
						res.writeHead(400, { "Content-Type": "text/html"});
					console.log("entered path 4");
					res.end(result);
		//			clearTimeout(serverTimeout);
					cleanupOldFiles(uploadedFilePath, dlDir);
				});
				
			});
		});
	});
});

function finishCleanup(dir, results){
	if (fs.existsSync(dir)){
		fs.rmdir(dir, function (err) {
  			if (err) throw err;
 			console.log("successfully deleted " + dir + " along with contents:\n" + results);
		});
	}
}
 
function cleanupOldFiles(path, dir) {

	//cleanup old files
	fs.readdir(dir, function(err, files){
		if (err) throw err;
		var results = "";
		var numFiles = files.length;
		console.log("#files = " + numFiles);
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

/*
 * Catch all. error reporting for unknown routes
 */
server.use(function(req, res, next){
  res.send(404, "Sorry can't find that!");
});

server.listen(port);
console.log('ClaferMoo Visualizer listening on port ' + port);