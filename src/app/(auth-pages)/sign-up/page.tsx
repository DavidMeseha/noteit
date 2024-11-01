import { signUpAction } from "@/actions";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata = {
  title: " TODO-IT | Sign-up",
  description: "A basic supabase and next.js sample with tanstack query"
};

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center gap-2 p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <form className="mx-auto mt-8 flex w-full max-w-xl flex-col rounded border bg-card p-6">
      <h1 className="text-2xl font-medium">Sign up</h1>
      <p className="text text-sm text-foreground">
        Already have an account?{" "}
        <Link className="font-medium text-primary underline" href="/sign-in">
          Sign in
        </Link>
      </p>
      <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" placeholder="Your password" minLength={6} required />
        <SubmitButton formAction={signUpAction}>
          Sign up
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
