import { FieldValues, useForm, Controller, Control } from "react-hook-form";
import Image from "next/image";
import buttonDown from "../../public/button-down.png";
import Select, { GroupBase, SelectComponentsConfig, components } from "react-select";
import { SelectComponents } from "react-select/dist/declarations/src/components";

//cuustom placeholder
const CustomPlaceholder = () => (
  <div className="flex absolute items-center text-[#CFCFCF] left-1/2 transform -translate-x-1/2">
    <h4>เลือก</h4>
    <Image src={buttonDown} alt={"buttonDown"} />
  </div>
);

// Define the custom option component
const ColorOption = (props) => {
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: props.data.value,
            marginRight: "8px",
          }}
        ></div>
        {props.label}
      </div>
    </components.Option>
  );
};

// Define the custom mutivalue component
const ColorMulti = (props) => {
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: props.data.value,
            marginRight: "8px",
          }}
        ></div>
        {props.label}
      </div>
    </components.Option>
  );
};

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#E2E7F0",
    borderRadius: 8,
    borderColor: "#E2E7F0",
    boxShadow: "inset 5px 5px 7px 0 rgba(174,174,192,0.4), inset -5px -5px 7px 0 #FFFFFF",
  }),

  dropdownIndicator: () => ({
    display: "none",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#CFCFCF",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#302A58" : "#fff",
    color: state.isSelected ? "#fff" : "#4a5568",
    ":active": {
      backgroundColor: "#302A58",
      color: "#fff",
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#EFEFEF",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#4a5568",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#4a5568",
    ":hover": {
      backgroundColor: "#cbd5e0",
      color: "#1a202c",
    },
  }),
};
export const CustomSelect = (props: {
  isColor?: boolean;
  isMulti: boolean;
  control: Control;
  options: { value: string; label: string }[];
  name: string;
  placeholder: string;
}) => {
  const components: Partial<SelectComponents<any, boolean, GroupBase<any>>> | undefined = {
    Placeholder: CustomPlaceholder,
  };

  if (props.isColor) {
    components["Option"] = ColorOption;
    components["MultiValue"] = ColorMulti;
  }
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Select
          className="w-full h-full"
          components={components}
          styles={customStyles}
          name={props.name}
          onChange={onChange}
          isMulti={props.isMulti}
          value={value}
          options={props.options}
          ref={ref}
        />
      )}
    />
  );
};
