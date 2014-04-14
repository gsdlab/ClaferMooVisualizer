ClaferMooVisualizer
===================

v0.3.6.15-04-2014

Visualizes a set of non-dominated optimal variants (Pareto Front) and allows for exploration and trade-off analysis.
Read more in the paper [Visualization and Exploration of Optimal Variants in Product Line Engineering](http://gsd.uwaterloo.ca/publications/view/528).

ClaferMooVisualizer is part of Clafer Tools. 
Read more in the paper [Clafer Tools for Product Line Engineering](http://gsd.uwaterloo.ca/publications/view/519).

### Live demo

* Master branch (stable and released): [Try me!](http://t3-necsis.cs.uwaterloo.ca:8092/)
* Develop branch (with newest features, but not guaranteed to be stable): [Try me!](http://t3-necsis.cs.uwaterloo.ca:8192/)

If the demo is down or you encounter a bug, please email [Michal Antkiewicz](mailto:mantkiew@gsd.uwaterloo.ca).

### Background

[Clafer](http://clafer.org) is a general-purpose lightweight structural modeling language developed at [GSD Lab](http://gsd.uwaterloo.ca/), [University of Waterloo](http://uwaterloo.ca). 
Clafer can be used for *product-line modeling* and *multi-objective optimization*, whereby a the model of a product line can be used to find optimal products given a set of optimization goals. 

### Functions

1. Displays all the non-dominated optimal product configurations as a *Bubble Front Graph* (up to 4 dimensions) and as a *Feature and Quality Matrix*.
2. Allows to compare and analyze product configurations.
3. Allows for filtering by feature and by quality range.  
4. Supports multiple  backends.

### Nature

ClaferMoo Visualizer is a web-based application. 
Its server side (implemented with `Node.JS`) processes requests, runs the chosen back-end and passes back its output.
The client-side is implemented using Javascript/HTML and handles all the visualization and exploration functionality.

Contributors
------------

* [Alexandr Murashkin](http://gsd.uwaterloo.ca/amurashk), MMath Candidate. Main developer.
* [Michał Antkiewicz](http://gsd.uwaterloo.ca/mantkiew), Research Engineer. Requirements, development, architecture, testing, technology transfer.
* Neil Vincent Redman, co-op student Jan-Apr 2013. Many improvements.

Getting Binaries
--------------------

Binary distributions of the release 0.3.6 of Clafer Tools for Windows, Mac, and Linux, 
can be downloaded from [Clafer Tools - Binary Distributions](http://http://gsd.uwaterloo.ca/clafer-tools-binary-distributions). There you can get binaries for `Clafer Compiler` and the `ClaferChocoIG` backend.

Installation and running
--------------------

### Dependencies for running

* [Java Platform (JDK)](http://www.oracle.com/technetwork/java/javase/downloads/index.html) v7+, 32bit
* [Clafer](https://github.com/gsdlab/clafer) v0.3.6
  * can be from the binary distribution
* [Node.JS Framework](http://nodejs.org/download/), v0.10.20
* Backends' dependencies must be satisfied. See the backend installation steps below

### Installation

**Core**

1. Download (`git clone`) [ClaferMooVisualizer](https://github.com/gsdlab/claferMooVisualizer) to some directory `<target directory>`
2. Go to `<target directory>/ClaferMooVisualizer` and execute
	
 `git submodule init`

 `git submodule update`

  This will install the platform

3. Go to `<target directory>/ClaferMooVisualizer/Server` and execute
	
 `npm install`

  This will download all the required `Node.JS` modules.

4. Install the necessary backends using the steps below.

**Backend: ClaferChocoIG**

This assumes you use the default configuration `<target directory>/ClaferMooVisualizer/Server/Backends/backends.json` file.

1. Install [Java 7+](http://www.oracle.com/technetwork/java/javase/downloads/index.html).

2. Copy the binary of `ClaferChocoIG` (`claferchocoig-0.3.6-jar-with-dependencies.jar`) into the folder `<target directory>/ChocoIG`.

**Backend: ClaferZ3**

This assumes you use the default configuration `<target directory>/ClaferMooVisualizer/Server/Backends/backends.json` file.

1. Refer to the [ClaferZ3](https://github.com/gsdlab/ClaferZ3/) installation requirements. This should install `Python 3`, `PIP` and `Z3`.

2. Install `ClaferZ3` into the folder `<target directory>/ClaferZ3`.

### Settings

1. Make sure the port `8192` is free, or change the value of the key `port` in `Server/config.json`:
`"port" = "8192"` to any free one. 

2. Make sure `clafer`, `node`, `python`, and `java` are in `PATH` environment variables, so they can be executed without any path prefixes.

3. Running the following commands should produce the following results or later version:

`clafer -V` 

> `Clafer v0.3.5.20-01-2014`

`java -version`

> `java version 1.7.0_25`

`node -v`

> `v0.10.20`

4. Make sure `uploads` folder is accessible for writing, since temporary files will be stored there.

5. If you use Shell scipts (`.sh`) for running, make sure the scripts have `Execute` permissions. 

### Running

* To run the server in a standard mode, execute
	
`cd <target directory>/ClaferMooVisualizer/Server/`
`node ClaferMooVisualizer.js`

* If you use `Node Supervisor` under Linux, you can execute
`cd <target directory>/ClaferMooVisualizer/Server/commons`
`sh start.sh`

Then you can go to any browser and type `http://localhost:[port]/` and open any Clafer file with objectives in it.

### Trying an Example

* Choose `Simple model of a Person` example in the dropdown box in the upper-left corner of the tool window
* Press `Compile` button right in the front of the drop down list.
* Once you see the compilation is complete, go to `Instance Generator` view and press `Run` there (the default backend is `Alloy-based IG (IG only)`.
* The `Output` view should print the first generated instance.

### Important: Branches must correspond

All related projects are following the *simultaneous release model*. 
The branch `master` contains releases, whereas the branch `develop` contains code under development. 
When building the tools, the branches should match.
Releases from branches `master` are guaranteed to work well together.
Development versions from branches `develop` should work well together but this might not always be the case.

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
