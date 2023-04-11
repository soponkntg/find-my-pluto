import Image from "next/image";
import bountyicon from "../../public/bounty.png";
import dog from "../../public/dog.png";
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/solid";
import { MaleIcon } from "./MaleIcon";
import { FemaleIcon } from "./FemaleIcon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { PetCarddI } from "@/constant/interface";

export const PetCard = ({
  animalId,
  imageurl,
  gender,
  bounty,
  location,
  timestamp,
  expireDate,
}: PetCarddI) => {
  const router = useRouter();
  const calTimeDiff = (start: Date, end: Date) => {
    return end.getTime() - start.getTime();
  };

  const { pathname } = useRouter();
  const expire = new Date("2023-05-14");

  const [timeLeft] = useState(calTimeDiff(new Date(), expire));

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  const secToHour = (time: number) => {
    return Math.floor(time / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="flex flex-col">
      <div
        className={`w-[300px] h-[400px] rounded-t-xl overflow-hidden relative ${
          pathname == "/profile" ? "shadow-md" : "rounded-b-xl"
        }`}
        onClick={() => {
          router.push("/" + animalId);
        }}
      >
        <Carousel showThumbs={false} autoPlay>
          <Image src={dog} alt="dog" className="object-contain" />
          <Image src={dog} alt="dog" className="object-contain" />
          <Image src={dog} alt="dog" className="object-contain" />
        </Carousel>
        <div className="absolute top-2 left-2">
          {gender == "male" ? <MaleIcon /> : <FemaleIcon />}
        </div>
        {bounty && (
          <div className="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl w-[120px] h-12 bg-secondary flex-center space-x-2">
            <Image src={bountyicon} alt={"" + bounty} width={16} height={22} />
            <p className="text-white text-xl">฿{bounty}</p>
          </div>
        )}
        <div className="absolute bottom-0 pt-4 pb-8 px-5 w-full bg-gradient-image">
          <div className="space-x-2 flex-start">
            <MapPinIcon className="text-white w-6 h-6" />
            <p className="text-white text-xl">{location}</p>
          </div>
          <div className="space-x-2 flex-start">
            <ClockIcon className="text-white w-6 h-6" />
            <p className="text-white text-xl">{timestamp}</p>
          </div>
        </div>
      </div>
      <div
        className={`${
          pathname == "/profile" ? "block" : "hidden"
        } w-[300px] bg-dim-secondary shadow-md rounded-b-xl py-3 px-5 space-y-2`}
      >
        <button className="rounded-[25px] w-full h-[45px] text-white text-lg bg-secondary">
          {timeLeft > 0 ? `หมดอายุในอีก: ${secToHour(timeLeft)} วัน` : "ต่ออายุ"}
        </button>
        <button className="rounded-[25px] w-full h-[45px] text-white text-lg bg-dark">
          หาน้องเจอแล้ว
        </button>
        <div className="flex justify-between">
          {/* <button className="rounded-[25px] w-[117px] h-[45px] text-white text-lg bg-gray-500">
            แก้ไข
          </button> */}
          <button className="rounded-[25px] w-full h-[45px] text-white text-lg bg-red-500">
            ลบ
          </button>
        </div>
      </div>
    </div>
  );
};
