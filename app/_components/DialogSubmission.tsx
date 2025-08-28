import { useContext } from "react";
import { DialogSubmissionProp } from "@/app/_types";
import { UserDataContext } from "./Contexts";
import useSWRMutation from "swr/mutation";

async function postMessage(
  url: string,
  { arg }: { arg: { post: string; authorId: number } }
) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export default function DialogSubmission({
  divInputRef,
  dialogRef,
}: DialogSubmissionProp) {
  const userDataContext = useContext(UserDataContext);
  const { trigger } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/posts`,
    postMessage
  );

  async function submitPost() {
    try {
      const post = divInputRef.current?.innerText || "";
      const authorId = userDataContext.userData.id;
      await trigger({ post, authorId });
      if (divInputRef.current && divInputRef.current.innerText)
        divInputRef.current.innerText = "";
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
        onClick={submitPost}
      >
        Post
      </button>
    </section>
  );
}
