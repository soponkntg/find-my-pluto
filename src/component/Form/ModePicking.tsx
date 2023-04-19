import { FormI } from "@/constant/interface";
import Image from "next/image";

import buttonFound from "../../../public/bone-button-found.png";
import buttonLost from "../../../public/bone-button-lost.png";

interface Props {
  setFormDate: React.Dispatch<React.SetStateAction<FormI>>;
  nextSection: () => void;
}

const ModePicking = ({ setFormDate, nextSection }: Props) => {
  const handlePostType = (postType: string) => {
    setFormDate((prev) => ({ ...prev, postType: postType }));
    nextSection();
  };

  return (
    <div className="grid justify-items-center gap-5">
      <button
        className="w-[300px] h-[95px] relative"
        onClick={() => {
          handlePostType("lost");
        }}
      >
        <Image src={buttonLost} alt={"buttonLost"} fill loading="lazy" />
      </button>
      <button
        className="w-[300px] h-[95px] relative"
        onClick={() => {
          handlePostType("found");
        }}
      >
        <Image src={buttonFound} alt={"buttonFound"} fill loading="lazy" />
      </button>
    </div>
  );
};

export default ModePicking;
