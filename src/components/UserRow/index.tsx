import { IResource } from "@/types/types";
import React from "react";
interface UserRow extends IResource {
  onResourceClick: React.MouseEventHandler<HTMLDivElement>;
}

const UserRow = ({ id, title, userId, onResourceClick }: UserRow) => {
  return (
    <div
      onClick={onResourceClick}
      className="w-full h-full max-h-[36px] text-black flex flex-col cursor-pointer"
    >
      <div className="w-full gap-4 flex justify-between">
        <p className="px-2">{id}</p>
        <div className="flex items-start">
          <p className="text-center w-[230px] truncate md:w-full">{title}</p>
        </div>
        <p className="px-2">{userId}</p>
      </div>
      <div className="w-full h-[1px] bg-slate-300"></div>
    </div>
  );
};

export default UserRow;
