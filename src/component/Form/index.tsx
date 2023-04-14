import axios from "@/axios.config";
import { FormI } from "@/constant/interface";
import { useUser } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import GoogleMapReact, { Coords } from "google-map-react";
import router from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import DogDetail from "./DogDetail";
import LostDetail from "./LostDetail";
import ModePicking from "./ModePicking";
import OwnerDetail from "./OwnerDetail";
import { Picture } from "./Picture";

const form: FormI = {
  userId: "",
  postType: "",
  animal: "หมา",
  images: [],
  species: "",
  colors: "",
  gender: "",
  size: "",
  lastSeenAt: "",
  lastFoundPlace: {
    province: "กรุงเทพ",
    district: "",
    subdistrict: "",
    lat: 0,
    lng: 0,
  },
  userName: "",
  contact: "",
};

const Marker = (props: any) => (
  <div style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
    <MapPinIcon className="w-8 h-8 text-red-500" />
  </div>
);

const Form = () => {
  const { toggle, closeToggle, userLocation } = useUI();
  const { user } = useUser();

  const [userId, setUserId] = useState<string>();

  const [formData, setFormData] = useState<FormI>(form);

  const [page, setPage] = useState<number>(1);

  const [mapVisible, setMapVisible] = useState<boolean>(false);
  const [markerPosition, setMarkerPosition] = useState<Coords>(userLocation);

  // Navigate to next section
  const nextSection = () => {
    setPage((prev) => prev + 1);
  };

  // Map pin handle
  const onMapClick = (event: any) => {
    const { lat, lng } = event;
    setMarkerPosition({ lat, lng });
  };

  // submit form
  const submitForm = async (images: FileList) => {
    if (user) {
      console.log(formData);
      user.getUserAttributes((err, result) => setUserId(result![0]["Value"]));
      const token = user.getSignInUserSession()?.getIdToken().getJwtToken();
      try {
        const imagesURL: string[] = [];
        const imagesList = Array.from(images);
        for (const img of imagesList) {
          const request = await axios.get("/dev/s3url?imgType=" + img.type, {
            headers: {
              Authorization: token,
            },
          });
          const uploadURL = request.data.message;

          if (request.data.status == 200) {
            await fetch(uploadURL, {
              method: "PUT",
              body: img,
              headers: {
                "content-type": img.type,
              },
            });
            imagesURL.push(uploadURL.split("?")[0]);
          }
        }
        const form: FormI = { ...formData, images: imagesURL, userId: userId! };
        const createCard = await axios.post("/dev/card", form, {
          headers: {
            Authorization: token,
          },
        });
        if (createCard.data.status == 200) {
          const cardId = createCard.data.message.animalId;
          toast.success("สร้างโพสสำเร็จ");
          router.push("/" + cardId);
        }
      } catch (e: any) {
        toast.error(e.message as string);
      }
    }
  };

  if (!toggle) {
    return null;
  }

  return (
    <div className="absolute h-full w-full z-20 backdrop-blur-xl px-4">
      {/* Google Map */}
      {mapVisible && (
        <div className="z-30 h-full w-full absolute">
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.google || "" }}
            defaultCenter={userLocation}
            defaultZoom={12}
            onClick={onMapClick}
          >
            <Marker lat={markerPosition.lat} lng={markerPosition.lng} />
          </GoogleMapReact>
          <button
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[25px] w-[300px] h-[45px] text-white text-lg bg-dark"
            onClick={() => {
              setMapVisible(false);
            }}
          >
            ยืนยัน
          </button>
        </div>
      )}

      {/* form layout */}

      <div className="bg-tertiary max-w-[800px] px-8 pt-12 pb-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 relative rounded-2xl">
        {/* cancel button */}
        <button onClick={closeToggle} className="top-[12px] right-[12px] absolute">
          <XCircleIcon className={`w-7 h-7`} />
        </button>

        {page == 1 && <ModePicking setFormDate={setFormData} nextSection={nextSection} />}
        {page == 2 && (
          <DogDetail
            setFormDate={setFormData}
            nextSection={nextSection}
            postType={formData.postType}
          />
        )}
        {page == 3 && (
          <LostDetail
            setFormDate={setFormData}
            nextSection={nextSection}
            postType={formData.postType}
            setMapVisible={setMapVisible}
            markerPosition={markerPosition}
          />
        )}
        {page == 4 && (
          <OwnerDetail
            setFormDate={setFormData}
            nextSection={nextSection}
            postType={formData.postType}
          />
        )}
        {page == 5 && <Picture setFormDate={setFormData} submitForm={submitForm} />}
      </div>
    </div>
  );
};

export default Form;
