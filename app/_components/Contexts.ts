import { createContext } from "react";
import { PostProps, UserTokenNDataType } from "@/app/_types";
import {
  defaultComment,
  defaultPost,
  defaultUserTokenNData,
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
export const UserTokenNDataContext = createContext({
  userTokenNData: defaultUserTokenNData,
  updateUserTokenNData: (data: UserTokenNDataType) => {},
});
