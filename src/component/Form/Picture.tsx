import buttonPlus from "../../../public/button-plus.png";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormI } from "@/constant/interface";
import buttonRight from "../../../public/button-right.png";

interface Props {
  setFormDate: React.Dispatch<React.SetStateAction<FormI>>;
  submitForm: (images: FileList) => Promise<void>;
}

export const Picture = ({ setFormDate, submitForm }: Props) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [imgeFiles, setImgFiles] = useState<FileList>([] as unknown as FileList);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data: any) => {
    await submitForm(imgeFiles);
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
      setImgFiles(files);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submit)}>
      <h2 className="font-medium text-2xl">รูปภาพ</h2>
      <div className="relative w-[200px] h-[200px] rounded-xl bg-neutrals-300 overflow-hidden mx-auto">
        <input
          {...register("images", { required: "กรุณาอัพโหลดรูปภาพ" })}
          className="absolute w-full h-full opacity-0 cursor-pointer z-30"
          type="file"
          accept="image/*"
          multiple
          onChange={onFileInputChange}
        />
        <button type="button" className="absolute top-0 left-0 w-full h-full flex-center">
          <Image src={buttonPlus} alt={"button plus"} loading="lazy" />
        </button>
      </div>
      {errors.images && (
        <p className="text-sm text-red-500 text-center">{errors.images.message as string}</p>
      )}
      {previewUrls.length != 0 && (
        <div className="flex-center space-x-2 flex-nowrap overflow-x-scroll">
          {previewUrls.map((url) => (
            <div key={url} className="w-[200px] h-[200px] flex-shrink-0 relative">
              <Image src={url} alt="Preview Image" fill className="object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex justify-end">
        <button className={`bg-primary p-2 rounded-2xl flex-center`} type="submit">
          <Image width={45} height={45} src={buttonRight} alt={"buttonPlusSm"} loading="lazy" />
        </button>
      </div>
    </form>
  );
};
