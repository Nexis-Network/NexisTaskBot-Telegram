import React from "react";

const FriendsListItem = ({ name, level, icon }) => {
  return (
    <div className=" flex items-center w-[95%] bg-[#0FF378] rounded-2xl py-2 mt-2 shadow-[0_0_24px_-6px_#6ABE6A] px-4 mx-auto">
      <img
        src={icon}
        className="w-12 h-12 m-1 border-2 border-[#0B2113] rounded-full basis-[10%]"
        alt="Profile"
      />
      <div className="flex flex-col basis-[90%] text-left ml-2">
        <p className="text-[#0B0B0B] text-[15px] font-bold">{name}</p>
        <p className="text-[#0B0B0B] text-[15px] font-bold">{level}</p>
      </div>
    </div>
  );
};

export default FriendsListItem;
