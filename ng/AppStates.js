(function() {
    "use strict";

    var id = "App",
        statePrefix = "app",
        baseState = "/",
        defaultState = "dashboard";

    angular.module(id)
        .config(["$stateProvider", "$urlRouterProvider",
            function($stateProvider, $urlRouterProvider) {


                /******************************************************************************
                 * State definitions
                 * 
                 * 1:   Create an abstract state which is invoked when requesting a child
                 *      state, and which enables general lookup data to be resolved once and
                 *      shared with child states.
                 * 
                 * 2:   Ui-view for child states.
                 ******************************************************************************/

                $stateProvider
                    .state(statePrefix, {
                        url: baseState,
                        "abstract": true, //: 1  
                        template: '<ui-view />', //: 2
                        transclude: true,
                        resolve: {}
                    })


                /******************************************************************************
                 * App states (child states)
                 ******************************************************************************/

                .state(statePrefix + ".dashboard", {
                    url: defaultState, //url will become: #/dashboard
                    templateUrl: "/ng/_views/dashboard.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        pageTitle: ["$translate", function($translate) {
                            return $translate.instant("Dashboard");
                        }]
                    }
                });


                /******************************************************************************
                 * Initialization
                 * 
                 * Set the default app url.
                 ******************************************************************************/

                switch (true) {
                    case "prototypes":
                        break;
                    default:
                        $urlRouterProvider.otherwise(baseState + defaultState);
                }
            }
        ]);
}());