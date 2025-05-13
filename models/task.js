const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    Tdate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
);

const Task = model("task", taskSchema);

module.exports = Task;