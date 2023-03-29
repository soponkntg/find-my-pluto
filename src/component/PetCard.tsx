import Image from "next/image";
import bountyicon from "../../public/bounty.png";
import dog from "../../public/dog.png";
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/solid";
import { MaleIcon } from "./MaleIcon";
import { FemaleIcon } from "./FemaleIcon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";

type Props = {
  imageurl: string[];
  gender: string;
  bounty?: number;
  location: string;
  timestamp: string;
  expireDate?: Date;
};

export const PetCard = ({ imageurl, gender, bounty, location, timestamp, expireDate }: Props) => {
  const { pathname } = useRouter();
  const expire = new Date("2023-05-14");
  const [timeLeft, setTimeLeft] = useState(expire - new Date());

  useEffect(() => {
    if (pathname == "/profile") {
      if (!timeLeft) return;

      const intervalId = setInterval(() => {
        setTimeLeft(expire - new Date());
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [expire, timeLeft]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  return (
    <div className="flex flex-col">
      <div
        className={`w-[300px] h-[400px] rounded-t-xl overflow-hidden relative ${
          pathname == "/profile" ? "shadow-md" : "rounded-b-xl"
        }`}
      >
        <Image src={dog} alt="dog" fill className="object-contain" />
        <div className="absolute top-2 left-2">
          {gender == "male" ? <MaleIcon /> : <FemaleIcon />}
        </div>
        <div className="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl w-[120px] h-12 bg-secondary flex-center space-x-2">
          <Image src={bountyicon} alt={"" + bounty} width={16} height={22} />
          {bounty && <p className="text-white text-xl">฿{bounty}</p>}
        </div>
        <div className="absolute bottom-0 py-4 px-5 w-full bg-gradient-image">
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
          {timeLeft > 0 ? `วันหมดอายุ: ${days}d ${hours}h ${minutes}m ${seconds}s` : "ต่ออายุ"}
        </button>
        <button className="rounded-[25px] w-full h-[45px] text-white text-lg bg-dark">
          หาน้องเจอแล้ว
        </button>
      </div>
    </div>
  );
};
