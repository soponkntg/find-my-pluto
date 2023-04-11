import { Button, PageLayout } from "@/component";
import { PetCard } from "@/component";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/AuthContext";
import axios from "../axios.config";
import { PetCarddI } from "@/constant/interface";

const Profile = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [cards, setCards] = useState<PetCarddI[]>([
    {
      imageurl: ["www.google.com"],
      gender: "male",
      bounty: 20000,
      location: "บางโพงพาง, ยานนาวา",
      timestamp: "21/2/2565 18:00",
      animalId: "12345",
    },
    {
      imageurl: ["www.google.com"],
      gender: "male",
      bounty: 20000,
      location: "บางโพงพาง, ยานนาวา",
      timestamp: "21/2/2565 18:00",
      animalId: "12345",
    },
    {
      imageurl: ["www.google.com"],
      gender: "male",
      bounty: 20000,
      location: "บางโพงพาง, ยานนาวา",
      timestamp: "21/2/2565 18:00",
      animalId: "12345",
    },
    {
      imageurl: ["www.google.com"],
      gender: "male",
      bounty: 20000,
      location: "บางโพงพาง, ยานนาวา",
      timestamp: "21/2/2565 18:00",
      animalId: "12345",
    },
  ]);
  const handleToggle = () => {
    setChecked((prev) => !prev);
    //swap cards set
  };
  const userContext = useUser();
  const user = userContext.user;
  const token = user?.signInUserSession.idToken.jwtToken;

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      //fetch user card
      const fetchCard = async () => {
        const getCard = await axios.post("dev/cards", {
          userId: user.attributes.sub,
        });
        console.log(getCard.data);
        //set card by postType
      };
      fetchCard();
    }
  }, [router, user]);

  const handleDelete = async (animalId: string) => {
    const deleteCard = await axios.delete(`dev/card/${animalId}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(deleteCard.data);
    //setCard => delete that card
  };
  const handleExtend = async (animalId: string) => {
    const extendCard = await axios.put(`dev/extend/${animalId}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(extendCard.data);
    //setCard => extend that card
  };

  const handleEdit = (animalId: string) => {};

  return (
    <PageLayout>
      <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-8">
        <div>
          <div className="flex flex-col items-center p-3 bg-primary shadow-filter rounded-xl space-y-4">
            <h1 className="text-white text-center text-4xl font-bold">โพสของคุณ</h1>
            <div className="flex items-center justify-center w-full mb-12">
              <label htmlFor="toggle" className="flex items-center cursor-pointer">
                <div className={`mr-3 font-medium ${!checked ? "text-white" : "text-dimWhite/50"}`}>
                  หาน้อง
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="toggle"
                    className="sr-only peer"
                    onChange={handleToggle}
                    checked={checked}
                  />
                  <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-all peer-focus:outline-none peer-focus:ring-4 peer-checked:translate-x-full"></div>
                </div>
                <div
                  className={`ml-3 text-dimWhite font-medium  ${
                    checked ? "text-white" : "text-dimWhite/50"
                  }`}
                >
                  เจอน้อง
                </div>
              </label>
            </div>
            <div className="hidden xs:block">
              <Button />
            </div>
            <button
              className="rounded-[25px] w-full h-[45px] text-white text-xl bg-secondary"
              onClick={() => Auth.signOut()}
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center w-full">
          {cards.map((card) => {
            if (true) {
              //condition
              return (
                <PetCard
                  key={card.animalId}
                  animalId={card.animalId}
                  imageurl={card.imageurl}
                  gender={card.gender}
                  location={card.location}
                  timestamp={card.timestamp}
                  bounty={card.bounty}
                />
              );
            }
          })}
          <div className="xs:hidden sticky bottom-[70px] z-10 ">
            <Button />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
