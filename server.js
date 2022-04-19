const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED EXCEPTION! 🥶 Shutting down...");
  process.exit(1);
});

const app = require("./app");

// Connecting to the altas database
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(()=>{
  console.log('DB Connected Successfully!');
});

// START SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App running on port 3000...");
});
