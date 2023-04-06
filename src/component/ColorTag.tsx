interface Props {
  color: string;
  colorTH: string;
  colorCode: string;
}

export const colors: Props[] = [
  { color: "brown", colorTH: "น้ำตาล", colorCode: "bg-[#964B00]" },
  { color: "goldenBrown", colorTH: "น้ำตาลทอง", colorCode: "bg-[#B77F1B]" },
  { color: "paleBrown", colorTH: "น้ำตาลอ่อน", colorCode: "bg-[#D2B48C]" },
  { color: "black", colorTH: "ดำ", colorCode: "bg-[#000000]" },
  { color: "white", colorTH: "ขาว", colorCode: "bg-[#FFFFFF]" },
  { color: "gray", colorTH: "เทา", colorCode: "bg-[#616161]" },
  { color: "green", colorTH: "เขียว", colorCode: "bg-[#0B8F00]" },
  { color: "red", colorTH: "แดง", colorCode: "bg-[#EC0000]" },
  { color: "lightBlue", colorTH: "ฟ้า", colorCode: "bg-[#81B5E9]" },
  { color: "blue", colorTH: "น้ำเงิน", colorCode: "bg-[#286BAE]" },
  { color: "purple", colorTH: "ม่วง", colorCode: "bg-[#9747FF]" },
  { color: "orange", colorTH: "ส้ม", colorCode: "bg-[#FF8412]" },
  { color: "yellow", colorTH: "เหลือง", colorCode: "bg-[#FFC254]" },
];

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
