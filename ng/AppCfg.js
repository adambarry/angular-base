(function () {
    "use strict";

    var appId = "App";
    
    angular.module(appId).config(["$provide", "$compileProvider", "$httpProvider", "$translateProvider", "RestangularProvider", "httpBatchConfigProvider",
        function ($provide, $compileProvider, $httpProvider, $translateProvider, RestangularProvider, httpBatchConfigProvider) {

            // console.group(appId + "config");
            // console.info(appId + "config");
            // console.info("$provide", $provide);
            // console.info("$compileProvider", $compileProvider);
            // console.info("$httpProvider", $httpProvider);
            // console.info("$translateProvider", $translateProvider);
            // console.info("RestangularProvider", RestangularProvider);
            // console.info("httpBatchConfigProvider", httpBatchConfigProvider);
            // console.groupEnd();
            
            var globalConfig = {
                apiRoot: "/api/",
                authEndpoint: "OAuth"
            };


            /**
             * Legitimize various href types
             */
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|callto):/);


            /**
             * Configure language module
             * See http://angular-translate.github.io/
             *
             * For the message format bit: http://angular-translate.github.io/docs/#/guide/14_pluralization
             */
            $translateProvider.useMessageFormatInterpolation();
            //$translateProvider.preferredLanguage(activeProfile.language.iso639Code);
            //$translateProvider.translations(activeProfile.language.iso639Code, activeProfile.language.translations);
            $translateProvider.useSanitizeValueStrategy('escape'); //http://angular-translate.github.io/docs/#/guide/19_security


            /**
             * Batch HTTP requests together to save web server round trips
             * https://github.com/jonsamwell/angular-http-batcher
             */
            var batchPath = globalConfig.apiRoot + '/batch';

            httpBatchConfigProvider
                .setAllowedBatchEndpoint(globalConfig.apiRoot, batchPath, {
                    maxBatchedRequestPerCall: 25,
                    minimumBatchSize: 2,
                    batchRequestCollectionDelay: 100,
                    ignoredVerbs: ["post", "put", "patch", "delete"],
                    sendCookies: false,
                    enabled: !globalConfig.debugMode,
                    canBatchRequest: function (url, method) {
                        /**
                         * 1:   This function returns true if it the requested url can be batched.
                         *      The request will explode on attempts to batch OAuth requests or other batch requests.
                         * 
                         *      In other words: Do not go Xzibit on this:
                         *      "   Yo Dawg, I herd you like batches, so I put an http request batch in your http
                         *          request batch so you can batch your batches while you batch your http requests".
                         */
                        return url != globalConfig.authEndpoint && url != batchPath; // 1
                    }
                });


            /**
             * Configure Restangular.
             */
            RestangularProvider.setBaseUrl(globalConfig.apiRoot);

            /**
             * Lists are hyper collections and we need to tell Restangular where
             * the items actually are, so add a response intereceptor
             */
            RestangularProvider
                .addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                    var extractedData;
                    // .. to look for getList operations
                    if (operation === "getList") {
                        // .. and extract the list data
                        extractedData = data.items || [];
                        extractedData.total = data.total;
                   }

                    return extractedData || data;
                });

            /**
             * Extend restangular collections to make updating list views convenient.
             */
            RestangularProvider.setOnElemRestangularized(function (elem, isCollection) {
                if (isCollection) {
                    /**
                     * updateItem:
                     * Find the item and replace it with the updated version, or add it.
                     */
                    elem.updateItem = function (obj, compareProp) {
                        if (!compareProp) {
                            compareProp = "id";
                        }

                        for (var i = 0; i < elem.length; i++) {
                            if (obj[compareProp] == elem[i][compareProp]) {
                                elem[i] = obj;
                                return;
                            }
                        }

                        elem.push(obj);
                    };

                    /**
                     * removeItem:
                     * Find the item with the specified id and remove it.
                     */
                    elem.removeItem = function (id) {
                        if (angular.isObject(id) && id.hasOwnProperty("id")) {
                            //An object was passed, use it's ID instead
                            id = id.id;
                        }

                        for (var i = 0; i < elem.length; i++) {
                            if (id == elem[i].id) {
                                elem.splice(i, 1);
                                return;
                            }
                        }
                    };
                } else if (angular.isObject(elem)) {
                    elem.updateItem = function (updated) {
                        for (var i in updated) {
                            if (this.hasOwnProperty(i) && updated.hasOwnProperty(i)) {
                                this[i] = updated[i];
                            }
                        }
                    }
                }
                return elem;
            });


            /**
             * Add an interceptor that intercepts errors globally and alerts the user.
             */
            $httpProvider.interceptors.push("NotifyErrors");


            /*
             * Add another intercepter that keeps track of when the app is making http-requests.
             */
            $httpProvider.interceptors.push("LoadTracker");


            /**
             * Stop Angular from removing the $type from json objects during transformations
             * Angular uses properties prefixed with "$" internally and before making sending
             * requests, it transforms the body to remove $-prefixed properties. However the
             * JSON.Net uses the $type property to distinguish polymorphism.
             */
            $httpProvider.defaults.transformRequest = function (data) {
                function isWindow(obj) {
                    return obj && obj.document && obj.location && obj.alert && obj.setInterval;
                }
                function isScope(obj) {
                    return obj && obj.$evalAsync && obj.$watch;
                }
                function isFile(obj) {
                    var toString = (obj).toString;
                    return toString.call(obj) === '[object File]';
                }
                function toJsonWithJsonDotNetSupport(obj, pretty) {
                    return JSON.stringify(obj, function (key, value) {
                        var val = value;
                        if (/^\$+/.test(key) && key !== "$type") {
                            val = undefined;
                        } else {
                            if (isWindow(value)) {
                                val = '$WINDOW';
                            } else {
                                if (value && document === value) {
                                    val = '$DOCUMENT';
                                } else {
                                    if (isScope(value)) {
                                        val = '$SCOPE';
                                    }
                                }
                            }
                        }
                        return val;
                    }, pretty ? '  ' : null);
                }

                return angular.isObject(data) && !isFile(data) ? toJsonWithJsonDotNetSupport(data, false) : data;
            };
        }]);
}());