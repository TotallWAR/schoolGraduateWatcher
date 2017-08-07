angular.module('pushController', [])
    .controller('pushCtrl', ['$scope', 'pushSrvc', function($scope, pushSrvc) {

        $scope.changedtypeUsersPushValue = function(typeUsersPushSelected) {
            pushSrvc.pushNotification(this.typeUsersPushSelected, this.message).then((data) => {

            });
        };
    }]);
