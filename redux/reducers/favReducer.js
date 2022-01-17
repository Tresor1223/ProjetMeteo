import { ADD_FAVS, REMOVE_FAVS } from '../constants';

const initialState = {
    favs: [],
};

const favReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVS:
            return {
                ...state,
                favs: [...state.favs, action.value]
            };
        case REMOVE_FAVS:
            return {
                ...state,
                favs: state.favs.filter((elem, index) => index != action.value)
            };
        default:
            return state;
    }
}

export default favReducer;