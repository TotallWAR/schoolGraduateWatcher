var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PushSubscriptionSchema = new Schema({
    endpoint: String,
    authKey: String,
    p256dhKey: String,
    userType: String,
    userId: {
        type: "ObjectId"
    }
}, {
    collection: 'pushSubscriptions'
});


mongoose.model('PushSubscription', PushSubscriptionSchema);
