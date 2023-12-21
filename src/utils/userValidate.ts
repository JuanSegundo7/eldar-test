import { IUser } from "@/types/types";
import { users } from "../data/users";

export const userValidate = (user: IUser) => {
  const foundUser = users.find(
    (userDB) => user.email === userDB.email && user.password === userDB.password
  );

  if (foundUser) {
    return foundUser;
  }

  return null;
};
