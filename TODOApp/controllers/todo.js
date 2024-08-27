const TodoModel = require("../model/ToDo");
const asyncWrapper = require("../utils/AsyncWrapper");
const CustomError = require("../error/customerror");
const getSingleToDo = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  // fetch data from db
  const Todo = await TodoModel.findById(id);
  if (!Todo) {
    // res.status(404).json("Not found");
    next(new CustomError(`${id} not found`, 404));
  }
  res.status(200).json({ message: Todo });
});

const getAllTodos = asyncWrapper(async (req, res) => {
  // get all the todos from DB
  const todos = await TodoModel.find({});
  // console.log(todos);
  // res.status(200).json({ message: todos });
  res.render("todospage.ejs", { todos });
});

const createToDo = asyncWrapper(async (req, res, next) => {
  const ToDo = await TodoModel.create(req.body);
  if (!ToDo) {
    next(new CustomError(`Couldn't create todo`, 404));
  }
  // add to db
  // res.status(201).json({ message: ToDo });
  // res.render("createpage.ejs");
  res.redirect("/");
});

const deleteToDo = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  // delete the todo in db for given id
  const deletedTodo = await TodoModel.findByIdAndDelete(id);
  if (!deletedTodo) {
    res.status(404).json({ message: "Not found" });
  }
  else {
    // res.status(200).json({ message: "TODO deleted" });
    res.redirect("/api/v1/todos");
  }
});

const updateToDo = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  // console.log(updatedData);
  const updatedToDo = await TodoModel.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  if (!updatedToDo) {
    res.status(404).json({message: "updated todo not found"});
  }
  if (!updatedData) {
    res.status(404).json({ message: "not found" });
  }
  // update the todo having this id with data from body
  // res.status(200).json({ message: updatedToDo });
  res.redirect("/api/v1/todos");
});

module.exports = {
  getSingleToDo,
  getAllTodos,
  createToDo,
  deleteToDo,
  updateToDo,
};
