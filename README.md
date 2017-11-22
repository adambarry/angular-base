# Angular base

## Prerequisites
In order for the solution to run you need to have the following software installed on your computer:

1)  Node.js (with Node Package Manager/NPM) from: http://nodejs.org/download/
1)  Grunt (JavaScript task runner) installed globally using NPM: `npm install -g grunt-cli`
1) Bower (package manager) installed globally using NPM: `npm install -g bower`


## Getting started
Once you've cloned or downloaded the code repository to your local machine, `cd` into the project folder and run the following commands from a console to get up and running:

1) `npm install` to install the Node.js dependencies for the project.
1) `bower install` to install the project's frontend dependencies.


## Development
When you're ready to start developing, (depending on your needs) you can start the following processes (in separate terminal windows):

- `grunt watch` which will continuously when changes occur:
    1) concatenate the JavaScript files.
    1) compile the LESS files into CSS which the browser can interpret.
    1) concatenate all of the Angular HTML templates into the `compiled/templates.js` file using Angular's `$templateCache` functionality, which means that the templates can be referenced via the `templateUrl` property as you normally would an HTML-file, e.g. `templateUrl: "/ng/_directives/navigation/navigation.html"`, but instead of this requiring an additional XHR, the template will be served directly from the template cache.

- `npm start` which launches the built-in web-server (source: https://weblogs.asp.net/lduveau/visual-studio-code-and-local-web-server).

... the terminal tasks can be stopped/aborted by typing `ctrl c` in the said terminal window.