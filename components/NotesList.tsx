"use client";

import React, { useEffect, useState } from "react";
import AddNoteButton from "./AddNoteButton";
import Todo from "./Todo";
import { createClient } from "@/utils/supabase/client";
import { Note as NoteItem } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BiLoaderCircle } from "react-icons/bi";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "@/utils/supabase/notes.api";
import TodoLoading from "./TodoLoading";

const supabase = createClient();

const newNoteItem = {
  id: 0,
  body: "",
  title: "",
  created_at: "",
};

export default function NotesList() {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [edit, setEdit] = useState<NoteItem | null>();
  const [error, setError] = useState<false | string>(false);

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      getTodos().then((data) => {
        setNotes(data);
        return data;
      }),
  });

  const deleteNoteMutation = useMutation({
    mutationKey: ["deleteNote"],
    mutationFn: (id: number) => deleteTodo(id),

    onSuccess: () => {
      toast.success("TODO deleted successfully");
    },
    onError: (error: { message: string }) => setError(error.message),
  });

  const updateNoteMutation = useMutation({
    mutationKey: ["updateNote"],
    mutationFn: async (props: {
      id: number;
      note: { title: string; body: string };
    }) => updateTodo(props.id, props.note),

    onSuccess: () => {
      toast.success("TODO updated successfully");
    },
    onError: (error: { message: string }) => setError(error.message),
  });

  const createNoteMutation = useMutation({
    mutationKey: ["createNote"],
    mutationFn: async (note: { title: string; body: string }) =>
      createTodo(note),

    onSuccess: () => {
      toast.success("TODO created successfully");
      setEdit(null);
    },
    onError: (error: { message: string }) => setError(error.message),
  });

  const deleteNote = (id: number) => {
    deleteNoteMutation.mutate(id);
  };

  useEffect(() => {
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
            setNotes([...notes, payload.new as NoteItem]);
          } else if (payload.eventType === "DELETE") {
            const indexOfDeletedItem = notes.findIndex(
              (note) => note.id === payload.old.id
            );
            const temp = [...notes];
            temp.splice(indexOfDeletedItem, 1);
            setNotes([...temp]);
          } else if (payload.eventType === "UPDATE") {
            const indexOfDeletedItem = notes.findIndex(
              (note) => note.id === payload.old.id
            );
            const temp = [...notes];
            temp[indexOfDeletedItem] = payload.new as NoteItem;
            setNotes([...temp]);
          }
        }
      )
      .subscribe();

    return function () {
      supabase.removeChannel(channel);
    };
  }, [notes, setNotes]);

  const handleDialogConfirm = (id?: number) => {
    if (!edit?.body || !edit.title)
      return setError("All Fields must be filled");

    let note = {
      body: edit.body,
      title: edit.title,
    };

    if (id) return updateNoteMutation.mutate({ id, note });
    createNoteMutation.mutate(note);
  };

  return (
    <>
      <div className="grid sm:grid-cols-[1fr_1fr] grid-cols-[1fr] lg:grid-cols-[1fr_1fr_1fr] gap-6">
        <AddNoteButton onClick={() => setEdit(newNoteItem)} />
        {todosQuery.isFetching ? (
          <>
            <TodoLoading />
            <TodoLoading />
            <TodoLoading />
            <TodoLoading />
          </>
        ) : (
          notes.map((note) => (
            <Todo
              key={note.created_at + note.id}
              note={note}
              deleteAction={() => deleteNote(note.id)}
              editAction={() => setEdit(note)}
            />
          ))
        )}
      </div>
      <Dialog
        open={!!edit}
        onOpenChange={() => {
          setEdit(null);
        }}
      >
        <DialogContent className="border-gray-700">
          <DialogHeader>
            <DialogTitle className="mb-4">
              {edit ? "Edit Note" : "New Note"}
            </DialogTitle>
            <div>
              <Input
                className="border-gray-400 mb-4"
                placeholder="Title"
                value={edit?.title ?? ""}
                onChange={(e) =>
                  edit
                    ? setEdit({ ...edit, title: e.target.value })
                    : setEdit(null)
                }
              />
              <textarea
                className="mb-2 w-full bg-background border border-gray-400 rounded-md p-4 placeholder:text-muted-foreground"
                rows={6}
                maxLength={200}
                placeholder="Body Text"
                value={edit?.body ?? ""}
                onChange={(e) =>
                  edit
                    ? setEdit({ ...edit, body: e.target.value })
                    : setEdit(null)
                }
              ></textarea>
              <div className="h-8 text-red-500 text-sm">- {error}</div>
              <div className="float-end">
                <Button
                  className="relative"
                  onClick={() => handleDialogConfirm(edit?.id)}
                >
                  {createNoteMutation.isPending ||
                  updateNoteMutation.isPending ? (
                    <div className="absolute inset-0 flex w-full items-center justify-center rounded-md bg-inherit">
                      <BiLoaderCircle
                        className="animate-spin fill-inherit"
                        size={24}
                      />
                    </div>
                  ) : null}
                  <div>{edit?.id ? "Update Todo" : "Add Todo"}</div>
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
