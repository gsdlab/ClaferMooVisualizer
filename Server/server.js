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

//support for sessions - not needed yet
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
	pathTokens = pathTokens.split("/");
	var oldPath = uploadedFilePath
	uploadedFilePath = __dirname + "/" + pathTokens[1] + "/" + i + "tempfolder/";
	fs.mkdir(uploadedFilePath);
	var dlDir = uploadedFilePath;
	uploadedFilePath += pathTokens[2];
	fs.rename(oldPath, uploadedFilePath);

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
    		res.writeHead(500, { "Content-Type": "text/html"});
			res.end();
//			cleanupOldFiles(uploadedFilePath, dlDir);
			return;
    	}

		if (uploadedFilePath.substring(uploadedFilePath.length - 5) == ".data"){
			res.writeHead(200, { "Content-Type": "text/html"});
			res.end(file_contents);
			cleanupOldFiles(uploadedFilePath, dlDir);
			return;
		}
		console.log("processing file with integratedFMO");
		var util  = require('util'),
		spawn = require('child_process').spawn,
		tool  = spawn(python, [tool_path + python_file_name, uploadedFilePath, "--preservenames"], { cwd: dlDir, env: process.env});
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
			}
			if (code === 0)
				res.writeHead(200, { "Content-Type": "text/html"});
			else
				res.writeHead(400, { "Content-Type": "text/html"});
			res.end(result);
//			clearTimeout(serverTimeout);
			cleanupOldFiles(uploadedFilePath, dlDir);
		});
		
	});

});
 
function cleanupOldFiles(path, dir) {

	//cleanup old files
	var ending = path.toLowerCase().substring(path.length - 4);
	console.log("Running Cleanup");
	if (fs.existsSync(path)){
		fs.unlink(path, function (err) {   //delete .cfr
  			if (err) throw err;
 			console.log("successfully deleted " + path);
		});
	}
	if (ending == ".cfr"){
		deleteOld(path, ".xml");
		deleteOld(path, "_desugared.cfr");
		deleteOld(path, "_desugared.xml");
		deleteOld(path, "_desugared.als");
		deleteOld(path, "_desugared.choco");
	}

	var i=1;
	while (fs.existsSync(dir + "/alloy_solutions_" + i + ".xml")){
		fs.unlink(dir + "alloy_solutions_" + i + ".xml", function (err) {   //delete .cfr
  			if (err) throw err;
		});
		i++;
	}

	if (fs.existsSync(dir)){
		fs.rmdir(dir, function (err) {   //delete .cfr
  			if (err) throw err;
 			console.log("successfully deleted " + dir +" along with alloy_solutions");
		});
	}
//done cleanup
}

function deleteOld(path, ext){
	if (fs.existsSync(changeFileExt(path, '.cfr', ext))){
		fs.unlink(changeFileExt(path, '.cfr', ext), function (err) {   //delete .ext
			if (err) throw err;
 			console.log("successfully deleted " + changeFileExt(path, '.cfr', ext));
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
console.log('ClaferMooViz listening on port ' + port);
