'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('marksService', [])
    .factory('marksSrvc', function($q, $http) {
        var deferred = $q.defer();
        return {
            getMarksBySubjectId : function(subjectId, pupilId) {
                return $http.get('/marks/' + subjectId + '/' + pupilId)
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
            },
            
            getSubjectById : function (id) {
                return $http.get('/subjects/' + id)
                            .success(function (data){
                                deferred.resolve(data);
                                return deferred.promise;
                });
            }
        };
    });
