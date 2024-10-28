"use client";

import { Note as NoteItem } from "@/types";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

type Props = {
  note: NoteItem;
  deleteAction: (id: string) => void;
};

export default function Note({ note, deleteAction }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded" onClick={() => setIsOpen(!isOpen)}>
      <div
        className={`w-full ${isOpen ? "min-h-64" : "min-h-28 sm:min-h-64 sm:h-64"} flex flex-col justify-between bg-gray-800 border-gray-700 rounded-lg border py-5 px-4 transition-all`}
      >
        <div>
          <h4 className=" text-gray-100 font-bold mb-3">{note.title}</h4>
          <p
            className={`text-gray-100 text-sm transition-opacity ${isOpen ? "opacity-100" : "opacity-0 h-0 sm:opacity-100 sm:h-auto"}`}
          >
            {note.body}
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between  text-gray-100">
            <p className="text-sm">March 28, 2020</p>
            <div className="flex gap-2">
              <button
                className="w-8 h-8 rounded-full  bg-gray-100 text-gray-800  flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
                aria-label="edit note"
                role="button"
              >
                <BiEdit />
              </button>
              <button
                onClick={() => deleteAction(note.id)}
                className="w-8 h-8 rounded-full  bg-red-500 fill-white  flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
                aria-label="edit note"
                role="button"
              >
                <CgClose />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
