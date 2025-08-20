import { CSSProperties } from "react";

interface LikeBtnCSS extends CSSProperties {
  "--fill-color": string;
  "--stroke-color": string;
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type DateProps = { date: string; styles: string };
type DeleteFetcherOptions = { id: string; userToken: string | false | null };
type DivInputRef = { divInputRef: React.RefObject<HTMLDivElement | null> };
type Errors = { msg: string; path: string };
type FormEvent = React.FormEvent<HTMLFormElement>;
type GetFetcherOptions = { url: string; userToken: string };
type LikeBtnProps = { postId: number; likes: number[] };
type LoggedInUser = { id: number; username: string; status: string };
type AsideProps = { openPostDialog: (isNewPost: boolean) => void };
type PostDialogProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  isNewPost: boolean;
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
    userId: string;
    userToken: string | false | null;
    likePost: boolean;
  };
};
type RootElementsProps = Readonly<{ children: React.ReactNode }>;
type UpsertFetcherOption = { arg: { name: string; imageUrl: string } };
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
  DateProps,
  DeleteFetcherOptions,
  DivInputRef,
  Errors,
  FormEvent,
  GetFetcherOptions,
  LikeBtnCSS,
  LikeBtnProps,
  LoggedInUser,
  AsideProps,
  PostDialogProps,
  PostProps,
  PostUserAuthOption,
  PostUserOption,
  PutUserOption,
  PutPostOption,
  RootElementsProps,
  SvgProps,
  UpsertFetcherOption,
  User,
};
