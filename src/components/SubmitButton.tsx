"use client";

import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { BiLoaderCircle } from "react-icons/bi";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
  isLoading?: boolean;
};

export function SubmitButton({ children, isLoading, ...props }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button className="relative" type="submit" aria-disabled={pending} {...props}>
      {pending || isLoading ? (
        <div className="absolute inset-0 flex w-full items-center justify-center rounded-md bg-inherit">
          <BiLoaderCircle className="animate-spin fill-inherit" size={24} />
        </div>
      ) : null}
      <div>{children}</div>
    </Button>
  );
}
