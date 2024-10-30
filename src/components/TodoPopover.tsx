import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { SubmitButton } from "./SubmitButton";
import { Note } from "@/types";

type Props = {
  isPending: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  handleConfirm: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  state: Note | null | undefined;
  error: false | string;
};

export default function TodoPopover({
  isPending,
  isOpen,
  onOpenChange,
  handleConfirm,
  onChange,
  state,
  error,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border bg-popover text-popover-foreground">
        <DialogHeader>
          <DialogTitle className="mb-4">
            {state ? "Edit Note" : "New Note"}
          </DialogTitle>
          <div>
            <Input
              type="text"
              name="title"
              className="mb-4"
              placeholder="Title"
              value={state?.title ?? ""}
              onChange={onChange}
            />
            <textarea
              className="mb-2 w-full bg-background border rounded-md p-4 placeholder:text-muted-foreground"
              rows={6}
              maxLength={200}
              placeholder="Body Text"
              value={state?.body ?? ""}
              name="body"
              onChange={onChange}
            ></textarea>
            <div className="h-8 text-danger text-sm">{error}</div>
            <div className="float-end">
              <SubmitButton
                isLoading={isPending}
                className="relative"
                onClick={handleConfirm}
              >
                {state?.id ? "Update Todo" : "Add Todo"}
              </SubmitButton>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
