import clientPromise from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    if (!username || !password)
      return Response.json({ error: "Username dan password wajib diisi" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection("users").findOne({ username });
    if (user)
      return Response.json({ error: "Username sudah terdaftar" }, { status: 400 });

    const hash = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({ username, password: hash, role: "user" });
    return Response.json({ success: true }, { status: 201 });
  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}