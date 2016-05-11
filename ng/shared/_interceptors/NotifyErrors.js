(function () {
    'use strict';

    var controllerId = 'NotifyErrors';

    angular.module('App').factory(controllerId, ["$q", "$injector", function ($q, $injector) {
        var $notifier,
            $translate; 
        return {
            "responseError": function (rejection) {
                var error = rejection.data,
                    title,
                    message,
                    defaultMessage;

                if (!angular.isObject($notifier)) {
                    $notifier = $injector.get("$notifier");
                }

                if (!angular.isObject($translate)) {
                    $translate = $injector.get("$translate");
                }

                defaultMessage = $translate.instant("Request error with status: {code}", { code: rejection.status });

                title = $translate.instant("Unexpected server error");

                switch (rejection.status) {
                    case 0:
                        //Ignore
                        return $q.reject(rejection);
                    case 400:
                        var validationError = false;
                        if (error.developerMessage) {
                            validationError = error.developerMessage.indexOf("Validation failed") === 0;
                        }

                        if (rejection.config.method == "POST" && validationError) {
                            $notifier.alert($translate.instant("Validation error"), $translate.instant("Couldn't save because of invalid input. Error message was:"), error.developerMessage.substring(error.developerMessage.indexOf(":") + 2));
                        }

                        if (validationError) {
                            return $q.reject(rejection);
                        }

                        if (error.developerMessage) {
                            title = $translate.instant("Validation error");
                            message = error.developerMessage;
                            break;
                        }

                        return $q.reject(rejection);
                    case 401:
                        //User is signed out and will be redirected to sign in page.
                        return $q.reject(rejection);
                    case 403:
                        return $q.reject(rejection);
                    case 404:
                        /*
                         * A 404 will be returned by the API when trying to load objects that
                         * haven't been created yet. In this case, the included exception is
                         * a Cloud Portal exception (e.g. loading a not yet created brand)
                         * and has a subcode.
                         */
                        if (error.code && error.code.indexOf("404-") === 0) {
                            return $q.reject(rejection);
                        }

                        /*
                         * Other cases include loading missing/wrong templates or other
                         * resources.
                         */
                        title = $translate.instant("Missing resource");
                        message = "404: Resource " + rejection.config.url + " not found.";
                        break;
                    case 409:
                        return $q.reject(rejection);
                    case 410:
                        //console.warn("Look here:", error);

                        if (error.code === "410-001") {
                            return $q.reject(rejection);
                        }

                        //Clear _store in case it contains deleted data
                        $injector.get("_store").clear();

                        title = $translate.instant("Resource missing");
                        message = $translate.instant("The resource you're trying to view no longer exists. It may have been deleted or moved. Try searching for it!");

                        $notifier.alert(title, message);

                        return $q.reject(rejection);
                    case 500:

                        if (error.code === "500-002") {
                            title = $translate.instant("Delete failed");
                            message = error.developerMessage;
                            break;
                        }

                        message = error.developerMessage || error.message;

                        console.group("Server error");
                        console.error("Error:", error);
                        console.error("Message:", error.message);
                        console.error("Developer message:", error.developerMessage);
                        console.error("Exception:", error.exception);
                        console.error("Stack trace:", error.stackTrace);
                        console.groupEnd();
                        break;
                    default:
                        if (error) {
                            if (error.message) {
                                message = error.message;
                            } else {
                                message = defaultMessage;
                            }
                        } else {
                            message = defaultMessage;
                        }
                        break;
                }

                $notifier.alert(title, message);
                return $q.reject(rejection);
            }
        };
    }]);
}());