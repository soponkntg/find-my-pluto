import { FieldValues, UseFormRegister } from "react-hook-form";

const Input = ({
  register,
  name,
  required,
  ...rest
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  register: UseFormRegister<FieldValues>;
}) => {
  return (
    <input
      {...register(name as string, required ? { required: "กรอกข้อมูลให้ครบถ้วน" } : {})}
      className="w-full bg-neutral-200 placeholder-neutrals-800 rounded-lg h-10 px-2 text-black leading-tight focus:outline-none focus:ring-[#2684FF] focus:ring-2"
      {...rest}
    />
  );
};

export default Input;
