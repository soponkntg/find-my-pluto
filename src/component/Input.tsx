import { FieldValues, UseFormRegister } from "react-hook-form";

export const Input = (props: {
  id: string;
  type: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
}) => {
  return (
    <input
      className="shadow-input bg-neutrals-300 placeholder-neutrals-800 rounded-[10px] w-full h-full py-1 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
      type={props.type}
      placeholder={props.placeholder}
      {...props.register(props.id)}
    />
  );
};
