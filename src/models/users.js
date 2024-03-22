import moongose, { Schema } from "mongoose";

const UsersSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
  },
  { timestamps: true }
);
const Users = moongose.models.Users || moongose.model("Users", UsersSchema);

export default Users;
