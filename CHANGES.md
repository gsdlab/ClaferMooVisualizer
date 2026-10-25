##### ClaferMooVisualizer Version 0.5.4, unreleased

Minor release with Clafer 0.5.4.

* Models can import other models with `//# OPTIONS --import=...` ([gsdlab/clafer#100](https://github.com/gsdlab/clafer/issues/100)). Since a submitted model may come from anyone, its imports are restricted: only `.cfr` files, local files only from the tool's `Examples` folder (`--import=Examples/<file>.cfr`), and URLs only from public addresses. A model opened with `?claferFileURL=` imports relative to its URL.
* Messages give positions as `model.cfr:line:column` and no longer show the server's folders.
* The welcome window can be closed again: with jQuery 3, its gray backdrop stayed over the page.
* The live demo and model wiki links point to wiselab.uwaterloo.ca.

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
