(function() {
    "use strict";

    var id = "App";

    var App = angular.module(id, [
        //Reference/list main modules
        "ui.router",
        "restangular",
        "jcs.angular-http-batch",
        "pascalprecht.translate"
    ]).run(["$rootScope", "$state", function($rootScope, $state) {
        /**
         * Force $state to run by injecting it. Without this, $state only runs
         * when a controller or something else asks for it via
         * "dependency injection" (DI).
         */
        $rootScope.$state = $state;
    }]);
}());