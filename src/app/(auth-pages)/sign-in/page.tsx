import { signInAction, signInWithGithub } from "@/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export const metadata = {
  title: " TODO-IT | Sign-in",
  description: "A basic supabase and next.js sample with tanstack query"
};

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="mt-8 flex w-full flex-col rounded border bg-card p-6">
      <form className="mx-auto flex w-full flex-col">
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link className="font-medium text-foreground underline" href="/sign-up">
            Sign up
          </Link>
        </p>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" placeholder="Your password" required />
          <SubmitButton formAction={signInAction}>Sign in</SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <Button onClick={signInWithGithub}>Use Github</Button>
    </div>
  );
}
