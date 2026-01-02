const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

const filePath = "./students.json";

// READ
app.get("/students", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

// CREATE
app.post("/students", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const newStudent = {
    id: Date.now(),
    name: req.body.name,
    class: req.body.class
  };
  data.push(newStudent);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json(newStudent);
});

// UPDATE
app.put("/students/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync(filePath));
  const id = Number(req.params.id);

  data = data.map(s =>
    s.id === id ? { ...s, ...req.body } : s
  );

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ message: "Updated" });
});

// DELETE
app.delete("/students/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync(filePath));
  const id = Number(req.params.id);

  data = data.filter(s => s.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.json({ message: "Deleted" });
});

app.listen(4000, () => {
  console.log("Backend running on port 4000");
});
