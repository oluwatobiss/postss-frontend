import { useContext } from "react";
import { DialogSubmissionProp } from "@/app/_types";
import { UserTokenNDataContext } from "./context/Contexts";
import useSWRMutation from "swr/mutation";
import mutateData from "../_utils/mutateData";

export default function DialogSubmission({
  setMediaUrl,
  uploadInputRef,
  divInputRef,
  dialogRef,
  postId,
}: Omit<DialogSubmissionProp, "mediaUrl" | "uploadInputKey">) {
  const { userTokenNData } = useContext(UserTokenNDataContext);
  const { userData, userToken } = userTokenNData;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts${
    postId ? `/${postId}/comments` : ""
  }`;
  const { trigger } = useSWRMutation(url, mutateData);

  async function submitMessage() {
    try {
      const content = divInputRef.current?.innerText || "";
      const media =
        uploadInputRef.current?.files && uploadInputRef.current.files[0];
      const authorId = userData.id;
      const formData = new FormData();

      formData.append("authorId", `${authorId}`);
      content && formData.append("body", content);
      media && formData.append("media", media as Blob);

      await trigger({ method: "POST", userToken, formData });
      if (divInputRef.current && divInputRef.current.innerText)
        divInputRef.current.innerText = "";
      if (uploadInputRef.current && uploadInputRef.current.files)
        setMediaUrl("");
      dialogRef.current?.close();
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  return (
    <section className="p-6 text-right">
      <button
        type="button"
        className="border border-[rgba(243,245,247,0.15)] rounded-xl font-semibold text-[rgb(243,245,247)] cursor-pointer px-4 py-2"
        onClick={submitMessage}
      >
        Post
      </button>
    </section>
  );
}
