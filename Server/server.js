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
var url = require("url");
var sys = require("sys");
var fs = require("fs");
var path = require('path');
var express = require('express');
var spawn = require('child_process').spawn;    

var config = require('./config.json');
var backendConfig = require('./Backends/backends.json');
var formatConfig = require('./Formats/formats.json');

var lib = require("./commons/common_lib");
var core = require("./commons/core_lib");

/*  Rate Limiter */
var rate            = require('express-rate/lib/rate'),
  redis     = require('redis'),
  client      = redis.createClient();

var redisHandler = new rate.Redis.RedisRateHandler({client: client});
var commandMiddleware = rate.middleware({handler: redisHandler, interval: config.commandLimitingRate.interval, limit: config.commandLimitingRate.limit}); // limiting command sending
var pollingMiddleware = rate.middleware({handler: redisHandler, interval: config.pollingLimitingRate.interval, limit: config.pollingLimitingRate.limit}); // limiting polling
var fileMiddleware = rate.middleware({handler: redisHandler, interval: config.fileRequestLimitingRate.interval, limit: config.fileRequestLimitingRate.limit}); // limiting requesting files

/* ----- */

var port = config.port;

var server = express();

server.use("/commons/Client", express.static(__dirname + '/commons/Client'));
server.use("/Client", express.static(__dirname + '/Client'));
//server.use(express.static(__dirname + '/commons/Client'));
//server.use(express.static(__dirname + '/Client/'));
server.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/uploads' }));

//-------------------------------------------------
// Standard GET request
//-------------------------------------------------
// Response: File contents
server.get('/', fileMiddleware, function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html"});    
    res.end(lib.getMainHTML());

});

//server.get('/commons/Client/:file', function(req, res) {
//    res.sendfile('commons/Client/' + req.params.file);
//});

//server.get('/commons/Client/modules/:file', function(req, res) {
//    res.sendfile('commons/Client/modules/' + req.params.file);
//});

//-------------------------------------------------
// File requests
//-------------------------------------------------

server.get('/Examples/:file', fileMiddleware, function(req, res) {
    res.sendfile('Examples/' + req.params.file);
});

server.get('/Backends/:file', fileMiddleware, function(req, res) {
    res.sendfile('Backends/' + req.params.file);
});

server.get('/Formats/:file', fileMiddleware, function(req, res) {
    res.sendfile('Formats/' + req.params.file);
});

server.get('/htmlwrapper', fileMiddleware, function(req, res) {
    res.sendfile("commons/Client/compiler_html_wrapper.html");
});

//------------------- save format request --------------------------
server.get('/saveformat', fileMiddleware, function(req, res) {
    
    if (!req.query.windowKey)
        return;

    core.logSpecific("Save format request", req.query.windowKey);

    var process = core.getProcess(req.query.windowKey);
    if (process == null)
    {
        res.writeHead(400, { "Content-Type": "text/html"});    
        res.end("process_not_found");        
        return;
    }

    var formatId = req.query.fileid;
    var found = false;
    var result = null;
    var suffix = "";
            // looking for a backend

    for (var j = 0; j < process.compiled_formats.length; j++)
    {
        if (process.compiled_formats[j].id == formatId)
        {
            found = true;
            result = process.compiled_formats[j].result;
            suffix = process.compiled_formats[j].fileSuffix;
            break;
        }
    }

    if (!found)
    {
        core.logSpecific("Error: Format was not found within the process", req.query.windowKey);
        res.writeHead(400, { "Content-Type": "text/html"});    
        res.end("Error: Could not find the format within a process data by its submitted id: " + formatId);
        return;
    }
        
    res.writeHead(200, { "Content-Type": "text/html",
                                 "Content-Disposition": "attachment; filename=compiled" + suffix});
    res.end(result);
});

/*
 * "Compile" command
 * This is related to any time of submissions done using the Input view: compiling a file, example or text, etc.
 */

function runOptimization(process)
{
    var key = process.windowKey;
    var process = core.getProcess(key);
    var backendId = process.optimization_backend;
    core.logSpecific("Backend: " + backendId, key);

    // looking for a backend
    var backend = core.getBackend(backendId);
    if (!backend)
    {
        core.logSpecific("Error: Backend was not found", key);
        res.writeHead(400, { "Content-Type": "text/html"});
        res.end("Error: Could not find the backend by its submitted id.");
        return;
    }

    // looking for a format
    var format = core.getFormat(backend.accepted_format);
    if (!format)
    {
        core.logSpecific("Error: Required format was not found", key);
        resultMessage = "Error: Could not find the required file format.";
        isError = true;
        return;
    }

    core.logSpecific(backend.id + " ==> " + format.id, key);
    process.mode_completed = false;

    var fileAndPathReplacement = [
            {
                "needle": "$dirname$", 
                "replacement": __dirname + "/Backends"
            },
            {
                "needle": "$filepath$", 
                "replacement": process.file + format.file_suffix
            }
        ];

    var args = core.replaceTemplateList(backend.tool_args, fileAndPathReplacement);

    core.logSpecific(args, key);

    process.tool = spawn(core.replaceTemplate(backend.tool, fileAndPathReplacement), args, { cwd: process.folder });

    process.tool.on('error', function (err){
        core.logSpecific('ERROR: Cannot run the chosen backend. Please check whether it is installed and accessible.', req.body.windowKey);
        var process = core.getProcess(key);
        if (process != null)
        {
            process.result = '{"message": "' + lib.escapeJSON("Error: Cannot run the chosen backend") + '"}';
            process.completed = true;
            process.tool = null;
        }
    });

    process.tool.stdout.on("data", function (data)
    {
        console.log(data.toString());
        var process = core.getProcess(key);
        if (process != null)
        {
            if (!process.completed)
            {
                process.freshData += data;
            }
        }
    });

    process.tool.stderr.on("data", function (data)
    {
        console.log(data.toString());
        var process = core.getProcess(key);
        if (process != null)
        {
            if (!process.completed){
                process.freshError += data;
            }
        }
    });

    process.tool.on("close", function (code)
    {
        console.log("ERROR: " + code);

        var process = core.getProcess(key);
        if (process != null)
        {
            process.mode_completed = true;
            process.code = code;
            process.tool = null;
        }                
    });

}

server.post('/upload', commandMiddleware, function(req, res, next) 
{
    lib.handleUploads(req, res, next, fileReady);

    function fileReady(uploadedFilePath, dlDir, loadedViaURL)
    {        

        var loadExampleInEditor = req.body.loadExampleInEditor;
        if (loadedViaURL)
        {
            loadExampleInEditor = true;
        }

        var key = req.body.windowKey;

        // read the contents of the uploaded file
        fs.readFile(uploadedFilePath + ".cfr", function (err, data) {

            var file_contents;
            if(data)
                file_contents = data.toString();
            else
            {
                res.writeHead(500, { "Content-Type": "text/html"});
                res.end("No data has been read");
                lib.cleanupOldFiles(dlDir);
                return;
            }
            
            core.logSpecific("Compiling...", req.body.windowKey);

            core.addProcess({ 
                windowKey: req.body.windowKey, 
                toRemoveCompletely: false, 
                tool: null, 
                freshData: "", 
                scopes: "",
                folder: dlDir, 
                clafer_compiler: null,
                file: uploadedFilePath, 
                mode : "compiler", 
                freshError: ""});    


            var ss = "--ss=none";

            core.logSpecific(req.body.ss, req.body.windowKey);

            if (req.body.ss == "simple")
            {
                ss = "--ss=simple";
            }
            else if (req.body.ss == "full")
            {
                ss = "--ss=full";
            }

            var specifiedArgs = core.filterArgs(req.body.args);
            var genericArgs = [ss, uploadedFilePath + ".cfr"];

            var process = core.getProcess(req.body.windowKey);

            if (loadExampleInEditor)
                process.model = file_contents;
            else
                process.model = "";                                   

            process.optimization_backend = req.body.optimizationBackend;

            lib.runClaferCompiler(req.body.windowKey, specifiedArgs, genericArgs, function()
            {
                process.mode_completed = true;
            });

            core.timeoutProcessSetPing(process);

            res.writeHead(200, { "Content-Type": "text/html"});
            res.end("OK"); // we have to return a response right a way to avoid confusion.               
        });
    }
});

/* =============================================== */
// POLLING Requests
/* ------------------------------------------*/

/*
 * Handle Polling
 * The client will poll the server to get the latest updates or the final result
 * Polling is implemented to solve the browser timeout problem.
 * Moreover, this helps to control the execution of a tool: to stop, or to get intermediate results.
 * An alternative way might be to create a web socket
 */

server.post('/poll', pollingMiddleware, function(req, res, next)
{
    var process = core.getProcess(req.body.windowKey);
    if (process == null)
    {
        res.writeHead(404, { "Content-Type": "application/json"});
        res.end('{"message": "Error: the requested process is not found."}');     
        // clearing part
        core.cleanProcesses();
        core.logSpecific("Client polled", req.body.windowKey);
        return;
    }

    if (req.body.command == "ping") // normal ping
    {               
        core.timeoutProcessClearPing(process);

        if (process.mode_completed) // the execution of the current mode is completed
        {
            if (process.mode == "compiler") // if the mode completed is compilation
            {      
                // finished compilation. Start optimization right a way.
//                console.log("COMPLETED COMPILER");

                core.timeoutProcessSetPing(process);

                var jsonObj = new Object();
                jsonObj.message = "Working";
                jsonObj.compiled_formats = process.compiled_formats;
                jsonObj.args = process.compiler_args;
                jsonObj.compiler_message = process.compiler_message;

                process.compiler_args = "";
                res.writeHead(200, { "Content-Type": "application/json"});
                res.end(JSON.stringify(jsonObj));

                process.mode = "ig";
                process.mode_completed = false;
                runOptimization(process);
            }
            else
            {
//                console.log("COMPLETED MOO");
                var jsonObj = new Object();
                var data_result = process.freshData;
                process.freshData = "";

                var error_result = process.freshError;
                process.freshError = "";

                console.log("Preparing to send the result...");
                
                var code = process.code;

                if (error_result.indexOf('Exception in thread "main"') > -1)
                {
                    code = 1;
                }

                if (code === 0) 
                {               
                    var parts = data_result.split("=====");
                    
                    if (parts.length != 2)
                    {
                        jsonObj.optimizer_message = 'Error, instances and normal text must be separated by "====="';
                        console.log(data_result);
                    }
                    else
                    {
                    
                        var message = parts[0]; //
                        console.log(message);
                        var instances = parts[1]; // 
                        // todo : error handling
                        
                        console.log(process.file + '.xml');
                        var xml = fs.readFileSync(process.file + '.xml');
                        // this code assumes the backend should produce an XML,
                        // which is not the correct way
                        
                        jsonObj.optimizer_message = message;
                        jsonObj.optimizer_instances = instances;
                        jsonObj.optimizer_claferXML = xml.toString();
                    }
                }
                else 
                {
                    jsonObj.optimizer_message = 'Error, return code: ' + code + '\n' + error_result;
                    console.log(data_result);
                }

                jsonObj.model = process.model;

                if (code == 0)
                {
                    res.writeHead(200, { "Content-Type": "application/json"});
                }
                else
                {
                    res.writeHead(400, { "Content-Type": "application/json"});
                }                

                jsonObj.message = jsonObj.optimizer_message;

                res.end(JSON.stringify(jsonObj));

                // if mode is completed, then the tool is not busy anymore, so now it's time to 
                // set inactivity timeout

                core.timeoutProcessClearInactivity(process);
                core.timeoutProcessSetInactivity(process);

            }

        }   
        else // still working
        {
//            console.log("WORKING");
            core.timeoutProcessSetPing(process);

            res.writeHead(200, { "Content-Type": "application/json"});
            var jsonObj = new Object();
            jsonObj.message = "Working";
            jsonObj.args = process.compiler_args;
            process.compiler_args = "";
            res.end(JSON.stringify(jsonObj));

            console.log(jsonObj.message);
        }
    }
    else // if it is cancel
    {
        process.toKill = true;
        core.timeoutProcessClearPing(process);

        // starting inactivity timer
        core.timeoutProcessClearInactivity(process);
        core.timeoutProcessSetInactivity(process);

        res.writeHead(200, { "Content-Type": "application/json"});

        var jsonObj = new Object();
        jsonObj.message = "Cancelled";
        jsonObj.scopes = "";
        jsonObj.compiler_message = "Cancelled compilation";
        jsonObj.completed = true;
        res.end(JSON.stringify(jsonObj));

        core.logSpecific("Cancelled: " + process.toKill, req.body.windowKey);
    }
    
    // clearing part
    core.cleanProcesses();
    core.logSpecific("Client polled", req.body.windowKey);
    
});

/*
 * Catch all the rest. Error reporting for unknown routes
 */
server.use(function(req, res, next)
{
    core.logSpecific(req.url, null);
    res.send(404, "Sorry can't find that!");
});

//================================================================
// Initialization Code
//================================================================

core.logNormal('===============================');
core.logNormal('| Clafer Moo Visualizer v0.3.5.??-??-???? |');
core.logNormal('===============================');

core.addDependency("clafer", ["-V"], "Clafer Compiler");
core.addDependency("java", ["-version"], "Java");
core.runWithDependencyCheck(function(){
    server.listen(port);
    core.logNormal('======================================');
    core.logNormal('Ready. Listening on port ' + port);        
});
