import React from "react";
import Link from "next/link";
import { PiPencil } from "react-icons/pi";
import AuthButton from "./AuthButton";

export default function Nav() {
  return (
    <nav className="sticky top-0 border-b bg-gray-800">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-1 rtl:space-x-reverse">
          <PiPencil size={25} className="sm:hidden" />
          <PiPencil size={35} className="hidden sm:inline-block" />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">TODO-IT</span>
        </Link>
        <AuthButton />
      </div>
    </nav>
  );
}
