const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/recruitment_test',
    { useNewUrlParser: true, useUnifiedTopology: true})
const conn = mongoose.connection
conn.on('connected', function () {
    console.log('Database connected')
})

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    userType: {type: String, required: true},
    avatar: {type: String},
    desiredPosition: {type: String},
    personalInfo: {type: String},
    companyName: {type: String},
    positionRequirement:{type: String},
    offerSalary: {type: String},
    offerPosition: {type: String}

})

const UserModel = mongoose.model('user', userSchema)

const chatSchema = mongoose.Schema({
    from: {type: String, required: true},
    to: {type: String, required: true},
    chat_id: {type: String, required: true},//String of from + to
    content: {type: String, required: true},
    read: {type: Boolean, default: false},
    create_time: {type: Number}
})

const ChatModel = mongoose.model('chat',chatSchema)

exports.UserModel = UserModel
exports.ChatModel = ChatModel