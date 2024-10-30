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
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  state: Note | null | undefined;
  error: false | string;
};

export default function TodoPopover({ isPending, isOpen, onOpenChange, handleConfirm, onChange, state, error }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border bg-popover text-popover-foreground">
        <DialogHeader>
          <DialogTitle className="mb-4">{state ? "Edit Note" : "New Note"}</DialogTitle>
          <div>
            <Input
              maxLength={50}
              type="text"
              name="title"
              className="mb-4"
              placeholder="Title"
              value={state?.title ?? ""}
              onChange={onChange}
            />
            <textarea
              className="placeholder:text-muted-foreground mb-2 w-full rounded-md border bg-background p-4"
              rows={6}
              maxLength={350}
              placeholder="Body Text"
              value={state?.body ?? ""}
              name="body"
              onChange={onChange}
            ></textarea>
            <div className="h-8 text-sm text-danger">{error}</div>
            <div className="float-end">
              <SubmitButton
                isLoading={isPending}
                className="relative"
                onClick={handleConfirm}
                aria-label="Supmit Edit Form"
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
