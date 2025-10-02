export const defaultUserTokenNData = {
  userToken: "",
  userData: {
    id: 0,
    firstName: "n/a",
    lastName: "n/a",
    username: "n/a",
    bio: "n/a",
    email: "n/a",
    website: "n/a",
    password: "n/a",
    avatar: "https://avatar.iran.liara.run/public",
    status: "n/a",
    followers: [0],
    following: [0],
    isDemo: false,
    isGitHub: false,
  },
};

export const defaultComment = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  content: "",
  published: true,
  authorId: 0,
  views: 0,
  likes: [0],
  author: "",
  authorAvatar: "https://avatar.iran.liara.run/public",
  postId: 0,
};

export const defaultPost = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  content: "",
  media: { path: "", name: "" },
  published: true,
  authorId: 0,
  views: 0,
  likes: [0],
  author: "",
  authorAvatar: "https://avatar.iran.liara.run/public",
  comments: 0,
};
