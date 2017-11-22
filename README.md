# Angular base
The purpose of the Angular base is to make it (very) quick and easy for you to start developing your AngularJS (1.x) application, without having to worry about getting all of the basic components to work together, e.g.:

- Preprocessing **LESS** files.
- Concatenating **JavaScript** files.
- Adding Angular HTML templates to Angular's **templateCache** (JavaScript) so you don't have to worry about your uses being presented with obsolete versions.

In addition, Angular base provides the following extensions to AngularJS:
- **Angular UI-Router** ([link](https://github.com/angular-ui/ui-router), which provides flexible routing in Angular.
- **Angular translate** ([link](https://github.com/angular-translate/angular-translate), which makes it easy to make your application support multiple languages.
    - **Pluralization for Angular translate** ([link](https://angular-translate.github.io/docs/#/guide/14_pluralization), which enables your translation keys to adapt to their context, e.g. "nothing", "one thing", "two things", "many things".
- **Angular HTTP batcher** ([link](https://github.com/jonsamwell/angular-http-batcher), which enables multiple API-calls to be batched together to reduce network traffic.
- **Restangular** ([link](https://github.com/mgonto/restangular), which simplifies common `POST`, `GET`, `PATCH`, `UPDATE` and `DELETE` requests when working with RESTful APIs (refer to [this blog post](https://adambarry.wordpress.com/2016/04/18/thoughts-on-flexible-restful-apis/)).


## Structure
The project advocates the following file/folder-structure which works beautifully with Angular's nested scopes (note that filenames differ from (and contains less files than) the repository for explanatory purposes):

1) `ng` - the main folder for all Angular related files.
    1) `_controllers`
    1) `_directives`
    1) `_services`
    1) `_views`
    1) `ChildTheme`
        1) `_controllers`
            1) `ChildThemeCtrl.js`
        1) `_directives`
        1) `_services`
        1) `_views`
            1) `ChildTheme.html`
        1) `GrandChildTheme`
            1) `_controllers`
                1) `GrandChildThemeCtrl.js`
            1) `_directives`
            1) `_services`
            1) `_views`
                1) `GrandChildTheme.html`
            1) `GrandChildStates.js`
            1) `GrandChildThemeCtrl.js`
        1) `ChildStates.js`
        1) `ChildThemeCtrl.js`
    1) `MainStates.js`
    1) `MainCtrl.Js`


## Prerequisites
In order for the solution to run you need to have the following software installed on your computer:

1) **Node.js** (with Node Package Manager/NPM) from: http://nodejs.org. When installed the remainder of the prerequisites can be installed using NPM via a terminal window.
1) **Grunt** (JavaScript task runner) installed globally using NPM: `npm install -g grunt-cli`
1) **Bower** (package manager) installed globally using NPM: `npm install -g bower`


## Getting started
Once you've cloned or downloaded the code repository to your local machine, `cd` into the project folder and run the following commands from a console to get up and running:

1) `npm install` to install the Node.js dependencies for the project.
1) `bower install` to install the project's frontend dependencies.


## Development
When you're ready to start developing, (depending on your needs) you can start the following processes (in separate terminal windows as they each run until stopped/aborted by typing `ctrl c` in a said terminal window):

- `grunt watch` which will continuously perform the following actions/tasks when changes occur:
    1) concatenate the JavaScript files.
    1) compile the LESS files into CSS which the browser can interpret.
    1) concatenate all of the Angular HTML templates into the `compiled/templates.js` file using Angular's `$templateCache` functionality, which means that the templates can be referenced via the `templateUrl` property as you normally would an HTML-file, e.g. `templateUrl: "/ng/_directives/navigation/navigation.html"`, but instead of this requiring an additional XHR, the template will be served directly from the template cache.
- `npm start` which launches the built-in web-server (source: https://weblogs.asp.net/lduveau/visual-studio-code-and-local-web-server).