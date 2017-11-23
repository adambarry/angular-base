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
                    templateUrl: "/ng/Dashboard/_views/Dashboard.html",
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
        ])
        .run(["$rootScope", "$state", "HttpHandler", function($rootScope, $state, HttpHandler) {

            HttpHandler.R.setFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
                httpConfig = httpConfig || {};

                /*
                 * Selectively apply timeouts to XHRs to ensure that the functionality is intentional.
                 * Example:
                 
                    RestangularObject.all("resourceName")
                    .withHttpConfig({ allowCancel: true })  //This is the intentional part!
                    .getList({
                        limit: 0
                    })["catch"]()
                 * 
                 */

                if (httpConfig.allowCancel) {
                    if (httpConfig.timeout === undefined) {
                        httpConfig.timeout = HttpHandler.newTimeout();
                    }
                }

                return {
                    element: element,
                    params: params,
                    headers: headers,
                    httpConfig: httpConfig
                };
            });

            var stateChangeSuccessOn = $rootScope.$on("$stateChangeSuccess", function(event, toState, stateParams) {
                HttpHandler.abortAllRequestsOn("$stateChangeSuccess");
            });


            /******************************************************************************
             * Clean up
             ******************************************************************************/

            var destroyWatch = $rootScope.$on("$destroy", function() {
                //console.debug(id, "$scope.$destroy()");
                //console.log("You left the scope - the callback should be removed!");

                stateChangeStartOn();
                stateChangeSuccessOn();

                //Unbind the destroy watcher itself
                destroyWatch();
            });
        }]);
}());