# Angular base
The purpose of the Angular base is to make it (very) quick and easy for you to start developing your AngularJS (1.x) application, without having to worry about getting all of the basic components to work together, e.g.:

- Preprocessing **LESS** files.
- Concatenating **JavaScript** files.
- Adding Angular HTML templates to Angular's **templateCache** (JavaScript) so you don't have to worry about your users being presented with obsolete versions (of user interfaces).

In addition, Angular base provides the following extensions to AngularJS:
- **Angular UI-Router** ([link](https://github.com/angular-ui/ui-router)), which provides flexible routing in Angular.
- **Angular translate** ([link](https://github.com/angular-translate/angular-translate)), which makes it easy to make your application support multiple languages.
    - **Pluralization for Angular translate** ([link](https://angular-translate.github.io/docs/#/guide/14_pluralization)), which enables your translation keys to adapt to their context, e.g. "nothing", "one thing", "two things", "many things".
- **Angular HTTP batcher** ([link](https://github.com/jonsamwell/angular-http-batcher)), which enables multiple API-calls to be batched together to reduce network traffic.
- **Restangular** ([link](https://github.com/mgonto/restangular)), which simplifies common `POST`, `GET`, `UPDATE`, `PATCH` and `DELETE` requests when working with RESTful APIs (refer to [this blog-post](https://adambarry.wordpress.com/2016/04/18/thoughts-on-flexible-restful-apis/)).


## Structure
The project advocates the following folder/file-structure for each nested scope level:

```
.
├── Theme
|   ├── _controllers
|   |   └── ThemeCtrl.js
|   ├── _views
|   |   └── Theme.html
|   ├── SubTheme1
|   |   └── ...
|   ├── SubTheme2
|   |   └── ...
└── └── ThemeStates.js
```

The reason for the folders directly related to a specifi theme to be prefixed with an `_` (underscore/lodash), e.g. `_directives` is to group them together to make them clearly distinguishable from the potential subtheme-folders which can exist on the samel level in the hierarchy.

Depending on your needs folders like `_directives`, `_interceptors` and `_services` can be added to each theme in the structure.

Below is a more comprehensive example which shows the above folder/file-structure in the context of basic configuration of Angular and components shared across entire application (i.e. not limited to a specific scope) (note that filenames differ from the ones found in the repository, for explanatory purposes):

```
.
├── ng # The main folder for all Angular related files.
|   ├── ChildTheme
|   |   ├── _controllers
|   |   |   └── ChildThemeCtrl.js
|   |   ├── _directives
|   |   |   └── ...
|   |   ├── _services
|   |   |   └── ...
|   |   ├── _views
|   |   |   └── ChildTheme.html
|   |   ├── GrandChildTheme
|   |   |   ├── _controllers
|   |   |   |   └── GrandChildThemeCtrl.js
|   |   |   ├── _views
|   |   |   |   └── GrandChildTheme.html
|   |   |   └── GrandChildStates.js
|   |   └── ChildStates.js
|   ├── shared
|   |   ├── _directives
|   |   |   └── ...
|   |   ├── _interceptors
|   |   |   └── ...
|   |   └── _services
|   |   |   └── ...
|   ├── App.js
|   ├── AppCfg.js
|   ├── AppCtrl.js
└── └── AppStates.Js
```


## Prerequisites
In order for the solution to run you need to have the following software installed on your computer:

1) **Node.js** (with Node Package Manager/NPM) from: http://nodejs.org. When installed the remainder of the prerequisites can be installed using NPM via a terminal window.
1) **Grunt** (JavaScript task runner) installed globally using NPM: `npm install -g grunt-cli`
1) **Bower** (package manager) installed globally using NPM: `npm install -g bower`


## Getting started
Once you've cloned or downloaded the code repository to your local machine, `cd` into the project folder and run the following commands from a terminal window to get up and running:

1) `npm install` to install the Node.js dependencies for the project.
1) `bower install` to install the project's frontend dependencies.


## Development
When you're ready to start developing, (depending on your needs) you can start the following processes (in separate terminal windows as they each run until stopped/aborted by typing `ctrl c` in a said terminal window):

- `grunt watch` which will continuously perform the following actions/tasks when changes occur:
    1) concatenate the JavaScript files.
    1) compile the LESS files into CSS which the browser can interpret.
    1) concatenate all of the Angular HTML templates into the `compiled/templates.js` file using Angular's `$templateCache` functionality, which means that the templates can be referenced via the `templateUrl` property (when defining Angular UI-Router states) as you normally would an HTML-file, e.g. `templateUrl: "/ng/ChildTheme/_views/ChildTheme.html"`, but instead of this requiring an additional XHR, the template will be served directly from the template cache.
- `npm start` which launches the built-in web-server (source: https://weblogs.asp.net/lduveau/visual-studio-code-and-local-web-server).