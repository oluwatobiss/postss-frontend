import { CSSProperties, Dispatch, SetStateAction } from "react";

interface LikeBtnCSS extends CSSProperties {
  "--fill-color": string;
  "--stroke-color": string;
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type ChildrenProps = Readonly<{ children: React.ReactNode }>;
type DateProps = { date: string; styles: string };
type DialogSubmissionProp = {
  setDialogReplyKey: React.Dispatch<SetStateAction<string>>;
  uploadInputRef: React.RefObject<HTMLInputElement | null>;
  divInputRef: React.RefObject<HTMLDivElement | null>;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  postId: number;
};
type Errors = { msg: string; path: string };
type FormEvent = React.FormEvent<HTMLFormElement>;
type GetFetcherOpt = { url: string; userToken?: string; sendCookie?: boolean };
type LikeBtnProps = { commentId?: number; postId?: number; likes: number[] };
type LoggedInUser = { id: number; username: string; status: string };
type PostDialogProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  postInfo: { isNewPost: boolean; post: PostProps };
};
type PostProps = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  media: { path: string; name: string };
  published: boolean;
  authorId: number;
  views: number;
  likes: number[];
  author: string;
  authorAvatar: string;
  comments: number;
};
type CommentProps = Omit<PostProps, "comments"> & { postId: number };
type mutateDataArg = {
  admin?: boolean;
  adminCode?: string;
  bio?: string;
  avatar?: string;
  email?: string;
  firstName?: string;
  follow?: boolean;
  formData?: FormData;
  id?: number;
  lastName?: string;
  likePost?: boolean;
  method: string;
  password?: string;
  sendCookie?: boolean;
  userId?: number;
  username?: string;
  userToken?: string;
  website?: string;
};
type mutateDataOpt = { arg: mutateDataArg };
type PostCardProps = {
  comment?: CommentProps;
  commentSum?: number;
  post?: PostProps;
};
type PostUserArg = {
  username: string;
  email: string;
  password: string;
  admin: boolean;
  adminCode: string;
};
type UserTokenNDataType = {
  userToken: string;
  userData: User;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  email: string;
  website: string;
  password: string;
  avatar: string;
  status: string;
  followers: number[];
  following: number[];
  isDemo: boolean;
  isGitHub: boolean;
};

type UserTokenNDataContextType = {
  userData: UserTokenNDataType;
  updateUserTokenNData: (userData: UserTokenNDataType) => void;
};
type SvgProps = {
  ariaLabel: string;
  viewBox: string;
  style: CSSProperties;
};

export type {
  ChangeEvent,
  CommentProps,
  DateProps,
  DialogSubmissionProp,
  Errors,
  FormEvent,
  GetFetcherOpt,
  mutateDataArg,
  mutateDataOpt,
  LikeBtnCSS,
  LikeBtnProps,
  LoggedInUser,
  PostDialogProps,
  PostProps,
  PostCardProps,
  ChildrenProps,
  SvgProps,
  User,
  UserTokenNDataType,
  UserTokenNDataContextType,
};
