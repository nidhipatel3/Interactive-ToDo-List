const { Router } = require("express");
const { createNewTask, getAllTaskData, deleteById, setStatusById } = require("../controllers/task");
const Task = require("../models/task");
const router = Router();

router.route("/")
    .get(getAllTaskData)
    .post(createNewTask);

router.route("/:id")
    .delete(deleteById)
    .patch(setStatusById);

// filter data using selected date
router.get('/filter', async (req, res) => {

    const selectedDate = new Date(req.query.date);

    if (!selectedDate) {
        return res.status(400).json({ error: "No Date Provided" });
    }
    const start = new Date(selectedDate.setHours(0, 0, 0, 0));
    const end = new Date(selectedDate.setHours(23, 59, 59, 999));

    try {
        const filter = await Task.find({
            Tdate: { $gte: start, $lte: end }
        });
        if (filter.length > 0) {
            res.json(filter);
        } else {
            res.status(400).json({ error: "No data found" });
        }
    } catch (err) {
        console.error("Error filtering by date", err);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;