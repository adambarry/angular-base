
/*global window,
  document
*/

/*
 * Script which automatically hides console activity (log, warn etc.),
 * but you can enable them if you want by:
 * 
 * 1.   Writing the following in the browser's JavaScript console:
 *      Session.set("debug", true);
 * 
 * 2.   Refreshing the browser
 * 
 * This will enable console logs for the session.
 * 
 * You can also enable Firebug Lite if your browser has unsatisfying logging support.
 */

(function () {
    'use strict';

    var App = window.App || {},
        Session = window.Session || {},
        firebugLiteOptions,
        firebugLiteSrc,
        methods,
        script,
        isUseLogging,
        i,
        original,
        handler;

    firebugLiteOptions = 'enableTrace,overrideConsole,startOpened';
    firebugLiteSrc = 'https://getfirebug.com/firebug-lite.js';
    methods = ["assert", "clear", "count", "debug", "dir", "dirxml", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "error", "profile", "profileEnd", "table", "time", "timeEnd", "trace", "warn"];

    //Determine when not to hide console entries
    isUseLogging = (window.location.hostname.indexOf('localhost') !== -1
        || window.location.hostname.indexOf('.site') !== -1
        || window.location.hostname.indexOf('.local') !== -1
        || Session && Session.get("debug")
    );

    // Map over localy
    original = App.console = window.console;

    // Override the global console variable
    window.console = {};

    // Implement Firebug Lite
    if (window.location.search.indexOf('firebuglite=true') !== -1) {
        script = document.createElement('script');
        script.src = firebugLiteSrc + '#' + firebugLiteOptions;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    // Implement methods to window.console
    // http://getfirebug.com/wiki/index.php/Console_API
    handler = function (method) {
        window.console[method] = function () {
            var args;

            if (!isUseLogging) { return; }

            args = Array.prototype.slice.call(arguments);

            // Firebug methods
            if (original && original[method] && original[method].apply) {
                original[method].apply(original, args);
            } else if (original && original.log) {
                // If a console.log method exist, but the current method is not supported/a custom method.
                args.unshift('[' + method + ']');
                // Use the log instead with a prefix of the method name in brackets
                if (original.log.apply) {
                    original.log.apply(original, args);
                } else {
                    original.log(args);
                }
            }
        };
    };

    for (i = 0; i < methods.length; i += 1) {
        handler(methods[i]);
    }
}());