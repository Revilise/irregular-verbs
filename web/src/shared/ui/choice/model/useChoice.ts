import { useRef, useState, type KeyboardEvent } from "react";
import type { IChoice } from "../config/types.ts";

export function useChoice({
  options = [],
  value,
  disabled,
  onChange,
}: IChoice) {
  const [localValue, setLocalValue] = useState(() => {
    const selected = options.find((option) => option.isSelected);
    return selected && (selected.value ?? selected.label);
  });

  const selectedValue = value ?? localValue;
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const enabledIndices = options.flatMap((option, index) =>
    disabled || option.isDisabled ? [] : [index],
  );

  const selectedIndex = options.findIndex(
    (option) => (option.value ?? option.label) === selectedValue,
  );

  const tabIndex =
    focusedIndex !== null && enabledIndices.includes(focusedIndex)
      ? focusedIndex
      : enabledIndices.includes(selectedIndex)
        ? selectedIndex
        : enabledIndices[0];

  const select = (index: number) => {
    const option = options[index];
    if (!option || disabled || option.isDisabled) return;
    const nextValue = option.value ?? option.label;
    if (value === undefined) setLocalValue(nextValue);
    onChange?.(nextValue);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (disabled || options[index]?.isDisabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select(index);
      return;
    }
    const direction = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    }[event.key];
    if (!direction || !enabledIndices.length) return;
    event.preventDefault();
    const position = enabledIndices.indexOf(index);
    const nextIndex =
      enabledIndices[
        (position + direction + enabledIndices.length) % enabledIndices.length
      ];
    refs.current[nextIndex]?.focus();
  };

  return {
    selectedValue,
    tabIndex,
    refs,
    select,
    onKeyDown,
    onFocus: setFocusedIndex,
  };
}
