angular.module('partialController', [])
    .controller('partialCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
        $scope.logout = () => {
            $http.get('/logout').then(() => {
                $window.location.href = '/login';
            });
        };
    }]);
