import { Button, PageLayout } from "@/component";
import { PetCard } from "@/component";
import { Form } from "@/component/Form";
import { useUI } from "@/context/UIContext";
import { useState } from "react";

export default function Home() {
  const { toggle, setToggle } = useUI();
  console.log(toggle);
  return (
    <>
      <PageLayout>
        <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-8 z-0">
          <div>
            <div className="flex flex-col items-center p-3 bg-primary shadow-filter rounded-xl space-y-4">
              <h1 className="text-white text-center text-4xl font-bold">ตามหาน้อง</h1>
              <div className="hidden xs:block">
                <Button onClick={() => setToggle(true)} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center w-full">
            <PetCard
              stage="finding"
              imageurl={[
                "https://findmyplutophotobucket.s3.ap-southeast-1.amazonaws.com/06a2930f-ec94-480c-b18c-e4e8cdc7a2d9",
              ]}
              gender="male"
              bounty={20000}
              location="บางโพงพาง, ยานนาวา"
              timestamp="21/2/2565 18:00"
              animalId={""}
            />
            <PetCard
              stage="finding"
              imageurl={[
                "https://findmyplutophotobucket.s3.ap-southeast-1.amazonaws.com/06a2930f-ec94-480c-b18c-e4e8cdc7a2d9",
              ]}
              gender="male"
              bounty={20000}
              location="บางโพงพาง, ยานนาวา"
              timestamp="21/2/2565 18:00"
              animalId={""}
            />
            <PetCard
              stage="finding"
              imageurl={[
                "https://findmyplutophotobucket.s3.ap-southeast-1.amazonaws.com/06a2930f-ec94-480c-b18c-e4e8cdc7a2d9",
              ]}
              gender="male"
              bounty={20000}
              location="บางโพงพาง, ยานนาวา"
              timestamp="21/2/2565 18:00"
              animalId={""}
            />
            <PetCard
              stage="finding"
              imageurl={[
                "https://findmyplutophotobucket.s3.ap-southeast-1.amazonaws.com/06a2930f-ec94-480c-b18c-e4e8cdc7a2d9",
              ]}
              gender="male"
              bounty={20000}
              location="บางโพงพาง, ยานนาวา"
              timestamp="21/2/2565 18:00"
              animalId={""}
            />
            <PetCard
              stage="finding"
              imageurl={[
                "https://findmyplutophotobucket.s3.ap-southeast-1.amazonaws.com/06a2930f-ec94-480c-b18c-e4e8cdc7a2d9",
              ]}
              gender="male"
              bounty={20000}
              location="บางโพงพาง, ยานนาวา"
              timestamp="21/2/2565 18:00"
              animalId={""}
            />
            <div className="xs:hidden sticky bottom-[70px] z-10 ">
              <Button onClick={() => setToggle(true)} />
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
