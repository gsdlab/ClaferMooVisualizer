##### ClaferMooVisualizer Version 0.5.7, unreleased

Minor release with Clafer 0.5.7.

* The Feature and Quality Matrix and the labels of the objectives show the clafers by their UIDs, which are their names since Clafer 0.5.7, qualified only where a name is not unique (`x__size`). They cut `c<digits>_` out of the UIDs, which also cut `abc_def` to `abdef`.
* The client libraries jQuery, jQuery Form, d3, lodash and Chosen are npm dependencies in `package.json`, served from `node_modules` (ClaferToolsUICommonPlatform), so that `npm audit` and Dependabot report their vulnerabilities; they were copies in the commons. Chosen is upgraded from 1.0.0 to 1.8.7, and the HTML5 placeholder shim for old browsers is removed.
* The client code no longer uses jQuery APIs deprecated in jQuery 3 (`.bind`, `.unbind`, `.delegate`, `.hover` and event shorthands such as `.click()`), a step towards jQuery 4.
* multer 2.5.0 and body-parser 1.20.9 (of express) fix denial-of-service advisories of the server.
* The editor is Ace 1.45.2, an npm dependency like the other client libraries, instead of a copy of Ace 1.1 from 2013 in the commons; the Clafer and console highlighting modes are ported to it.
* The server runs on Express 5.3 (was 4.22), whose support continues, and express-rate-limit 8.7.3.
* jQuery 4.0.0 (was 3.7.1). The forms are sent with $.ajax and FormData instead of the unmaintained jQuery Form plugin, and the clafers of the model are suggestions of the field Clafer name(s) of the custom scope (a datalist) instead of the drop-down of the unmaintained Chosen plugin; choosing one fills in its scope.
* The editor highlights Clafer like the VS Code extension: the temporal keywords (`always`, `eventually`, `until`, `initially`, `never`, ...), `initial`, `final`, `assert`, `enum`, `if`/`then`/`else`, `parent`, `dref` and the transition arrows. Braces `{ }` were shown as comments and apostrophes in names (`x'`) as strings, and keywords were case-insensitive.
* Tooltips are the browser's own instead of the tipsy plugin (2010), which is removed.
* The client code uses the browser's own array functions and optional chaining instead of lodash, which is no longer a dependency.
* Removing a variant with its button in the Feature and Quality Matrix no longer selects it as well, which made the Spider Chart fail on the removed variant.

##### ClaferMooVisualizer Version 0.5.6, Nov 1, 2026

Minor release with Clafer 0.5.6.

* Selecting variants: a click on a bubble or a line of the parallel coordinates could do nothing, so the variant was not added to the spider chart and the variant comparer. Hovering moved the element to the front under the pointer, and the browser then sent no click.
* The help pages are shown with their styles, images and the title and version of the tool: their paths broke when the tool moved to relative URLs in 0.5.5.

##### ClaferMooVisualizer Version 0.5.5, Oct 27, 2026

Minor release with Clafer 0.5.5.

* Models can use decimals, a new primitive type `decimal` with a fixed number of fractional digits (Clafer 0.5.5), also in the objectives, e.g., `<< max total >>` with `total -> decimal`. The Feature and Quality Matrix shows a reference to a decimal as a number, like a reference to an integer; the editor highlights `decimal`.
* Example `Bike.cfr`: a bike with decimal costs and weights.
* The Choco-based backend is described as Choco 6 (chocosolver 0.5.5 uses choco-solver 6.0.2).
* The buttons **URL** and **import** next to the example selector copy the URL of the selected example, to import it into a model elsewhere, and the line `//# OPTIONS --import=Examples/<file>.cfr`, for a model in this tool. Nothing showed the URL of an example. The welcome window, the help and the README explain them.
* The tool can be served under a path behind a reverse proxy, e.g., `https://wiselab.uwaterloo.ca/clafervisualizer/` instead of the port 8092, since its pages and requests use relative URLs (ClaferToolsUICommonPlatform). The live demo link points there.

##### ClaferMooVisualizer Version 0.5.4, Oct 25, 2026

Minor release with Clafer 0.5.4.

* Models can import other models with `//# OPTIONS --import=...` ([gsdlab/clafer#100](https://github.com/gsdlab/clafer/issues/100)). Since a submitted model may come from anyone, its imports are restricted: only `.cfr` files, local files only from the tool's `Examples` folder (`--import=Examples/<file>.cfr`), and URLs only from public addresses. A model opened with `?claferFileURL=` imports relative to its URL.
* Messages give positions as `model.cfr:line:column` and no longer show the server's folders.
* The welcome window can be closed again: with jQuery 3, its gray backdrop stayed over the page.
* The live demo and model wiki links point to wiselab.uwaterloo.ca.
* [Release](https://github.com/gsdlab/ClaferMooVisualizer/pull/28)

##### ClaferMooVisualizer Version 0.5.3, Oct 15, 2026

Minor release with Clafer 0.5.3.

* Runs on current Node.js: Express 4 instead of Express 3, with multer for the uploads; `package-lock.json` pins the dependencies.
* Reads the JSON IR of Clafer 0.5.3. Temporal models are reported as not supported: optimization works only with static models.
* The example models set their integer ranges in `//# OPTIONS` (`--minint`, `--maxint`), which silently restricted or emptied their optimal instances before.
* The Choco backend runs the `chocosolver` command from `PATH` instead of a fixed path to `chocosolver.jar`.
* Upgraded client libraries: jQuery 3.7.1, lodash 4.18.1, jquery.form 4.3.0 and d3 3.5.17.
* Hardened server: validated uploads, security headers, size and rate limits, errors without stack traces; models can be opened with `?claferFileURL=` only from the URLs in `allowedModelURLs` (or `ALLOWED_MODEL_URLS`).
* [Release](https://github.com/gsdlab/ClaferMooVisualizer/pull/27)

Earlier versions: see the repository's tags.
