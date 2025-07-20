const mongoose = require("mongoose");
const config = require("../config/config");
const runScheduledTasks = require("../controller/scheduler");


// const localDBURI = "mongodb+srv://bztech404:qCHx12fMv5IrUsGe@cluster0.jntipu0.mongodb.net/dev?retryWrites=true&w=majority&appName=Cluster0"; // Update this with your local MongoDB URI
// const localDBURI = "mongodb+srv://bztech404:qCHx12fMv5IrUsGe@cluster0.jntipu0.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"; // Update this with your local MongoDB URI
const localDBURI = "mongodb+srv://bztech404:qCHx12fMv5IrUsGe@cluster0.jntipu0.mongodb.net/rekha?retryWrites=true&w=majority&appName=Cluster0"; // Update this with your local MongoDB URI


mongoose.connect(localDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  // runScheduledTasks(); // Initialize cron jobs after DB connection
  console.log("Database connection is established");
}).catch((err) => {
  console.log("Error while connecting to the database:", err);
});
// mongodb+srv://bztech404:<db_password>@cluster0.jntipu0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://bztech404:<db_password>@cluster0.jntipu0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://bztech404:qCHx12fMv5IrUsGe@bztech.kxieenj.mongodb.net/?retryWrites=true&w=majority&appName=bztech