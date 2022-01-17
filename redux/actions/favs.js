import { ADD_FAVS, REMOVE_FAVS } from "../constants"

export function addFavs(fav) {
    return {
        type: ADD_FAVS,
        value: fav,
    }
}

export function removeFavs(favIndex) {
    return {
        type: REMOVE_FAVS,
        value: favIndex,
    }
}