var Message = require('mongoose').model('Message'),
    Parent = require('mongoose').model('Message'),
    Teacher = require('mongoose').model('Message');

exports.getMessagesById = function(req, res) {
    Message.find({
        parentId: req.params.parentId, teacherId:req.params.teacherId
    }, function(err, messages) {
		if (err) {
			return next(err);
		}
		else {
			res.status(200).json(messages);
		}
	});
};

exports.saveMessage = function(data) {
	
    var mess = {
        parentId: data.parentId,
        message: data.message,
        teacherId: data.teacherId,
        ownerId: data.ownerId,
        date: data.date
    };
    var message = new Message(mess);
    message.save(function(err) {
        if (err) {
            var errorMessage = getErrorMessage(err);
            return errorMessage;
        }
        else {
            return true;
        }
    });
};




