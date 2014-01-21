ClaferMooVisualizer
===================

v0.3.5.20-01-2014

Visualizes a set of non-dominated optimal variants (Pareto Front) and allows for exploration and trade-off analysis.
Read more in the paper [Visualization and Exploration of Optimal Variants in Product Line Engineering](http://gsd.uwaterloo.ca/publications/view/528).

ClaferMooVisualizer is part of Clafer Tools. 
Read more in the paper [Clafer Tools for Product Line Engineering](http://gsd.uwaterloo.ca/publications/view/519).

### Live demo

[Try me!](http://t3-necsis.cs.uwaterloo.ca:8092/)

If the demo is down or you encounter a bug, please email [Michal Antkiewicz](mailto:mantkiew@gsd.uwaterloo.ca).

### Background

[Clafer](http://clafer.org) is a general-purpose lightweight structural modeling language developed at [GSD Lab](http://gsd.uwaterloo.ca/), [University of Waterloo](http://uwaterloo.ca). 
Clafer can be used for *product-line modeling* and *multi-objective optimization*, whereby a the model of a product line can be used to find optimal products given a set of optimization goals. 

### Functions

1. Displays all the non-dominated optimal product configurations as a *Bubble Front Graph* (up to 4 dimensions) and as a *Feature and Quality Matrix*.
2. Allows to compare and analyze product configurations.
3. Allows for filtering by feature and by quality range.  
4. Allows to choose a back-end: a universal [ClaferMoo](https://github.com/gsdlab/claferMooStandalone) or [ClaferChocoSoo](https://github.com/gsdlab/ClaferChocoSoo) for single-objective optimization problems.

### Nature

ClaferMoo Visualizer is a web-based application. 
Its server side (implemented with Node.JS) processes requests, runs the chosen back-end and passes back its output.
The client-side is implemented using Javascript/HTML and handles all the visualization and exploration functionality.

Contributors
------------

* [Alexandr Murashkin](http://gsd.uwaterloo.ca/amurashk), MMath Candidate. Main developer.
* [Michał Antkiewicz](http://gsd.uwaterloo.ca/mantkiew), Research Engineer. Requirements, development, architecture, testing, technology transfer.
* Neil Vincent Redman, co-op student Jan-Apr 2013. Many improvements.

Getting Clafer Tools
--------------------

Binary distributions of the release 0.3.5 of Clafer Tools for Windows, Mac, and Linux, 
can be downloaded from [Clafer Tools - Binary Distributions](http://http://gsd.uwaterloo.ca/clafer-tools-binary-distributions). 
Clafer Wiki requires Haskell Platform and MinGW to run on Windows. 

In case these binaries do not work on your particular machine configuration, the tools can be built from source code, as described below.

### Dependencies for running

* [Java Platform (JDK)](http://www.oracle.com/technetwork/java/javase/downloads/index.html) v6+, 32bit
* [Python](http://www.python.org/download/) v2.7.*
  * Needed by ClaferMOO
* [Clafer](https://github.com/gsdlab/clafer) v0.3.4
  * can be from the binary distribution
* [ClaferMoo](https://github.com/gsdlab/claferMooStandalone) v0.3.4
* [Node.JS Framework](http://nodejs.org/download/), v0.10.18

### Installation

Core
--------------------

1. Download [ClaferMooVisualizer](https://github.com/gsdlab/claferMooVisualizer) to some directory `<target directory>`
2. Go to `<target directory>/ClaferMooVisualizer/Server` and execute
	
 `npm install`

3. Install the necessary backends using the steps below.

Backend: ClaferMoo
--------------------

1. Install [ClaferMooStandalone](https://github.com/gsdlab/claferMooStandalone) to some directory `<ClaferMooStandalone>`
  * Clafer is installed as part of this procedure
2. Go to `<target directory>/ClaferMooVisualizer/Server/Backends/` and create a folder called `ClaferMoo`
3. Copy folders `spl_datagenerator` and `tools` from `<ClaferMooStandalone>/2012-models-clafermultiobjective-data-generator/` into `<target directory>/ClaferMooVisualizer/Server/Backends/ClaferMoo`
4. Put (or check if it is there) the following code to `<target directory>/ClaferMooVisualizer/Server/Backends/backends.json`:

```javascript

{
    "backends": [
        {
            "id": "clafermoo_standard", 
            "label": "ClaferMoo", 
            "tool": "python", 
            "args": ["$dirname$/ClaferMoo/spl_datagenerator/IntegratedFeatureModelOptimizer.py", "$filepath$", "--preservenames"]
        }, 
        ....
    ]   
}
```

Backend: ClaferChocoSoo
--------------------

Refer to [this](https://github.com/gsdlab/ClaferChocoSoo) project.

### Important: Branches must correspond

All related projects are following the *simultaneous release model*. 
The branch `master` contains releases, whereas the branch `develop` contains code under development. 
When building the tools, the branches should match.
Releases from branches 'master` are guaranteed to work well together.
Development versions from branches `develop` should work well together but this might not always be the case.

### Settings

1. Make sure the port `8092` is free, or change the value of the key `port` in `Server/config.json`:
`"port" = "8092"` to any free one. 

2. Make sure `clafer`, `node`, `python`, and `java` are in `PATH` environment variables, so they can be executed without any path prefixes.

Running the following commands should produce the following results or later version:

`clafer -V` 

> `Clafer v0.3.5.20-01-2014`

`python -V`

> `Python 2.7.5`

`java -version`

> `java version 1.7.0_25`

`node -v`

>v0.10.20

3. Make sure `uploads` folder is accessible for writing, since temporary files will be stored there.

4. Alloy solutions XML files are stored in the root, it is not fixed yet, so make sure the root folder is also writeable.

### Running

To run the server execute
	
`node server.js`
 
from `<target directory>/ClaferMooVisualizer/Server/`

Then you can go to any browser and type `http://localhost:[port]/` and open any Clafer file with objectives in it.

Need help?
==========
* See [language's website](http://clafer.org) for news, technical reports and more
  * Check out a [Clafer tutorial](http://t3-necsis.cs.uwaterloo.ca:8091/Tutorial/Intro)
  * Try a live instance of [ClaferWiki](http://t3-necsis.cs.uwaterloo.ca:8091)
  * Try a live instance of [ClaferIDE](http://t3-necsis.cs.uwaterloo.ca:8094)
  * Try a live instance of [ClaferConfigurator](http://t3-necsis.cs.uwaterloo.ca:8093)
  * Try a live instance of [ClaferMooVisualizer](http://t3-necsis.cs.uwaterloo.ca:8092)
* Take a look at (incomplete) [Clafer wiki](https://github.com/gsdlab/clafer/wiki)
* Browse example models in the [test suite](https://github.com/gsdlab/clafer/tree/master/test/positive) and [MOO examples](https://github.com/gsdlab/clafer/tree/master/spl_configurator/dataset)
* Post questions, report bugs, suggest improvements [GSD Lab Bug Tracker](http://gsd.uwaterloo.ca:8888/questions/). Tag your entries with `clafermooviz` (so that we know what they are related to) and with `alexander-murashkin` or `michal` (so that Alex or Michał gets a notification).
