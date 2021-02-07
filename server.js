const express = require("express");
// const morgan = require("morgan");
const mongoose = require("mongoose");


const PORT = process.env.PORT || 3000;

const app = express();

// app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Mongoose connect to deploy into Heroku
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.on("connection", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err) ;
});
// Required routes paths
 app.use(require("./routes/api.js"));

// require("./routes/html-routes.js")(app);

// Listener
app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}`);
});
