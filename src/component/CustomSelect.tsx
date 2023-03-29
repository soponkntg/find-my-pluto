import { FieldValues, useForm, Controller, Control } from "react-hook-form";
import Image from "next/image";
import buttonDown from "../../public/button-down.png";
import Select, { GroupBase, SelectComponentsConfig, components } from "react-select";
import { SelectComponents } from "react-select/dist/declarations/src/components";
import { ColorTag, colors } from "./ColorTag";
import { Dispatch, SetStateAction } from "react";
import { area } from "@/constant/text";

//cuustom placeholder
const CustomPlaceholder = () => (
  <div className="flex absolute items-center text-[#CFCFCF] left-1/2 transform -translate-x-1/2">
    <h4>เลือก</h4>
    <Image src={buttonDown} alt={"buttonDown"} />
  </div>
);

// Define the custom option component
const ColorValue = (props) => {
  const matchColor = colors.find((elem) => elem.color == props.data.value);

  if (matchColor == undefined) {
    console.log("not match color");
    return null;
  }
  return (
    <components.SingleValue {...props}>
      <div className="flex-center rounded-lg space-x-1 w-full py-1  shadow-color bg-[#EFEFEF]">
        <div className={`${matchColor.colorCode} w-[22px] h-[22px] rounded-full`} />
        <p className="text-center text-sm font-normal text-black">{matchColor.colorTH}</p>
      </div>
    </components.SingleValue>
  );
};

// Define the custom option component
const ColorOption = (props) => {
  const matchColor = colors.find((elem) => elem.color == props.data.value);

  if (matchColor == undefined) {
    console.log("not match color");
    return null;
  }
  return (
    <components.Option {...props}>
      <div className="flex-center rounded-lg space-x-1 w-full py-1 shadow-color bg-[#EFEFEF]">
        <div className={`${matchColor.colorCode} w-[22px] h-[22px] rounded-full`} />
        <p className="text-center text-sm font-normal text-black">{matchColor.colorTH}</p>
      </div>
    </components.Option>
  );
};

// Define the custom mutivalue component
const ColorMulti = (props) => {
  const matchColor = colors.find((elem) => elem.color == props.data.value);

  if (matchColor == undefined) {
    console.log("not match color");
    return null;
  }
  return (
    <components.MultiValue {...props}>
      <div className="flex-center rounded-lg space-x-1 w-[90px] h-full shadow-color bg-[#EFEFEF]">
        <div className={`${matchColor.colorCode} w-[22px] h-[22px] rounded-full`} />
        <p className="text-center text-sm font-normal text-black">{matchColor.colorTH}</p>
      </div>
    </components.MultiValue>
  );
};

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#E2E7F0",
    borderRadius: 8,
    borderColor: "#E2E7F0",
    boxShadow: "inset 5px 5px 7px 0 rgba(174,174,192,0.4), inset -5px -5px 7px 0 #FFFFFF",
    maxHeight: 40,
  }),
  valueContainer: (provided) => ({
    ...provided,
    // overflowX: "auto",
    // flexWrap: "unset",
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
    // flex: "1 0 auto",
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
  setSubdistrict?: Dispatch<SetStateAction<[{ value: string; label: string }]>>;
  isColor?: boolean;
  isMulti: boolean;
  control: Control;
  options: { value: string; label: string }[];
  name: string;
}) => {
  const components: Partial<SelectComponents<any, boolean, GroupBase<any>>> | undefined = {
    Placeholder: CustomPlaceholder,
  };

  if (props.isColor) {
    components["Option"] = ColorOption;
    components["SingleValue"] = ColorValue;
    components["MultiValue"] = ColorMulti;
  }
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value, ref } }) => {
        return (
          <Select
            className="w-full h-full"
            components={components}
            styles={customStyles}
            name={props.name}
            onChange={(selectedOption) => {
              onChange(selectedOption);
              if (props.setSubdistrict) {
                console.log("choose district");
                const district = area[selectedOption.value];
                if (district) {
                  let temp = [];
                  for (const subdistrict of district) {
                    temp.push({
                      value: subdistrict,
                      label: subdistrict,
                    });
                  }
                  props.setSubdistrict(temp);
                }
              }
            }}
            isMulti={props.isMulti}
            value={value}
            options={props.options}
            ref={ref}
          />
        );
      }}
    />
  );
};
