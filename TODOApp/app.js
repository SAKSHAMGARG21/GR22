const express = require("express");
const connectDb = require("./db/connect");
require("dotenv").config();
require("ejs");
const router = require("./routes/todo");
const notfound = require("./middleware/notfound");
const errorHandler = require("./middleware/CutomErrorHandler");
const cors = require("cors");

const PORT = 5000;

const app = express();

app.set("view engin", "ejs");

// middleware
app.use(cors());
app.use(express.json());

app.use(express.static("public"));
app.use(express.urlencoded({ extends: true }));
app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Todo App" });
})

// app.get("/todospage",(req,res)=>{
//   re.render("todospage.ejs",);
// })

app.get("/createtodo", (req, res) => {
  res.render("createpage.ejs")
})

app.use("/api/v1/todos", router);
app.use(notfound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDb(process.env.DB_URL);
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
// app.get("/", (req, res) => {
//   res.json({ messsage: "API home" });
// });


