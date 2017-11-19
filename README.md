#Angular Bootstrap

##Getting started
Once you've pulled the code repository from Git, run the following commands from a console to get up and running:

1. `npm install` to install the Node dependencies for the project.
- `bower install` to install the project's frontend dependencies.

##Development
When you're ready to start developing, you need to start the following processes (in separate terminal windows):

- `grunt watch` which will concatenate the JavaScript files and compile the LESS files into CSS which the browser can interpret. The process is automatically launched upon completion of the inital `npm install` command.

- `npm start` which launches the built-in web-server (source: https://weblogs.asp.net/lduveau/visual-studio-code-and-local-web-server).