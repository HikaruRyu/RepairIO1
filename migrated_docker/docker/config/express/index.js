const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post("/auth", (req, res) => {
  //req.body.key
  res.status(200).send();

});

app.listen(3000, () => {
  console.log("Server is running on Port 3000.");
});