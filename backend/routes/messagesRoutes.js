const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");

module.exports = (notifyUser) => {
    router.get('/all', messagesController.get);

    router.post('/add', (req, res) => messagesController.add(req, res, notifyUser));

    return router;
};