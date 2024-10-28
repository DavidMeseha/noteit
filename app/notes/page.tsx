import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import NotesList from "@/components/NotesList";
import { Note } from "@/types";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data: notes } = (await supabase.from("notes").select("*"));

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return <NotesList notes={notes || []} />;
}
