const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const App = express();
const userRoute = require("./routes/userRoute");
const notesRoute = require("./routes/notesRoute");
const { notFound, errorHandler } = require("./middleware/errormidle");
const rateLimiter = require("./middleware/ratelimmitin");
const compression = require("compression");
const PORT = 5001;
connectDB();
App.use(express.json());

App.use(compression());

App.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

App.use("/api/auth", rateLimiter, userRoute);
App.use("/api/notes", rateLimiter, notesRoute);

App.use(notFound);
App.use(errorHandler);
const server = App.listen(PORT, console.log(`SERVER RUNNING ON ${PORT}`));
