import { useBEM } from "@shared/lib";
import type { FC } from "react";
import type { IFooter } from "@shared/ui/footer/config/types.ts";
import { IRREGULAR_VERBS } from "@shared/const/verbs.ts";

export const Footer: FC<IFooter> = ({ extraCN, utilCN }) => {
  const { bem } = useBEM("footer");

  return (
    <footer className={bem("", extraCN, utilCN)}>
      <p className={bem("text")}>
        {IRREGULAR_VERBS.length} verbs in the deck · IPA in British English
      </p>
    </footer>
  );
};
