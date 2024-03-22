import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/users";
import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrpyt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {},
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        await connectMongoDB();
        const email = credentials?.email;

        const password = credentials?.password || "";
        const user = await Users.find({ email });

        if (user.length === 0) {
          return null;
        } else {
          const isCorrectPass = await bcrpyt.compare(
            password,
            user[0].password
          );
          if (isCorrectPass) {
            console.log(user);
            return {
              id: user[0]._id,
              email: user[0].email,
              name: user[0].name,
            };
          } else {
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
