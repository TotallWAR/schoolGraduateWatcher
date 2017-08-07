'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('marksService', [])
    .factory('marksSrvc', function($q, $http) {
        var deferred = $q.defer();
        return {
            saveMark : function(mark) {
                var config = {
                    headers : {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                };
                return $http.post('/marks/save', mark)
                            .success(function(data) {
                                deferred.resolve(data);
                                return deferred.promise;
                        });
            },
            getSubjects : function () {
                return $http.get('/subjects')
                            .success(function (data){
                                deferred.resolve(data);
                                return deferred.promise;
                });
            }
        };
    });
