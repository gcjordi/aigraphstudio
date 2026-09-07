# Third-party licenses

AI Graph Studio 1.0.0 ships **no third-party runtime libraries, vendored packages, web fonts or remotely loaded assets**. All JavaScript, CSS, SVG interface geometry and documentation in this package are authored for the project. Native browser APIs do not add a redistributed library dependency.

The project is distributed under the MIT License in `LICENSE`.

Development/verification used the environment's Node.js, Python and Chrome browser. These tools are not bundled or required by the deployed application. Node.js is optional only for rerunning `tests/core.test.mjs`; the application needs no Node server. No third-party executable code was copied from those tools into the package.

Provider and framework names are descriptive references only. Their respective trademarks remain with their owners; no affiliation or endorsement is implied. Manual model catalog entries do not bundle model weights or provider software.
