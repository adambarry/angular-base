(function () {
    "use strict";
    
    var appId = "App",
        controllerId = "AppCtrl";
    
    angular.module(appId).controller(controllerId, ["$scope", function ($scope) {
        console.info(controllerId + " $scope", $scope);

        /******************************************************************************
         * Private functions
         *****************************************************************************/


        /******************************************************************************
         * Scope functions
         *****************************************************************************/

    }]);
}());