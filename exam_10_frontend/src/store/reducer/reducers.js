import {FETCH_NEWS_SUCCESS, FETCH_FAILURE, FETCH_ONE_NEWS_SUCCESS, DELETE} from "../actions/actionTypes";

const initialState = {
    news: [],
    oneNews: null,
    show: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWS_SUCCESS:
            return {...state, news: action.news};
        case FETCH_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case FETCH_ONE_NEWS_SUCCESS:
            return {...state,
                oneNews: state.news[action.news.id],
                show: true};
        case DELETE:
            return {
                ...state,
                oneNews: null,
                show: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;