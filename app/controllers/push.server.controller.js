var User = require('mongoose').model('User');
var PushSubscription = require('mongoose').model('PushSubscription');

const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();

//webpush.setGCMAPIKey('AIzaSyBBh4ddPa96rQQNxqiq_qQj7sq1JdsNQUQ');
// webpush.setVapidDetails(
//     //'mailto:example@yourdomain.org',
//     'BL0mVscdXestt_2BbEj9LjwIAOSbX9hZ7Otkltu-uk-fwwGixuozCiN_U2QokjX2R3ZhMhPhuhOePaPN2pazG3A',
//     '94prGYRKmZZosKmGk1iOucxPcV9tpGUaPrPkVNhXL9o'
// );

exports.sendPushNotification = function(req, res, next) {
    var query = {
        userType: req.params.typeOfUser
    };
    if (req.params.typeOfUser == "All") {
        query = {};
    }
    PushSubscription.find(query, function(err, subscribtions) {
        if (err) {
            res.status(404);
        } else {
            for (var i = 0; i < subscribtions.length; i++) {
                const pushSubscription = {
                    endpoint: subscribtions[i].endpoint,
                    keys: {
                        auth: subscribtions[i].authKey,
                        p256dh: subscribtions[i].p256dhKey
                    }
                };
                setTimeout(() => {
                    const options = {
                        TTL: 24 * 60 * 60,
                        vapidDetails: {
                            subject: 'mailto:sender@example.com',
                            publicKey: 'BL0mVscdXestt_2BbEj9LjwIAOSbX9hZ7Otkltu-uk-fwwGixuozCiN_U2QokjX2R3ZhMhPhuhOePaPN2pazG3A',
                            privateKey: '94prGYRKmZZosKmGk1iOucxPcV9tpGUaPrPkVNhXL9o'
                        },
                    }

                    webpush.sendNotification(
                        pushSubscription,
                        req.params.message,
                        options
                    );

                }, 0.1);



                //webpush.sendNotification(pushSubscription, req.params.message);
            }
        }
    });
};

exports.pushSubscribe = function(req, res, next) {
    var subscription = JSON.parse(req.body.subscriptionJSON);
    var newSubscription = new PushSubscription({
        endpoint: subscription.endpoint,
        authKey: subscription.keys.auth,
        p256dhKey: subscription.keys.p256dh,
        userType: req.user.type,
        userId: req.user._id
    });
    PushSubscription.findOne({
        endpoint: subscription.endpoint
    }, function(err, subscribtion) {
        if (err) {
            res.status(404);
        } else {
            if (subscribtion === null) {
                newSubscription.save(function(err, newSubscription) {
                    if (err) {
                        next(err);
                    } else {
                        return res.status(200).json(newSubscription);
                    }
                });
            }
        }
    });

};

exports.pushUnsubscribe = function(req, res, next) {
    var subscription = JSON.parse(req.body.subscriptionJSON);
    PushSubscription.findOne({
        endpoint: subscription.endpoint
    }, function(err, subscribtion) {
        if (err) {
            res.status(404);
        } else {
            subscribtion.remove(function(err) {
                if (err) {
                    return res.status(500);
                } else {
                    return res.status(200);
                }
            });
        }
    });
};

// This is the same output of calling JSON.stringify on a PushSubscription
