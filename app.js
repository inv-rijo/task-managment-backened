const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);
const port = process.env.PORT || 5000;
const {User} = require("./model/User");
const auth=require('./Middleware/Auth')
app.use(express.json());
app.use(cors());
app.get("/welcome", auth.verifyToken,auth.adminAccess, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
})
const loginRouter = require("./router/LoginRouter");
app.use("/login", loginRouter);
//admin route
const adminRouter = require("./router/AdminRouter");
app.use("/admin", adminRouter)
// User.sync({force:true})
//   .then(() => {
//     console.log("Success");
//   })
//   .catch((err) => {
//     console.log("errr" + err);
//   });

// listening to backend port

http.listen(port, () => {
  console.log("Server started on port " + port);
});
