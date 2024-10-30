import { Note as NoteItem } from "@/types";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

type Props = {
  todo: NoteItem;
  editAction: () => void;
  deleteAction: () => void;
};

export default function Todo({ todo, deleteAction, editAction }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`w-full ${isOpen ? "min-h-64" : "min-h-28 sm:min-h-64 sm:h-64"} flex flex-col justify-between bg-card border rounded-lg py-5 px-4 transition-all`}
    >
      <div onClick={() => setIsOpen(!isOpen)}>
        <h4 className=" text-foreground font-bold mb-3">{todo.title}</h4>
        <p
          className={`text-card-foreground text-sm transition-opacity ${isOpen ? "opacity-100" : "opacity-0 h-0 sm:opacity-100 sm:h-auto"}`}
        >
          {todo.body}
        </p>
      </div>
      <div>
        <div className="flex items-center justify-between  text-card-foreground">
          <p className="text-sm">
            {new Date(todo.created_at).toLocaleDateString("en", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="flex gap-2">
            <button
              onClick={editAction}
              className="w-8 h-8 rounded-full text-primary-foreground bg-primary flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2"
              aria-label="edit note"
              role="button"
            >
              <BiEdit />
            </button>
            <button
              onClick={deleteAction}
              className="w-8 h-8 rounded-full  bg-danger fill-foreground  flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2"
              aria-label="edit note"
              role="button"
            >
              <CgClose />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
