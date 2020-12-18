import io from 'socket.io-client'

const socket = io('ws://localhost:4000')

socket.on('receiveMsg',function (data){
  console.log('Browser got data: ',data)
})

socket.emit('sendMsg',{name:'Tom', date: Date.now()})
console.log('Browser sending data: ',{name:'Tom', date: Date.now()})

