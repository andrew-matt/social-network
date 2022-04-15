import React from "react";
import {ReduxStoreType} from "./Redux/Redux-Store";

const StoreContext = React.createContext({} as ReduxStoreType)

export default StoreContext;