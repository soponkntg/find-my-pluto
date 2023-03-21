import { XCircleIcon } from "@heroicons/react/24/outline";
import buttonLeft from "../../public/button-left.png";
import buttonRight from "../../public/button-right.png";
import buttonFound from "../../public/bone-button-found.png";
import buttonLost from "../../public/bone-button-lost.png";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "./Input";
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
    <div className="bg-tertiary w-[400px] h-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 relative rounded-lg">
      <button onClick={() => props.setIsCreateCard(false)}>
        <XCircleIcon className={`w-7 h-7 top-[17.25px] right-[25.25px] absolute`} />
      </button>

      {page == 0 && (
        <div className="top-1/2 transform -translate-y-1/2 relative grid justify-items-center gap-5">
          <button
            className="w-[352px] h-[110px]"
            onClick={() => {
              setForm((oldForm: Form) => {
                oldForm.postType = "lost";
                return oldForm;
              });
              setPage(1);
            }}
          >
            <Image src={buttonLost} alt={"buttonLost"} />
          </button>
          <button
            className="w-[352px] h-[110px]"
            onClick={() => {
              setForm((oldForm: Form) => {
                oldForm.postType = "found";
                return oldForm;
              });
              setPage(1);
            }}
          >
            <Image src={buttonFound} alt={"buttonFound"} />
          </button>
        </div>
      )}

      {page == 1 && (
        <div className="mx-[24px] top-3">
          <h2 className="font-semibold text-2xl">ข้อมูลน้อง</h2>
          <div className="grid gap-4">
            <div className="flex gap-14 items-center">
              <h4 className="text-black  text-xl whitespace-nowrap font-medium">ชื่อน้อง :</h4>
              {<Input id={"dogName"} type={"text"} placeholder={"ชื่อน้อง"} />}
            </div>
            <div className="flex gap-14 items-center">
              <h4 className="text-black  text-xl whitespace-nowrap font-medium">vkp6 :</h4>
              {<Input id={"dogName"} type={"text"} placeholder={"ชื่อน้อง"} />}
            </div>
          </div>
        </div>
      )}
      {page == 2 && (
        <div className="relative grid">
          <h1>Found and Lost detail</h1>
        </div>
      )}
      {page == 3 && (
        <div className="relative grid">
          <h1>Contact</h1>
        </div>
      )}
      {page == 4 && (
        <div className="relative grid">
          <h1>Image</h1>
        </div>
      )}

      {page != 0 && (
        <div>
          <button
            className="bg-primary rounded-2xl absolute left-[24px] bottom-[20px]"
            onClick={() => {
              if (page > 0) {
                setPage((oldPage) => oldPage - 1);
              }
            }}
          >
            <Image className="m-1" src={buttonLeft} alt={"buttonLeft"} />
          </button>
          <button
            className="bg-primary rounded-2xl absolute right-[24px] bottom-[20px]"
            onClick={() => {
              if (page < 4) {
                setPage((oldPage) => oldPage + 1);
              }
            }}
          >
            <Image className="m-1" src={buttonRight} alt={"buttonRight"} />
          </button>
        </div>
      )}
    </div>
  );
};
