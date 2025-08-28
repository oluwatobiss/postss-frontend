import { createContext } from "react";
import { defaultPost, defaultUserData } from "../_defaultContexts";

export const UserDataContext = createContext(defaultUserData);
export const PostsContext = createContext([defaultPost]);
