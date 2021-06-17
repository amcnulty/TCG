import { UPDATE_MAP } from "./ActionTypes"

const Reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_MAP:
            return {
                center: action.payload.center,
                zoom: action.payload.zoom
            }
        default:
            return state;
    }
}

export default Reducer;