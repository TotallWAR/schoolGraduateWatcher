var amountOfNGRepeatFinished = 0;
var amountOfDays = 0;
angular.module('homeworkController', [])

    .controller('homeworkCtrl', ['$scope', 'pupilSrvc', 'marksSrvc', function($scope, pupilService, marksSrvc) {
        //block with homework logic
        $scope.Subjects = [];
        $scope.currentClassId = null;
        $scope.currentSubject = null;
        marksSrvc.getSubjects().then((data) => {
            $scope.Subjects = data.data;

        });
        pupilService.getClasses().then(((classes) => {
            $scope.classes = classes.data;
        }));

        $scope.changedSubjectValue = (subject) => {
            if (subject !== null) {
                $scope.currentSubject = subject;
                if ($scope.currenttypeMark !== null) {
                    document.getElementById("schedule").style.display = "none";
                    document.getElementById("fishLayerHomework").style.display = "";
                }
                createTypeClassSelect();
            } else {
                $scope.currentSubject = null;

                document.getElementById("typeClassSelect").style.display = "none";
                document.getElementById("schedule").style.display = "none";
                document.getElementById("fishLayerHomework").style.display = "";
            }
        };

        var createTypeClassSelect = () => {
            document.getElementById("typeClassSelect").style.display = "block";
        };


        $scope.changedClassValue = (classPupil) => {
            if (classPupil !== null) {
                $scope.currentClassId = classPupil._id;
                pupilService.getSchedule($scope.currentClassId).then(function(schedule) {
                    if ($('.cd-schedule').hasClass('js-full')) {
                        $('.cd-schedule').removeClass('js-full');
                    }
                    amountOfDays = 0;
                    $scope.schedule = schedule.data;
                    $.each($scope.schedule, function(i, item) {
                        if ($.isArray(item)) {
                            if (item.length !== 0) {
                                amountOfDays++;
                            }
                            $.each(item, (index, itemInto) => {
                                itemInto.Homework = '<div class="raw"><span class="clickMe" for="textBox1">' + itemInto.Homework + '</span><textarea cols="40" rows="10" value="" type="text" id="textBox1" name="textBox1" class="blur" hidden> </div>';
                            });
                        }
                    });
                });

                document.getElementById("schedule").style.display = "";
                document.getElementById("fishLayerHomework").style.display = "none";

            } else {
                $scope.currentClassId = null;
                document.getElementById("schedule").style.display = "none";
                document.getElementById("fishLayerHomework").style.display = "";
            }
        };
    }]).directive('myRepeatDirective', function() {
        return function(scope, element, attrs) {
            if (scope.$last) {
                amountOfNGRepeatFinished++;
                if (amountOfNGRepeatFinished == amountOfDays) {
                    amountOfNGRepeatFinished = 0;
                    setTimeout(() => {
                        onNGRepeatReady($);
                    }, 0);
                }
            }
        };
    });
