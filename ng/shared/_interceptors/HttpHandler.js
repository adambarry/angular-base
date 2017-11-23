/*
 * Inspired by https://stackoverflow.com/a/33508514
 *
 */
(function() {
    "use strict";

    var controllerId = "HttpHandler";

    angular.module('App').factory(controllerId, ["$q", "$rootScope", "Restangular",
        function($q, $rootScope, Restangular) {
            var requests = [];


            /******************************************************************************
             * Private functions
             ******************************************************************************/

            function newTimeout() {
                var request = $q.defer();
                requests.push(request);

                return request.promise;
            }

            function abortAllRequests() {
                if (requests.length) {
                    //console.group(controllerId, "abortAllRequests", requests.length);

                    angular.forEach(requests, function(request) {
                        //console.log("abort", request);
                        request.resolve();
                    });

                    //console.groupEnd();
                    requests = [];
                }
            }

            function abortAllRequestsOn(event) {
                $rootScope.$on(event, function(event, newUrl, oldUrl) {
                    if (newUrl !== oldUrl) {
                        abortAllRequests();
                    }
                });
            }


            /******************************************************************************
             * Public interface
             ******************************************************************************/

            return {
                R: Restangular,
                newTimeout: newTimeout,
                abortAllRequests: abortAllRequests,
                abortAllRequestsOn: abortAllRequestsOn
            };

        }
    ]);
}());