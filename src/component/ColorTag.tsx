import { colors } from "@/constant/text";
import { useState } from "react";

interface Props {
  color: string;
  colorTH: string;
  colorCode: string;
}

export const ColorTag = ({ color }: Pick<Props, "color">) => {
  const matchColor = colors.find((elem) => elem.color == color);

  if (matchColor == undefined) {
    console.log("not match color");
    return null;
  }

  return (
    <div className="flex-center rounded-lg space-x-1 w-[90px] py-1 shadow-color bg-[#EFEFEF]">
      <div className={`${matchColor.colorCode} w-[22px] h-[22px] rounded-full`} />
      <p className="text-center text-sm font-normal text-black">{matchColor.colorTH}</p>
    </div>
  );
};
