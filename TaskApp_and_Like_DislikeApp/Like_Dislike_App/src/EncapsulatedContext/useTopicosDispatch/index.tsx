import { useContext } from "react";
import { TopicosDispatchContext } from "../../Contexts";

export function useTopicosDispatch() {
    return useContext(TopicosDispatchContext);
}