import { useRef, useState } from "react";
import Posts from "./Posts";

interface FilterProps {
  getSchool: (item: string) => void;
}

export default function Filter({ getSchool }: FilterProps) {
  // hae kaiki koulut suoraa databasesta DESC
  return (
    <>
      <div className="h-12 bg-white w-full flex justify-around items-center lg:justify-evenly mb-7">
        <section className="">
          <label className="font-sans text-md" htmlFor="">
            Koulu:{" "}
          </label>
          <select
            onChange={(e) => getSchool(e.target.value)}
            className="border-none rounded-md p-1"
          >
            <option></option>
            <option value="Kaikki">Kaikki</option>
            <option value="HaagaHelia">HaagaHelia</option>
            <option value="Metropolia">Metropolia</option>
            <option value="Turun AMK">Turun AMK</option>
            <option value="Laurea">Laurea</option>
          </select>
        </section>
        <section>
          <label htmlFor="" className="font-sans text-md">
            Hakutapa:{" "}
          </label>
          <select className="border-none rounded-md p-1">
            <option></option>
            <option>Uusin</option>
            <option>Vanhin</option>
            <option>Tykätyin </option>
          </select>
        </section>
      </div>
    </>
  );
}
