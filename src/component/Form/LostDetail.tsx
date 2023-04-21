import { FormI } from "@/constant/interface";
import { Controller, useForm } from "react-hook-form";
import Field from "./Field";
import Image from "next/image";
import buttonRight from "../../../public/button-right.png";
import Input from "./Input";

interface Props {
  setFormDate: React.Dispatch<React.SetStateAction<FormI>>;
  nextSection: () => void;
  postType: string;
  setMapVisible: React.Dispatch<React.SetStateAction<boolean>>;
  locationDetail?: {
    province: string;
    district: string;
    subdistrict: string;
  };
}

const LostDetail = ({
  setFormDate,
  nextSection,
  postType,
  setMapVisible,
  locationDetail,
}: Props) => {
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
    }));
    nextSection();
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

      <div>
        <input {...register("location", { required: "กรอกข้อมูลให้ครบถ้วน" })} type={"hidden"} />
        <div
          className="rounded-[25px] w-full h-[45px] text-white text-lg bg-dark text-center grid content-center"
          onClick={() => {
            setMapVisible(true);
            setValue("location", "valued");
          }}
        >
          ปักหมุดสถานที่หาย
        </div>
        {errors.location && (
          <small className="text-sm text-red-500">{errors.location.message as string}</small>
        )}
      </div>

      {locationDetail && (
        <Field label={"แขวง"}>
          <Input register={register} name="subdistrict" value={locationDetail.subdistrict} />
        </Field>
      )}
      {locationDetail && (
        <Field label={"เขต"}>
          <Input register={register} name="district" value={locationDetail.district} />
        </Field>
      )}
      {locationDetail && (
        <Field label={"จังหวัด"}>
          <Input register={register} name="province" value={locationDetail.province} />
        </Field>
      )}

      <div className="w-full flex justify-end">
        <button className={`bg-primary p-2 rounded-2xl flex-center`} type="submit">
          <Image width={45} height={45} src={buttonRight} alt={"buttonPlusSm"} loading="lazy" />
        </button>
      </div>
    </form>
  );
};

export default LostDetail;
