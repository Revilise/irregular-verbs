import {useBEM} from "@shared/lib";
import type {IHeader} from "@shared/ui/header/config/types.ts";
import type {FC} from "react";
import { useScore } from "@shared/lib/score";

export const Header: FC<IHeader> = ({
  extraCN,
  utilCN,
  title,
  subtitle,
}) => {
  const { bem } = useBEM("header");
  const { score } = useScore();

  return (
     <header className={bem("", extraCN, utilCN)}>
       <h1 className={"h1"}>{title}</h1>
       <p className={"h2"}>{subtitle}</p>

       <div className={bem("stats")}>
         <span className={bem("score")}>
           Score: {score.right}/{score.total}
         </span>
         {score.total > 0 && (
            <span className={bem("pct")}>
             {Math.round((100 * score.right) / score.total)}% correct
            </span>
         )}
       </div>
     </header>
  )
}
