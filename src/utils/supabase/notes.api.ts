import { Note } from "@/types";
import { createClient } from "./client";

export async function getTodos(): Promise<Note[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("notes").select("*");

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteTodo(id: number) {
  const supabase = createClient();
  const { error, data } = await supabase.from("notes").delete({ count: "exact" }).eq("id", id);

  if (error) throw new Error(error.message);
  return data;
}

export async function updateTodo(id: number, note: { title: string; body: string }) {
  const supabase = createClient();
  const { error, data } = await supabase
    .from("notes")
    .update({ ...note })
    .eq("id", id);

  if (error) throw new Error(error.message);
  return data;
}

export async function createTodo(note: { title: string; body: string }) {
  const supabase = createClient();
  const { error, data } = await supabase.from("notes").insert({ ...note });

  if (error) throw new Error(error.message);
  return data;
}
