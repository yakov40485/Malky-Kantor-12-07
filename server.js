const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRoutes.js');
const taskRouter = require('./routes/TaskRoutes.js');

const app = express();
app.use(express.json()); // Make sure it comes back as json

//mongoose.connect('mongodb://localhost:27017/task-managment', {
//    useNewUrlParser: true
//});
mongoose.connect("mongodb://localhost:27017/task-managment", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database Successfully Connected')
}, error => {
    console.log(error)
})

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(userRouter);
app.use(taskRouter);

app.listen(3000, () => { console.log('Server is running...') });
