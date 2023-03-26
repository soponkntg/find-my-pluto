interface Props {
  color: "brown" | "goldenBrown" | "paleBrown" | "black" | "white" | "gray";
  colorTH: string;
  colorCode: string;
}

const colors: Props[] = [
  { color: "brown", colorTH: "น้ำตาล", colorCode: "#964B00" },
  { color: "goldenBrown", colorTH: "น้ำตาลทอง", colorCode: "#B77F1B" },
  { color: "paleBrown", colorTH: "น้ำตาลอ่อน", colorCode: "#D2B48C" },
  { color: "black", colorTH: "ดำ", colorCode: "#000000" },
  { color: "white", colorTH: "ขวา", colorCode: "#FFFFFF" },
  { color: "gray", colorTH: "เทา", colorCode: "#616161" },
];

export const ColorTag = ({ color }: Pick<Props, "color">) => {
  const matchColor = colors.find((elem) => elem.color == color);

  if (matchColor == undefined) {
    return null;
  }

  return (
    <div className="flex-center rounded-lg w-[90px] h-[30px] shadow-color">
      <div className={`bg-[${matchColor.colorCode}] w-[22px] h-[22px] rounded-full`} />
      <p className="flex-1 text-center text-sm font-normal">{matchColor.colorTH}</p>
    </div>
  );
};
