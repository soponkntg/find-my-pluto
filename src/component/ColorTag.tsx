interface Props {
  color: "brown" | "goldenBrown" | "paleBrown" | "black" | "white" | "gray";
  colorTH: string;
  colorCode: string;
}

const colors: Props[] = [
  { color: "brown", colorTH: "น้ำตาล", colorCode: "bg-[#964B00]" },
  { color: "goldenBrown", colorTH: "น้ำตาลทอง", colorCode: "bg-[#B77F1B]" },
  { color: "paleBrown", colorTH: "น้ำตาลอ่อน", colorCode: "bg-[#D2B48C]" },
  { color: "black", colorTH: "ดำ", colorCode: "bg-[#000000]" },
  { color: "white", colorTH: "ขวา", colorCode: "bg-[#FFFFFF]" },
  { color: "gray", colorTH: "เทา", colorCode: "bg-[#616161]" },
];

export const ColorTag = ({ color }: Pick<Props, "color">) => {
  const matchColor = colors.find((elem) => elem.color == color);

  if (matchColor == undefined) {
    return null;
  }

  return (
    <div className="flex-center rounded-lg space-x-1 w-[100px] py-1 shadow-color bg-[#EFEFEF]">
      <div className={`${matchColor.colorCode} w-[22px] h-[22px] rounded-full`} />
      <p className="text-center text-sm font-normal text-black">{matchColor.colorTH}</p>
    </div>
  );
};
