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
    if (!user)
      return Response.json({ error: "Username tidak ditemukan" }, { status: 400 });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return Response.json({ error: "Password salah" }, { status: 400 });

    return Response.json(
      {
        success: true,
        user: {
          username: user.username,
          role: user.role || "user",
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}