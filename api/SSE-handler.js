const Post = require('./models/post');
const PostMessage = require("./models/postMessage");

function sse(app) {
    
    let connections = [];

    app.get("/sse", (req, res) => {
        // if (!req.session.user) {
        //     res.json({ error: 'Not logged in!' });
        //     return;
        // }
        let connection = { req, res, hasPostMessagesUntil: 0, hasPostsUntil: 0 };
        connections.push(connection);
        req.on('close', () => connections = connections.filter(x => x !== connection));
        res.set({
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache'
        });
        
        sendPosts(connection);
        sendMessages(connection);
    })

    // The SSE sending functionality
    function sendSSE(res, eventType, data) {
        // remove passwords fields
        // data = JSON.parse(JSON.stringify(data,
        //   (key, val) => key === 'password' ? undefined : val));
        // send
        res.write(
        `event: ${eventType}\n` +
        'data: ' + JSON.stringify(data) + '\n\n'
        );
    }
        // Calculate which messages to send to a connection/user
    // (all the ones he/she doesn't have for now)
    async function sendMessages(connection) {
        // let userId = connection.req.session.user._id;   
        let messages = await PostMessage.find({
        createdAt: { $gte: new Date(connection.hasPostMessagesUntil) }
        }).sort({createdAt:1});
        connection.hasPostMessagesUntil = Date.now();
        sendSSE(connection.res, 'postMessages', messages);
      }

    // Calculate which photos to send to a connection/user
    // (all the ones he/she doesn't have for now)
    async function sendPosts(connection) {
        let posts = await Post.find({
        createdAt: { $gte: new Date(connection.hasPostsUntil) }
        }).sort({createdAt:-1});
        connection.hasPostsUntil = Date.now();
        sendSSE(connection.res, 'posts', posts);
    }

    // Change listeners - listen to DB changes
    Post.watch().on('change', () => connections.forEach(sendPosts));
    PostMessage.watch().on('change', () => connections.forEach(sendMessages));

    // Heartbeat (send empty messages with 20 second delays)
    // helps keep the connection alive - some proxies close it otherwise
    setInterval(() => connections.forEach(({ res }) =>
    sendSSE(res, 'heartbeat', new Date())), 20000);
}

module.exports.sse = sse;
