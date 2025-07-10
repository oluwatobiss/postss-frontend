import Aside from "./Aside";
import { svg } from "../_svg";

export default function LatestPosts() {
  return (
    <article>
      <Aside />
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
