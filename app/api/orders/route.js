import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("orders").insertOne({
      ...data,
      createdAt: new Date(), // pastikan ada timestamp
    });
    return Response.json({ success: true, id: result.insertedId });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

// GET untuk mengambil data orders
export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const url = new URL(req.url);
    const user = url.searchParams.get("user");
    let filter = {};
    if (user) filter.user = user;
    const orders = await db.collection("orders").find(filter).sort({ createdAt: -1 }).toArray();
    return Response.json({ success: true, orders });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PATCH untuk update status order
export async function PATCH(req) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return Response.json({ success: false, error: "id dan status wajib diisi" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );
    if (result.modifiedCount === 1) {
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false, error: "Order tidak ditemukan atau tidak berubah" }, { status: 404 });
    }
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE untuk hapus order
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return Response.json({ success: false, error: "id wajib diisi" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("orders").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false, error: "Order tidak ditemukan" }, { status: 404 });
    }
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}