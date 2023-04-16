const express = require("express");
const app = express();

const Router = require("./router");

app.use((req, res, next) => {
  console.log(`${req.method} : ${req.originalUrl}`);
  next();
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/users", Router.User);
app.use("/posts", Router.Post);

app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: "fail",
    message: "endpoint not found",
  });
});

app.use((err, req, res, next) => {
  console.log({
    err,
  });
  return res.status(500).json({
    error: err,
  });
});

app.listen(5000, () => {
  console.log("listening on localhost:5000");
});
