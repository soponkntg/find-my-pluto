import { XCircleIcon } from "@heroicons/react/24/outline";
import buttonLeft from "../../public/button-left.png";
import buttonRight from "../../public/button-right.png";
import buttonPlus from "../../public/button-plus.png";
import buttonPlusSm from "../../public/button-plus-sm.png";
import buttonDown from "../../public/button-down.png";
import buttonFound from "../../public/bone-button-found.png";
import buttonLost from "../../public/bone-button-lost.png";

import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { TimePicker, DatePicker } from "antd";

import Image from "next/image";
import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { Input } from "./Input";

import { CustomSelect } from "./CustomSelect";
import { area, dogSpecies } from "@/constant/text";
import GoogleMapReact, { Coords } from "google-map-react";

interface Form {
  // userId: string;
  postType: string;
  animal: string;
  images: string[];
  animalName?: string;
  age?: number;
  species: string;
  colors: string;
  braceletColor: string;
  gender: string;
  size: string;
  lastSeenAt: string;
  lastFoundPlace: {
    province: string;
    district: string;
    subditrict: string;
    lat: number;
    lng: number;
  };
  description: string;
  bounty: number;
}

export const Form = (props: { setIsCreateCard: Dispatch<SetStateAction<Boolean>> }) => {
  const { register, control, handleSubmit, setValue } = useForm();
  const [page, setPage] = useState<number>(0);

  const [subdistrict, setSubdistrict] = useState<[{ value: string; label: string }]>([
    { value: "", label: "" },
  ]);
  const [mapVisible, setMapVisible] = useState<boolean>(false);
  const [center, setCenter] = useState<Coords>({ lat: 13.72433, lng: 100.50917 });
  const [zoom, setZoom] = useState<number>(12);
  const [markerPosition, setMarkerPosition] = useState<Coords>(center);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const inputRef = useRef(null);
  const mapRef = useRef(null);

  const [form, setForm] = useState<Form>({
    // userId: "",
    postType: "",
    animal: "",
    images: [],
    species: "",
    colors: "",
    braceletColor: "",
    gender: "",
    size: "",
    lastSeenAt: "",
    lastFoundPlace: {
      province: "",
      district: "",
      subditrict: "",
      lat: 0,
      lng: 0,
    },
    description: "",
    bounty: 0,
  });

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
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(page);
    console.log(data);
  };

  useEffect(() => {
    const handleMouseDown = (e) => {
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
                setForm((oldForm: Form) => {
                  oldForm.postType = "lost";
                  return oldForm;
                });
                setPage(1);
              }}
            >
              <Image src={buttonLost} alt={"buttonLost"} />
            </button>
            <button
              className="w-[352px] h-[110px]"
              onClick={() => {
                setForm((oldForm: Form) => {
                  oldForm.postType = "found";
                  return oldForm;
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
              {form.postType == "lost" && (
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

              <div className="flex gap-11 h-[40px]">
                {form.postType == "lost" && (
                  <div className="flex gap-[10px] h-full items-center">
                    <h4 className="text-black  text-xl font-medium">อายุ :</h4>
                    <div className="w-[87px] h-full">
                      {<Input id={"age"} type={"text"} placeholder={""} register={register} />}
                    </div>
                    <h4 className="text-black  text-xl  font-medium">ปี</h4>
                  </div>
                )}
                <div
                  className={`flex h-full items-center ${
                    form.postType == "lost" ? "gap-3 w-[140px]" : "justify-between w-full"
                  }`}
                >
                  <h4 className="text-black  text-xl whitespace-nowrap font-medium">เพศ :</h4>
                  <div className={`${form.postType == "lost" ? "w-full" : "w-[230px]"} h-full`}>
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
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">ขนาด :</h4>
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
              เวลาที่{form.postType == "lost" ? "น้องหาย" : "พบน้อง"}
            </h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">วันที่หาย :</h4>
                <div className="w-[230px] h-full">
                  {
                    <Controller
                      control={control}
                      name="lastSeenDate"
                      render={({ field }) => (
                        <DatePicker
                          className="w-full h-[40px] bg-neutrals-300 shadow-[inset_5px_5px_7px_0_rgba(174,174,192,0.4)] shadow-[inset_-5px_-5px_7px_0_#FFFFFF] rounded-[10px] px-2 placeholder-[#CFCFCF]"
                          onChange={(date) => field.onChange(date)}
                          placeholder="เลือกวัน"
                        />
                      )}
                    />
                  }
                </div>
              </div>
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">เวลาที่หาย :</h4>
                <div className="w-[230px] h-full">
                  {
                    <Controller
                      control={control}
                      name="lastSeenTime"
                      render={({ field }) => (
                        <TimePicker
                          className="w-full h-[40px] bg-neutrals-300 shadow-[inset_5px_5px_7px_0_rgba(174,174,192,0.4)] shadow-[inset_-5px_-5px_7px_0_#FFFFFF] rounded-[10px] px-2 placeholder-[#CFCFCF]"
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
              สถานที่{form.postType == "lost" ? "น้องหาย" : "พบน้อง"}
            </h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">เขต :</h4>
                <div className="w-[230px] h-full">
                  {
                    <CustomSelect
                      setSubdistrict={setSubdistrict}
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
                      options={subdistrict}
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
                        className="hadow-[inset_5px_5px_7px_0_rgba(174,174,192,0.4)] shadow-[inset_-5px_-5px_7px_0_#FFFFFF] bg-neutrals-300 placeholder-[#CFCFCF] rounded-[10px] w-full h-full py-1 px-2 text-black"
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
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">ติดต่อคุณ:</h4>
                <div className="w-[260px] h-full">
                  {<Input id={"name"} type={"text"} placeholder={"ชื่อ"} register={register} />}
                </div>
              </div>
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">เบอร์โทร:</h4>
                <div className="w-[260px] h-full">
                  {
                    <Input
                      id={"telephone"}
                      type={"text"}
                      placeholder={"เบอร์โทร"}
                      register={register}
                    />
                  }
                </div>
              </div>
              <div className="flex justify-between items-center h-[40px]">
                <h4 className="text-black  text-xl whitespace-nowrap font-medium">อีเมล:</h4>
                <div className="w-[260px] h-full">
                  {<Input id={"email"} type={"text"} placeholder={"อีเมล"} register={register} />}
                </div>
              </div>
              {form.postType == "lost" && (
                <div className="flex justify-between items-center h-[40px]">
                  <h4 className="text-black  text-xl whitespace-nowrap font-medium">รางวัล:</h4>
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
                  <h4 className="text-black  text-xl whitespace-nowrap font-medium">บาท</h4>
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
                        !fieldState.isDirty ? "text-[#CFCFCF]" : "text-black"
                      } shadow-[inset_5px_5px_7px_0_rgba(174,174,192,0.4)] shadow-[inset_-5px_-5px_7px_0_#FFFFFF] p-2 text-lg bg-neutrals-300 rounded-[10px] w-full h-[96px]`}
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
                  className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
                  type="file"
                  multiple
                  {...register("images")}
                  ref={inputRef}
                  onChange={onFileInputChange}
                />
                <button
                  type="button"
                  className="absolute top-0 left-0 w-full h-full  text-white font-medium text-sm flex items-center justify-center transition duration-200 ease-in-out"
                  onClick={() => {
                    inputRef.current.click();
                  }}
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
            <button
              type="button"
              className="bg-primary rounded-2xl absolute left-[24px] bottom-[20px]"
              onClick={() => {
                if (page > 0) {
                  setPage((oldPage) => oldPage - 1);
                }
              }}
            >
              <Image className="m-1" src={buttonLeft} alt={"buttonLeft"} />
            </button>

            {page < 4 && (
              <button
                className="bg-primary rounded-2xl absolute right-[24px] bottom-[20px]"
                onClick={() => {
                  setPage((oldPage) => oldPage + 1);
                }}
              >
                <Image className="m-1" src={buttonRight} alt={"buttonRight"} />
              </button>
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
