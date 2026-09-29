import { type RefObject, useCallback, useEffect } from "react";

export function useAutoFocus(formRef: RefObject<HTMLFormElement | null>) {
  const refresh = useCallback(() => {
    const form = formRef.current;
    if (!form) return;

    for (const element of Array.from(form.elements)) {
      if (
        !(element instanceof HTMLElement) ||
        element.tabIndex < 0 ||
        element.matches(":disabled") ||
        element.closest("[hidden], [inert]")
      ) {
        continue;
      }

      element.focus();
      if (element.ownerDocument.activeElement === element) break;
    }
  }, [formRef]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    refresh,
  };
}
