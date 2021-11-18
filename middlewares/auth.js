import jwt from "jsonwebtoken";

function auth(req, res, next) {
  try {
    const jwtToken = req.headers.authorization.split(" ")[1];

    console.log(jwtToken);
    // jwtToken="", it is a string
    const decodedData = jwt.verify(jwtToken, "testing");
    // {userEmail:"",userId:""} -> usedId is _id which we got fron database
    console.log(decodedData);

    req.userId = decodedData?.userId;
    next();
  } catch (error) {
    next("Authentication could not done");
  }
}
export default auth;
