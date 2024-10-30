import { Note as NoteItem } from "@/types";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function TodoLoading() {
  return (
    <SkeletonTheme baseColor="#131b26" highlightColor="#192331">
      <div className="rounded">
        <div className="flex min-h-28 w-full flex-col justify-between rounded-lg border border-gray-700 bg-gray-800 px-4 py-5 transition-all sm:h-80 sm:min-h-80">
          <div>
            <h4 className="mb-3">
              <Skeleton />
            </h4>
            <p className="h-0 text-sm text-gray-100 opacity-0 transition-opacity sm:h-auto sm:opacity-100">
              <Skeleton count={4} />
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between text-gray-100">
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
