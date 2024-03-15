import express from "express";
import  mongoose  from "mongoose";
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"


const app = express();
app.use(express.json())

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });
  
  app.use("/api/auth", authRoute)

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
