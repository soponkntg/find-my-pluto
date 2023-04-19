import { FormI } from "@/constant/interface";
import Input from "./Input";
import { useForm } from "react-hook-form";
import Field from "./Field";
import Image from "next/image";
import buttonRight from "../../../public/button-right.png";

interface Props {
  setFormDate: React.Dispatch<React.SetStateAction<FormI>>;
  nextSection: () => void;
  postType: string;
}

const OwnerDetail = ({ setFormDate, nextSection, postType }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data: any) => {
    setFormDate((prev) => ({
      ...prev,
      ...data,
      description: data.description == "" ? undefined : data.description,
      bounty: data.bounty == "" ? undefined : data.bounty,
    }));
    nextSection();
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(submit)}>
      <h2 className="font-medium text-2xl">ข้อมูลการติดต่อ</h2>

      <Field label="ชื่อ*" error={errors.name}>
        <Input name="userName" register={register} type={"text"} placeholder="ชื่อ" required />
      </Field>
      <Field label="Line ID*" error={errors.contact}>
        <Input name="contact" register={register} type={"text"} placeholder="Line ID" required />
      </Field>

      {postType == "lost" && (
        <Field label="รางวัล">
          <Input name={"bounty"} register={register} type={"number"} placeholder={"รางวัล"} />
        </Field>
      )}

      <textarea
        {...register("description")}
        rows={4}
        placeholder="เพิ่มเติ่ม"
        className={`"text-neutrals-800" p-2 text-lg bg-neutral-200 placeholder-neutrals-800 rounded-lg px-2 text-black leading-tight focus:outline-none focus:ring-[#2684FF] focus:ring-2 w-full`}
      />

      <div className="w-full flex justify-end">
        <button className={`bg-primary p-2 rounded-2xl flex-center`} type="submit">
          <Image width={45} height={45} src={buttonRight} alt={"buttonPlusSm"} loading="lazy" />
        </button>
      </div>
    </form>
  );
};

export default OwnerDetail;
