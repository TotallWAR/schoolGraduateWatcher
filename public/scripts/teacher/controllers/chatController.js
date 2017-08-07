angular.module('chatTeacherController', [])
    .controller('chatTeacherCtrl', ['$scope', 'socketSrvc', 'chatSrvc', 'usersSrvc', '$sce', function($scope, socketSrvc, chatSrvc, usersSrvc, $sce) {
        $scope.currentParent = null;
        $scope.messagesUpdated = [];
        $scope.htmlCodeMessages = '';
        // Socket listeners
        // ================
        socketSrvc.on('init', function(data) {
            chatSrvc.getParents().then((data) => {
                $scope.user = data.data.user;
                $scope.name = data.data.user.firstName + " " + data.data.user.lastName;
                $scope.parents = data.data.parents;
                $.each($scope.parents, (index, item) => {
                    usersSrvc.getUserById(item._id).then((data) => {
                        item.fullName = data.data.firstName + " " + data.data.lastName;
                    });
                });
            });
        });

        socketSrvc.on('send:message', function(message) {
            if ($scope.currentParent !== null) {
                $scope.messages.push(message);
                $scope.messagesUpdated.push(message);
                updateChat($scope.messages);
            }
        });

        socketSrvc.on('change:name', function(data) {
            changeName(data.oldName, data.newName);
        });

        socketSrvc.on('user:join', function(data) {
            $scope.messages.push({
                user: 'chatroom',
                text: 'User ' + data.name + ' has joined.'
            });
            $scope.users.push(data.name);
        });

        // add a message to the conversation when a user disconnects or leaves the room
        socketSrvc.on('user:left', function(data) {
            $scope.messages.push({
                user: 'chatroom',
                text: 'User ' + data.name + ' has left.'
            });
            var i, user;
            for (i = 0; i < $scope.users.length; i++) {
                user = $scope.users[i];
                if (user === data.name) {
                    $scope.users.splice(i, 1);
                    break;
                }
            }
        });

        $scope.renderHtml = function(htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };


        $scope.changedValue = (parent) => {
            $scope.currentParent = parent;
            $scope.messagesUpdated = [];

            //здесь нужно будет очищать еще форму с сообщениями
            if (parent !== null) {
                //по факту id учителя - это поле айди юзера в коллекции  учитель
                chatSrvc.getMessages($scope.user._id, $scope.currentParent._id).then((data) => {
                    $scope.messages = data.data;
                    updateChat($scope.messages);
                });
            } else {
                updateChat($scope.messagesUpdated);
            }

        };


        // Private helpers
        // ===============

        var updateChat = function(messages) {
            $scope.htmlCodeMessages = '';
            var promise = new Promise((resolved, rejected) => {
                for (var i = 0; i < messages.length; i++) {
                    usersSrvc.getUserById(messages[i].parentId, i).then((data) => {
                        if (data.data !== null) {
                            messages[data.data.index].fullNameParent = data.data.firstName + ' ' + data.data.lastName;
                        }
                        usersSrvc.getUserById(messages[data.data.index].teacherId, data.data.index).then((data) => {
                            if (data.data !== null) {
                                messages[data.data.index].fullNameTeacher = data.data.firstName + ' ' + data.data.lastName;
                                if (messages[data.data.index].ownerId == messages[data.data.index].parentId) {
                                    messages[data.data.index].ownerName = messages[data.data.index].fullNameParent;
                                    messages[data.data.index].ownerType = "parent";
                                } else {
                                    messages[data.data.index].ownerName = messages[data.data.index].fullNameTeacher;
                                    messages[data.data.index].ownerType = "teacher";
                                }
                                //$scope.messagesUpdated.push(messages[data.data.index]);
                                updateMessagesHtml(messages[data.data.index]);
                            }
                            if (data.data.index == messages.length - 1)
                                resolved();
                        });
                    });
                }
            });

            promise.then(() => {
                var elem = document.getElementById('chatBody');
                elem.scrollTop = elem.scrollHeight;
            });

        };

        var updateMessagesHtml = function(item) {

            if (item.ownerType !== 'parent') {
                $scope.htmlCodeMessages += '<li class="left clearfix"><span class="chat-img pull-left"><img src="public/img/me.png" alt="User Avatar" class="img-circle" /></span><div class="chat-body clearfix"><div class="headerChat"><strong class="primary-font">' + item.ownerName + '</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>' + item.date + '</small></div><p>' + item.message + '</p></div></li>';
            } else {
                $scope.htmlCodeMessages += '<li class="right clearfix"><span class="chat-img pull-right"><img src="public/img/you.png" alt="User Avatar" class="img-circle" /></span><div class="chat-body clearfix"><div class="headerChat"><small class=" text-muted"><span class="glyphicon glyphicon-time"></span>' + item.date + '</small><strong class="pull-right primary-font">' + item.ownerName + '</strong></div><p class = "pull-right">' + item.message + '</p></div></li>';
            }
            var elem = document.getElementById('chatBody');
            elem.scrollTop = elem.scrollHeight;
        };

        var changeName = function(oldName, newName) {
            // rename user in list of users
            var i;
            for (i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i] === oldName) {
                    $scope.users[i] = newName;
                }
            }

            $scope.messages.push({
                user: 'chatroom',
                text: 'User ' + oldName + ' is now known as ' + newName + '.'
            });
        };

        // Methods published to the scope
        // ==============================

        $scope.changeName = function() {
            socketSrvc.emit('change:name', {
                name: $scope.newName
            }, function(result) {
                if (!result) {
                    alert('There was an error changing your name');
                } else {

                    changeName($scope.name, $scope.newName);

                    $scope.name = $scope.newName;
                    $scope.newName = '';
                }
            });
        };

        $scope.messages = [];

        $scope.sendMessage = function() {
            var currentdate = new Date();
            var date = currentdate.getDate() + "/" +
                (currentdate.getMonth() + 1) + "/" +
                currentdate.getFullYear() + " " +
                currentdate.getHours() + ":" +
                currentdate.getMinutes() + ":" +
                currentdate.getSeconds();
            var message = {
                message: $scope.message,
                parentId: $scope.currentParent._id,
                teacherId: $scope.user._id,
                ownerId: $scope.user._id,
                date: date //(new Date).toLocaleTimeString()
            };
            socketSrvc.emit('send:message', message);

            // add the message to our model locally
            $scope.messages.push(
                message
            );
            $scope.messagesUpdated.push(message);
            updateChat($scope.messages);
            //$scope.$apply();

            // clear message box
            $scope.message = '';
        };
    }]);
