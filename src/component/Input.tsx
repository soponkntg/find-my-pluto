export const Input = (props: { id: string; type: string; placeholder: string }) => {
  return (
    <input
      className="shadow-[inset_5px_5px_7px_0_rgba(174,174,192,0.4)] shadow-[inset_-5px_-5px_7px_0_#FFFFFF] bg-neutrals-300 rounded-[10px] w-full h-full py-1 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};
