import { create } from "zustand/react";

interface FormState {
  value: string;
}

interface FormActions {
  setValue: (value: string) => void;
  reset: () => void;
}

const initialState: FormState = {
  value: "",
};

export const useFormStore = create<FormState & FormActions>(
  (set, get) => ({
    ...initialState,
    setValue: (value) => set({ value }),
    getState: () => get(),
    reset: () => set(initialState)
  }),
);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const selectFormState = () => useFormStore(state => state);
