import { useContext, useEffect, useState } from "react";
import { UserTokenNDataContext } from "./context/Contexts";
import { LikeBtnCSS, LikeBtnProps } from "@/app/_types";
import { socket } from "../_socket";
import { svg } from "../_svg";
import useSWRMutation from "swr/mutation";
import mutateData from "../_utils/mutateData";

export default function LikeBtn({ commentId, postId, likes }: LikeBtnProps) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts/${postId}${
    commentId ? `/comments/${commentId}` : ""
  }`;
  const { userTokenNData } = useContext(UserTokenNDataContext);
  const { userToken, userData } = userTokenNData;
  const userId = userData.id;
  const [likePost, setLikePost] = useState(false);
  const [totalLikes, setTotalLikes] = useState({
    commentId,
    postId,
    likes: likes.length,
  });
  const { trigger } = useSWRMutation(url, mutateData);
  const fillColor = likePost ? "#ff0034" : "";
  const strokeColor = likePost ? "" : "#ccc";
  const cssVariable = {
    "--fill-color": fillColor,
    "--stroke-color": strokeColor,
  };

  async function togglePostLike(e: React.MouseEvent<HTMLButtonElement>) {
    try {
      await trigger({ method: "PUT", userId, userToken, likePost: !likePost });
      setLikePost(!likePost);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  useEffect(() => {
    likes.includes(userId) && setLikePost(true);
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

  useEffect(() => {
    function onCommentLike(info: { commentId: number; likes: number }) {
      info.commentId === totalLikes.commentId &&
        setTotalLikes({ ...totalLikes, likes: info.likes });
    }
    // On getting a commentLike event from the server, update the clicked comment's total likes
    socket.on("commentLike", onCommentLike);
    return () => {
      socket.off("commentLike", onCommentLike);
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
