import { baseActionTypes as type } from '../actionTypes/base.action.types';

const userStorage = JSON.parse(localStorage.getItem('AuthStorage'));

const initialData = {
    loading: false,
    lang: userStorage && userStorage.Lang ? userStorage.Lang : "tr-TR"
}

const baseReducer = (state = initialData, action) => {
    switch (action.type) {
        case type.setLoading:
            var loading = action.payload.data;
            return { ...state, loading };
        case type.setLang:
            return { ...state, lang: action.lang }
        default:
            return state;
    }
};

export { baseReducer };