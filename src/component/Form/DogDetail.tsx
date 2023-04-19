import { FormI } from "@/constant/interface";
import {
  bracletColorOptions,
  colorOptions,
  dogSpecieOptions,
  genderOptions,
  sizeOptions,
} from "@/constant/text";
import { useForm } from "react-hook-form";
import { CustomSelect } from "./CustomSelect";
import Field from "./Field";
import Input from "./Input";
import Image from "next/image";
import buttonRight from "../../../public/button-right.png";

interface Props {
  setFormDate: React.Dispatch<React.SetStateAction<FormI>>;
  nextSection: () => void;
  postType: string;
}

const DogDetail = ({ setFormDate, nextSection, postType }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data: any) => {
    setFormDate((prev) => ({ ...prev, ...data }));
    nextSection();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submit)}>
      <h2 className="font-medium text-2xl">ข้อมูลน้อง</h2>
      {postType == "lost" && (
        <Field label={"ชื่อน้อง*"} error={errors.animalName}>
          <Input name={"animalName"} register={register} required placeholder="ชื่อน้อง" />
        </Field>
      )}

      {postType == "lost" && (
        <Field label={"อายุ*"} error={errors.age}>
          <Input name={"age"} register={register} required type="number" placeholder="อายุ" />
        </Field>
      )}

      <Field label={"เพศ*"} error={errors.gender}>
        <CustomSelect
          control={control}
          label="เพศ*"
          isMulti={false}
          name={"gender"}
          require={"กรอกข้อมูลให้ครบถ้วน"}
          options={genderOptions}
        />
      </Field>

      <Field label="สายพันธ์*" error={errors.species}>
        <CustomSelect
          control={control}
          label={"สายพันธ์"}
          isMulti={false}
          name={"species"}
          require={"กรอกข้อมูลให้ครบถ้วน"}
          options={dogSpecieOptions}
        />
      </Field>

      <Field label="สี*" error={errors.colors}>
        <CustomSelect
          control={control}
          label={"สี"}
          isMulti={true}
          name={"colors"}
          require={"กรอกข้อมูลให้ครบถ้วน"}
          options={colorOptions}
        />
      </Field>

      <Field label="ขนาด*" error={errors.size}>
        <CustomSelect
          control={control}
          label={"ขนาด"}
          isMulti={false}
          name={"size"}
          require={"กรอกข้อมูลให้ครบถ้วน"}
          options={sizeOptions}
        />
      </Field>

      <Field label="สีปลอกคอ">
        <CustomSelect
          control={control}
          label={"สีปลอกคอ"}
          isMulti={false}
          name={"braceletColor"}
          options={bracletColorOptions}
        />
      </Field>
      <div className="w-full flex justify-end">
        <button className={`bg-primary p-2 rounded-2xl flex-center`} type="submit">
          <Image width={45} height={45} src={buttonRight} alt={"buttonPlusSm"} loading="lazy" />
        </button>
      </div>
    </form>
  );
};

export default DogDetail;
