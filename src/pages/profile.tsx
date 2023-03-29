import { Button, PageLayout } from "@/component";
import { PetCard } from "@/component";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/AuthContext";

const Profile = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const handleToggle = () => {
    setChecked((prev) => !prev);
  };
  const userContext = useUser();

  useEffect(() => {
    if (!userContext.user) {
      router.push("/");
    }
  }, [router, userContext.user]);

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
          <PetCard
            imageurl={["www.google.com"]}
            gender="male"
            bounty={20000}
            location="บางโพงพาง, ยานนาวา"
            timestamp="21/2/2565 18:00"
          />
          <PetCard
            imageurl={["www.google.com"]}
            gender="male"
            bounty={20000}
            location="บางโพงพาง, ยานนาวา"
            timestamp="21/2/2565 18:00"
          />
          <PetCard
            imageurl={["www.google.com"]}
            gender="male"
            bounty={20000}
            location="บางโพงพาง, ยานนาวา"
            timestamp="21/2/2565 18:00"
          />
          <PetCard
            imageurl={["www.google.com"]}
            gender="male"
            bounty={20000}
            location="บางโพงพาง, ยานนาวา"
            timestamp="21/2/2565 18:00"
          />
          <PetCard
            imageurl={["www.google.com"]}
            gender="male"
            bounty={20000}
            location="บางโพงพาง, ยานนาวา"
            timestamp="21/2/2565 18:00"
          />
          <div className="xs:hidden sticky bottom-[70px] z-10 ">
            <Button />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
