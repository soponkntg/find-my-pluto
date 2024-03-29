import PlutoAxios from "@/axios.config";
import { FormI } from "@/constant/interface";
import { useDataContext } from "@/context/DataContext";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import GoogleMapReact, { Coords } from "google-map-react";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DogDetail from "./DogDetail";
import LostDetail from "./LostDetail";
import ModePicking from "./ModePicking";
import OwnerDetail from "./OwnerDetail";
import { Picture } from "./Picture";

interface LocationDetail {
  province: string;
  district: string;
  subdistrict: string;
}

const form: FormI = {
  userId: "",
  postType: "",
  animal: "",
  images: [],
  species: "",
  colors: "",
  gender: "",
  size: "",
  lastSeenAt: "",
  lastFoundPlace: {
    province: "",
    district: "",
    subdistrict: "",
    lat: 0,
    lng: 0,
  },
  userName: "",
  contact: "",
  braceletColor: undefined,
  age: undefined,
  animalName: undefined,
  bounty: undefined,
  description: undefined,
};

const Marker = (props: any) => (
  <div style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
    <MapPinIcon className="w-8 h-8 text-red-500" />
  </div>
);

const Form = () => {
  const { toggle, closeForm, userLocation, userId, userToken, setLoading } = useDataContext();

  const [formData, setFormData] = useState<FormI>(form);

  const [page, setPage] = useState<number>(1);

  const [mapVisible, setMapVisible] = useState<boolean>(false);
  const [markerPosition, setMarkerPosition] = useState<Coords>(userLocation);
  const [locationDetail, setLocationDetail] = useState<LocationDetail | undefined>(undefined);

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; // cleanup or run on page unmount
    }
  }, [toggle]);

  // Navigate to next section
  const nextSection = () => {
    setPage((prev) => prev + 1);
  };

  // Map pin handle
  const onMapClick = (event: any) => {
    const { lat, lng } = event;
    setMarkerPosition({ lat, lng });
  };

  const onMapSubmit = async (lat: number, lng: number) => {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=political&key=${process.env.google}&language=th`
    );
    let subdistrict = "";
    let district = "";
    let province = "";
    if (res.data.results[0].address_components.length == 5) {
      subdistrict = res.data.results[0].address_components[0].short_name;
      district = res.data.results[0].address_components[1].short_name;
      province = res.data.results[0].address_components[2].short_name;
    } else {
      subdistrict = res.data.results[0].address_components[1].short_name;
      district = res.data.results[0].address_components[2].short_name;
      province = res.data.results[0].address_components[3].short_name;
    }

    setFormData((prev) => ({
      ...prev,
      lastFoundPlace: {
        province,
        district,
        subdistrict,
        lat,
        lng,
      },
    }));
    setLocationDetail({ province, district, subdistrict });
    setMapVisible(false);
  };

  const closeModal = () => {
    setFormData(form);
    setPage(1);
    setLocationDetail(undefined);
    closeForm();
  };

  // submit form
  const submitForm = async (images: FileList) => {
    if (userToken && userId) {
      try {
        setLoading(true);
        const imagesURL: string[] = [];
        const imagesList = Array.from(images);
        if (imagesList.length == 0) {
          throw new Error("อัพโหลดรูปผิดพลาด กรุณาลองใหม่อีกครั้ง");
        }
        for (const img of imagesList) {
          const request = await PlutoAxios.get("/dev/s3url?imgType=" + img.type, {
            headers: {
              Authorization: userToken,
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
          } else if (request.data.status == 500) {
            throw new Error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
          }
        }
        const form: FormI = { ...formData, images: imagesURL, userId: userId! };
        const createCard = await PlutoAxios.post("/dev/card", form, {
          headers: {
            Authorization: userToken,
          },
        });
        if (createCard.data.status == 200) {
          const cardId = createCard.data.message.animalId;
          closeModal();
          router.push("/" + cardId);
        } else if (createCard.data.status == 500) {
          toast.error(createCard.data.message as string);
          closeModal();
        }
      } catch (e: any) {
        closeModal();
        toast.error(e.message as string);
      }
      setLoading(false);
    }
  };

  if (!toggle) {
    return null;
  }

  return (
    <div className="fixed h-full w-full z-20 backdrop-blur-xl">
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
          <div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[25px] w-[300px] h-[45px] text-white text-lg bg-dark text-center grid content-center"
            onClick={async () => {
              await onMapSubmit(markerPosition.lat, markerPosition.lng);
            }}
          >
            ยืนยัน
          </div>
        </div>
      )}

      {/* form layout */}

      <div className="bg-tertiary max-w-[800px] px-8 pt-12 pb-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 relative rounded-2xl">
        {/* cancel button */}
        <button onClick={closeModal} className="top-[12px] right-[12px] absolute">
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
            locationDetail={locationDetail}
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
