const mongoose = require("mongoose");

const dbURI = "mongodb+srv://Tafkeer_suhayb:sb32986710*%2FTafkeer@serverlessinstance0.psawpzv.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI);

// Extra

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("ERROR IN MongoDB");
});

db.on("connected", (err) => {
  console.log("MongoDB IS CONNECTED ..");
});

// connected
