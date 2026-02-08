import express from "express";
const app = express();

app.use(express.json());


let todos = [];


app.post("/todos", (req, res) => {
  const todo = {
    id: Date.now(),
    title: req.body.title,
    completed: false
  };
  todos.push(todo);
  res.json(todo);
});


app.get("/todos", (req, res) => {
  res.json(todos);
});


app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) return res.send("Todo not found");

  todo.title = req.body.title ?? todo.title;
  todo.completed = req.body.completed ?? todo.completed;

  res.json(todo);
});


app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id !== Number(req.params.id));
  res.send("Todo deleted");
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});