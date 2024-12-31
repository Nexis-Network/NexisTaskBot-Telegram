var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dot_env = require("dotenv");
var cors = require('cors');

dot_env.config();
var apiRouter = require("./routes/api/main");
var app = express();

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);



//404 handler
app.use(function(req, res, next) {

    return res.status(404).json({
        statusCode: 404,
        status: "error",
        message: "Not found",
    });
});

//500 handler
app.use(function(err, req, res, next) {
    console.log("err", err)
    return res.status(err.status || 500).json({
        statusCode: 500,
        status: "error",
        message: "Internal server error",
    });
});

module.exports = app;