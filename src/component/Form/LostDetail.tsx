import { FormI, OptionI } from "@/constant/interface";
import { area } from "@/constant/text";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CustomSelect } from "./CustomSelect";
import Field from "./Field";
import Image from "next/image";
import buttonRight from "../../../public/button-right.png";
import { Coords } from "google-map-react";

interface Props {
  setFormDate: React.Dispatch<React.SetStateAction<FormI>>;
  nextSection: () => void;
  postType: string;
  setMapVisible: React.Dispatch<React.SetStateAction<boolean>>;
  markerPosition: Coords;
}

const LostDetail = ({
  setFormDate,
  nextSection,
  postType,
  setMapVisible,
  markerPosition,
}: Props) => {
  const [subdistrictOptions, setSubdistrictOptions] = useState<OptionI[]>([]);

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data: any) => {
    setFormDate((prev) => ({
      ...prev,
      lastSeenAt: data.lastSeenDate.toISOString(),
      lastFoundPlace: {
        ...prev.lastFoundPlace,
        district: data.district,
        subdistrict: data.subdistrict,
        lat: markerPosition.lat,
        lng: markerPosition.lng,
      },
    }));
    nextSection();
  };

  const generateDistrictOptions = () => {
    const districtOptions = [];
    for (let district in area) {
      districtOptions.push({ value: district, label: district });
    }
    return districtOptions;
  };

  const generateSubdistrictOptions = (district: keyof typeof area | null) => {
    if (district) {
      const subdistrict = area[district];
      const subdistrictOptions = subdistrict.map((elem: string) => ({ value: elem, label: elem }));
      setSubdistrictOptions(subdistrictOptions);
    } else {
      setSubdistrictOptions([]);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submit)}>
      <h2 className="font-medium text-2xl">เวลาที่{postType == "lost" ? "น้องหาย" : "พบน้อง"}</h2>
      <Field
        label={"วันที่" + (postType == "lost" ? "หาย" : "พบ") + "*"}
        error={errors.lastSeenDate}
      >
        <Controller
          control={control}
          name="lastSeenDate"
          rules={{ required: "กรอกข้อมูลให้ครบถ้วน" }}
          render={({ field }) => (
            <input
              type="datetime-local"
              className="w-full bg-neutral-200 font-sans rounded-lg h-10 px-2 text-neutral-800 leading-tight focus:outline-none focus:ring-[#2684FF] focus:ring-2"
              onChange={(value) => {
                const date = new Date(value.currentTarget.value);
                field.onChange(date);
              }}
            />
          )}
        />
      </Field>

      <h2 className="font-medium text-2xl">สถานที่{postType == "lost" ? "น้องหาย" : "พบน้อง"}</h2>
      <Field label={"เขต*"} error={errors.district}>
        <CustomSelect
          control={control}
          label={"เขต"}
          getSubdistrict={generateSubdistrictOptions}
          isMulti={false}
          name={"district"}
          require={"กรอกข้อมูลให้ครบถ้วน"}
          options={generateDistrictOptions()}
        />
      </Field>
      <Field label={"แขวง*"} error={errors.subdistrict}>
        <CustomSelect
          label={"แขวง"}
          isMulti={false}
          control={control}
          name={"subdistrict"}
          require={"กรอกข้อมูลให้ครบถ้วน"}
          options={subdistrictOptions}
        />
      </Field>

      <div>
        <input {...register("location", { required: "กรอกข้อมูลให้ครบถ้วน" })} type={"hidden"} />
        <div
          className="rounded-[25px] w-full h-[45px] text-white text-lg bg-dark text-center grid content-center"
          onClick={() => {
            setMapVisible(true);
            setValue("location", "valued");
          }}
        >
          ปักหมุด
        </div>
        {errors.location && (
          <small className="text-sm text-red-500">{errors.location.message as string}</small>
        )}
      </div>

      <div className="w-full flex justify-end">
        <button className={`bg-primary p-2 rounded-2xl flex-center`} type="submit">
          <Image width={45} height={45} src={buttonRight} alt={"buttonPlusSm"} loading="lazy" />
        </button>
      </div>
    </form>
  );
};

export default LostDetail;
