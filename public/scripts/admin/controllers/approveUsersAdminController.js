angular.module('approveUsersAdminController', ['ngTable'])
    .controller('approveUsersAdminCtrl', ['$scope', 'usersSrvc', 'ngTableParams', '$http', function($scope, usersSrvc, ngTableParams, $http) {
        var tableData = [];
        $scope.tableParams = {};
        usersSrvc.getNotApprovedUsers().then((data) => {
            tableData = data.data;
            $scope.tableParams.reload();
        });

        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 6
        }, {
            total: tableData.length,
            //Returns the data for rendering
            getData: function($defer, params) {
                $scope.params = params;
                params.total(tableData.length);
                $defer.resolve(tableData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

        $scope.changedUserAcception = function(user, boolApprovance) {
            var obj = {
                user: user,
                boolApprovance: boolApprovance
            };
            usersSrvc.updateApprovance(obj).then((data) => {

            });
        };
    }]);
