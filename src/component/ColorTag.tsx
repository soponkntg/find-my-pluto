import { useState } from "react";

interface Props {
  color: string;
  colorTH: string;
  colorCode: string;
}

export const colors = [
  { color: "brown", colorTH: "น้ำตาล", colorCode: "bg-[#964B00]", hex: "#964B00" },
  { color: "goldenBrown", colorTH: "น้ำตาลทอง", colorCode: "bg-[#B77F1B]", hex: "#B77F1B" },
  { color: "paleBrown", colorTH: "น้ำตาลอ่อน", colorCode: "bg-[#D2B48C]", hex: "#D2B48C" },
  { color: "black", colorTH: "ดำ", colorCode: "bg-[#000000]", hex: "#000000" },
  { color: "white", colorTH: "ขาว", colorCode: "bg-[#FFFFFF]", hex: "#FFFFFF" },
  { color: "gray", colorTH: "เทา", colorCode: "bg-[#616161]", hex: "#616161" },
  { color: "green", colorTH: "เขียว", colorCode: "bg-[#0B8F00]", hex: "#0B8F00" },
  { color: "red", colorTH: "แดง", colorCode: "bg-[#EC0000]", hex: "#EC0000" },
  { color: "lightBlue", colorTH: "ฟ้า", colorCode: "bg-[#81B5E9]", hex: "#81B5E9" },
  { color: "blue", colorTH: "น้ำเงิน", colorCode: "bg-[#286BAE]", hex: "#286BAE" },
  { color: "purple", colorTH: "ม่วง", colorCode: "bg-[#9747FF]", hex: "#9747FF" },
  { color: "orange", colorTH: "ส้ม", colorCode: "bg-[#FF8412]", hex: "#FF8412" },
  { color: "yellow", colorTH: "เหลือง", colorCode: "bg-[#FFC254]", hex: "#FFC254" },
];

export const ColorTag = ({ color }: Pick<Props, "color">) => {
  const matchColor = colors.find((elem) => elem.color == color);

  if (matchColor == undefined) {
    return null;
  }

  const styleString = matchColor.colorCode.toString();

  return (
    <div className="flex-center rounded-lg space-x-1 w-[90px] py-1 shadow-color bg-[#EFEFEF]">
      <div className={`rounded-full w-[22px] h-[22px] border border-black ${styleString}`} />
      <p className="text-center text-sm font-normal text-black">{matchColor.colorTH}</p>
    </div>
  );
};
