import { createContext, useReducer } from 'react';
import Reducer from './Reducer';

const initialState = {
    center: [39.087692, -97.611850],
    zoom: 5
}

const Store = (props) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <MapContext.Provider value={[state, dispatch]}>
            {props.children}
        </MapContext.Provider>
    )
}

export const MapContext = createContext(initialState);

export default Store;