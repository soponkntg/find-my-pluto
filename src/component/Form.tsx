import { XCircleIcon } from "@heroicons/react/24/outline";
import buttonLeft from "../../public/button-left.png";
import buttonRight from "../../public/button-right.png";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
interface Form {
  userId: string;
  postType: string;
  animal: string;
  images: string[];
  animalName?: string;
  age?: number;
  species: string;
  colors: string;
  braceletColor: string;
  gender: string;
  size: string;
  lastSeenAt: string;
  lastFoundPlace: {
    province: string;
    district: string;
    subditrict: string;
    lat: number;
    lng: number;
  };
  description: string;
  bounty: number;
}
export const Form = (props: { setIsCreateCard: Dispatch<SetStateAction<Boolean>> }) => {
  const [page, setPage] = useState<number>(0);
  const [form, setForm] = useState<Form>({
    userId: "",
    postType: "",
    animal: "",
    images: [],
    species: "",
    colors: "",
    braceletColor: "",
    gender: "",
    size: "",
    lastSeenAt: "",
    lastFoundPlace: {
      province: "",
      district: "",
      subditrict: "",
      lat: 0,
      lng: 0,
    },
    description: "",
    bounty: 0,
  });
  return (
    <div className="bg-tertiary w-[400px] h-[500px] labsolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute rounded-lg">
      <button onClick={() => props.setIsCreateCard(false)}>
        <XCircleIcon className={`w-7 h-7 top-[16px] right-[24px] absolute`} />
      </button>

      <div>
        <button></button>
        <button></button>
      </div>

      <div>
        <button className="bg-primary rounded-2xl absolute left-[24px] bottom-[20px]">
          <Image className="m-1" src={buttonLeft} alt={"buttonLeft"} />
        </button>
        <button className="bg-primary rounded-2xl absolute right-[24px] bottom-[20px]">
          <Image className="m-1" src={buttonRight} alt={"buttonRight"} />
        </button>
      </div>
    </div>
  );
};
