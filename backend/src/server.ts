import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config()

function server() {
 const dbUri:string = process.env.URI as string;
 return mongoose
  .connect(
    dbUri!
  )
  .then(() => console.log("CONNECT TO DATABASE"))
  .catch(e => console.log(e));
}

export default server;