const messagesService = require("../services/messagesService");

class MessagesController {
    get(req, res) {
        const messageList = messagesService.getMessages();
        res.json({ messages: messageList });
    }
    
    add(req, res, notifyUser) {
        const addingStatus = messagesService.addMessages(req.body, notifyUser);
        res.json({ success: addingStatus });
    }
}

const messagesController = new MessagesController();
module.exports = messagesController;