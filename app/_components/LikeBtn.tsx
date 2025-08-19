import { LikeBtnCSS } from "@/app/_types";
import { svg } from "../_svg";
import { useState } from "react";

export default function LikeBtn() {
  const [likePost, setLikePost] = useState(false);
  const fillColor = likePost ? "#ff0034" : "";
  const strokeColor = likePost ? "" : "#ccc";
  const cssVariable = {
    "--fill-color": fillColor,
    "--stroke-color": strokeColor,
  };
  return (
    <button
      type="button"
      className="likeBtn"
      onClick={() => setLikePost(!likePost)}
    >
      {console.log(likePost)!}
      <div
        className={`flex gap-x-1 text-[var(--fill-color)] [&_svg]:fill-[var(--fill-color)] [&_svg]:stroke-[var(--stroke-color)]`}
        style={cssVariable as LikeBtnCSS}
      >
        {svg.heart}
        {<span>11</span>}
        {/* {!!post.likes && <span>{post.likes}</span>} */}
      </div>
    </button>
  );
}
