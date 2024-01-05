const mongoose = require("mongoose");
// fHo8knmYEeRizdQ0
//
const connectDB = async () => {
  try {
    const password = "fHo8knmYEeRizdQ0";
    const MONGO_URI = `mongodb+srv://speer:${password}@cluster0.gboothr.mongodb.net/?retryWrites=true&w=majority`;
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
