import { Note as NoteItem } from "@/types";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function TodoLoading() {
  return (
    <SkeletonTheme baseColor="#131b26" highlightColor="#192331">
      <div className="rounded">
        <div className="w-full min-h-28 sm:min-h-64 sm:h-64 flex flex-col justify-between bg-gray-800 border-gray-700 rounded-lg border py-5 px-4 transition-all">
          <div>
            <h4 className="mb-3">
              <Skeleton />
            </h4>
            <p className="text-gray-100 text-sm transition-opacity opacity-0 h-0 sm:opacity-100 sm:h-auto">
              <Skeleton count={4} />
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between  text-gray-100">
              <p className="text-sm">
                <Skeleton width={100} />
              </p>
              <div className="flex gap-2">
                <Skeleton height={32} width={32} circle />
                <Skeleton height={32} width={32} circle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
