import mongoose from "mongoose";

//creating schema
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  postCreator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    dafault: [], // it does not work
  },
  createdAt: {
    type: String,
    dafault: new Date().toISOString(), // it does not work
  },
});

// create model and create a new collection
// My_collection is a class name
const postMessageCollection = new mongoose.model("PostMessage", postSchema);

export default postMessageCollection;
