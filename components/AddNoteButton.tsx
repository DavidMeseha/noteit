import React from "react";
import { IoAddCircle } from "react-icons/io5";

export default function AddNoteButton() {
  return (
    <button className="rounded">
      <div className="w-full sm:h-64 h-20 flex justify-center items-center bg-gray-800 border-gray-700 rounded-lg border py-5 px-4">
        <IoAddCircle size={70} className="hidden sm:block" />
        <IoAddCircle size={50} className="sm:hidden" />
      </div>
    </button>
  );
}
