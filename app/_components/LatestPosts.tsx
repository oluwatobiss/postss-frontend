import Aside from "./Aside";
import PostCard from "./PostCard";

export default function LatestPosts() {
  return (
    <article>
      <Aside />
      <main className="w-full fixed min-h-screen">
        <h1 className="text-center h-15 leading-15">Latest</h1>
        <div className="w-full fixed top-15 bottom-0 overflow-y-scroll">
          <div className="w-160  mx-auto bg-[#181818] border-[.5px] border-[rgb(45,45,45)] py-3 cursor-pointer shadow-[0_0_12px_0_rgba(0,0,0,0.04)]">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </main>
    </article>
  );
}
