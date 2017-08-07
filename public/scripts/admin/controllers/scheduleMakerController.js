var amountOfNGRepeatFinished = 0;
var amountOfDays = 0;
angular.module('scheduleMakerController', [])
    .controller('scheduleMakerCtrl', ['$scope', 'pupilSrvc', 'scheduleSrvc', function($scope, pupilService, scheduleSrvc) {

        //block with homework logic
        $scope.schedules = [];
        $scope.classes = [];
        $scope.currentSchedule = null;

        pupilService.getClasses().then(function(classes) {
            $scope.classes = classes.data;
        });


        $scope.changedClassValue = (classPupil) => {
            if (classPupil !== null) {
                $scope.currentClassId = classPupil._id;
                pupilService.getSchedule($scope.currentClassId).then(function(schedule) {
                    if (schedule.data.length !== 0) {
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


                                    itemInto.Teacher = '<label>Teacher:</label><span class="clickMe" for="Teacher">  ' + itemInto.Teacher + '</span><textarea cols="30" rows="1" value="" type="text" id="Teacher" name="Teacher" class="blur" hidden></textarea>';
                                    //itemInto.Subject = '
                                    itemInto.Room = '<label>Room:</label><span class="clickMe" for="Room">  ' + itemInto.Room + '</span><textarea cols="30" rows="1" value="" type="text" id="Room" name="Room" class="blur" hidden></textarea>';

                                });
                            }
                        });

                    } else {
                        //$scope.schedule =
                    }
                });

                document.getElementById("schedule").style.display = "";
                document.getElementById("fishLayerHomework").style.display = "none";

            } else {
                $scope.currentClassId = null;
                document.getElementById("schedule").style.display = "none";
                document.getElementById("fishLayerHomework").style.display = "";
            }
        };

        $scope.deleteCurrentEvent = ($event) => {
            $event.stopPropagation();

            var id = $event.target.parentElement.parentElement.attributes['data-scheduleid'].value;
            var weekDay = $event.target.parentElement.parentElement.attributes['data-weekday'].value;
            var startTime = $.trim($event.target.parentElement.parentElement.attributes['data-start'].value);
            var endTime = $.trim($event.target.parentElement.parentElement.attributes['data-end'].value);
            var obj = {
                StartTime: startTime,
                EndTime: endTime
            };
            scheduleSrvc.deleteLesson(id, weekDay, obj).then((data) => {

                $event.target.parentElement.parentElement.remove();
                //$event.target.parentElement.parentElement.fadeOut(150);
            });
        };

        $scope.createEvent = ($event) => {
            $scope.currentEvent = $event;
            var id = '';
            var weekDay = '';
            if ($event.target.parentElement.attributes['data-scheduleid'] !== undefined) {
                id = $event.target.parentElement.attributes['data-scheduleid'].value;
            }
            weekDay = $event.target.parentElement.attributes['data-weekday'].value;
            var startTime = "9:00";
            var endTime = "10:00";
            var obj = {
                id: id,
                weekDay: weekDay,
                StartTime: startTime,
                EndTime: endTime,
                classId: $scope.currentClassId
            };
            scheduleSrvc.createLesson(obj).then((data) => {
                $('.cd-schedule').removeClass('js-full');
                $scope.schedule = data.data;
                amountOfDays = 0;
                $.each($scope.schedule, function(i, item) {
                    if ($.isArray(item)) {
                        if (item.length !== 0) {
                            amountOfDays++;
                        }
                        $.each(item, (index, itemInto) => {


                            itemInto.Teacher = '<label>Teacher:</label><span class="clickMe" for="Teacher">  ' + itemInto.Teacher + '</span><textarea cols="30" rows="1" value="" type="text" id="Teacher" name="Teacher" class="blur" hidden></textarea>';
                            //itemInto.Subject = '
                            itemInto.Room = '<label>Room:</label><span class="clickMe" for="Room">  ' + itemInto.Room + '</span><textarea cols="30" rows="1" value="" type="text" id="Room" name="Room" class="blur" hidden></textarea>';

                        });
                    }
                });
            });
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
