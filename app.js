const express = require("express");
const axios = require("axios");

const app = express();

const todosURL = "https://jsonplaceholder.typicode.com/todos";
const userURL = "https://jsonplaceholder.typicode.com/users/";

app.get("/", (req, res) => {
  res.send("api running ");
});

const getTodos = async () => {
  let todosStore;
  const data = await axios.get(todosURL);
  todosStore = data.data;
  return todosStore;
};

app.get("/todos", async (req, res) => {
  try {
    const todosStore = await getTodos();

    // this method delete object property
    // todosStore.forEach((object) => delete object["userId"]);

    // this method exclude or not include userId object property and return copy of array
    let filterData = todosStore.map(({ userId, ...rest }) => rest);
    res.send(filterData);
  } catch (error) {
    console.log(error);
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    let userStore = [];
    let todos = await getTodos();

    result = await axios.get(`${userURL}${req.params.id}`);
    userStore = result.data;
    let newTodoData = todos.filter((item) => item.userId === userStore.id);
    userStore.todos = newTodoData;
    res.send(userStore);
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log("listening");
});
