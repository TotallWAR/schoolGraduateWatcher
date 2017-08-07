var app = angular.module('recapchaApp', ['vcRecaptcha']);
app.controller('recapchaCtrl', function ($scope, vcRecaptchaService) {
    $scope.response = null;
    $scope.widgetId = null;
    $scope.isRecaptched = false;
    $scope.model = {
        key: '6LfEshYUAAAAAL2lq-6F516iX6A9bohqlwl5Ujl8'
    };
    $scope.setResponse = function (response) {
        console.info('Response available');
        $scope.response = response;
        $scope.isRecaptched = true;
        document.getElementById("validationCaptcha").style.visibility = "hidden";
    };
    $scope.setWidgetId = function (widgetId) {
        console.info('Created widget ID: %s', widgetId);
        $scope.widgetId = widgetId;
    };
    $scope.cbExpiration = function() {
        console.info('Captcha expired. Resetting response object');
        vcRecaptchaService.reload($scope.widgetId);
        $scope.response = null;
        $scope.isRecaptched = false;
     };
    $scope.submit = function () {
        /*
        $.ajax ({
          type: 'POST',
          url: "https://www.google.com/recaptcha/api/siteverify",
          data: {
              secret:"6LfEshYUAAAAAOaqkJIJD2MoGxUFo0WQPpDIZovG",
              response: $scope.response,
              remoteip: $scope.widgetId
          },
          success:function (data) {//возвращаемый результат от сервера
                 console.log("Success!");
              },
          error:function(error) {
                console.log(error);
          }  
        });
        */
        //сделать верификацию на сервера у гугл с токеном юзера
        if ($scope.isRecaptched) {
            document.getElementById("validationCaptcha").style.visibility = "hidden";
            $.ajax ({
              type: 'POST',
              url: "/recaptcha",
              data: {
                  resp: $scope.response
              },
              success:function (data) {//возвращаемый результат от сервера
                    console.log('Success');
              },
              error:function(error) {
                console.log('Failed validation');
                // In case of a failed validation you need to reload the captcha
                // because each response can be checked just once
                vcRecaptchaService.reload($scope.widgetId);
              }
            });
            console.log('sending the captcha response to the server', $scope.response);
        }
        else {
            document.getElementById("validationCaptcha").style.visibility = "visible";
            return false;
        }
    };
    
    $scope.submitRegistry = function() {
        if ($scope.isRecaptched) {
            
            var loc = this.baseURI;
            var datas = {"lastName":$("#lastName").val(), 
                         "firstName" :$("#firstName").val(),
                         "username" :$("#email").val(),
                         "phoneNumber" :$("#phoneNumber").val(),
                         "zip" :$("#zip").val(),
                         "city" :$("#city").val(),
                         "adress" :$("#adress").val(),
                         "type":$("#type").val(),
                         "password":$("#pass").val()
                        };
                $.ajax ({
                  type: 'POST',
                  url: loc,
                  data: datas,
                  success:function (data) {//возвращаемый результат от сервера
                       // reconfiguring the toasts as sticky
                    $().toastmessage({sticky : true});
                    // saving the newly created toast into a variable
                    $().toastmessage('showSuccessToast', '<br>'+"Your requset is successfully sent!");
                      },
                  error:function(error) {
                    // reconfiguring the toasts as sticky
                    $().toastmessage({sticky : false});
                    // saving the newly created toast into a variable
                    $().toastmessage('showErrorToast', '<br>'+error.responseText);
                  }
                });
                return false;
            }
          else {
            document.getElementById("validationCaptcha").style.visibility = "visible";
            return false;
          }
    };
});