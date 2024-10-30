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
      className={`w-full ${isOpen ? "min-h-64" : "min-h-28 sm:h-64 sm:min-h-64"} flex flex-col justify-between rounded-lg border bg-card px-4 py-5 transition-all`}
    >
      <div onClick={() => setIsOpen(!isOpen)}>
        <h4 className="mb-3 font-bold text-foreground">{todo.title}</h4>
        <p
          className={`text-sm text-card-foreground transition-opacity ${isOpen ? "opacity-100" : "h-0 opacity-0 sm:h-auto sm:opacity-100"}`}
        >
          {todo.body}
        </p>
      </div>
      <div>
        <div className="flex items-center justify-between text-card-foreground">
          <p className="text-sm">
            {new Date(todo.created_at).toLocaleDateString("en", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </p>
          <div className="flex gap-2">
            <button
              onClick={editAction}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground focus:outline-none focus:ring-2 focus:ring-offset-2"
              aria-label="edit note"
              role="button"
            >
              <BiEdit />
            </button>
            <button
              onClick={deleteAction}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-danger fill-foreground focus:outline-none focus:ring-2 focus:ring-offset-2"
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
