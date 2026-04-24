import {Header} from "@shared/ui/header";
import {Footer} from "@shared/ui/footer";
import {useBEM} from "@shared/lib";
import type {ILayout} from "@shared/ui/layout/config/types.ts";
import type {FC} from "react";

export const Layout: FC<ILayout> = ({
  extraCN,
  utilCN,
  children
}) => {
  const { bem } = useBEM("layout");

  return (
     <div className={bem("", extraCN, utilCN)}>
       <Header
          title={"Irregular verbs"}
          subtitle={"Random drills: multiple choice, typing, and phonemic transcription"}
       />

       <main className={bem("main")}>
         {children}
       </main>

       <Footer />
     </div>
  )
}
