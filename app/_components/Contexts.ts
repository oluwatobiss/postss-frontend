import { createContext } from "react";
import { defaultPost, defaultUserData } from "../_defaultContexts";
import { PostProps } from "@/app/_types";

export const UserDataContext = createContext(defaultUserData);
export const PostsContext = createContext({
  posts: [defaultPost],
  updatePosts: ([defaultPost]: PostProps[]) => {},
});
