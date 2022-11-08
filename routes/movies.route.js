import express from "express";
import {client} from "../index.js";

const router = express.Router();

router.get("/", async function (request, response) {

    if(request.query.rating){
      request.query.rating = +request.query.rating;
    }
    // console.log(request.query);
  
    // cursor -> pagination | toArray
    const movies = await client
      .db("guvi")
      .collection("movies")
      .find(request.query)
      .toArray();
    response.send(movies);
});
  
router.get("/:id", async function (request, response) {
    const { id } = request.params;
    // db.movies.findOne({id:100})
    const movie = await client
      .db("guvi")
      .collection("movies")
      .findOne({ id: id });
    // const movie = movies.find((mv) => mv.id === id)
    movie
      ? response.send(movie)
      : response.status(404).send({ msg: "Movie not found" });
});
  
router.post("/create", async function (request, response) {
    const data = request.body;
  
    const result = await client.db("guvi").collection("movies").insertMany(data);
    response.send(result);
});
  
router.delete("/:id", async function (request, response) {
    const { id } = request.params;
    // db.movies.deleteOne({id:100})
    const result = await client
      .db("guvi")
      .collection("movies")
      .deleteOne({ id: id });
    result.deletedCount > 0
      ? response.send({msg: "Movie was deleted successfully"})
      : response.status(404).send({ msg: "Movie not found" });
});
  
router.put("/:id", async function (request, response) {
    const { id } = request.params;
    const data = request.body;
    // db.movies.updateOne({id:100}, {$set: {rating : 9}})
    const result = await client
      .db("guvi")
      .collection("movies")
      .updateOne({ id : id }, {$set: data});
  
    result 
    ? response.send(result)
    : response.status(404).send({msg: "movie not found"})
});
  
export default router;