# Angular base

## Prerequisites
In order for the solution to run you need to have the following software installed on your computer:

-  Node.js (with Node Package Manager/NPM) from: http://nodejs.org/download/
-  Grunt (JavaScript task runner) installed globally using NPM: `npm install -g grunt-cli`
- Bower (package manager) installed globally using NPM: `npm install -g bower`


## Getting started
Once you've cloned or downloaded the code repository to your local machine, `cd` into the project folder and run the following commands from a console to get up and running:

- `npm install` to install the Node.js dependencies for the project.
- `bower install` to install the project's frontend dependencies.


## Development
When you're ready to start developing, (depending on your needs) you can start the following processes (in separate terminal windows):

- `grunt watch` which will concatenate the JavaScript files; compile the LESS files into CSS which the browser can interpret.

- `npm start` which launches the built-in web-server (source: https://weblogs.asp.net/lduveau/visual-studio-code-and-local-web-server).


#### Angular HTML Templates
A Grunt task automatically concatenates all of the Angular templates into the `compiled/templates.js` file using Angular's `$templateCache` functionality, which means that the templates can be referenced via the `templateUrl` property as you normally would an HTML-file, e.g. `templateUrl: "/ng/_directives/navigation/navigation.html"`, but instead of this requiring an additional XHR, the template will be served directly from the template cache.