'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('pushService', [])
    .factory('pushSrvc', function($q, $http) {
        var deferred = $q.defer();
        return {
            pushNotification: function(typeOfUser, message) {
                return $http.get('/sendPushNotification/' + typeOfUser + '/' + message)
                    .success(function(data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    });
            }
        };
    });
