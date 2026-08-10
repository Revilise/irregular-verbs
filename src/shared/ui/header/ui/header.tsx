import {useBEM} from "@shared/lib";
import type {IHeader} from "@shared/ui/header/config/types.ts";
import type {FC} from "react";

export const Header: FC<IHeader> = ({
  extraCN,
  utilCN,
  title,
  subtitle,
  score
}) => {
  const { bem } = useBEM("header");
  const safeScore = score ?? { right: 0, total: 0 };

  return (
     <header className={bem("", extraCN, utilCN)}>
       <h1 className={"h1"}>{title}</h1>
       <p className={"h2"}>{subtitle}</p>

       <div className={bem("stats")}>
         <span className={bem("score")}>
           Score: {safeScore.right}/{safeScore.total}
         </span>
         {safeScore.total > 0 && (
            <span className={bem("pct")}>
             {Math.round((100 * safeScore.right) / safeScore.total)}% correct
            </span>
         )}
       </div>
     </header>
  )
}
