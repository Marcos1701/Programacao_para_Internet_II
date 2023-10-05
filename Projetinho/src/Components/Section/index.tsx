import { ReactNode, useContext } from "react";
import { LevelContext } from "../Providers/LevelProvider";

export default function Section({ children } : { children: ReactNode}) {
    const level: number = useContext(LevelContext);

    return (
    <LevelContext.Provider value={level + 1} >
      <section className="section">
        {children}
      </section>
    </LevelContext.Provider>
    );
  }
  