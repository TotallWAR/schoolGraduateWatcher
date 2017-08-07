angular.module('pupilService', [])

    // super simple service
    // each function returns a promise object 
    .factory('pupilSrvc', function($q, $http) {
        return {
            getPupilById: function(id) {
                var deferred = $q.defer();
                return $http.get('/pupils/'+id)
                            .success(function(data) {
                                deferred.resolve(data);
                                return deferred.promise;
                        });
            },
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
            },
            getAttendance : function(classId, subjecId) {
                var deferred = $q.defer();
                return $http.get('/attendance/' + classId + '/' + subjecId)
                            .success(function(data) {
                                deferred.resolve(data);
                                return deferred.promise;
                        });
            },
            saveAttendance : function(attendance) {
                var deferred = $q.defer();
                return $http.post('/attendance/save', attendance)
                            .success(function(data) {
                                deferred.resolve(data);
                                return deferred.promise;
                        });
            }
        };
    });