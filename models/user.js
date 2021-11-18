import mongoose from "mongoose";

//creating schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// create model and create a new collection
// My_collection is a class name
const usersCollection = new mongoose.model("user", userSchema);

export default usersCollection;
