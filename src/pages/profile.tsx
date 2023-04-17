import { Button, PageLayout } from "@/component";
import { PetCard } from "@/component";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDataContext } from "@/context/DataContext";
import axios from "../axios.config";
import moment from "moment";
import { PetCardPreviewI } from "@/constant/interface";

const Profile = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [cards, setCards] = useState<PetCardPreviewI[]>([]);

  const handleToggle = () => {
    setChecked((prev) => !prev);
    //swap cards set
  };
  const { userId, userToken } = useDataContext();

  useEffect(() => {
    if (!(userId && userToken)) {
      router.push("/");
    } else {
      //fetch user card
      const fetchCard = async () => {
        const getCard = await axios.post("dev/cards", {
          userId,
        });

        if (getCard.data.status == 200) {
          setCards([]);
          setCards(getCard.data.message);
        }
      };
      fetchCard();
    }
  }, [userId, userToken, router]);

  const handleDelete = async (animalId: string) => {
    const deleteCard = await axios.delete(`dev/card/${animalId}`, {
      headers: {
        Authorization: userToken,
      },
    });
    //setCard => delete that card
    if (deleteCard.data.status == 200) {
      setCards((oldCards) => {
        return oldCards.filter((card) => card.animalId != animalId);
      });
    }
  };
  const handleExtend = async (animalId: string) => {
    const extendCard = await axios.put(`dev/extend/${animalId}`, {
      headers: {
        Authorization: userToken,
      },
    });
    //setCard => extend that card
    if (extendCard.data.status == 200) {
      setCards((oldCards) => {
        const newCards = oldCards.map((card) => {
          if (card.animalId == animalId) {
            return { ...card, expiredAt: extendCard.data.message };
          }
          return card;
        });

        return newCards;
      });
    }
  };
  const handleFinish = async (animalId: string) => {
    // console.log("finish:", animalId);
    const finishCard = await axios.put(
      `dev/card/${animalId}`,
      { stage: "finish" },
      {
        headers: {
          Authorization: userToken,
        },
      }
    );
    //setCard => finish that card
    if (finishCard.data.status == 200) {
      setCards((oldCards) => {
        const newCards = oldCards.map((card) => {
          if (card.animalId == animalId) {
            return { ...card, stage: finishCard.data.message.stage };
          }
          return card;
        });

        return newCards;
      });
    }
  };
  //phase2
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 place-content-start w-full">
          {cards
            .filter((card) => {
              if (checked) {
                if (card.postType == "found") {
                  return true;
                } else {
                  return false;
                }
              } else {
                if (card.postType == "lost") {
                  return true;
                } else {
                  return false;
                }
              }
            })
            .map((card) => {
              return (
                <PetCard
                  stage={card.stage}
                  key={card.animalId}
                  animalId={card.animalId}
                  imageurl={card.images}
                  gender={card.gender}
                  location={card.lastFoundPlace.subdistrict + ", " + card.lastFoundPlace.district}
                  timestamp={moment(new Date(card.lastSeenAt)).format("MM/DD/YYYY h:mm")}
                  bounty={card.bounty}
                  expireDate={card.expiredAt}
                  handleDelete={handleDelete}
                  handleExtend={handleExtend}
                  handleFinish={handleFinish}
                />
              );
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
