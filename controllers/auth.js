import usersCollection from "../models/user.js"; //we have to write module-name.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUpUser = async function (req, res) {
  console.log("Request Body: " + req.body);
  // req={body:{firstName:"",lastName:"",email:"",password:"",confirmPassword:""}}

  try {
    const user = await usersCollection.findOne({ email: req.body.email });
    if (user != null) {
      res.status(400).send({ message: "User already exists" });
      return;
    }
    if (req.body.password != req.body.confirmPassword) {
      res.status(400).send({ message: "Password does not mathch" });
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // create document for collection
    const myDocument = new usersCollection({
      name: req.body.firstName + " " + req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });

    await myDocument.save();
    console.log("myDocument: " + myDocument); //{name:"",email:"",password:"",_id:"",__v:""}

    //creating jwt token
    const token = jwt.sign(
      { userEmail: myDocument.email, userId: myDocument._id },
      "testing",
      { expiresIn: "1h" }
    );

    res.status(200).send({ currentUser: myDocument, jwtToken: token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const signInUser = async function (req, res) {
  try {
    const user = await usersCollection.findOne({ email: req.body.email });
    // user = {name:"",email:"",password:"",_id:"",__v:""}
    // it should not be null
    if (user == null) {
      res.status(404).send({ message: "User does not exist" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordCorrect == false) {
      res
        .status(400)
        .send({ message: "Invalid Credentials (Password didn't match" });
      return;
    }

    //creating jwt token
    const token = jwt.sign(
      { userEmail: user.email, userId: user._id },
      "testing",
      { expiresIn: "1h" }
    );

    res.status(200).send({ currentUser: user, jwtToken: token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export { signUpUser, signInUser };
