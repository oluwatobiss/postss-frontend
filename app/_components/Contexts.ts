import { createContext } from "react";
import { PostProps } from "@/app/_types";
import {
  defaultComment,
  defaultPost,
  defaultUserData,
} from "../_defaultContexts";

export const CommentsContext = createContext([defaultComment]);
export const PostDialogContext = createContext(
  (postInfo: { isNewPost: boolean; post: PostProps }) => {}
);
export const PostsContext = createContext({
  posts: [defaultPost],
  updatePostCommentSum(postId: number, commentSum: number) {},
});
export const SocketContext = createContext(false);
export const UserDataContext = createContext(defaultUserData);
