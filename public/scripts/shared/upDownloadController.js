angular.module('upDownloadController', [])
    .controller('upDownloadCtrl', ['$scope', 'usersSrvc', 'fileUploadSrvc', function($scope, usersSrvc, fileUploadSrvc){
        // Empty content string
        var tableContent = ''; // it a variable
        var updateListOfUserFiles = function () { 
            usersSrvc.getCurrentUser().then (function (data) {
                fileUploadSrvc.getAllFilesByUserId(data.data)
                .then(function (data) {
                    $("#tbody").children().empty();
                    tableContent = '';
                     for (var i = 0; i < data.data.length; i++) { // one by one get and add fortable

                    tableContent += '<tr>';

                    tableContent += '<td>' + data.data[i] + '</td>'; // this file name column

                    tableContent += '<td><a href='+'/downloadingProcess/'+data.data[i]+'>' + data.data[i]+ '</a></td>'; // this was the link column

                    }

                    // this all added into the tableContent variable

                    $('#upDownload table tbody').html(tableContent); // add into the table
                });
            });
        };
        updateListOfUserFiles();
        // jQuery AJAX call for JSON
        
        
            
        $scope.uploadFile = function() {
            var file = $scope.myFile;
            var uploadUrl = "/savedata";
            fileUploadSrvc.uploadFileToUrl(file, uploadUrl);
            updateListOfUserFiles();
        };
    
}]);