var app = angular.module('attendanceController', ['ngTable']);
    app.controller('attendanceCtrl', ['$scope', '$http', 'pupilSrvc', 'marksSrvc', 'ngTableParams', function ($scope, $http, pupilService, marksSrvc, ngTableParams) {
        var tableData = [];
        $scope.pupilAttendance = [];
        $scope.boolAttendance = true;
        marksSrvc.getSubjects().then ((data) => {
            $scope.subjects = data.data;
        });
        
        pupilService.getClasses().then ( function (classes) {
            $scope.classes = classes.data;
        });
         $scope.changedSubjectValue = (subject) => {
            if (subject !== null) {
                $scope.currentSubject = subject;
                if ($scope.currenttypeMark !== null) {
                    document.getElementById("tableAttandance").style.display = "none";
                    document.getElementById("fishLayerAttendance").style.display = "";
                }
                createTypeClassSelect();
            } else {
                $scope.currentSubject = null;
            
                document.getElementById("typeClassSelectForAttendance").style.display = "none";
                document.getElementById("tableAttandance").style.display = "none";
                document.getElementById("fishLayerAttendance").style.display = "";  
            }
        };
        
        var createTypeClassSelect = () => {
            document.getElementById("typeClassSelectForAttendance").style.display = "block";
        };
        
        
        $scope.changedClassValue = (classPupil) => {
        if (classPupil !== null) {
            $scope.currentClassId = classPupil._id;
            var tableData = [];
            $scope.tableParams = {};
            
            $http.get('/attendance/' + $scope.currentClassId + '/' + $scope.currentSubject._id).then(function(response) {
                        tableData = response.data;
//                            TODO:
                        //здесь сначала все отсортировать
                        //получить имена всех учеников
                        $scope.pupilNames = tableData[0].attendance;
                            var promise = new Promise ((resolved, rejected) => {
                            $scope.pupilNames.forEach(function(item, i, arr) {
                                pupilService.getPupilById(item.pupilId).then((pupil) => {
                                    item.pupilName = pupil.data.fullName;
                                    if (i == $scope.pupilNames.length - 1) {
                                        resolved();
                                    }
                                });
                            });
                        });
                        promise.then( () => {
                            $scope.pupilAttendance = [];
                            var startPos = ($scope.params.page() - 1) * $scope.params.count();
                            for (var i = startPos; i < startPos + $scope.params.count(); i++) {
                                if (tableData[i] !== undefined) {
                                    $scope.pupilAttendance.push (tableData[i].attendance);
                                }
                            }
                            $scope.tableParams.reload();
                        });
            });
            
            
            $scope.tableParams = new ngTableParams({
                page: 1,
                count: 6
            },{
                total:tableData.length,
                //Returns the data for rendering
                getData : function($defer,params){
                    $scope.params = params;
                    params.total(tableData.length);
                            //TODO может быть нарушен порядок, так как ответы от сервера могут по-разному возвращаться
                        $scope.pupilAttendance = [];
                            var startPos = ($scope.params.page() - 1) * $scope.params.count();
                            for (var i = startPos; i < startPos + $scope.params.count(); i++) {
                                if (tableData[i] !== undefined) {
                                    $scope.pupilAttendance.push (tableData[i].attendance);
                                }
                            }
                        $defer.resolve(tableData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        params.total(tableData.length);
                }
            });

                
            $scope.$watch("classSelected", function () {
                $scope.tableParams.reload();
            });
            document.getElementById("tableAttandance").style.display = "";
            document.getElementById("fishLayerAttendance").style.display = "none";

        } else {
            $scope.currentClassId = null;
            document.getElementById("tableAttandance").style.display = "none";
            document.getElementById("fishLayerAttendance").style.display = "";
        }
    };
        
        
        
        $scope.changedPupilAttendance = function (pupilAttendanceSelected) {
            var attendanceObject = this.attendance;
            var currentPupil = this.pupilAttend;
            var result = $.grep(attendanceObject.attendance, function(e){ return e.pupilId == currentPupil.pupilId; });
            result[0].attendance = pupilAttendanceSelected;
            pupilService.saveAttendance(attendanceObject).then (() => {
                
            });
            //здесь надо работать через true и менять просто им в базе значения
            $scope.currentPupilAttendanceSelected = pupilAttendanceSelected;
        };
        
        
        
        
    //Table configuration
    
}]);
