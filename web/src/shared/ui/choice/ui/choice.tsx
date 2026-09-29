import { useId } from "react";
import { useBEM } from "@shared/lib";
import type { IChoice } from "../config/types.ts";
import { useChoice } from "../model/useChoice.ts";
import { ChoiceOption } from "./choiceOption.tsx";

export const Choice = (props: IChoice) => {
  const {
    options = [],
    name,
    label,
    disabled,
    extraCN,
    utilCN,
    extraAttrs,
    style,
  } = props;
  const generatedName = useId();
  const { bem } = useBEM("choice");
  const { selectedValue, tabIndex, refs, select, onKeyDown, onFocus } = useChoice(props);

  return (
    <div
      {...extraAttrs}
      className={bem("", extraCN, utilCN)}
      style={style}
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled}
    >
      {options.map((option, index) => (
        <ChoiceOption
          key={option.value ?? option.label}
          ref={(node) => {
            refs.current[index] = node;
            if (typeof option.ref === "function") return option.ref(node);
            if (option.ref) option.ref.current = node;
          }}
          name={name ?? generatedName}
          value={option.value ?? option.label}
          label={option.label}
          checked={selectedValue === (option.value ?? option.label)}
          disabled={disabled || option.isDisabled}
          tabIndex={index === tabIndex ? 0 : -1}
          onFocus={() => onFocus(index)}
          onChange={() => select(index)}
          onKeyDown={(event) => onKeyDown(event, index)}
        />
      ))}
    </div>
  );
};
