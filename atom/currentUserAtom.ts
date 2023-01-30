import { atom } from "recoil";
import { IUser } from "../interfaces/IUser";

export const currentUserState = atom<IUser | null>({
  key: "currentUserState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
