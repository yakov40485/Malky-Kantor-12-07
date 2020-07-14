const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
    idUser: {
       type: Schema.Types.ObjectId, ref: 'User' 
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    discription: {
        type: String,
           },
    date: {
        type: Date,
        default: Date.now()
    },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;


