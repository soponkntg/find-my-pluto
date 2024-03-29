import { Controller, Control } from "react-hook-form";
import Image from "next/image";
import buttonDown from "../../../public/button-down.png";
import Select, {
  components,
  DropdownIndicatorProps,
  GroupBase,
  SelectComponentsConfig,
} from "react-select";
import { area } from "@/constant/text";
import { SelectComponents } from "react-select/dist/declarations/src/components";
import { FilterI, OptionI } from "@/constant/interface";
import { Dispatch, SetStateAction } from "react";
import { colors } from "../ColorTag";

interface Props {
  label: string;
  getOptions?: (selected: string | null) => void;
  isMulti?: boolean;
  control: Control;
  options: { value: string; label: string }[];
  name: string;
  require?: string;
  setFilters?: Dispatch<SetStateAction<FilterI>>;
}

//cuustom dropdown
const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image src={buttonDown} alt={"buttonDown"} width={28} height={28} loading="lazy" />
    </components.DropdownIndicator>
  );
};

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

const customStyles = {
  container: (provided: any) => ({
    ...provided,
    width: "100%",
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
        flex: "0 0 auto",
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

export const CustomSelect = ({
  name,
  control,
  require,
  getOptions,
  isMulti,
  options,
  label,
  setFilters,
}: Props) => {
  const components: Partial<SelectComponents<any, boolean, GroupBase<any>>> | undefined = {
    DropdownIndicator: DropdownIndicator,
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: require ? require : false }}
      render={({ field: { onChange, value, ref } }) => {
        return (
          <Select
            isClearable={true}
            components={components}
            styles={customStyles}
            placeholder={"เลือก" + label}
            onChange={(selectedOption, { action }) => {
              //clear case
              if (action == "clear") {
                onChange();
                if (getOptions) {
                  getOptions(null);
                }
                if (setFilters) {
                  setFilters((oldFilters) => {
                    return {
                      ...oldFilters,
                      [name]: null,
                    };
                  });
                }
              }

              if (selectedOption) {
                if (isMulti) {
                  onChange(selectedOption.map((elem: OptionI) => elem.value));
                  if (setFilters) {
                    value = selectedOption.map((op: { value: any }) => op.value);
                    setFilters((oldFilters) => {
                      return {
                        ...oldFilters,
                        [name]: value.length > 0 ? value : null,
                      };
                    });
                  }
                } else {
                  onChange(selectedOption.value);
                  if (getOptions) {
                    if (selectedOption) {
                      getOptions(selectedOption.value);
                    } else {
                      getOptions(null);
                    }
                  }
                  if (setFilters) {
                    setFilters((oldFilters) => {
                      return {
                        ...oldFilters,
                        [name]: selectedOption.value,
                      };
                    });
                  }
                }
              }
            }}
            value={options.find((elem) => elem.value == value)}
            isMulti={isMulti}
            options={options}
            ref={ref}
          />
        );
      }}
    />
  );
};
