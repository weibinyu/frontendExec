const {ChatModel} = require('../db/models')

module.exports = function (server){
  const io = require('socket.io')(server,{
    cors: {
      origin: "https://localhost:3000",
      methods: ["GET", "POST"]
    }
  })

  io.on('connection',socket => {
    console.log("socketIO connected")

    socket.on('sendMessage', ({from,to,content}) => {
      const chat_id = [from,to].sort().join('_')
      const create_time = Date.now()
      new ChatModel({from,to,content,chat_id,create_time}).save((err,chatMessageDoc) => {
        io.emit('receiveMessage',chatMessageDoc)
      })
    })
  })
}