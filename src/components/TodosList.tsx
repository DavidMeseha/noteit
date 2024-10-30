"use client";

import React, { useEffect, useState } from "react";
import AddNoteButton from "./AddNoteButton";
import Todo from "./Todo";
import { createClient } from "@/utils/supabase/client";
import { Note as NoteItem } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { createTodo, deleteTodo, getTodos, updateTodo } from "@/utils/supabase/notes.api";
import TodoLoading from "./TodoLoading";
import TodoPopover from "./TodoPopover";
import { queryClient } from "./layots/AppProvider";

const supabase = createClient();

const newNoteItem = {
  id: 0,
  body: "",
  title: "",
  created_at: ""
};

export default function TodosList() {
  const [todos, setTodos] = useState<NoteItem[]>([]);
  const [edit, setEdit] = useState<NoteItem | null>();
  const [error, setError] = useState<false | string>(false);

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      getTodos().then((data) => {
        setTodos([...data]);
        return [...data];
      })
  });

  const deleteTodoMutation = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: (id: number) => deleteTodo(id),

    onSuccess: () => {
      toast.success("TODO deleted successfully");
    },

    onError: (error: { message: string }) => {
      toast.error(error.message);
      const reverTodos = queryClient.getQueryData<NoteItem[]>(["todos"]) ?? [];
      setTodos([...reverTodos]);
    }
  });

  const updateTodoMutation = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async (props: { id: number; note: { title: string; body: string } }) =>
      updateTodo(props.id, props.note),

    onError: (error: { message: string }) => setError(error.message)
  });

  const createTodoMutation = useMutation({
    mutationKey: ["createNote"],
    mutationFn: async (note: { title: string; body: string }) => createTodo(note),

    onSuccess: () => {
      toast.success("TODO created successfully");
      setEdit(null);
    },
    onError: (error: { message: string }) => setError(error.message)
  });

  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notes"
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setTodos([...todos, payload.new as NoteItem]);
          } else if (payload.eventType === "DELETE") {
            const indexOfDeletedItem = todos.findIndex((todo) => todo.id === payload.old.id);
            console.log(indexOfDeletedItem);
            if (indexOfDeletedItem < 0) return;
            const temp = [...todos];
            temp.splice(indexOfDeletedItem, 1);
            setTodos([...temp]);
          } else if (payload.eventType === "UPDATE") {
            const indexOfDeletedItem = todos.findIndex((todo) => todo.id === payload.old.id);
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

  const deleteTodoHandle = (id: number) => {
    const todosTemp = [...todos];
    const indexToRemove = todosTemp.findIndex((todo) => todo.id === id);
    todosTemp.splice(indexToRemove, 1);
    setTodos([...todosTemp]);
    deleteTodoMutation.mutate(id);
  };

  //create and update
  const handleDialogConfirm = (id?: number) => {
    if (!edit?.body || !edit.title) return setError("All Fields must be filled");

    let note = {
      body: edit.body,
      title: edit.title
    };

    if (id) {
      const updateIndex = todos.findIndex((todo) => todo.id === id);
      const todosTemp = [...todos];
      todosTemp[updateIndex] = { ...todosTemp[updateIndex], ...note };
      return updateTodoMutation.mutate({ id, note });
    }

    createTodoMutation.mutate(note);
  };

  const handlePopoverFormChange = (name: string, value: string) => {
    if (!edit) return;
    setEdit({ ...edit, [name]: value });
  };

  return (
    <>
      <div className="grid grid-cols-[1fr] gap-6 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr]">
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
        {createTodoMutation.isPending ? (
          <Todo
            todo={{
              body: createTodoMutation.variables?.body ?? "",
              created_at: new Date().toLocaleDateString(),
              title: createTodoMutation.variables?.title ?? "",
              id: 0
            }}
            deleteAction={() => toast.error("try again in few seconds")}
            editAction={() => toast.error("try again in few seconds")}
          />
        ) : null}
      </div>
      <TodoPopover
        isOpen={!!edit}
        onOpenChange={() => {
          setEdit(null);
        }}
        isPending={createTodoMutation.isPending || updateTodoMutation.isPending}
        handleConfirm={() => handleDialogConfirm(edit?.id)}
        onChange={(e) => handlePopoverFormChange(e.currentTarget.name, e.currentTarget.value)}
        state={edit}
        error={error}
      />
    </>
  );
}
