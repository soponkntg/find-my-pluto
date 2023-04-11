import { XCircleIcon } from "@heroicons/react/24/outline";
import buttonLeft from "../../public/button-left.png";
import buttonRight from "../../public/button-right.png";
import buttonPlus from "../../public/button-plus.png";
import buttonPlusSm from "../../public/button-plus-sm.png";
import buttonFound from "../../public/bone-button-found.png";
import buttonLost from "../../public/bone-button-lost.png";
import { toast } from "react-toastify";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TimePicker, DatePicker } from "antd";
import GoogleMapReact, { Coords } from "google-map-react";
import axios from "axios";

import { FormI, OptionI } from "@/constant/interface";

import { Input } from "./Input";
import { CustomSelect } from "./CustomSelect";
import { area, dogSpecies } from "@/constant/text";

import { useUser } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import { MapPinIcon } from "@heroicons/react/24/solid";

export const Form = () => {
  const { toggle, closeToggle, userLocation } = useUI();
  const userContext = useUser();

  const router = useRouter();

  const { control, handleSubmit, setValue } = useForm();

  const [postType, setPostType] = useState<"" | "found" | "lost">("");
  const [page, setPage] = useState<number>(0);

  const [subdistricts, setSubdistricts] = useState<OptionI[]>([{ value: "", label: "" }]);
  const [mapVisible, setMapVisible] = useState<boolean>(false);

  const center = userLocation;
  const zoom = 12;
  const [markerPosition, setMarkerPosition] = useState<Coords>(center);
  const mapRef = useRef(null);

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    if (toggle) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [toggle]);

  let districts: { value: string; label: string }[] = [];
  for (const district in area) {
    districts.push({ value: district, label: district });
  }

  const getSubdistrict = (district: keyof typeof area) => {
    const subdistrict = area[district];
    const temp = subdistrict.map((elem: string) => ({ value: elem, label: elem }));
    setSubdistricts(temp);
  };

  const onMapClick = (event: any) => {
    const { lat, lng } = event;
    setMarkerPosition({ lat, lng });
    setValue("location", { lat, lng });
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileUrl = URL.createObjectURL(file);
        urls.push(fileUrl);
      }
      setPreviewUrls(urls);
      setValue("images", files);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (userContext.user) {
      userContext.user.getUserAttributes((err, result) => setUserId(result![0]["Value"]));
      const token = userContext.user.getSignInUserSession()?.getAccessToken().getJwtToken();
      try {
        const form: FormI = {
          userId: userId as string,
          postType: postType,
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
          name: "",
          contact: "",
        };

        //prepare imgurl
        if (data.images) {
          for (const img of data.images) {
            const request = await axios.get(
              "https://orp7ck8zj8.execute-api.ap-southeast-1.amazonaws.com/dev/s3url?imgType=" +
                img.type,
              {
                headers: {
                  Authorization: token,
                },
              }
            );

            const upoladURL = request.data.message;

            if (request.data.status == 200) {
              const createImage = await fetch(upoladURL, {
                method: "PUT",
                body: img,
                headers: {
                  "content-type": img.type,
                },
              });
              form.images.push(upoladURL.split("?")[0]);
            }
          }
        }

        form.species = data.species.value;
        form.colors = data.colors.map((color: OptionI) => color.value);
        form.size = data.size.value;
        form.gender = data.gender.value;
        const date = new Date(
          data.lastSeenDate["$y"],
          data.lastSeenDate["$M"],
          data.lastSeenDate["$D"],
          data.lastSeenTime["$H"],
          data.lastSeenTime["$m"]
        );
        form.lastSeenAt = date.toISOString();
        form.lastFoundPlace.district = data.district.value;
        form.lastFoundPlace.subdistrict = data.subdistrict.value;
        form.lastFoundPlace.lat = data.location.lat;
        form.lastFoundPlace.lng = data.location.lng;
        form.name = data.name;
        form.contact = data.contact;

        if (data.age) {
          form.age = data.age;
        }

        if (data.braceletColor) {
          form.braceletColor = data.braceletColor.value;
        }
        if (data.bounty) {
          form.bounty = data.bounty;
        }

        if (data.description != "เพิ่มเติ่ม" && data.description != "") {
          form.description = data.description;
        }

        if (data.animalName != "" && postType == "lost") {
          form.animalName = data.animalName;
        }

        const createCard = await axios.post(
          "https://orp7ck8zj8.execute-api.ap-southeast-1.amazonaws.com/dev/card",
          form,
          {
            headers: {
              Authorization: token,
            },
          }
        );

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

  // useEffect(() => {
  //   const handleMouseDown = (e: { target: any }) => {
  //     if (mapRef.current && !mapRef.current.contains(e.target)) {
  //       setMapVisible(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleMouseDown);

  //   return () => {
  //     document.removeEventListener("mousedown", handleMouseDown);
  //   };
  // }, []);

  if (!toggle) {
    return null;
  }

  const Page0 = () => (
    <div className="grid justify-items-center gap-5">
      <button
        className="w-[300px] h-[95px]"
        onClick={() => {
          setPostType("lost");
          setPage(1);
        }}
      >
        <Image src={buttonLost} alt={"buttonLost"} />
      </button>
      <button
        className="w-[300px] h-[95px]"
        onClick={() => {
          setPostType("found");
          setPage(1);
        }}
      >
        <Image src={buttonFound} alt={"buttonFound"} />
      </button>
    </div>
  );

  const Page1 = () => (
    <div className="space-y-4">
      <h2 className="font-medium text-2xl">ข้อมูลน้อง</h2>
      {postType == "lost" && (
        <Input id={"animalName"} type={"text"} placeholder={"ชื่อน้อง*"} required />
      )}

      {postType == "lost" && <Input id={"age"} type={"number"} placeholder={"อายุ"} />}

      <CustomSelect
        label="เพศ*"
        isMulti={false}
        control={control}
        name={"gender"}
        require={true}
        options={[
          { value: "เพศผู้", label: "เพศผู้" },
          { value: "เพศเมีย", label: "เพศเมีย" },
        ]}
      />

      <CustomSelect
        isMulti={false}
        control={control}
        name={"species"}
        options={dogSpecies}
        label={"สายพันธ์*"}
        require={true}
      />

      <CustomSelect
        isColor={true}
        isMulti={true}
        control={control}
        name={"colors"}
        label={"สี*"}
        require={true}
        options={[
          { value: "brown", label: "น้ำตาล" },
          { value: "goldenBrown", label: "น้ำตาลทอง" },
          { value: "paleBrown", label: "น้ำตาลอ่อน" },
          { value: "black", label: "ดำ" },
          { value: "white", label: "ขาว" },
          { value: "gray", label: "เทา" },
        ]}
      />

      <CustomSelect
        isMulti={false}
        control={control}
        name={"size"}
        label={"ขนาด*"}
        require={true}
        options={[
          { value: "เล็ก", label: "เล็ก" },
          { value: "กลาง", label: "กลาง" },
          { value: "ใหญ่", label: "ใหญ่" },
        ]}
      />

      <CustomSelect
        isColor={true}
        isMulti={false}
        control={control}
        name={"braceletColor"}
        label={"สีปลอกคอ"}
        require={false}
        options={[
          { value: "brown", label: "น้ำตาล" },
          { value: "green", label: "เขียว" },
          { value: "red", label: "แดง" },
          { value: "black", label: "ดำ" },
          { value: "white", label: "ขาว" },
          { value: "gray", label: "เทา" },
          { value: "lightBlue", label: "ฟ้า" },
          { value: "blue", label: "น้ำเงิน" },
          { value: "purple", label: "ม่วง" },
          { value: "orange", label: "ส้ม" },
          { value: "yellow", label: "เหลือง" },
        ]}
      />
    </div>
  );

  const Page2 = () => (
    <div className="space-y-4">
      <h2 className="font-medium text-2xl">เวลาที่{postType == "lost" ? "น้องหาย" : "พบน้อง"}</h2>
      <div className="flex justify-between items-center">
        <label className="text-lg">วันที่{postType == "lost" ? "หาย" : "พบ"}*</label>
        <Controller
          control={control}
          name="lastSeenDate"
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              className="w-[75%] h-10 bg-neutral-200 rounded-lg px-2 placeholder-neutrals-800"
              onChange={(date) => field.onChange(date)}
              placeholder="เลือกวัน"
            />
          )}
        />
      </div>
      <div className="flex justify-between items-center">
        <h4 className="text-lg">เวลาที่{postType == "lost" ? "หาย" : "พบ"}*</h4>
        <Controller
          control={control}
          name="lastSeenTime"
          rules={{ required: true }}
          render={({ field }) => (
            <TimePicker
              className="w-[75%] h-10 bg-neutral-200 rounded-lg px-2 placeholder-neutrals-800 placeholder:font-sans"
              onChange={(time) => field.onChange(time)}
              value={field.value}
              format="HH:mm"
              showNow={false}
              placeholder="เลือกเวลา"
            />
          )}
        />
      </div>

      <h2 className="font-medium text-2xl">สถานที่{postType == "lost" ? "น้องหาย" : "พบน้อง"}</h2>
      <CustomSelect
        label={"เขต*"}
        getSubdistrict={getSubdistrict}
        isMulti={false}
        control={control}
        name={"district"}
        require={true}
        options={districts}
      />

      <CustomSelect
        label={"แขวง*"}
        isMulti={false}
        control={control}
        name={"subdistrict"}
        require={true}
        options={subdistricts}
      />
      <button
        className="rounded-[25px] w-full h-[45px] text-white text-lg bg-dark"
        onClick={() => setMapVisible(true)}
      >
        ปักหมุด
      </button>
      <input
        id={"location"}
        type={"hidden"}
        placeholder={"สถานที่"}
        value={markerPosition.lat + ", " + markerPosition.lng}
        className="rounded-[25px] w-full h-[45px] text-white text-lg bg-dark"
      />
    </div>
  );

  const Page3 = () => (
    <div className="space-y-4">
      <h2 className="font-medium text-2xl">ข้อมูลการติดต่อ</h2>

      <Input id={"name"} type={"text"} placeholder={"ชื่อ*"} required />

      <Input id={"contact"} type={"text"} placeholder={"Line ID*"} required />

      {postType == "lost" && (
        <div>{<Input id={"bounty"} type={"number"} placeholder={"รางวัล"} />}</div>
      )}

      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <textarea
            {...field}
            placeholder="เพิ่มเติ่ม"
            onFocus={() => {
              if (!fieldState.isDirty) {
                setValue("description", "");
              }
            }}
            className={`${
              !fieldState.isDirty ? "text-neutrals-800" : "text-black"
            } p-2 text-lg bg-neutral-200 placeholder-neutrals-800 rounded-lg px-2 text-black leading-tight focus:outline-none focus:ring-[#2684FF] focus:ring-2 w-full h-[96px]`}
          />
        )}
      />
    </div>
  );

  const Page4 = () => (
    <div className="space-y-4">
      <h2 className="font-medium text-2xl">รูปภาพ</h2>

      {previewUrls.length == 0 ? (
        <div className="relative w-[260px] h-[260px] rounded-[10px] bg-neutrals-300 overflow-hidden mx-auto">
          <input
            id="images"
            className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer z-20"
            type="file"
            multiple
            onChange={onFileInputChange}
          />
          <button
            type="button"
            className="absolute top-0 left-0 w-full h-full  text-white font-medium text-sm flex items-center justify-center transition duration-200 ease-in-out"
          >
            <Image src={buttonPlus} alt={"button plus"} />
          </button>
        </div>
      ) : (
        <div className="flex space-x-2 flex-nowrap overflow-x-scroll">
          {previewUrls.map((url) => (
            <div key={url} className="w-[200px] h-[200px] flex-shrink-0 relative">
              <Image src={url} alt="Preview Image" fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="absolute h-full w-full z-20 backdrop-blur-xl px-4">
      {mapVisible && (
        <div className="z-30 h-full w-full relative" ref={mapRef}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.google || "" }}
            defaultCenter={center}
            defaultZoom={zoom}
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

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {page == 0 && <Page0 />}
          {page == 1 && <Page1 />}
          {page == 2 && <Page2 />}
          {page == 3 && <Page3 />}
          {page == 4 && <Page4 />}

          {/* left and right button */}
          <div className="w-full flex justify-between items-center mt-4">
            <button
              className={`bg-primary rounded-2xl ${[1, 2, 3].includes(page) ? "block" : "hidden"}`}
              onClick={() => {
                if (page > 0) {
                  setPage((oldPage) => oldPage - 1);
                }
              }}
            >
              <Image className="m-1" src={buttonLeft} alt={"buttonLeft"} />
            </button>

            <button
              className={`bg-primary rounded-2xl ${[1, 2, 3].includes(page) ? "block" : "hidden"}`}
              onClick={() => {
                setPage((oldPage) => oldPage + 1);
              }}
            >
              <Image className="m-1" src={buttonRight} alt={"buttonRight"} />
            </button>
            <button
              className={`bg-primary rounded-2xl ml-auto ${page == 4 ? "block" : "hidden"}`}
              type="submit"
            >
              <Image className="m-1" src={buttonPlusSm} alt={"buttonPlusSm"} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Marker = (props: any) => (
  <div style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
    <MapPinIcon className="w-8 h-8 text-red-500" />
  </div>
);
