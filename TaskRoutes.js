const express = require('express');
const taskModel = require('../models/taskModel');
const app = express();

app.get('/tasks', async (req, res) => {
    const task = await taskModel.find({});
    try {
        res.send(JSON.stringify(task));
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/tasks', async (req, res) => {
    const task = new taskModel(req.body);
    try {
        await task.save();
        res.send(task);
    } catch (err) {
        res.status(500).send(err);
    }
});
app.delete('/tasks/:id',  (req, res) => {
        var myquery = { _id: req.params.id };
        taskModel.deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            res.send("ok");
        });
    });
//app.put('/tasks', (req, res) => {
//    console.log(req.body)
//    taskModel.updateOne(req.body), function (err, res) {
//        if (err) throw err;
//        res.send("ok");
//    }
//});
app.put('/tasks/:id', function (req, res) {
    const doc = {
        name: req.body.name,
        email: req.body.email,
        discription: req.body.discription,
        date: req.body.date
    }
    console.log(doc)
    taskModel.updateOne({ _id: req.params.id }, doc, function (err, raw) {
        if (err) throw err;
        res.send("ok");
    });
});

module.exports = app
