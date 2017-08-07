module.exports = function(app) {
    var pushController = require('../controllers/push.server.controller');
    var adminApi = require('../controllers/adminApi.server.controller');
    app.post('/adminApi', adminApi.sendRequestForRegisterToAdmin);

    app.get('/getNotApprovedUsers', adminApi.findNotApprovedUsers);

    app.get('/sendPushNotification/:typeOfUser/:message', pushController.sendPushNotification);

    app.post('/pushSubscription/subscribe', pushController.pushSubscribe);

    app.post('/pushSubscription/unsubscribe', pushController.pushUnsubscribe);

};
