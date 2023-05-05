const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config({ path: './config/.env' })
require('./database/sequelize')

const userRoutes = require('./routes/user.routes')
const messageRoutes = require("./routes/message.routes")
// const likeRoutes = require("./routes/like.routes")
// const followRoutes = require('./routes/follow.routes')
// const commentRoutes = require('./routes/comment.routes')

const app = express()

// Middleware
app
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))

// Routes
app
    .use('/api/user', userRoutes)
    .use('/api/message', messageRoutes)
//     .use('/api/like', likeRoutes)
//     .use('/api/follow', followRoutes)
//     .use('/api/comment', commentRoutes)

app.get('/', (req, res) => {
    res.json({ message: "Hello, Heroku ! " });
});
// Server
app.listen(process.env.port || process.env.PORT, () => {
    console.log(`My backend started on the port http://127.0.0.1:${process.env.port}`)
})