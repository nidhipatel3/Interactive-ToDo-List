const Task = require("../models/task");

// create new task
async function createNewTask(req, res) {
    const { title, taskDate } = req.body;

    await Task.create({
        title,
        Tdate: taskDate ? new Date(taskDate) : undefined,
    });
    return res.status(200).json({ msg: "successfully added" });
}

// get all tasks
async function getAllTaskData(req, res) {
    const allTasks = await Task.find({});
    return res.json(allTasks);
}

// delete task
async function deleteById(req, res) {
    await Task.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "successfully deleted" });
}

// set task status
async function setStatusById(req, res) {
    await Task.findByIdAndUpdate(req.params.id, { status: req.query.status });
    return res.status(200).json({ msg: "successfully updated" });
}

module.exports = {
    createNewTask,
    getAllTaskData,
    deleteById,
    setStatusById
}