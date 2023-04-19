import Image from "next/image";
import bountyicon from "../../public/bounty.png";
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/solid";
import { MaleIcon } from "./MaleIcon";
import { FemaleIcon } from "./FemaleIcon";
import { useRouter } from "next/router";
import { Carousel } from "react-responsive-carousel";
import { PetCarddI } from "@/constant/interface";

export const PetCard = ({
  stage,
  animalId,
  imageurl,
  gender,
  bounty,
  location,
  timestamp,
  expireDate,
  handleDelete,
  handleExtend,
  handleFinish,
}: PetCarddI) => {
  const router = useRouter();
  const calTimeDiff = (start: number, end: number) => {
    return end - start;
  };

  const { pathname } = useRouter();

  const secToHour = (time: number) => {
    return Math.floor(time / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="flex flex-col">
      <div
        className={`w-[300px] h-[400px] rounded-t-xl overflow-hidden relative cursor-pointer ${
          pathname == "/profile" ? "shadow-md" : "rounded-b-xl"
        }
        ${stage == "finish" ? "rounded-b-xl" : ""}`}
        onClick={() => {
          if (stage == "finding") {
            router.push("/" + animalId);
          }
        }}
      >
        {stage != "finding" && (
          <div className="w-full h-full absolute z-10 bg-neutrals-800 opacity-50 flex-center">
            {stage == "expired" && <h3 className=" text-grey/30 text-4xl">หมดอายุ</h3>}
            {stage == "finish" && <h3 className=" text-grey/30 text-4xl">น้องกลับบ้านแล้ว</h3>}
          </div>
        )}
        <Carousel showThumbs={false} autoPlay>
          {imageurl.map((url, index) => (
            <div key={index} className="`w-[300px] h-[400px]">
              <Image src={url} alt={url} fill className="object-cover" loading="lazy" />
            </div>
          ))}
        </Carousel>
        <div className="absolute top-2 left-2">
          {gender == "เพศผู้" ? <MaleIcon /> : <FemaleIcon />}
        </div>
        {bounty && (
          <div className="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl w-[120px] h-12 bg-secondary flex-center space-x-2">
            <Image src={bountyicon} alt={"" + bounty} width={16} height={22} loading="lazy" />
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
      {stage != "finish" && (
        <div
          className={`${
            pathname == "/profile" ? "block" : "hidden"
          } w-[300px] bg-dim-secondary shadow-md rounded-b-xl py-3 px-5 space-y-2`}
        >
          {expireDate && (
            <button
              className="rounded-[25px] w-full h-[45px] text-white text-lg bg-secondary"
              onClick={() => {
                if (handleExtend && calTimeDiff(new Date().getTime(), expireDate) < 0) {
                  handleExtend(animalId);
                }
              }}
            >
              {calTimeDiff(new Date().getTime(), expireDate) > 0
                ? `หมดอายุในอีก: ${secToHour(calTimeDiff(new Date().getTime(), expireDate))} วัน`
                : "ต่ออายุ"}
            </button>
          )}
          <button
            className="rounded-[25px] w-full h-[45px] text-white text-lg bg-dark"
            onClick={() => {
              if (handleFinish) {
                handleFinish(animalId);
              }
            }}
          >
            หาน้องเจอแล้ว
          </button>
          <div className="flex justify-between">
            {/* <button className="rounded-[25px] w-[117px] h-[45px] text-white text-lg bg-gray-500">
            แก้ไข
          </button> */}
            <button
              className="rounded-[25px] w-full h-[45px] text-white text-lg bg-red-500"
              onClick={() => {
                if (handleDelete) {
                  handleDelete(animalId);
                }
              }}
            >
              ลบ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
