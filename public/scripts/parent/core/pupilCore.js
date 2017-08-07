angular.module('pupils', ['pupilService', 'pupilController', 'partialController', 'scheduleService', 'chatFilters', 'chatDirectives', 'chatService', 'chatParentController', 'usersService', 'marksService', 'marksParentController', 'uploadDirectives', 'upDownloadService', 'upDownloadController'])
    .directive('myRepeatDirective', function() {
        return function(scope, element, attrs) {
            if (scope.$last) {
                setTimeout(() => {
                    onNGRepeatReady($);
                }, 0);
            }
        };
    });
