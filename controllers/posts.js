import postMessageCollection from "../models/messagePost.js"; //we have to write module-name.js

const getPosts = async function (req, res) {
  try {
    const postMessages = await postMessageCollection.find();

    // console.log(postMessages);
    // postMessages = [{title:"",message:"",postCreator:"",tags:[""],
    // selectedFile:"",likes:[""],createdAt:"",_id:"",__v:""},{}]

    res.status(200).send(postMessages);
  } catch (error) {
    console.log("Error is " + error);
    res.status(200).send({ message: error.message });
  }
};
const getPostsBySearch = async function (req, res) {
  console.log(req.query);
  // req.query = {title:"",tags:",",}
  try {
    const title = new RegExp(req.query.title, "i");

    const posts = await postMessageCollection.find({
      $or: [{ title }, { tags: { $in: req.query.tags.split(",") } }],
    });
    // posts = [{title:"",message:"",postCreator:"",tags:[""],
    // selectedFile:"",likes:[""],createdAt:"",_id:"",__v:""},{}]
    res.status(200).send({ allData: posts });
    console.log(posts.length);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getPostById = async function (req, res) {
  const postId = req.params.postId; // req.params = {postId:""}
  try {
    const matchedPost = await postMessageCollection.findById(postId);

    // console.log(matchedPost);
    // matchedPost = {title:"",message:"",postCreator:"",tags:[""],
    // selectedFile:"",likes:[""],createdAt:"",_id:"",__v:""}

    res.status(200).send(matchedPost);
  } catch (error) {
    console.log("Error is " + error);
    res.status(200).send({ message: error.message });
  }
};

const createPost = async function (req, res) {
  console.log("Request Body: " + req.body);
  // req.body = {title:"",message:"",tags:[""],selectedFile:""}

  // create document for collection
  const myDocument = new postMessageCollection({
    ...req.body,
    createdAt: new Date().toISOString(),
    postCreator: req.userId,
  });

  //console.log("myDocument: " + myDocument);
  // myDocument = {title:"",message:"",postCreator:"",tags:[""],
  // selectedFile:"",likes:[""],createdAt:"",_id:"",__v:""}
  try {
    await myDocument.save();
    res.status(201).send(myDocument);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

const updatePost = async function (req, res) {
  // req.body = {title:"",message:"",postCreator:"",tags:[""],
  // selectedFile:"",like:[""],createdAt:"",_id:"",__v:""}
  const postId = req.query.id;

  const updatedValues = {
    creator: req.body.creator,
    title: req.body.title,
    message: req.body.message,
    tags: req.body.tags,
    selectedFile: req.body.selectedFile,
  };
  console.log(postId);
  try {
    // returns the updated document
    const updatedPost = await postMessageCollection.findByIdAndUpdate(
      postId,
      updatedValues,
      {
        new: true,
      }
    );
    res.status(200).send(updatedPost);
    // updatedPost = {title:"",message:"",postCreator:"",tags:[""],
    // selectedFile:"",likes:[""],createdAt:"",_id:"",__v:""}
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

const deletePost = async function (req, res) {
  const postId = req.query.id;
  console.log(postId);
  try {
    await postMessageCollection.findByIdAndRemove(postId);
    res.status(200).send({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

const likePost = async function (req, res) {
  const postId = req.query.id;

  console.log(postId);
  try {
    // returns the updated document
    let post = await postMessageCollection.findById(postId);
    // post = {title:"",message:"",postCreator:"",tags:[""],
    // selectedFile:"",likes:[""],createdAt:"",_id:"",__v:""}
    const index = post.likes.findIndex(function (i) {
      return i === req.userId; // trying to find if current logged user's id is in the list
    });

    if (index === -1) {
      // current logged user's id is not in the list
      // like the post
      post.likes.push(req.userId);
    } else {
      // current logged user's id is not in the list
      //dislike the post
      post.likes = post.likes.filter(function (i) {
        return i != req.userId;
      });
    }
    const updatedValues = {
      likes: post.likes,
    };

    const updatedPost = await postMessageCollection.findByIdAndUpdate(
      postId,
      updatedValues,
      {
        new: true,
      }
    );

    res.status(200).send(updatedPost);
    // updatedPost = {title:"",message:"",postCreator:"",tags:[""],
    // selectedFile:"",likes:[""],createdAt:"",_id:"",__v:""}
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

export {
  getPosts,
  getPostsBySearch,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
