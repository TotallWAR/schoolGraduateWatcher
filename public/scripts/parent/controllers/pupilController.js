angular.module('pupilController', [])

    .controller('pupilCtrl', [ '$scope','$http','pupilSrvc','scheduleSrvc', function($scope, $http, pupilService, scheduleService) {
        $scope.formData = {};
        // when landing on the page, get all todos and show them
        pupilService.getPupil().then ( function (pupil) {
            $scope.pupil = pupil.data[0];
            scheduleService.getSchedule($scope.pupil.scheduleId).then ( function (schedule) {
                $scope.schedule = schedule.data;
                $scope.scheduleMonday = schedule.Monday;
            });
        });
    }]);