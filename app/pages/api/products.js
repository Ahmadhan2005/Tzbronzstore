import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("products");

  if (req.method === "GET") {
    // Ambil semua produk
    const products = await collection.find({}).toArray();
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    // Tambah produk baru
    const { name, price, game } = req.body;
    if (!name || !price || !game) {
      return res.status(400).json({ error: "name, price, dan game wajib diisi" });
    }
    const result = await collection.insertOne({ name, price, game });
    return res.status(201).json({ insertedId: result.insertedId });
  }

  if (req.method === "PUT") {
    // Update produk
    const { id, name, price, game } = req.body;
    if (!id || !name || !price || !game) {
      return res.status(400).json({ error: "id, name, price, dan game wajib diisi" });
    }
    const { ObjectId } = require("mongodb");
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, price, game } }
    );
    return res.status(200).json({ success: true });
  }

  if (req.method === "DELETE") {
    // Hapus produk
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "id wajib diisi" });
    }
    const { ObjectId } = require("mongodb");
    await collection.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}