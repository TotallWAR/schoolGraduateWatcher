'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('upDownloadService', [])
    .factory('fileUploadSrvc', function ($http, $q) {
        var deferred = $q.defer();
        return {
            uploadFileToUrl : function(file, uploadUrl) {
                var fd = new FormData();
                fd.append('file', file);
                return $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                    .success(function(){
                    
                })
                    .error(function(){
                    
                });
            },
            getAllFilesByUserId: function(userId) {
                return $http.get('/download/'+userId)
                            .success(function(data) {
                                deferred.resolve(data);
                                return deferred.promise;
                        });
            }
        };
    });