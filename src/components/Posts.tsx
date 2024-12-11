import { useEffect, useState } from "react";
import examplePost from "../data/examplePost.json";
import filterBySchool from "../hooks/filterPosts.tsx";
import { getData } from "../firebase/db.tsx";
import SortPostByDate from "../hooks/sortPostByDate.tsx";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { handleDelete } from "../hooks/handleDelete.tsx";
interface PostProps {
  searchBy: string;
}
interface newPost {
  postId: string;
  title: string;
  school: string;
  post: string;
  time: string;
}
const db = getFirestore();

export default function Posts({ searchBy }: PostProps) {
  const [post, setPost] = useState<newPost[]>(); // tulee olemaan taulukko täynnä objekteja

  useEffect(() => {
    const get = async () => {
      let all = await getData();
      if (all && searchBy !== "Kaikki") {
        let filtered = filterBySchool(searchBy, all);
        setPost(filtered);
        console.log(filtered + "BY " + searchBy);
      } else if (all) {
        // jos löytyy nii aseta sitte vasta muute tulee UNDEFINED ...
        let sorted = SortPostByDate(all);
        setPost(sorted);
      } else {
        setPost([]);
      }
    };
    get();
  }, [searchBy]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full m-1 justify-center items-center lg:w-4/5 xl:3/5">
        {Array.isArray(post) ? (
          post.map((item) => {
            return (
              <div
                key={item.postId}
                className="bg-white w-full rounded-lg mb-4 p-3 border-2 border-bor shadow-md"
              >
                <p className="text-black flex justify-between">
                  <strong>{item.school}</strong>
                  {"  "}
                  {item.postId}
                  <p className="text-black"> {item.time}</p>
                </p>
                <h3 className="text-black">{item.title}</h3>
                <p className="text-black"> {item.post}</p>
                <div className="flex justify-end">
                  <button className="h-5 border-none hover:underline text-orange-500 text-md">
                    Reply
                  </button>
                  <button
                    onClick={() => handleDelete(item.postId)}
                    className="h-5 border-none hover:underline text-red-500 text-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}
