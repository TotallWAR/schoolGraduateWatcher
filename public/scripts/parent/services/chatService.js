'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('chatService', [])
    .factory('socketSrvc', function ($rootScope) {
      var socket = io.connect();
      return {
        on: function (eventName, callback) {
          socket.on(eventName, function () {  
            var args = arguments;
            $rootScope.$apply(function () {
              callback.apply(socket, args);
            });
          });
        },
        emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              if (callback) {
                callback.apply(socket, args);
              }
            });
          });
        }
      };
    })
    .factory('chatSrvc', function($q, $http) {
        var deferred = $q.defer();
        return {
            getTeachers : function() {
                return $http.get('/teachers')
                            .success(function(data) {
                                deferred.resolve(data);
                                return deferred.promise;
                        });
            },
            
            getMessages : function (parentId, teacherId) {
                return $http.get(
                                '/messages/' + parentId + '/' + teacherId
                            )
                            .success(function (data){
                                deferred.resolve(data);
                                return deferred.promise;
                });
            }
        };
    });
