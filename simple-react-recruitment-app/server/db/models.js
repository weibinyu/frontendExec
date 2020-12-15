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
    offerSalary: {type: String}

})

const UserModel = mongoose.model('user', userSchema)

exports.UserModel = UserModel