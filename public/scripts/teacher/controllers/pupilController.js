angular.module('pupilController', [])

    .controller('pupilCtrl', ['$scope', 'filterFilter', 'pupilSrvc', 'marksSrvc', function ($scope, filterFilter, pupilSrvc, marksSrvc, dialogs) {
        $scope.subjects = [];
        marksSrvc.getSubjects().then ((data) => {
            $scope.subjects = data.data;
        });
        $scope.items = []; 
        $scope.currentPupil = null;
        $scope.date = '';
        $scope.mark = '';
        $scope.typeOfWork = '';
        $scope.comment = '';
        $scope.currentSubjectId = '';
        pupilSrvc.getPupils().then ((data) => {
            if (data.data !==undefined) {
                $scope.items = data.data;
            }
        });

        this.showModal = false;
        this.showView = false;
        this.counter = 1;
        this.toggleDialog = function () {
            this.showModal = !this.showModal;
        };
        this.toggleView = function () {
            this.showView = !this.showView;
        };
        this.changeDisplay = function () {
            this.counter++;
        };
        $scope.saveCurrentPupil = (pupilSelected) => {
            $scope.currentPupil = pupilSelected;     

        };
        $scope.saveMark = () => {
            var mark = {
                pupilId: $scope.currentPupil._id,
                subjectId: $scope.currentSubjectId,
                date: $scope.date,
                grade: $scope.mark,
//                comment: $scope.comment,
                typeOfWork: $scope.typeOfWork
            };
            marksSrvc.saveMark(mark).then ((data) => {
                
            });
        };
        
        
        $scope.changedSubjectValue = (subject) => {
            if (subject !== null) {
                $scope.currentSubjectId = subject._id;
            document.getElementById("markBuilding").style.display = "";
            document.getElementById("fishLayer").style.display = "none";
            }
          else {  document.getElementById("markBuilding").style.display = "none";
            document.getElementById("fishLayer").style.display = "";
           }
            
        };

        // create empty search model (object) to trigger $watch on update
        $scope.search = {};

        $scope.resetFilters = function () {
            // needs to be a function or it won't trigger a $watch
            $scope.search = {};
        };
        $scope.changeFilter = function () {
            if ($scope.search.sex === undefined) {
                $scope.search.sex = 'm';
                return;
            }
            if ($scope.search.sex == 'm') {
                $scope.search.sex = 'f';
                return;
            }
            if ($scope.search.sex =='f') {
                $scope.search.sex = 'm';
                return;
            }
        };
        // pagination controls
        $scope.currentPage = 1;
        $scope.totalItems = $scope.items.length;
        $scope.entryLimit = 100; // items per page
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

        // $watch search to update pagination
        $scope.$watch('search', function (newVal, oldVal) {
            $scope.filtered = filterFilter($scope.items, newVal);
            $scope.totalItems = $scope.filtered.length;
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
            $scope.currentPage = 1;
        }, true);
}]);