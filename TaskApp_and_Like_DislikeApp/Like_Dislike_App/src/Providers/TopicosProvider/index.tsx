import { ReactNode, useReducer } from "react"
import { reducer } from "../../services/TopicosReducer";
import { TopicosContext, TopicosDispatchContext } from "../../Contexts";

export const TopicosProvider = ({ children }: { children: ReactNode }) => {
    const [{ Topicos }, dispatch] = useReducer(reducer, { Topicos: [] });

    return (
        <TopicosContext.Provider value={Topicos}>
            <TopicosDispatchContext.Provider value={dispatch}>
                {children}
            </TopicosDispatchContext.Provider>
        </TopicosContext.Provider>
    )

}