angular.module('scheduleService', [])

    // super simple service
    // each function returns a promise object 
    .factory('scheduleSrvc', function($q, $http) {
        var deferred = $q.defer();
        return {
            getSchedule : function(id) {
                return $http.get('/schedule/'+id)
                            .success(function(data) {
                                deferred.resolve(data);
                                return deferred.promise;
                        });
        }
    }
});