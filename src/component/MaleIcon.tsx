import Image from "next/image";
import male from "../../public/male.png";

export const MaleIcon = () => {
  return (
    <div className="flex-center bg-[#0B76FF] w-9 h-9 rounded-full">
      <Image src={male} alt="male-icon" width={18} height={18} />
    </div>
  );
};
