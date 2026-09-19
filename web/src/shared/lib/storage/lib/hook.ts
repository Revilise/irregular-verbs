import { useRef, useState } from "react";
import { CookieStorage } from "@shared/lib/storage/model";

export function useCookie<TValue>({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: TValue;
}) {
  const [value, setValue] = useState<TValue | undefined>(
    CookieStorage.get(name) || defaultValue,
  );
  const ref = useRef<TValue>(value);

  function update(value: TValue) {
    ref.current = value;
    setValue(value);
    CookieStorage.set(name, value);
  }

  return {
    value,
    setValue: update,
  };
}
