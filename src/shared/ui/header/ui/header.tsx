import {useBEM} from "../../../lib";
import type {IHeader} from "../config/types.ts";
import type {FC} from "react";

export const Header: FC<IHeader> = ({
  extraCN,
  utilCN,
  title,
  subtitle,
  score
}) => {
  const { bem } = useBEM("header");

  return (
     <header className={bem("", extraCN, utilCN)}>
       <h1 className={bem("title")}>{title}</h1>
       <p className={bem("subtitle")}>{subtitle}</p>

       <div className={bem("stats")}>
         <span className={bem("score")}>
           Score: ${score.right}/${score.total}
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
