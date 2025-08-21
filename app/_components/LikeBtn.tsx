import { useEffect, useState } from "react";
import { LikeBtnCSS, LikeBtnProps, PutPostOption } from "@/app/_types";
import { socket } from "../_socket";
import { svg } from "../_svg";
import useSWRMutation from "swr/mutation";

async function putPost(url: string, { arg }: PutPostOption) {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${arg.userToken}`,
    },
  });
  return await response.json();
}

export default function LikeBtn({ postId, likes }: LikeBtnProps) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts`;
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");
  const [likePost, setLikePost] = useState(false);
  const [totalLikes, setTotalLikes] = useState({ postId, likes: likes.length });
  const { trigger } = useSWRMutation(`${url}/${postId}`, putPost);
  const fillColor = likePost ? "#ff0034" : "";
  const strokeColor = likePost ? "" : "#ccc";
  const cssVariable = {
    "--fill-color": fillColor,
    "--stroke-color": strokeColor,
  };

  async function togglePostLike(e: React.MouseEvent<HTMLButtonElement>) {
    try {
      await trigger({ userId, userToken, likePost: !likePost });
      setLikePost(!likePost);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  useEffect(() => {
    const userDataJson = localStorage.getItem("postssUserData");
    const userData = userDataJson && JSON.parse(userDataJson);
    const userToken = localStorage.getItem("postssToken") || "";
    setUserId(userData.id);
    setUserToken(userToken);
    likes.includes(userData.id) && setLikePost(true);
  }, []);

  useEffect(() => {
    function onPostLike(info: { postId: number; likes: number }) {
      info.postId === totalLikes.postId &&
        setTotalLikes({ ...totalLikes, likes: info.likes });
    }
    // On getting a postLike event from the server, update the clicked post's total likes
    socket.on("postLike", onPostLike);
    return () => {
      socket.off("postLike", onPostLike);
    };
  }, []);

  return (
    <button type="button" className="likeBtn" onClick={togglePostLike}>
      <div
        className={`flex gap-x-1 text-[var(--fill-color)] [&_svg]:fill-[var(--fill-color)] [&_svg]:stroke-[var(--stroke-color)]`}
        style={cssVariable as LikeBtnCSS}
      >
        {svg.heart}
        {!!totalLikes.likes && <span>{totalLikes.likes}</span>}
      </div>
    </button>
  );
}
