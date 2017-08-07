angular.module('scheduleService', [])

    // super simple service
    // each function returns a promise object
    .factory('scheduleSrvc', function($q, $http) {
        var deferred = $q.defer();
        return {
            getSchedule: function(id) {
                return $http.get('/schedule/' + id)
                    .success(function(data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    });
            },

            getSchedules: function() {
                return $http.get('/schedules/')
                    .success(function(data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    });
            },
            deleteLesson: function(idSchedule, weekDay, object) {
                return $http.post('/schedule/lesson/delete/' + idSchedule + '/' + weekDay, object)
                    .success(function(data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    });
            },
            createLesson: function(object) {
                return $http.post('/schedule/lesson/create', object)
                    .success(function(data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    });
            }
        };
    });
