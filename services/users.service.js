import { client } from "../index.js";

export async function CreateUser(data) {
  return await client.db("guvi").collection("users").insertOne(data);
}

export async function getUserByName(username) {
    return await client
      .db("guvi")
      .collection("users")
      .findOne({ username: username });
  }