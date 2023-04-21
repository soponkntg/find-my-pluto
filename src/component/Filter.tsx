import { FilterI, OptionI, PetCardPreviewI } from "@/constant/interface";
import { useDataContext } from "@/context/DataContext";
import { MapPinIcon } from "@heroicons/react/24/outline";
import GoogleMapReact, { Coords } from "google-map-react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { area, dogSpecieOptions } from "@/constant/text";
import { CustomSelect } from "./Form/CustomSelect";
import axios from "@/axios.config";

export const Filter = ({ setCards }: { setCards: Dispatch<SetStateAction<PetCardPreviewI[]>> }) => {
  const { userLocation } = useDataContext();
  const router = useRouter();
  const path = router.pathname;
  const { control } = useForm();

  // const [subdistricts, setSubdistricts] = useState<OptionI[]>([{ value: "", label: "" }]);
  const [mapVisible, setMapVisible] = useState<boolean>(false);
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
    subdistrictFilter: null,
    latFilter: null,
    lngFilter: null,
  });

  let districts: { value: string; label: string }[] = [];
  for (const district in area) {
    districts.push({ value: district, label: district });
  }

  // const getSubdistrict = (district: keyof typeof area | null) => {
  //   if (district) {
  //     const subdistrict = area[district];
  //     const temp = subdistrict.map((elem: string) => ({ value: elem, label: elem }));
  //     setSubdistricts(temp);
  //   } else {
  //     setSubdistricts([]);
  //   }
  // };

  const onMapClick = (event: any) => {
    const { lat, lng } = event;
    setMarkerPosition({ lat, lng });
    setFilters((oldFilter) => {
      return {
        ...oldFilter,
        latFilter: lat,
        lngFilter: lng,
      };
    });
  };

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
      label: "สายพันธ์ุ:",
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
  ];

  useEffect(() => {
    // console.log(filters);
    const fetchCards = async () => {
      const body = {
        postType: path == "/" ? "lost" : "found",
        gender: filters.genderFilter,
        species: filters.speciesFilter,
        colors: filters.colorsFilter,
        lastSeenFrom: filters.lastSeenDateFilter,
        lastFoundPlace: {
          district: filters.districtFilter,
          subdistrict: filters.subdistrictFilter,
          lat: filters.latFilter,
          lng: filters.lngFilter,
        },
      };

      //   console.log("body", body);
      const res = await axios.post(`/dev/cards`, body);
      setCards(res.data.message);
      //   console.log("res", res.data);
    };
    fetchCards();
  }, [filters]);

  return (
    <div className="w-[340px] bg-tertiary rounded-lg">
      {mapVisible && (
        <div className="z-30 h-[600px] w-5/6 absolute" ref={mapRef}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.google || "" }}
            defaultCenter={center}
            defaultZoom={zoom}
            onClick={onMapClick}
          >
            <Marker lat={markerPosition.lat} lng={markerPosition.lng} />
          </GoogleMapReact>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid gap-2 md:grid-cols-2">
            <button
              className="rounded-[25px] w-[200px] h-[45px] text-white text-lg bg-dark"
              onClick={() => {
                setMapVisible(false);
                setFilters((oldFilters) => {
                  return {
                    ...oldFilters,
                    latFilter: markerPosition.lat,
                    lngFilter: markerPosition.lng,
                  };
                });
              }}
            >
              ยืนยัน
            </button>
            <button
              className="rounded-[25px] w-[200px] h-[45px] text-white text-lg bg-red-500"
              onClick={() => {
                setMapVisible(false);
                setFilters((oldFilters) => {
                  return {
                    ...oldFilters,
                    latFilter: null,
                    lngFilter: null,
                  };
                });
              }}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}
      <div className="py-6 px-6 z-10">
        <h3 className="font-bold text-2xl">ค้นหาน้อง</h3>
        <div className="space-y-4">
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
                    options={f.options ? f.options : []}
                    setFilters={setFilters}
                  />
                ) : (
                  <input
                    type="datetime-local"
                    className="w-full bg-neutral-200 font-sans rounded-lg h-10 px-2 text-neutral-800 leading-tight focus:outline-none focus:ring-[#2684FF] focus:ring-2"
                    onChange={(value) => {
                      let date: string | null = null;
                      if (value.currentTarget.value) {
                        date = new Date(value.currentTarget.value).toISOString();
                      }
                      setFilters((oldFilters) => {
                        return {
                          ...oldFilters,
                          lastSeenDateFilter: date,
                        };
                      });
                    }}
                  />
                )}
              </div>
            );
          })}
          <button
            className="rounded-[25px] w-full h-[45px] text-white text-lg bg-dark"
            onClick={() => setMapVisible(true)}
          >
            ปักหมุดในรัศมี 10 กม.
          </button>
        </div>
      </div>
    </div>
  );
};
