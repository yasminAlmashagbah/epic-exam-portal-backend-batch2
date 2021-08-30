const express = require("express");
const app = express();
const cors = require("cors");
const UserRouter = require("./Api/User");
const db = require("./models");

//
app.use(cors());
app.use(express.json());

///
app.get("/", (req, res) => {
  res.status(200);
  res.send("yasmin");
});
app.use("/user", UserRouter);
//
const port = 3001;
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("server is up and running on " + port);
  });
});
