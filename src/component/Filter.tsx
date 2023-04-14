import { FilterI, OptionI } from "@/constant/interface";
import { useUI } from "@/context/UIContext";
import { MapPinIcon } from "@heroicons/react/24/outline";
import GoogleMapReact, { Coords } from "google-map-react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { area, dogSpecieOptions } from "@/constant/text";
import { DatePicker } from "antd";
import { CustomSelect } from "./Form/CustomSelect";

export const Filter = () => {
  const { userLocation } = useUI();
  const router = useRouter();
  const path = router.pathname;
  const { control, handleSubmit, setValue } = useForm();

  const [subdistricts, setSubdistricts] = useState<OptionI[]>([{ value: "", label: "" }]);
  //   const [mapVisible, setMapVisible] = useState<boolean>(false);
  const center = userLocation;
  const zoom = 12;
  const [markerPosition, setMarkerPosition] = useState<Coords>(center);
  const mapRef = useRef(null);

  const [filters, setFilters] = useState<FilterI>({
    genderFilter: null,
    speciesFilter: null,
    colorsFilter: null,
    lastSeenDateFilter: null,
    districtFilter: null,
    subdisrictFilter: null,
    latFilter: null,
    lngFilter: null,
  });

  let districts: { value: string; label: string }[] = [];
  for (const district in area) {
    districts.push({ value: district, label: district });
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {};

  const getSubdistrict = (district: keyof typeof area | null) => {
    if (district) {
      const subdistrict = area[district];
      const temp = subdistrict.map((elem: string) => ({ value: elem, label: elem }));
      setSubdistricts(temp);
    } else {
      setSubdistricts([{ value: "", label: "" }]);
      setValue("subdistrictFilter", "");
    }
  };

  //   const onMapClick = (event: any) => {
  //     const { lat, lng } = event;
  //     setMarkerPosition({ lat, lng });
  //     setFilters((oldFilter) => {
  //       return {
  //         ...oldFilter,
  //         latFilter: lat,
  //         lngFilter: lng,
  //       };
  //     });
  //   };

  const Marker = (props: any) => (
    <div style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
      <MapPinIcon className="w-8 h-8 text-red-500" />
    </div>
  );

  const filtersParameter = [
    {
      label: "เพศ :",
      isMulti: false,
      name: "genderFilter",
      options: [
        { value: "เพศผู้", label: "เพศผู้" },
        { value: "เพศเมีย", label: "เพศเมีย" },
      ],
    },
    {
      label: "สายพันธ์:",
      isMulti: false,
      name: "speciesFilter",
      options: dogSpecieOptions,
    },

    {
      label: "สี:",
      isMulti: true,
      name: "colorsFilter",
      options: [
        { value: "brown", label: "น้ำตาล" },
        { value: "goldenBrown", label: "น้ำตาลทอง" },
        { value: "paleBrown", label: "น้ำตาลอ่อน" },
        { value: "black", label: "ดำ" },
        { value: "white", label: "ขาว" },
        { value: "gray", label: "เทา" },
      ],
    },
    {
      label: `วันที่${path == "/" ? "หาย:" : "พบ:"}`,
      name: "lastSeenDateFilter",
    },

    {
      label: "เขต:",
      isMulti: false,
      name: "districtFilter",
      getSubdistrict: getSubdistrict,
      options: districts,
    },

    {
      label: "แขวง:",
      isMulti: false,
      name: "subdistrictFilter",
      options: subdistricts,
    },
  ];

  return (
    <div className="w-[340px] h-[630px] bg-tertiary rounded-lg">
      {/* {mapVisible && (
        <div className="z-30 h-5/6 w-full absolute" ref={mapRef}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.google || "" }}
            defaultCenter={center}
            defaultZoom={zoom}
            onClick={onMapClick}
          >
            <Marker lat={markerPosition.lat} lng={markerPosition.lng} />
          </GoogleMapReact>
          <div className="absolute space-x-3 bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <button
              className="rounded-[25px] w-[300px] h-[45px] text-white text-lg bg-dark"
              onClick={() => {
                setMapVisible(false);
              }}
            >
              ยืนยัน
            </button>
            <button
              className="rounded-[25px] w-[300px] h-[45px] text-white text-lg bg-red-500"
              onClick={() => {
                setMapVisible(false);
              }}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )} */}
      <div className="py-6 px-6 z-10">
        <h3 className="font-bold text-2xl">ค้นหาน้อง</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {filtersParameter.map((f, index) => {
            return (
              <div key={index}>
                <h4>{f.label}</h4>
                {f.label != "วันที่หาย:" && f.label != "วันที่พบ:" ? (
                  <CustomSelect
                    label={""}
                    isMulti={f.isMulti}
                    control={control}
                    name={f.name}
                    require={false}
                    options={f.options}
                    setFilters={setFilters}
                    getSubdistrict={f.getSubdistrict}
                  />
                ) : (
                  <DatePicker
                    className="w-full h-10 bg-neutral-200 rounded-lg px-2 placeholder-neutrals-800"
                    name={f.name}
                    placeholder="เลือกวัน"
                    onChange={(date) => {
                      console.log(date);
                    }}
                  />
                )}
              </div>
            );
          })}
          {/* <button
            className="rounded-[25px] w-full h-[45px] text-white text-lg bg-dark"
            onClick={() => setMapVisible(true)}
          >
            ปักหมุด
          </button> */}
        </form>
      </div>
    </div>
  );
};