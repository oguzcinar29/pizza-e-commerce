import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { email, password, name } = await request.json();
  console.log(email);

  try {
    await connectMongoDB();
    const users = await Users.find();
    const findUser = users.find((item) => item.email === email);
    console.log(findUser);
    if (!findUser) {
      const encryptedPass = await bcrypt.hash(password, 10);
      await Users.create({ email, password: encryptedPass, name });
      return NextResponse.json({ message: "success" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Email already exist! Try to log in instead." },
        { status: 422 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
