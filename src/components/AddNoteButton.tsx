import React from "react";
import { IoAddCircle } from "react-icons/io5";

export default function AddNoteButton({ onClick }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button onClick={onClick} className="rounded" aria-label="Open Add Popover">
      <div className="flex h-20 w-full items-center justify-center rounded-lg border border-gray-700 bg-gray-800 px-4 py-5 sm:h-80">
        <IoAddCircle size={70} className="hidden sm:block" />
        <IoAddCircle size={50} className="sm:hidden" />
      </div>
    </button>
  );
}
