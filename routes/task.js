const { Router } = require("express");
const { createNewTask, getAllTaskData, deleteById, setStatusById } = require("../controllers/task");
const router = Router();

router.route("/")
    .get(getAllTaskData)
    .post(createNewTask);

router.route("/:id")
    .delete(deleteById)
    .patch(setStatusById);

module.exports = router;