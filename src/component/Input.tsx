import { FieldValues, UseFormRegister } from "react-hook-form";

export const Input = (
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) => {
  return (
    <div className="flex justify-between items-center">
      <label className="text-lg">{props.placeholder}</label>
      <input
        className="w-[75%] bg-neutral-200 placeholder-neutrals-800 rounded-lg h-10 px-2 text-black leading-tight focus:outline-none focus:ring-[#2684FF] focus:ring-2"
        {...props}
      />
    </div>
  );
};
