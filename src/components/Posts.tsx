import { useEffect, useRef, useState } from "react";
import filterBySchool from "../hooks/filterPosts.tsx";
import { getData } from "../firebase/db.tsx";
import SortPostByDate from "../hooks/sortPostByDate.tsx";
import { handleDelete } from "../hooks/handleDelete.tsx";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DoubleRightOutlined } from "@ant-design/icons";

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

export default function Posts({ searchBy }: PostProps) {
  const [post, setPost] = useState<newPost[]>(); // tulee olemaan taulukko täynnä objekteja
  const [render, setRender] = useState(0);
  const navigate = useNavigate(); // tarvii navigoidessa api sisällä

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
  }, [searchBy, render]);

  const handleReply = (postId: string) => {
    console.log(postId);
    navigate("/reply", { state: { postId } });
  };
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full m-1 justify-center items-center lg:w-4/5 xl:3/5">
        {Array.isArray(post) ? (
          post.map((item) => {
            return (
              <div
                key={item.postId}
                className="bg-white border-2 w-full rounded-lg mb-5 p-3 border-bor shadow-2xl"
              >
                <p className="text-black flex justify-between">
                  <strong>{item.school}</strong>
                  {"  "}
                  {/*item.postId*/}
                  {"......"}
                  {item.time}
                </p>
                <h3 className="text-black">{item.title}</h3>
                <p className="text-black"> {item.post}</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      handleDelete(item.postId);
                      setRender((prev) => prev + 1);
                    }}
                    className="h-5 border-none hover:underline text-red-500 text-md mr-10"
                  >
                    Delete
                  </button>
                  <button
                    className="h-5 border-none hover:underline text-orange-500 text-md "
                    onClick={() => handleReply(item.postId)}
                  >
                    <DoubleRightOutlined
                      style={{ fontSize: "24px", color: "#f97316" }}
                    />
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
