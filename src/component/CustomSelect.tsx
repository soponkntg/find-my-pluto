import { Controller, Control } from "react-hook-form";
import Image from "next/image";
import buttonDown from "../../public/button-down.png";
import Select, { components, DropdownIndicatorProps } from "react-select";
import { area, colors } from "@/constant/text";
import { Dispatch, SetStateAction } from "react";
import { FilterI } from "@/constant/interface";

interface Props {
  label: string;
  getSubdistrict?: (district: keyof typeof area | null) => void;
  isMulti?: boolean;
  control: Control;
  options?: { value: string; label: string }[];
  name: string;
  require: boolean;
  setFilters?: Dispatch<SetStateAction<FilterI>>;
}

//cuustom dropdown
const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image src={buttonDown} alt={"buttonDown"} width={28} height={28} />
    </components.DropdownIndicator>
  );
};

// Define the custom option component
// const ColorValue = (props: any) => {
//   const matchColor = colors.find((elem) => elem.color == props.data.value);

//   if (matchColor == undefined) {
//     console.log("not match color");
//     return null;
//   }

//   return (
//     <components.SingleValue {...props}>
//       <div className="flex-center rounded-lg space-x-1 w-full py-1  shadow-color bg-[#EFEFEF]">
//         <div className={`${matchColor.colorCode} w-[22px] h-[22px] rounded-full`} />
//         <p className="text-center text-sm font-normal text-black">{matchColor.colorTH}</p>
//       </div>
//     </components.SingleValue>
//   );
// };

// // Define the custom option component
// const ColorOption = (props: any) => {
//   const matchColor = colors.find((elem) => elem.color == props.data.value);

//   if (matchColor == undefined) {
//     console.log("not match color");
//     return null;
//   }
//   return (
//     <components.Option {...props}>
//       <div className="flex-center rounded-lg space-x-1 w-full py-1 shadow-color bg-[#EFEFEF]">
//         <div className={`${matchColor.colorCode} w-[22px] h-[22px] rounded-full`} />
//         <p className="text-center text-sm font-normal text-black">{matchColor.colorTH}</p>
//       </div>
//     </components.Option>
//   );
// };

// // Define the custom mutivalue component
// const ColorMulti = (props: any) => {
//   const matchColor = colors.find((elem) => elem.color == props.data.value);

//   if (matchColor == undefined) {
//     console.log("not match color");
//     return null;
//   }
//   return (
//     <components.MultiValue {...props}>
//       <div className="flex-center rounded-lg space-x-1 w-[90px] h-full shadow-color bg-[#EFEFEF]">
//         <div className={`${matchColor.colorCode} w-[22px] h-[22px] rounded-full`} />
//         <p className="text-center text-sm font-normal text-black">{matchColor.colorTH}</p>
//       </div>
//     </components.MultiValue>
//   );
// };

const getColorCode = (color: string) => {
  const matchColor = colors.find((elem) => elem.color == color);
  return matchColor?.hex;
};

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
    border: "solid",
    "border-width": 0.2,
  },
});

export const CustomSelect = (props: Props) => {
  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: props.setFilters ? "100%" : "75%",
    }),
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#E5E5E5",
      borderRadius: 8,
      height: 40,
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      overflowX: "auto",
      flexWrap: "nowrap",
    }),

    placeholder: (provided: any) => ({
      ...provided,
      color: "#CFCFCF",
    }),
    option: (provided: any, state: any) => {
      const color = getColorCode(state.data.value);

      if (color) {
        return {
          ...provided,
          backgroundColor: state.isSelected ? "#302A58" : "#fff",
          color: state.isSelected ? "#fff" : "#4a5568",
          ":hover": {
            backgroundColor: "#8778EE",
            color: "#fff",
          },
          ...dot(color),
        };
      }
      return {
        ...provided,
        backgroundColor: state.isSelected ? "#302A58" : "#fff",
        color: state.isSelected ? "#fff" : "#4a5568",
        ":hover": {
          backgroundColor: "#8778EE",
          color: "#fff",
        },
      };
    },
    multiValue: (provided: any, state: any) => {
      const color = getColorCode(state.data.value);
      if (color) {
        return {
          ...provided,
          ...dot(color),
          backgroundColor: "#fff",
          "border-radius": 8,
          "padding-left": 8,
          flex: "1 0 auto",
        };
      }
      return {
        ...provided,
        backgroundColor: "#FFF",
        flex: "1 0 auto",
      };
    },
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#4a5568",
    }),
  };
  return (
    <div className="flex justify-between items-center">
      <label className="text-lg">{props.label}</label>
      <Controller
        name={props.name}
        control={props.control}
        rules={{ required: props.require }}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <Select
              isClearable={true}
              components={{ DropdownIndicator }}
              styles={customStyles}
              name={props.name}
              onChange={(selectedOption) => {
                onChange(selectedOption);
                if (props.getSubdistrict) {
                  if (selectedOption) {
                    props.getSubdistrict(selectedOption.value);
                  } else {
                    props.getSubdistrict(null);
                  }
                }
                if (props.setFilters) {
                  let value: any | null = null;
                  if (selectedOption) {
                    if (Array.isArray(selectedOption)) {
                      value = selectedOption.map((op) => op.value);
                    } else {
                      value = selectedOption.value;
                    }
                  }

                  props.setFilters((oldFilters) => {
                    return {
                      ...oldFilters,
                      [props.name]: value,
                    };
                  });
                }
              }}
              isMulti={props.isMulti}
              value={value}
              options={props.options}
              ref={ref}
              placeholder={"เลือก" + props.label}
            />
          );
        }}
      />
    </div>
  );
};
