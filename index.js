import express from "express"; // import express
import { MongoClient } from "mongodb";
import moviesRouter from "./routes/movies.route.js"
import * as dotenv from "dotenv";
dotenv.config();

// console.log(process.env.MONGO_URL);  // env -> environment variables
const app = express(); // call express
// const MONGO_URL = "mongodb://127.0.0.1"; // local database
const MONGO_URL = process.env.MONGO_URL;  // atlas connect
const client = new MongoClient(MONGO_URL);
// top-level await
await client.connect(); // call
console.log("Mongo is connected");

// express.json() - middleware (inbuilt) | converts data to JSON
// app.use -> Intercepts -> applies express.json()
app.use(express.json());

const PORT = process.env.PORT;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 Today express learn");
});

app.use("/movies", moviesRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export {client};