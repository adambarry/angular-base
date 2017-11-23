(function() {
    "use strict";

    /*
     * Service which enables processing of multiple items.
     * 
     * Example: Restangular PATCH all items in the activeItems collection
     * 
     * Prototype for Angular Controller:
     *
         Grinder.add(items, function (item) {
              //Process the item, e.g.:
              //NB: It's important that you use "return" in the following
              return item.patch({
                  propertyName: "newValue"
              });
         }, function () {
              console.log("Callback: All " + activeItems.length + " items have been processed");
         });
     *
     */

    var serviceId = "Grinder";

    angular.module("App")
        .factory(serviceId, ["$q", "$rootScope",
            function($q, $rootScope) {

                var tasks = {},
                    pending = 0,
                    notifier;


                /******************************************************************************
                 * Private functions
                 ******************************************************************************/

                function addTask(options) {
                    console.log(serviceId + ":addTask", options);

                    var task = new Date().getTime();
                    //console.group(serviceId + ": tasks["+ task +"]");

                    //Create a new task for the promises
                    tasks[task] = {};

                    //Set the initial properties and values
                    tasks[task].total = options.items.length;
                    tasks[task].pending = options.items.length;
                    tasks[task].promises = [];

                    //Notify ancestor controllers
                    $rootScope.$emit(serviceId + ":update", {
                        total: tasks[task].total,
                        pending: tasks[task].pending
                    });

                    //Create promises for each item
                    options.items.forEach(function(item) {
                        //console.log("processing", item);

                        tasks[task].promises.push(options.action(item).then(function(res) {
                            //console.log("Done processing", res);
                            tasks[task].pending -= 1;
                            //console.log("pending", tasks[task].pending);

                            //Notify ancestor controllers
                            $rootScope.$emit(serviceId + ":update", {
                                total: tasks[task].total,
                                pending: tasks[task].pending
                            });
                        }));
                    });

                    //Process all of the promises
                    $q.all(tasks[task].promises).then(function(result) {
                        console.log(serviceId + ": Finished processing all " + options.items.length + " items");
                        //console.log("tasks before clean-up", tasks);

                        if (options.callback) {
                            options.callback();
                        }

                        try {
                            delete tasks[task];
                            //console.log("tasks after clean-up", tasks);
                        } catch (e) {}

                        //console.groupEnd();
                    });
                }


                /******************************************************************************
                 * Public interface
                 ******************************************************************************/

                return {
                    add: function(items, action, callback) {
                        addTask({
                            items: items,
                            action: action,
                            callback: callback
                        });
                    }
                };
            }
        ]);
}());