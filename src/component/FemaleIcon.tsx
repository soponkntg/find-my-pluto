import Image from "next/image";
import female from "../../public/female.png";

export const FemaleIcon = () => {
  return (
    <div className="flex-center bg-[#FB7575] w-9 h-9 rounded-full">
      <Image src={female} alt="male-icon" width={18} height={18} />
    </div>
  );
};
