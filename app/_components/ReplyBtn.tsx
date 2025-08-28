import { svg } from "../_svg";

export default function ReplyBtn({
  hasReply,
  total,
}: {
  hasReply: boolean;
  total: number;
}) {
  return (
    <button className="replyBtn">
      <div className="flex gap-x-1">
        {svg.chat}
        {hasReply && <span>{total}</span>}
      </div>
    </button>
  );
}
