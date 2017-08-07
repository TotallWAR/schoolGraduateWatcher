angular.module('pupilService', [])

    // super simple service
    // each function returns a promise object 
    .factory('pupilSrvc', function($q, $http) {
        return {
            getPupils : function() {
                var deferred = $q.defer();
                return $http.get('/pupils')
                            .success(function(data) {
                                deferred.resolve(data);
                                return deferred.promise;
                        });
            },
            getClasses : function() {
                var deferred = $q.defer();
                return $http.get('/classes')
                            .success(function(data) {
                                deferred.resolve(data);
                                return deferred.promise;
                        });
            },
            getSchedule : function(classId) {
                var deferred = $q.defer();
                return $http.get('/schedule/byClassId/' + classId)
                            .success(function(data) {
                                deferred.resolve(data);
                                return deferred.promise;
                        });
            }
        };
    });