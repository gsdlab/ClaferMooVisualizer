ClaferMooVisualizer
===================

v0.3.4.20-9-2013

Visualizes a set of non-dominated optimal variants (Pareto Front) and allows for exploration and trade-off analysis.

### Background

[Clafer](http://clafer.org) is a general-purpose lightweight structural modeling language developed at [GSD Lab](http://gsd.uwaterloo.ca/), [University of Waterloo](http://uwaterloo.ca). Clafer can be used for *product-line modeling* and *multi-objective optimization*, whereby a the model of a product line can be used to find optimal products given a set of optimization goals. 

### Functions

1. Displays all the non-dominated optimal product configurations generated by [ClaferMoo](https://github.com/gsdlab/claferMooStandalone) as a *Bubble Front Graph* (up to 4 dimensions) and as a *Feature and Quality Matrix*.
2. Allows to compare and analyze product configurations.
3. Allows for filtering by feature and by quality range.  

### Nature

ClaferMoo Visualizer is a web-based application. Its server side (implemented with Node.JS) only runs ClaferMoo and passes back its output.
The client-side is implemented using Javascript/HTML and handles all the basic functionality.

### Live demo

[http://gsd.uwaterloo.ca:5002](http://gsd.uwaterloo.ca:5002)

Getting Clafer Tools
--------------------

Binary distributions of Clafer, ClaferIG, and ClaferWiki for Windows, Mac, and Linux, can be downloaded from [Clafer Tools - Binary Distributions](http://gsd.uwaterloo.ca/node/516). 
Clafer Wiki requires Haskell Platform and MinGW to run on Windows. 

In case these binaries do not work on your particular machine configuration, the tools can be easily built from source code, as described below.

The following tools are not part of the binary distribution and they have to be downloaded separately:

* [ClaferMOO](https://github.com/gsdlab/ClaferMooStandalone) is a set of scripts in Python (cross-platform). 
* ClaferMooVisualizer is a client/server web application written JavaScript.
* [ClaferConfigurator](https://github.com/gsdlab/ClaferConfigurator) is a client/server web application written JavaScript.

### Dependencies for running

* [Java Platform (JDK)](http://www.oracle.com/technetwork/java/javase/downloads/index.html) v6+, 32bit
* [Python](http://www.python.org/download/) v2.7.*
  * Needed by ClaferMOO
* [Clafer](https://github.com/gsdlab/clafer) v0.3.4
  * can be from the binary distribution
* [ClaferMoo](https://github.com/gsdlab/claferMooStandalone)
* [Node.JS Framework](http://nodejs.org/download/), v0.10.18

### Installation

1. Install [ClaferMooStandalone](https://github.com/gsdlab/claferMooStandalone) to some directory `<ClaferMooStandalone>`
  * Clafer is installed as part of this procedure
2. Download [ClaferMooVisualizer](https://github.com/gsdlab/claferMooVisualizer) to some directory `<target directory>`
3. Copy folders `spl_datagenerator` and `tools` folders from `<ClaferMooStandalone>/2012-models-clafermultiobjective-data-generator/` into `<target directory>/ClaferMooVisualizer/Server/ClaferMoo`
4. Go to `<target directory>/ClaferMooVisualizer/Server` and execute
	
 `npm install`

### Settings

1. Make sure the port `8080` is free, or change the value of the key `port` in `Server/config.json`:
`"port" = "8080"` to any free one. 

2. Make sure `clafer`, `node`, `python`, and `java` are in `PATH` environment variables, so they can be executed without any path prefixes.

Running the following commands should produce the following results or later version:

`clafer -V` 

> `Clafer v0.3.4.20-9-2013`

`python -V`

> `Python 2.7.5`

`java -version`

> `java version 1.7.0_25`

`node -v`

>v0.10.18

3. Make sure `uploads` folder is accessible for writing, since temporary files will be stored there.

4. Alloy solutions XML files are stored in the root, it is not fixed yet, so make sure the root folder is also writeable.

### Running

To run the server execute
	
`node server.js`
 
from `<target directory>/ClaferMooVisualizer/Server/`

Then you can go to any browser and type `http://localhost:[port]/` and open any Clafer file with objectives in it.

Need help?
==========
* See [Project's website](http://gsd.uwaterloo.ca/clafer) for news, technical reports and more
  * Check out a [Clafer tutorial](http://gsd.uwaterloo.ca/node/310)
  * Try live instance of [ClaferWiki](http://gsd.uwaterloo.ca:5001)
  * Try [Online translator](http://gsd.uwaterloo.ca/clafer/translator)
* Take a look at incomplete [Clafer wiki](https://github.com/gsdlab/clafer/wiki)
* Browse example models in the [test suite](https://github.com/gsdlab/clafer/tree/master/test/positive) and [MOO examples](https://github.com/gsdlab/clafer/tree/master/spl_configurator/dataset)
* Post questions, report bugs, suggest improvements [GSD Lab Bug Tracker](http://gsd.uwaterloo.ca:8888/questions/). Tag your entries with `clafermooviz` (so that we know what they are related to) and with `alexander-murashkin` or `michal` (so that Alex or Michał gets a notification).
