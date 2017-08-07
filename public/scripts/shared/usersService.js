angular.module('usersService', [])

    // super simple service
    // each function returns a promise object
    .factory('usersSrvc', function($q, $http) {
        var deferred = $q.defer();
        return {
            getUsers: function() {
                return $http.get('/users')
                    .success(function(data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    });
            },
            getUserById: function(userID, index) {
                return $http.get('/users/' + userID)
                    .success(function(data) {
                        data.index = index;
                        deferred.resolve(data);
                        return deferred.promise;
                    });
            },
            getCurrentUser: function() {
                return $http.get('/currentUser')
                    .success(function(data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    });
            },
            getNotApprovedUsers: function() {
                return $http.get('/getNotApprovedUsers')
                    .success(function(data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    });
            },
            updateApprovance: function(obj) {
                return $http.post('/user/updateApprovance', obj)
                    .success(function(data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    });
            }

        };
    });
