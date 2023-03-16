import Image from "next/image";
import bountyicon from "../../public/bounty.png";
import dog from "../../public/dog.png";
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/solid";
import { MaleIcon } from "./MaleIcon";
import { FemaleIcon } from "./FemaleIcon";
import { useRouter } from "next/router";

type Props = {
  imageurl: string[];
  gender: string;
  bounty?: number;
  location: string;
  timestamp: string;
};

export const PetCard = ({ imageurl, gender, bounty, location, timestamp }: Props) => {
  const { pathname } = useRouter();

  return (
    <div className="flex flex-col">
      <div
        className={`w-[300px] h-[400px] rounded-t-xl overflow-hidden relative object-contain ${
          pathname == "/profile" ? "shadow-md" : "rounded-b-xl"
        }`}
      >
        <Image src={dog} alt="dog" fill />
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
          วันหมดอายุ: 12:00:59
        </button>
        <button className="rounded-[25px] w-full h-[45px] text-white text-lg bg-dark">
          หาน้องเจอแล้ว
        </button>
      </div>
    </div>
  );
};
