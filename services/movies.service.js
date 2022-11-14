import { client } from "../index.js";

export async function updateMovie(id, data) {
  return await client
    .db("guvi")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
}
export async function deleteMovie(id) {
  return await client
    .db("guvi")
    .collection("movies")
    .deleteOne({ id: id });
}
export async function CreateMovie(data) {
  return await client
    .db("guvi").
    collection("movies")
    .insertMany(data);
}
export async function getMoviefromId(id) {
  return await client
    .db("guvi")
    .collection("movies")
    .findOne({ id: id });
}
export async function getAllMovies(request) {
  return await client
    .db("guvi")
    .collection("movies")
    .find(request.query)
    .toArray();
}
