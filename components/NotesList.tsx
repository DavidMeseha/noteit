"use client";

import React, { useEffect, useState } from "react";
import AddNoteButton from "./AddNoteButton";
import { removeNote } from "@/app/actions";
import Note from "./Note";
import { createClient } from "@/utils/supabase/client";
import { Note as NoteItem } from "@/types";

type Props = {
  notes: NoteItem[];
};

export default function NotesList({ notes }: Props) {
  const [data, setData] = useState(notes);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notes",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setData([...data, payload.new as NoteItem]);
          } else if (payload.eventType === "DELETE") {
            const indexOfDeletedItem = data.findIndex(
              (note) => note.id === payload.old.id
            );
            const temp = [...data];
            temp.splice(indexOfDeletedItem, 1);
            setData([...temp]);
          } else if (payload.eventType === "UPDATE") {
            const indexOfDeletedItem = data.findIndex(
              (note) => note.id === payload.old.id
            );
            const temp = [...data];
            temp[indexOfDeletedItem] = payload.new as NoteItem;
            setData([...temp]);
          }
        }
      )
      .subscribe();

    return function () {
      supabase.removeChannel(channel);
    };
  }, [data, setData]);

  return (
    <div className="grid sm:grid-cols-[1fr_1fr] grid-cols-[1fr] lg:grid-cols-[1fr_1fr_1fr] gap-6">
      <AddNoteButton />
      {data?.map((note) => (
        <Note
          key={note.created_at + note.id}
          note={note}
          deleteAction={removeNote}
        />
      ))}
    </div>
  );
}
