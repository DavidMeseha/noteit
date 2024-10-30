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
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "@/utils/supabase/notes.api";
import TodoLoading from "./TodoLoading";
import { SubmitButton } from "./SubmitButton";

const supabase = createClient();

const newNoteItem = {
  id: 0,
  body: "",
  title: "",
  created_at: "",
};

export default function TodosList() {
  const [todos, setTodos] = useState<NoteItem[]>([]);
  const [edit, setEdit] = useState<NoteItem | null>();
  const [error, setError] = useState<false | string>(false);

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      getTodos().then((data) => {
        setTodos(data);
        return data;
      }),
  });

  const deleteTodoMutation = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: (id: number) => deleteTodo(id),

    onSuccess: () => {
      toast.success("TODO deleted successfully");
    },
    onError: (error: { message: string }) => setError(error.message),
  });

  const updateTodoMutation = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async (props: {
      id: number;
      note: { title: string; body: string };
    }) => updateTodo(props.id, props.note),

    onSuccess: () => {
      toast.success("TODO updated successfully");
    },
    onError: (error: { message: string }) => setError(error.message),
  });

  const createTodoMutation = useMutation({
    mutationKey: ["createNote"],
    mutationFn: async (note: { title: string; body: string }) =>
      createTodo(note),

    onSuccess: () => {
      toast.success("TODO created successfully");
      setEdit(null);
    },
    onError: (error: { message: string }) => setError(error.message),
  });

  const deleteTodoHandle = (id: number) => {
    deleteTodoMutation.mutate(id);
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
            setTodos([...todos, payload.new as NoteItem]);
          } else if (payload.eventType === "DELETE") {
            const indexOfDeletedItem = todos.findIndex(
              (todo) => todo.id === payload.old.id
            );
            const temp = [...todos];
            temp.splice(indexOfDeletedItem, 1);
            setTodos([...temp]);
          } else if (payload.eventType === "UPDATE") {
            const indexOfDeletedItem = todos.findIndex(
              (todo) => todo.id === payload.old.id
            );
            const temp = [...todos];
            temp[indexOfDeletedItem] = payload.new as NoteItem;
            setTodos([...temp]);
          }
        }
      )
      .subscribe();

    return function () {
      supabase.removeChannel(channel);
    };
  }, [todos, setTodos]);

  const handleDialogConfirm = (id?: number) => {
    if (!edit?.body || !edit.title)
      return setError("All Fields must be filled");

    let note = {
      body: edit.body,
      title: edit.title,
    };

    if (id) return updateTodoMutation.mutate({ id, note });
    createTodoMutation.mutate(note);
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
            <TodoLoading />
          </>
        ) : (
          todos.map((todo) => (
            <Todo
              key={todo.created_at + todo.id}
              todo={todo}
              deleteAction={() => deleteTodoHandle(todo.id)}
              editAction={() => setEdit(todo)}
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
        <DialogContent className="border bg-popover text-popover-foreground">
          <DialogHeader>
            <DialogTitle className="mb-4">
              {edit ? "Edit Note" : "New Note"}
            </DialogTitle>
            <div>
              <Input
                className="mb-4"
                placeholder="Title"
                value={edit?.title ?? ""}
                onChange={(e) =>
                  edit
                    ? setEdit({ ...edit, title: e.target.value })
                    : setEdit(null)
                }
              />
              <textarea
                className="mb-2 w-full bg-background border rounded-md p-4 placeholder:text-muted-foreground"
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
              <div className="h-8 text-danger text-sm">{error}</div>
              <div className="float-end">
                <SubmitButton
                  isLoading={
                    createTodoMutation.isPending || updateTodoMutation.isPending
                  }
                  className="relative"
                  onClick={() => handleDialogConfirm(edit?.id)}
                >
                  {edit?.id ? "Update Todo" : "Add Todo"}
                </SubmitButton>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
