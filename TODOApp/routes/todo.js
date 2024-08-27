const express = require("express");
const router = express.Router();
const {
  getSingleToDo,
  getAllTodos,
  createToDo,
  deleteToDo,
  updateToDo,
} = require("../controllers/todo");
// CREATE/POST TODO
router.post("/", createToDo);
// READ/ GET SINGLE TODO
router.get("/:id", getSingleToDo);
// UPDATE/ PATCH TODO
router.post("/update/:id", updateToDo);
// DELETE/ delete TODO
router.get("/delete/:id",deleteToDo); 
// GET ALL TODOS
router.get("/", getAllTodos);

module.exports = router;
