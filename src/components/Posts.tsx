import { useEffect, useState } from "react";
import examplePost from "../data/examplePost.json";
import filterBySchool from "../hooks/filterPosts.tsx";

interface PostProps {
  searchBy: string;
}
export default function Posts({ searchBy }: PostProps) {
  const [post, setPost] = useState(examplePost);

  useEffect(() => {
    if (searchBy !== "Kaikki") {
      let filtered = filterBySchool(searchBy, examplePost);
      setPost(filtered);
    } else {
      setPost(examplePost);
    }
  }, [searchBy]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full m-1 justify-center items-center lg:w-4/5 xl:3/5">
        {post.map((item, id) => {
          return (
            <div
              key={id}
              className="bg-bor w-full rounded-lg mb-4 p-3 border-2 border-postgray "
            >
              <p className="text-black">
                <strong>
                  {item.koulu} {item.postId}
                </strong>
              </p>
              <h3 className="text-black">{item.title}</h3>
              <p className="text-black"> {item.postaus}</p>
              <div className="flex justify-end">
                <button className="h-5 border-none hover:underline">
                  Reply
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
