const cors = require("cors");
const history = require("connect-history-api-fallback");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const compression = require("compression");

const app = express();
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(history());

mongoose
  .connect(
    "DATABASE LINK HERE!",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(
  session({
    secret: "alamut",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./passport/strategy")(passport);

const routes = require("./routes");
app.use("/api", routes);

// Handle production
if (process.env.NODE_ENV === "production") {
  //static folder
  app.use(express.static(__dirname + "/public/"));
  //handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server up on port ${port}.`);
});
