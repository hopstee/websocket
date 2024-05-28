const path = require("path");
const fileHelper = require("../helpers/filesHelper");

const filePath = path.join(process.cwd(), 'messages.json')

class MessagesService {
    getMessages() {
        return fileHelper.readFile(filePath);
    }

    addMessages(data, notifyUser) {
        const messagesList = this.getMessages(data);

        if (messagesList.length === 9) {
            messagesList.pop();
        }

        messagesList.unshift({
            title: data.title || "",
            content: data.content || "",
            date: Date.now(),
        });

        console.log("new message created");
        notifyUser();

        return fileHelper.writeFile(filePath, messagesList);
    }
}

const messagesService = new MessagesService();
module.exports = messagesService;