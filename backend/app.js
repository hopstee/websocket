const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
const http = require("http").createServer(app);
const WebSocket = require("ws");

const PORT = 3001;

const corsOptions ={
    origin: true, 
    credentials: true,
}

app.use(cors(corsOptions))
// app.options("*", cors(corsOptions));
app.use(bodyParser.json());

const wss = new WebSocket.Server({ server: http });

wss.on('connection', (ws) => {
    console.log('Соединение установлено');

    ws.on('close', (data) => {
        console.log('Соединение прервано');
    });
});

const notifyUser = () => {
    wss.clients.forEach((client) => {
        client.send('update');
    });
}


const messagesRoutes = require("./routes/messagesRoutes");

app.use("/messages", messagesRoutes(notifyUser));

http.listen(PORT, () =>
    console.log(`Server listens http://localhost:${PORT}`)
);