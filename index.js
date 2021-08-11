const express = require('express');
const EventEmitter = require('events').EventEmitter;

const EVENT_NAME = 'Kick';
const REQUEST_TIMEOUT = 30000;

const app = express();
const kickEvent = new EventEmitter();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/kickRequest', (req, res) => {
    const username = req.body.username;
    if (!username) {
        return res.sendStatus(500);
    }
    kickEvent.emit(EVENT_NAME, username);
    res.sendStatus(200);
});

app.get('/fetchKickRequests', (req, res) => {
    let timeout;

    const listener = (username) => {
        clearTimeout(timeout);
        res.json({
            username: username
        });
    }

    kickEvent.once(EVENT_NAME, listener);

    timeout = setTimeout(() => {
        kickEvent.removeListener(EVENT_NAME, listener);
        res.sendStatus(500);
    }, REQUEST_TIMEOUT);
});

app.listen(process.env.PORT);
