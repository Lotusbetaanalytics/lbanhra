const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Routes Files
const staff = require("./routes/staff");
const auth = require("./routes/auth");
const appraisal = require("./routes/appraisal");
const department = require("./routes/department");
const upload = require("./routes/upload");
const test = require("./routes/test");
const initiative = require("./routes/initiative");
const start = require("./routes/start");
const result = require("./routes/result");
const complaint = require("./routes/complaint")
const myteam = require("./routes/team");

//load env vars
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

const app = express();

//Boy Parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//file uploads
app.use(fileupload());

//Sanitize data
app.use(mongoSanitize());

//set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

//prevent http param pollution
app.use(hpp());

//enable CORS
app.use(cors());

//Mount Routers

app.use("/api/v1/staff/", staff);
app.use("/api/v1/department/", department);
app.use("/api/v1/staff/login/", auth);
app.use("/api/v1/staff/appraisal/start", start);
app.use("/api/v1/staff/appraisal/sectiona/", appraisal);
app.use("/api/v1/staff/upload", upload);
app.use("/api/v1/staff/test", test);
app.use("/api/v1/staff/initiative", initiative);
app.use("/api/v1/staff/score", result);
app.use("/api/v1/staff/forms", complaint);
app.use("/api/v1/staff/myteam", myteam);

app.use(errorHandler);

//Set static folder
app.use(express.static(path.join(__dirname, "/public")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = process.env.PORT || 12000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close Server & exit Process

  server.close(() => process.exit(1));
});
