angular.module('partialController', [''])
    .controller('partialCtrl', ['$http', function($http) {
        $scope.logout(() => {
            $http('/logout');
        });
    }]);