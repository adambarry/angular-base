/*
 * Inspired by http://stackoverflow.com/questions/25604748/angularjs-global-http-state-ajax-loader
 *
 * Rejections must be passed on on error, or this interceptor will break other interceptors.
 */
(function () {
    'use strict';

    var controllerId = 'LoadTracker';

    angular.module('App').factory(controllerId, ['$q', "$rootScope", "$timeout",
        function ($q, $rootScope, $timeout) {
            var totalUptimeRequests = 0,
                timeout;

            $rootScope.appReady = false;

            return {
                'request': function (config) {
                    totalUptimeRequests++;

                    if (!$rootScope.loading || !angular.isNumber($rootScope.loading)) {
                        $rootScope.loading = 0;
                    }

                    $rootScope.loading++;

                    // Successful request method
                    return config;
                },
                'response': function (response) {
                    if (!angular.isNumber($rootScope.loading)) {
                        $rootScope.loading = 1;
                    }

                    $rootScope.loading--;

                    if (timeout) {
                        $timeout.cancel(timeout);
                        timeout = false;
                    }

                    timeout = $timeout(function () {
                        timeout = false;
                        if (!$rootScope.loading && !$rootScope.appReady) {
                            $rootScope.appReady = true;

                            //This is pretty dirty
                            var el = angular.element(".Modal").first();
                            el.fadeOut({
                                complete: function () {
                                    el.remove();
                                }
                            });
                        }
                    }, 100);

                    // successful response
                    return response; // or $q.when(config);
                },
                'requestError': function (rejection) {
                    return $q.reject(rejection);
                },
                'responseError': function (rejection) {
                    $rootScope.loading--;
                    return $q.reject(rejection);
                }
            };
        }]);
}());