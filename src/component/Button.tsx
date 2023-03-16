import { PlusCircleIcon } from "@heroicons/react/24/outline";

export const Button = (
  props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => {
  return (
    <button
      className="w-[300px] h-[60px] sm:h-[90px] bg-secondary text-white flex-center rounded-[100px] sm:rounded-2xl space-x-2 border-white border-2 xs:border-0"
      {...props}
    >
      <PlusCircleIcon className="h-8 w-8 sm:h-14 sm:w-14 text-white" />
      <p className="text-white font-semibold sm:font-bold text-lg sm:text-2xl">สร้างประกาศ</p>
    </button>
  );
};
