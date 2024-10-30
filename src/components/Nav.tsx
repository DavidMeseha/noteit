import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PiPencil } from "react-icons/pi";
import AuthButton from "./AuthButton";

export default function Nav() {
  return (
    <nav className="bg-gray-800 border-b sticky top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-1 rtl:space-x-reverse"
        >
          <PiPencil size={25} className="sm:hidden" />
          <PiPencil size={35} className="sm:inline-block hidden" />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            Note-it
          </span>
        </Link>
        <AuthButton />
      </div>
    </nav>
  );
}
