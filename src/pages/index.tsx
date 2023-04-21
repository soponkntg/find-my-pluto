import PlutoAxios from "@/axios.config";
import { Button, PageLayout } from "@/component";
import { PetCard } from "@/component";
import { Filter } from "@/component/Filter";
import { useDataContext } from "@/context/DataContext";
import { PetCardPreviewI } from "@/constant/interface";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { Meta } from "@/component/Meta";

export default function Home({ defaultCards }: { defaultCards: PetCardPreviewI[] }) {
  const [cards, setCards] = useState<PetCardPreviewI[]>(defaultCards);
  const { openForm } = useDataContext();
  return (
    <>
      <Meta
        title={"Findmypluto"}
        description={
          "เว็บไซต์เพื่อช่วยในการตามหาสัตว์เลี้ยงหลงทางหรือเจ้าของน้อง เราได้พบว่าวิธีการตามหาสัตว์เลี้ยงในปัจจุบันนั้นมีความซับซ้อน จึงทำให้เราตัดสินใจสร้างเว็บไซต์นี้ขึ้นมา เพื่อช่วยให้การค้นหาและพบสัตว์เลี้ยงที่หายตัวไปนั้นง่ายและรวดเร็วขึ้น"
        }
      />
      <PageLayout>
        <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-8 z-0">
          <div>
            <div className="flex flex-col items-center p-3 bg-primary shadow-filter rounded-xl space-y-4">
              <h1 className="text-white text-center text-4xl font-bold">ตามหาน้อง</h1>
              <Filter setCards={setCards} />
              <div className="hidden xs:block">
                <Button onClick={() => openForm()} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center md:place-items-start  w-full">
            {cards.map((card) => (
              <PetCard
                stage={card.stage}
                key={card.animalId}
                animalId={card.animalId}
                imageurl={card.images}
                gender={card.gender}
                location={card.lastFoundPlace.subdistrict + ", " + card.lastFoundPlace.district}
                timestamp={moment(new Date(card.lastSeenAt)).format("MM/DD/YYYY h:mm")}
                bounty={card.bounty}
              />
            ))}

            <div className="xs:hidden sticky bottom-[70px] z-10 ">
              <Button onClick={() => openForm()} />
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await PlutoAxios.post(`/dev/cards`, {
    postType: "lost",
  });
  const defaultCards = res.data.message;
  return {
    props: { defaultCards }, // will be passed to the page component as props
  };
};
