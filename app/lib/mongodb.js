import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Pastikan variabel ini ada di .env.local
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Gunakan global agar tidak membuat koneksi baru setiap reload di dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Di production selalu buat koneksi baru
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;