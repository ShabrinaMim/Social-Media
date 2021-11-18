import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routerPosts from "./routes/posts.js"; //we have to write module-name.js
import routerAuth from "./routes/auth.js"; //we have to write module-name.js
const PORT = process.env.PORT || 4040;

//API

//App config
const app = express();

//Middleware
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors()); //we are using cors for security reason
app.use(express.json());
app.use("/posts", routerPosts);
app.use("/auth", routerAuth);

//database part
const CONNECTION_URL =
  "mongodb+srv://mim:007Shabrina007@mycluster.tb0r9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//creating database
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log("database connected");
  })
  .catch(function (errorval) {
    console.log(errorval.message);
  });

app.listen(PORT, function () {
  console.log(`Example app listening at http://localhost:${PORT}`);
  //console.log(path.join(__dirname));
});
