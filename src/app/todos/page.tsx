import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TodosList from "@/components/TodosList";


export const metadata = {
  title: "TODO-IT | Todos List",
  description: "A basic supabase and next.js sample with tanstack query"
};

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return <TodosList />;
}
