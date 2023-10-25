const { Server } = require('socket.io');
const io = new Server({
    cors: {
        origin: "https://chat-frontend-7dti.vercel.app/",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

module.exports = (req, res) => {
    if (req.method === 'GET') {
        io.attach(req.socket.server);
    } else {
        res.status(405).end();
    }
};
