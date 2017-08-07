angular.module('marksParentController', [])
    .controller('marksParentCtrl', ['$scope', 'marksSrvc', '$sce', 'pupilSrvc',  function($scope, marksSrvc, $sce, pupilService) {
        pupilService.getPupil().then ( function (pupil) {
            $scope.pupil = pupil.data[0];
        });
        $scope.htmlCodeTypeMarkSelect = '';
        $scope.currentSubject = null;
        $scope.currenttypeMark = null;
        $scope.subjects = [];
        $scope.typeMarks = ["classExam", "assignment", "homework"];
        marksSrvc.getSubjects().then ((data) => {
            $scope.subjects = data.data;
        });
        
        $scope.changedSubjectValue = (subject) => {
            $scope.currentSubject = subject;
            if (subject !== null) {
                if ($scope.currenttypeMark !== null) {
                    document.getElementById("weekGraphic").style.display = "none";
                    document.getElementById("fishLayer").style.display = "";
                }
                marksSrvc.getMarksBySubjectId (subject._id, $scope.pupil._id).then ((data) => {
                    if (data.data !== null) {
                        $scope.marks = data.data[0];
                        $scope.marks.classExam = sortArrayByDate ($scope.marks.classExam);
                        $scope.marks.assignment = sortArrayByDate ($scope.marks.assignment);
                        $scope.marks.homework = sortArrayByDate ($scope.marks.homework);
                    }
                });
                createTypeMarkSelect ();
            } else {
                $scope.htmlCodeTypeMarkSelect = '';
                document.getElementById("typeMarkSelect").style.display = "none";
                document.getElementById("weekGraphic").style.display = "none";
                document.getElementById("fishLayer").style.display = "";
                
            }
        };
        var sortArrayByDate = (array) => {
            $.each (array, (index, item) => {
                item.date = new Date (item.date);
            });
            array.sort(function(a,b) {
                return a.date.getTime() - b.date.getTime();
            });
            return array;
        };
        
        var createTypeMarkSelect = () => {
            document.getElementById("typeMarkSelect").style.display = "block";
//            $scope.htmlCodeTypeMarkSelect = '<select class="selectpicker" ng-model="typeMarkSelected" ng-change="changedTypeMarkValue(typeMarkSelected)" data-ng-options="typeMark in typeMarks"><option value="">Select type of work</option></select>';
        };
        
//        $scope.renderHtml = function (htmlCode) {
//            return $sce.trustAsHtml(htmlCode);
//        };
        
        
        $scope.changedTypeMarkValue = (typeMark) => {
            $scope.currenttypeMark = typeMark;
            var datesArray = [];
            var marksArray = [];
            if (typeMark !== null) {
                document.getElementById("weekGraphic").style.display = "";
                document.getElementById("fishLayer").style.display = "none";
                $.each ($scope.marks[typeMark], (index, item) => {
                    var curDate = item.date.getDate() + "/" + (item.date.getMonth()+1)  + "/" + item.date.getFullYear();
                    datesArray.push (curDate);
                    marksArray.push (item.grade);
                });
                chartDraw (datesArray, marksArray);
            }
            else {
                document.getElementById("weekGraphic").style.display = "none";
                document.getElementById("fishLayer").style.display = "";
                chartDraw (datesArray, marksArray);
            }
            
        };
        
        var chartDraw = function (dates, marks) {
            var chart = new Chartist.Line('.weekGraphic', {
              labels: dates,
              series: [
                  marks
              ]
            }, {
              low: 2
            });

            // Let's put a sequence number aside so we can use it in the event callbacks
            var seq = 0,
              delays = 80,
              durations = 500;

            // Once the chart is fully created we reset the sequence
            chart.on('created', function() {
              seq = 0;
            });

            // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
            chart.on('draw', function(data) {
              seq++;

              if(data.type === 'line') {
                // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
                data.element.animate({
                  opacity: {
                    // The delay when we like to start the animation
                    begin: seq * delays + 1000,
                    // Duration of the animation
                    dur: durations,
                    // The value where the animation should start
                    from: 0,
                    // The value where it should end
                    to: 1
                  }
                });
              } else if(data.type === 'label' && data.axis === 'x') {
                data.element.animate({
                  y: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.y + 100,
                    to: data.y,
                    // We can specify an easing function from Chartist.Svg.Easing
                    easing: 'easeOutQuart'
                  }
                });
              } else if(data.type === 'label' && data.axis === 'y') {
                data.element.animate({
                  x: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 100,
                    to: data.x,
                    easing: 'easeOutQuart'
                  }
                });
              } else if(data.type === 'point') {
                data.element.animate({
                  x1: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                  },
                  x2: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                  },
                  opacity: {
                    begin: seq * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'easeOutQuart'
                  }
                });
              } else if(data.type === 'grid') {
                // Using data.axis we get x or y which we can use to construct our animation definition objects
                var pos1Animation = {
                  begin: seq * delays,
                  dur: durations,
                  from: data[data.axis.units.pos + '1'] - 30,
                  to: data[data.axis.units.pos + '1'],
                  easing: 'easeOutQuart'
                };

                var pos2Animation = {
                  begin: seq * delays,
                  dur: durations,
                  from: data[data.axis.units.pos + '2'] - 100,
                  to: data[data.axis.units.pos + '2'],
                  easing: 'easeOutQuart'
                };

                var animations = {};
                animations[data.axis.units.pos + '1'] = pos1Animation;
                animations[data.axis.units.pos + '2'] = pos2Animation;
                animations['opacity'] = {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'easeOutQuart'
                };

                data.element.animate(animations);
              }
            });

            // For the sake of the example we update the chart every time it's created with a delay of 10 seconds
            chart.on('created', function() {
              if(window.__exampleAnimateTimeout) {
                clearTimeout(window.__exampleAnimateTimeout);
                window.__exampleAnimateTimeout = null;
              }
              //window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 12000);
            });   
        };
         
    }]);