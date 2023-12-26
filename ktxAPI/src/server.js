import express from "express";
import cors from "cors";
import initwebRoutes from "./routes/web";
import connectDB from "./config/connectDB";
import bodyParser from "body-parser";
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: [process.env.URL_REACT, process.env.URL_REACT_MOBILE],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

initwebRoutes(app);
connectDB();

let port = process.env.PORT || 6000;

var listener = app.listen(port, function () {
  console.log("Listening on port " + listener.address().port); //Listening on port 8888
});
