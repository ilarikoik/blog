import { useRef, useState } from "react";
import Posts from "./Posts";
import { schools } from "../data/schools";
interface FilterProps {
  getSchool: (item: string) => void;
}

export default function Filter({ getSchool }: FilterProps) {
  return (
    <>
      <div className="h-12 bg-white w-full flex justify-around items-center lg:justify-evenly mb-7">
        <section className="">
          <select
            onChange={(e) => getSchool(e.target.value)}
            className=" rounded-md p-1 border-2 border-postgray"
          >
            {schools.length > 0
              ? schools.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })
              : null}{" "}
            {/* Render options if schools array has data */}
          </select>
        </section>
        {/* <section>
          <label htmlFor="" className="font-sans text-md">
            Hakutapa:{" "}
          </label>
          <select className="border-none rounded-md p-1">
            <option></option>
            <option>Uusin</option>
            <option>Vanhin</option>
            <option>Tykätyin </option>
          </select>
        </section> */}
      </div>
    </>
  );
}
