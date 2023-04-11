import { XCircleIcon } from "@heroicons/react/24/outline";
import buttonLeft from "../../public/button-left.png";
import buttonRight from "../../public/button-right.png";
import buttonPlus from "../../public/button-plus.png";
import buttonPlusSm from "../../public/button-plus-sm.png";
import buttonFound from "../../public/bone-button-found.png";
import buttonLost from "../../public/bone-button-lost.png";

import Image from "next/image";
import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TimePicker, DatePicker } from "antd";
import GoogleMapReact, { Coords } from "google-map-react";
import axios from "../axios.config";

import { FormI, OptionI } from "@/constant/interface";
import { Input } from "./Input";
import { CustomSelect } from "./CustomSelect";
import { area, dogSpecies } from "@/constant/text";

import { useUser } from "@/context/AuthContext";

export const Form = (props: { setIsCreateCard: Dispatch<SetStateAction<Boolean>> }) => {
  const router = useRouter();
  const { register, control, handleSubmit, setValue } = useForm();

  const userContext = useUser();

  const [postType, setPostType] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  const [subdistricts, setSubdistricts] = useState<[OptionI]>([{ value: "", label: "" }]);
  const [mapVisible, setMapVisible] = useState<boolean>(false);
  const [center] = useState<Coords>({ lat: 13.72433, lng: 100.50917 });
  const [zoom] = useState<number>(12);
  const [markerPosition, setMarkerPosition] = useState<Coords>(center);
  const mapRef = useRef(null);

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  let districts = [];
  for (const district in area) {
    districts.push({ value: district, label: district });
  }

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

  const isFormValidate = (data: any) => {
    if (
      !data.species ||
      !data.colors ||
      !data.gender ||
      !data.size ||
      !data.lastSeenDate ||
      !data.lastSeenTime ||
      !data.district ||
      !data.subdistrict ||
      data.location == "" ||
      data.name == "" ||
      data.contact == "" ||
      (postType == "lost" && data.animalName == "")
    ) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (userContext.user) {
      console.log(data);
      if (isFormValidate(data)) {
        try {
          console.log(data);
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
          const user = userContext.user;
          const token = userContext.user.signInUserSession.idToken.jwtToken;
          form.userId = user.attributes.sub;
          form.postType = postType;

          //prepare imgurl
          if (data.images) {
            for (const img of data.images) {
              const request = await axios.get("/dev/s3url?imgType=" + img.type, {
                headers: {
                  Authorization: token,
                },
              });

              const upoladURL = request.data.message;

              // console.log(upoladURL);
              // console.log(img);

              if (request.data.status == 200) {
                const createImage = await fetch(upoladURL, {
                  method: "PUT",
                  body: img,
                  headers: {
                    "content-type": img.type,
                  },
                });
                console.log(createImage);
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
          form.userName = data.name;
          form.contact = data.contact;

          if (data.age) {
            form.age = data.age;
          }

          if (data.braceletColor) {
            form.braceletColor = data.braceletColor.value;
          }
          if (data.bounty != "") {
            form.bounty = data.bounty;
          }

          if (data.description != "เพิ่มเติ่ม" && data.description != "") {
            form.description = data.description;
          }

          if (data.animalName != "" && postType == "lost") {
            form.animalName = data.animalName;
          }

          console.log(form);

          const createCard = await axios.post("/dev/card", form, {
            headers: {
              Authorization: token,
            },
          });

          if (createCard.data.status == 200) {
            const cardId = createCard.data.message.animalId;
            router.push("/" + cardId);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log("form error");
      }
    }
  };

  useEffect(() => {
    const handleMouseDown = (e: { target: any }) => {
      if (mapRef.current && !mapRef.current.contains(e.target)) {
        setMapVisible(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div className="bg-tertiary w-[400px] h-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 relative rounded-lg">
      {/* cancel button */}
      <button onClick={() => props.setIsCreateCard(false)}>
        <XCircleIcon className={`w-7 h-7 top-[17.25px] right-[25.25px] absolute`} />
      </button>

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {page == 0 && (
          <div className="relative top-28 grid justify-items-center gap-5">
            <button
              className="w-[352px] h-[110px]"
              onClick={() => {
                setPostType((oldPostType) => {
                  oldPostType = "lost";
                  return oldPostType;
                });
                setPage(1);
              }}
            >
              <Image src={buttonLost} alt={"buttonLost"} />
            </button>
            <button
              className="w-[352px] h-[110px]"
              onClick={() => {
                setPostType((oldPostType) => {
                  oldPostType = "found";
                  return oldPostType;
                });
                setPage(1);
              }}
            >
              <Image src={buttonFound} alt={"buttonFound"} />
            </button>
          </div>
        )}

        {page == 1 && (
          <div className="mx-[24px] top-3 grid gap-4">
            <h2 className="font-semibold text-2xl">ข้อมูลน้อง</h2>
            <div className="grid gap-4">
              {postType == "lost" && (
                <div className="flex justify-between items-center h-[40px]">
                  <h4 className="text-black  text-xl whitespace-nowrap font-medium">ชื่อน้อง :</h4>
                  <div className="w-[230px] h-full">
                    {
                      <Input
                        id={"animalName"}
                        type={"text"}
                        placeholder={"ชื่อน้อง"}
                        register={register}
                      />
                    }
                  </div>
                </div>
              )}

              <div className="flex gap-9 h-[40px]">
                {postType == "lost" && (
                  <div className="flex gap-3 h-full items-center">
                    <h4 className="text-black  text-xl font-medium">อายุ :</h4>
                    <div className="w-[80px] h-full">
                      {<Input id={"age"} type={"text"} placeholder={""} register={register} />}
                    </div>
                    <h4 className="text-black  text-xl  font-medium">ปี</h4>
                  </div>
                )}
                <div
                  className={`flex h-full items-center ${
                    postType == "lost" ? "gap-3 w-[150px]" : "justify-between w-full"
                  }`}
                >
                  <h4 className="text-black  text-xl whitespace-nowrap font-medium">เพศ :</h4>
                  <div className={`${postType == "lost" ? "w-full" : "w-[230px]"} h-full`}>
                    {
                      <CustomSelect
                        isMulti={false}
                        control={control}
                        name={"gender"}
                        options={[
                          { value: "เพศผู้", label: "เพศผู้" },
                          { value: "เพศเมีย", label: "เพศเมีย" },
                        ]}
                      />
                    }
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">สายพันธ์ :</h4>
                <div className="w-[230px] h-full">
                  {
                    <CustomSelect
                      isMulti={false}
                      control={control}
                      name={"species"}
                      options={dogSpecies}
                    />
                  }
                </div>
              </div>
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">สี :</h4>
                <div className="w-[230px] h-full">
                  {
                    <CustomSelect
                      isColor={true}
                      isMulti={true}
                      control={control}
                      name={"colors"}
                      options={[
                        { value: "brown", label: "น้ำตาล" },
                        { value: "goldenBrown", label: "น้ำตาลทอง" },
                        { value: "paleBrown", label: "น้ำตาลอ่อน" },
                        { value: "black", label: "ดำ" },
                        { value: "white", label: "ขาว" },
                        { value: "gray", label: "เทา" },
                      ]}
                    />
                  }
                </div>
              </div>
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black text-xl whitespace-nowrap font-medium">ขนาด :</h4>
                <div className="w-[230px] h-full">
                  {
                    <CustomSelect
                      isMulti={false}
                      control={control}
                      name={"size"}
                      options={[
                        { value: "เล็ก", label: "เล็ก" },
                        { value: "กลาง", label: "กลาง" },
                        { value: "ใหญ่", label: "ใหญ่" },
                      ]}
                    />
                  }
                </div>
              </div>
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">สีปลอกคอ :</h4>
                <div className="w-[230px] h-full">
                  {
                    <CustomSelect
                      isColor={true}
                      isMulti={false}
                      control={control}
                      name={"braceletColor"}
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
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {page == 2 && (
          <div className="mx-[24px] top-3 grid gap-4">
            <h2 className="font-semibold text-2xl">
              เวลาที่{postType == "lost" ? "น้องหาย" : "พบน้อง"}
            </h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">
                  วันที่{postType == "lost" ? "หาย" : "พบ"} :
                </h4>
                <div className="w-[230px] h-full">
                  {
                    <Controller
                      control={control}
                      name="lastSeenDate"
                      render={({ field }) => (
                        <DatePicker
                          className="w-full h-[40px] bg-neutrals-300 shadow-input rounded-[10px] px-2 placeholder-neutrals-800"
                          onChange={(date) => field.onChange(date)}
                          placeholder="เลือกวัน"
                        />
                      )}
                    />
                  }
                </div>
              </div>
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">
                  เวลาที่{postType == "lost" ? "หาย" : "พบ"} :
                </h4>
                <div className="w-[230px] h-full">
                  {
                    <Controller
                      control={control}
                      name="lastSeenTime"
                      render={({ field }) => (
                        <TimePicker
                          className="w-full h-[40px] bg-neutrals-300 shadow-input rounded-[10px] px-2 placeholder-neutrals-800"
                          onChange={(time) => field.onChange(time)}
                          value={field.value}
                          format="HH:mm"
                          showNow={false}
                          placeholder="เลือกเวลา"
                        />
                      )}
                    />
                  }
                </div>
              </div>
            </div>
            <h2 className="font-semibold text-2xl">
              สถานที่{postType == "lost" ? "น้องหาย" : "พบน้อง"}
            </h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">เขต :</h4>
                <div className="w-[230px] h-full">
                  {
                    <CustomSelect
                      setSubdistricts={setSubdistricts}
                      isMulti={false}
                      control={control}
                      name={"district"}
                      options={districts}
                    />
                  }
                </div>
              </div>
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">แขวง :</h4>
                <div className="w-[230px] h-full">
                  {
                    <CustomSelect
                      isMulti={false}
                      control={control}
                      name={"subdistrict"}
                      options={subdistricts}
                    />
                  }
                </div>
              </div>
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">สถานที่ :</h4>
                <div className="w-[230px] h-full">
                  {
                    <div className="w-full h-full">
                      <div
                        className="shadow-input bg-neutrals-300 placeholder-neutrals-800 rounded-[10px] w-full h-full py-1 px-2 text-black"
                        onClick={() => setMapVisible(true)}
                      >
                        {"lat " + markerPosition.lat + " lng: " + markerPosition.lng}
                      </div>
                      <Input id={"location"} type={"hidden"} register={register} />
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        )}
        {page == 3 && (
          <div className="mx-[24px] top-3 grid gap-4">
            <h2 className="font-semibold text-2xl">ติดต่อ</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">ติดต่อคุณ :</h4>
                <div className="w-[260px] h-full">
                  {<Input id={"name"} type={"text"} placeholder={"ชื่อ"} register={register} />}
                </div>
              </div>
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">Line Id :</h4>
                <div className="w-[260px] h-full">
                  {
                    <Input
                      id={"contact"}
                      type={"text"}
                      placeholder={"Line Id"}
                      register={register}
                    />
                  }
                </div>
              </div>
              {/* <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">อีเมล :</h4>
                <div className="w-[260px] h-full">
                  {<Input id={"email"} type={"text"} placeholder={"อีเมล"} register={register} />}
                </div>
              </div> */}
              {postType == "lost" && (
                <div className="flex justify-between items-center h-[40px]">
                  <h4 className="text-black  text-xl whitespace-nowrap font-medium">รางวัล :</h4>
                  <div className="w-[196px] h-full">
                    {
                      <Input
                        id={"bounty"}
                        type={"text"}
                        placeholder={"รางวัล"}
                        register={register}
                      />
                    }
                  </div>
                  <h4 className="text-black text-xl whitespace-nowrap font-medium">บาท</h4>
                </div>
              )}

              <Controller
                name="description"
                control={control}
                defaultValue="เพิ่มเติ่ม"
                render={({ field, fieldState }) => (
                  <div>
                    <textarea
                      {...field}
                      onFocus={() => {
                        if (!fieldState.isDirty) {
                          setValue("description", "");
                        }
                      }}
                      className={`${
                        !fieldState.isDirty ? "text-neutrals-800" : "text-black"
                      } shadow-input p-2 text-lg bg-neutrals-300 rounded-[10px] w-full h-[96px]`}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        )}
        {page == 4 && (
          <div className="mx-[24px] top-3 grid gap-12">
            <h2 className="font-semibold text-2xl">รูปภาพ</h2>

            {previewUrls.length == 0 && (
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
            )}
            {previewUrls.map((url) => (
              <div key={url} className="absolute top-16">
                <img src={url} alt="Preview Image" />
              </div>
            ))}
          </div>
        )}
        {mapVisible && (
          <div
            className="z-30 h-[400px] w-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            ref={mapRef}
          >
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.google || "" }}
              defaultCenter={center}
              defaultZoom={zoom}
              onClick={onMapClick}
            >
              <Marker lat={markerPosition.lat} lng={markerPosition.lng} />
            </GoogleMapReact>
          </div>
        )}

        {/* left and right button */}
        {page != 0 && (
          <div>
            <div
              className="bg-primary rounded-2xl absolute left-[24px] bottom-[20px]"
              onClick={() => {
                if (page > 0) {
                  setPage((oldPage) => oldPage - 1);
                }
              }}
            >
              <Image className="m-1" src={buttonLeft} alt={"buttonLeft"} />
            </div>

            {page < 4 && (
              <div
                className="bg-primary rounded-2xl absolute right-[24px] bottom-[20px]"
                onClick={() => {
                  setPage((oldPage) => oldPage + 1);
                }}
              >
                <Image className="m-1" src={buttonRight} alt={"buttonRight"} />
              </div>
            )}
            {page == 4 && (
              <button
                className="bg-primary rounded-2xl absolute right-[24px] bottom-[20px]"
                type="submit"
              >
                <Image className="m-1" src={buttonPlusSm} alt={"buttonPlusSm"} />
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

const Marker = (props: any) => (
  <div style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
    <img src="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" />
  </div>
);
