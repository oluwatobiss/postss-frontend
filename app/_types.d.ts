import { CSSProperties } from "react";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type DeleteFetcherOptions = { id: string; userToken: string | false | null };
type Errors = { msg: string; path: string };
type FormEvent = React.FormEvent<HTMLFormElement>;
type GetFetcherOptions = { url: string; userToken: string };
type LoggedInUser = { id: number; username: string; status: string };
type PostUserArg = {
  username: string;
  email: string;
  password: string;
  admin: boolean;
  adminCode: string;
};
type PostUserOption = { arg: PostUserArg };
type PutUserOption = {
  arg: Omit<PostUserArg, "username" | "password"> & {
    userToken: string | false | null;
  };
};
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
  DeleteFetcherOptions,
  Errors,
  FormEvent,
  GetFetcherOptions,
  LoggedInUser,
  PostUserAuthOption,
  PostUserOption,
  PutUserOption,
  SvgProps,
  UpsertFetcherOption,
  User,
};
