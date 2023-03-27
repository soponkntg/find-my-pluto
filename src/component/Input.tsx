import { FieldValues, UseFormRegister } from "react-hook-form";

export const Input = (props: {
  id: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
}) => {
  return (
    <input
      className="shadow-[inset_5px_5px_7px_0_rgba(174,174,192,0.4)] shadow-[inset_-5px_-5px_7px_0_#FFFFFF] bg-neutrals-300 placeholder-[#CFCFCF] rounded-[10px] w-full h-full py-1 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
      type={props.type}
      placeholder={props.placeholder}
      {...props.register(props.id)}
    />
  );
};
