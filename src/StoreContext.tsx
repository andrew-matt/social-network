import React from "react";
import {ReduxStoreType} from "./Redux/Redux-Store";

const StoreContext = React.createContext({} as ReduxStoreType)

type ProviderPropsType = {
    store: ReduxStoreType
    children: any
}

export const Provider = (props: ProviderPropsType) => {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContext;