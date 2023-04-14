import React from "react";
import { FieldError, FieldErrorsImpl, FieldValue, Merge } from "react-hook-form";

interface Props {
  label: string;
  children: React.ReactNode;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const Field = ({ label, children, error }: Props) => {
  return (
    <>
      <div className="w-full grid grid-cols-3">
        <label className="text-lg">{label}</label>
        <div className="col-span-2">{children}</div>
      </div>
      {error && <small className="text-sm text-red-500">{error.message as string}</small>}
    </>
  );
};

export default Field;
