angular.module('pupilService', [])

    // super simple service
    // each function returns a promise object 
    .factory('pupilSrvc', function($q, $http) {
        var deferred = $q.defer();
        return {
            getPupil : function() {
                return $http.get('/pupil')
                            .success(function(data) {
                                deferred.resolve(data);
                                return deferred.promise;
                        });
            }
        };
    });