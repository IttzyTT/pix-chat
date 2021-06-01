const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const sse = require('./SSE-handler');

app.use(cors());
app.use(express.json({limit: '50mb'}));

// URL Destinations
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const postsRouter = require("./routes/posts");
app.use("/posts", postsRouter);

const postMessagesRouter = require("./routes/postMessages");
app.use("/postmessages", postMessagesRouter);

//sse
sse.sse(app);

// Connect to Mongo DB Atlas
mongoose.connect(
    "mongodb+srv://pixchat:frk20s@cluster0.qmhfd.mongodb.net/pixChat?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('DB connected');
        const port = 4000;
        app.listen(port, () => console.log(`api started on port: ${port}`));
    }
)