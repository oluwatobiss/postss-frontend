import { CSSProperties, Dispatch, SetStateAction } from "react";

interface LikeBtnCSS extends CSSProperties {
  "--fill-color": string;
  "--stroke-color": string;
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type ChildrenProps = Readonly<{ children: React.ReactNode }>;
type DateProps = { date: string; styles: string };
type DeleteFetcherOptions = { id: number; userToken: string };
type DialogSubmissionProp = {
  divInputRef: React.RefObject<HTMLDivElement | null>;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  postId: number;
};
type Errors = { msg: string; path: string };
type FormEvent = React.FormEvent<HTMLFormElement>;
type GetFetcherOptions = { url: string; userToken: string };
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
  published: boolean;
  authorId: number;
  views: number;
  likes: number[];
  author: string;
  comments: number;
};
type CommentProps = Omit<PostProps, "comments"> & { postId: number };
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
type PostUserOption = { arg: PostUserArg };
type PutUserOption = {
  arg: Omit<PostUserArg, "password"> & {
    firstName: string;
    lastName: string;
    bio: string;
    website: string;
    userToken: string | false | null;
  };
};
type PutPostOption = {
  arg: {
    userId: number;
    userToken: string;
    likePost: boolean;
  };
};
type UpsertFetcherOption = { arg: { name: string; imageUrl: string } };
type UserDataType = {
  userToken: string;
  userData: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    bio: string;
    email: string;
    website: string;
    password: string;
    status: string;
    followers: number[];
    following: number[];
  };
};

type BioType = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  email: string;
  website: string;
  password: string;
  status: string;
};

type UserDataContextType = {
  userData: UserDataType;
  updateUserData: (userData: UserDataType) => void;
};
type PostUserAuthOption = { arg: { email: string; password: string } };
type SvgProps = {
  ariaLabel: string;
  viewBox: string;
  style: CSSProperties;
};
type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  status: string;
};

export type {
  ChangeEvent,
  CommentProps,
  DateProps,
  DeleteFetcherOptions,
  DialogSubmissionProp,
  Errors,
  FormEvent,
  GetFetcherOptions,
  LikeBtnCSS,
  LikeBtnProps,
  LoggedInUser,
  PostDialogProps,
  PostProps,
  PostCardProps,
  PostUserAuthOption,
  PostUserOption,
  PutUserOption,
  PutPostOption,
  ChildrenProps,
  SvgProps,
  UpsertFetcherOption,
  User,
  UserDataType,
  BioType,
  UserDataContextType,
};
