import { createContext } from "react";
import { defaultPost, defaultUserData } from "../_defaultContexts";

export const PostDialogContext = createContext((isNewPost: boolean) => {});
export const PostsContext = createContext([defaultPost]);
export const SocketContext = createContext(false);
export const UserDataContext = createContext(defaultUserData);
