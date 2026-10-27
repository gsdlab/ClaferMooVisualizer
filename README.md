ClaferMooVisualizer
===================

##### v0.5.5

Visualizes a set of non-dominated optimal variants (Pareto Front) and allows for exploration and trade-off analysis.
Read more in the paper [Visualization and Exploration of Optimal Variants in Product Line Engineering](http://gsd.uwaterloo.ca/publications/view/528). The current version can be used outside the product line domain: various design optimization problems, architecture exploration, packaging problems are supported.

ClaferMooVisualizer is part of Clafer Tools.
Read more in the paper [Clafer Tools for Product Line Engineering](http://gsd.uwaterloo.ca/publications/view/519).

### Live demo

* [ClaferMooVisualizer](https://wiselab.uwaterloo.ca:8092/), with the wikis [Clafer Model Wiki](https://wiselab.uwaterloo.ca/modelwiki/), [Railway Wiki](https://wiselab.uwaterloo.ca/railwaywiki/), and [Traffic Lights Wiki](https://wiselab.uwaterloo.ca/trafficlightswiki/), whose buttons open their models in the web tools

If the demo is down or you encounter a bug, please email [Michał Antkiewicz](mailto:michal.antkiewicz@uwaterloo.ca).

### Background

See [clafer.org](http://clafer.org).

### Functions

1. Displays all the non-dominated optimal product configurations as a *Bubble Front Graph* (up to 4 dimensions), a *Feature and Quality Matrix*, a *Spider Chart*, and as *Parallel Coordinates Chart*.
2. Allows to compare and analyze product configurations.
3. Allows for filtering by feature and by quality range.
4. Supports multiple solver backends.

Only static Clafer models are supported: optimization reports temporal (behavioral) models as not supported. Use ClaferIDE to edit them.

### Nature

ClaferMooVisualizer is a web-based application.
Its server side (implemented with `Node.js`) processes requests, runs the chosen back-end, and passes back its output.
The client-side is implemented using `JavaScript/HTML` and handles the visualization and exploration functionality.

Contributors
------------

* [Alexandr Murashkin](http://gsd.uwaterloo.ca/amurashk). Original developer.
* [Eldar Khalilov](http://gsd.uwaterloo.ca/ekhalilov). Developer. Upgrade to 0.4.2 (replace XML with JSON, test suites).
* [Michał Antkiewicz](https://uwaterloo.ca/waterloo-intelligent-systems-engineering-lab/profiles/michal-antkiewicz). Research Engineer. Requirements, development, architecture, testing, technology transfer.
* Neil Vincent Redman. co-op student Jan-Apr 2013. Many improvements.

Installation and running
------------------------

### Dependencies for running

* [Java Platform (JDK)](https://adoptium.net/) v17+
* [Clafer](https://github.com/gsdlab/clafer) v0.5.5
  * can be from the binary distribution
* [Node.js](https://nodejs.org/), tested with v26
* Backends' dependencies must be satisfied. See the backend installation steps below.

### Installation

**Core**

1. Download (`git clone`) [ClaferMooVisualizer](https://github.com/gsdlab/ClaferMooVisualizer) to some directory `<target directory>`
2. Go to `<target directory>/ClaferMooVisualizer` and execute

```
git submodule init
git submodule update
```

This will install the platform.

When working with a branch other then `master`, you need to additionally checkout that branch (e.g., `develop`):

```
git submodule foreach git checkout develop
```


3. Go to `<target directory>/ClaferMooVisualizer/Server` and execute

`npm install`

This will download all the required `Node.js` modules.

4. Install the backends `clafer`, `chocosolver` into some location `<bin>` found on `PATH`. The backends in `Server/Backends/backends.json` run them from `PATH`.

The fastest way is to unzip a binary distribution into the folder `<bin>`.

See [Installing Backends](https://github.com/gsdlab/ClaferToolsUICommonPlatform#backends) for detailed steps.

### Settings

1. Make sure the port `8092` is free, or change the value of the key `port` in `Server/config.json`:
`"port" = "8092"` to any free one.

Optional limits and settings in `Server/config.json`:

* `allowedModelURLs`: prefixes of the URLs from which models can be opened with `?claferFileURL=...`, for example the ClaferWiki URL `http://<wiki host>:<wiki port>/clafer/`; opening models from URLs is disabled when the list is empty
* `maxSessions` (default 50): the maximum number of concurrent sessions
* `maxUploadSize` (default 16 MB): the maximum size of a submitted model or instance data
* `uploadsPerMinute` (30), `commandsPerMinute` (300), `pollsPerMinute` (600): rate limits per client IP address
* `trustProxy`: Express's `trust proxy` setting when running behind a reverse proxy (e.g., `"loopback"` or `1`), so that the rate limits apply per client

The environment variables `ALLOWED_MODEL_URLS` (URL prefixes separated by spaces) and `TRUST_PROXY` override `allowedModelURLs` and `trustProxy`, e.g., when running in a container.

A model can import other models with `//# OPTIONS --import=...` (Clafer 0.5.4). Since a submitted model may come from anyone, the tool restricts its imports: only `.cfr` files: local files only from the tool's `Examples` folder (`--import=Examples/<file>.cfr`), and URLs only from public addresses and not served as web pages (e.g., `--import=https://example.org/models/design-space.cfr`). A model opened with `?claferFileURL=` imports relative to its URL, so a model next to it on the same server can be imported by its name; a server on a private address (e.g., a wiki on `localhost`) cannot serve imports.

2. Make sure `clafer`, `chocosolver`, `node`, and `java` are in `PATH` environment variables, so they can be executed without any path prefixes.

3. Running the following commands should produce the following results or later version:

`clafer --version`

> `Clafer 0.5.5`

`chocosolver --version`

> `chocosolver v0.5.5.2026-10-25`

`java -version`

> `openjdk version "17"`

`node -v`

> `v26.11.1`

4. Make sure `uploads` folder is accessible for writing, since temporary files will be stored there.

5. If you use Shell scipts (`.sh`) for running, make sure the scripts have `Execute` permissions.

### Running

* To run the server in a standard mode, execute

`cd <target directory>/ClaferMooVisualizer/Server/`

`node ClaferMooVisualizer.js`

* If you use `Node Supervisor` under Linux, you can execute

```sh
cd <target directory>/ClaferMooVisualizer/Server/commons
chmod +x start.sh
./start.sh
```

Then you can go to any browser and type `http://localhost:[port]/` and open any Clafer file with objectives in it.

### Trying an Example

* Choose `Mobile Phone Example (2 objectives)` example in the dropdown box in the upper-left corner of the tool window.
* Press `Optimize` button right in the front of the drop down list.
* The views will be populated with generated optimal instances.

### Important: Branches must correspond

All related projects are following the *simultaneous release model*.
The branch `master` contains releases, whereas the branch `develop` contains code under development.
When building the tools, the branches should match.
Releases from branches `master` are guaranteed to work well together.
Development versions from branches `develop` should work well together but this might not always be the case.

Need help?
==========

* Visit [language's website](http://clafer.org).
* Report issues to [issue tracker](https://github.com/gsdlab/ClaferMooVisualizer/issues)
