"use strict";
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");

const keys = require("./server/config/keys");
const TodoItems = require("./server/routes/TodoItems");

const app = express();

const server = http.createServer(app);

app.use(helmet());

// Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(keys.mongoUri, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB database Connected");
  })
  .catch(err => console.log(err));

// Use Routes
app.use("/api/todos", TodoItems);

// Serve static react assets if environment is production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Api server listening on port ${port}`));
