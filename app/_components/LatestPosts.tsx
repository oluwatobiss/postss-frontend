import { Mr_Bedfort } from "next/font/google";
import { svg } from "../_svg";

const mrBedfort = Mr_Bedfort({ weight: "400", subsets: ["latin"] });

export default function LatestPosts() {
  return (
    <article>
      <aside className="fixed bg-[rgba(10, 10, 10, 0.85)] backdrop-blur-lg h-full w-19 flex flex-col items-center">
        <div
          className={`${mrBedfort.className} text-[33px] hover:scale-110 cursor-pointer transition-scale duration-300 linear leading-[1.5] py-4`}
        >
          P
        </div>
        <div className="grow flex items-center">
          <div className="grid gap-y-4 [&_div]:size-15 [&_div]:rounded-xl [&_div]:flex [&_div]:items-center [&_div]:justify-center [&_div]:cursor-pointer [&_div]:hover:bg-[rgba(255,255,255,0.08)] [&_svg]:text-[rgb(77,77,77)]">
            <div>{svg.person}</div>
            <div className="bg-[rgba(255,255,255,0.08)] group [&_svg]:group-hover:text-white">
              {svg.plus}
            </div>
            <div>{svg.boxArrowRight}</div>
          </div>
        </div>
      </aside>
      <main>
        <h1>Latest</h1>
        <div>
          <div>
            <span>Image</span>
            <span>
              <div>
                <span>codesweetly</span>
                <span>20m</span>
              </div>
              <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
                dolorem debitis, vel provident consectetur veniam, ab unde
                aperiam praesentium molestiae maiores est voluptates itaque
                explicabo magni voluptatem voluptatibus? Quidem, officiis.
              </div>
              <div>
                <span>
                  <span>{svg.heart}</span>
                  <span>332</span>
                </span>
                <span>
                  <span>{svg.chat}</span>
                  <span>14</span>
                </span>
              </div>
            </span>
          </div>
        </div>
      </main>
    </article>
  );
}
